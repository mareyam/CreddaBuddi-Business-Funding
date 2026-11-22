"use server";

import { CONSENT_TEXT, QUESTIONS, STAGES, TAGS, WORKFLOWS, type Route } from "@/lib/funnel/config";
import { callHook } from "@/lib/funnel/crm";
import { ghlConfigured, markConsentField, recordConsent, saveAnswers, upsertContact } from "@/lib/funnel/ghl";
import { qualify } from "@/lib/funnel/qualification";

/*
 * Funding Readiness Form server actions. All validation is repeated here on
 * the server. Nothing is reported as saved unless a configured webhook
 * accepted it (saved: false means the CRM is not connected).
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type Step1Input = {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  consent: boolean;
  contactId?: string;
};

export type Step1Result =
  | { ok: true; contactId: string; saved: boolean }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

export type Step2Result =
  | { ok: true; route: Route; tags: string[]; saved: boolean }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

const clean = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function saveStep1(input: Step1Input): Promise<Step1Result> {
  const fieldErrors: Record<string, string> = {};
  const fullName = clean(input.fullName);
  const email = clean(input.email);
  const phone = clean(input.phone, 40);
  const businessName = clean(input.businessName);

  if (!fullName) fieldErrors.fullName = "Enter your full name.";
  if (!EMAIL_RE.test(email)) fieldErrors.email = "Enter a valid email address.";
  if (phone.replace(/\D/g, "").length < 7) fieldErrors.phone = "Enter a phone number.";
  if (!businessName) fieldErrors.businessName = "Enter your business name.";
  if (input.consent !== true) fieldErrors.consent = "Please agree so we can follow up.";
  if (Object.keys(fieldErrors).length) {
    return { ok: false, error: "Please fix the highlighted fields.", fieldErrors };
  }

  try {
    // Direct GrowthHub365 API (when GHL_API_TOKEN + GHL_LOCATION_ID are set): create or find the contact first.
    let ghlId = "";
    if (ghlConfigured()) {
      const contact = await upsertContact({ fullName, email, phone, businessName, tags: [TAGS.source] });
      await recordConsent(contact.id, new Date().toISOString());
      await markConsentField(contact.id);
      ghlId = contact.id;
    }

    const res = await callHook("contact", {
      type: "contact",
      contactId: ghlId || input.contactId || undefined,
      fullName,
      email,
      phone,
      businessName,
      consent: { given: true, wording: CONSENT_TEXT, timestamp: new Date().toISOString() },
      tags: [TAGS.source],
      pipeline: "CREDA BUDDI Funding",
      stage: "New Readiness Form",
    });

    let contactId = ghlId || input.contactId || "";
    if (res.configured && !ghlId) {
      const id = res.data.contactId;
      if (typeof id !== "string" || !id) {
        return { ok: false, error: "We couldn't save your details. Please try again." };
      }
      contactId = id;
      // Start "Funding Form Not Finished". Best effort: it must not block the visitor.
      await callHook("followUp", {
        type: "followUp",
        workflow: WORKFLOWS.notFinished,
        action: "start",
        contactId,
      }).catch(() => undefined);
    } else if (!contactId) {
      contactId = `preview-${crypto.randomUUID()}`;
    }
    return { ok: true, contactId, saved: res.configured || !!ghlId };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[funding-form] Step 1 save failed:", message);
    if (/phone/i.test(message)) {
      return {
        ok: false,
        error: "That phone number was not accepted. Check it and try again.",
        fieldErrors: { phone: "Enter a valid phone number with area code." },
      };
    }
    return { ok: false, error: "We couldn't save your details. Check your connection and try again." };
  }
}

export async function saveStep2(
  input: { contactId: string } & Record<string, string>,
): Promise<Step2Result> {
  const fieldErrors: Record<string, string> = {};
  const answers: Record<string, string> = {};

  for (const q of QUESTIONS) {
    const value = clean(input[q.id], 500);
    if (!value) {
      fieldErrors[q.id] = "This question is required.";
    } else if ("options" in q && !q.options.includes(value)) {
      fieldErrors[q.id] = "Choose one of the listed answers.";
    }
    answers[q.id] = value;
  }
  const contactId = clean(input.contactId, 120);
  if (!contactId) return { ok: false, error: "Please start again from Step 1." };
  if (Object.keys(fieldErrors).length) {
    return { ok: false, error: "Please answer every question.", fieldErrors };
  }

  const q = qualify(answers);
  const tags = [TAGS[q.route], TAGS.source, ...q.tags];

  try {
    // Direct GrowthHub365 API: update the contact created in Step 1 with the 11 answers.
    if (ghlConfigured()) {
      await saveAnswers(contactId, answers, tags, q.route);
    }
    const calls = await Promise.all([
      callHook("answers", { type: "answers", contactId, answers }),
      callHook("qualification", {
        type: "qualification",
        contactId,
        route: q.route,
        failedGates: q.failedGates,
        weakCredit: q.weakCredit,
        rulesStatus: "advisor revenue boundary pending client approval",
      }),
      callHook("tags", { type: "tags", contactId, tags }),
      callHook("route", { type: "route", contactId, route: q.route, pipeline: "CREDA BUDDI Funding", stage: STAGES[q.route] }),
      callHook("followUp", { type: "followUp", workflow: WORKFLOWS.notFinished, action: "stop", contactId }),
      callHook("followUp", { type: "followUp", workflow: WORKFLOWS[q.route], action: "start", contactId, route: q.route, tags }),
    ]);
    return { ok: true, route: q.route, tags: q.tags, saved: ghlConfigured() || calls.some((c) => c.configured) };
  } catch (err) {
    console.error("[funding-form] Step 2 save failed:", err instanceof Error ? err.message : String(err));
    return { ok: false, error: "We couldn't save your answers. Please try again." };
  }
}

/** Follow-up triggers from the result pages (guide interest, foundation Notify Me). */
export async function triggerFollowUp(
  kind: "guide" | "foundation-notify",
  contactId: string,
): Promise<{ ok: boolean; saved: boolean }> {
  try {
    const res = await callHook("followUp", {
      type: "followUp",
      workflow: kind === "guide" ? WORKFLOWS.guide : WORKFLOWS["foundation-first"],
      action: kind === "guide" ? "start" : "notify_me",
      contactId: clean(contactId, 120),
    });
    return { ok: true, saved: res.configured };
  } catch {
    return { ok: false, saved: false };
  }
}
