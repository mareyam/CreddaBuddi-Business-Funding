"use client";

import { useState, useTransition, type FormEvent, type ReactNode } from "react";
import { CONSENT_TEXT, QUESTIONS } from "@/lib/funnel/config";
import { saveStep1, saveStep2 } from "./actions";
import { useFunnel } from "./funnel-context";
import ViewLink from "./ViewLink";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-cyan [&>option]:text-black";

function Field({
  label,
  htmlFor,
  error,
  className = "",
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-white">
        {label}
      </label>
      {children}
      {error ? <p className="text-xs text-red-400">{error}</p> : null}
    </div>
  );
}

export default function QualificationForm() {
  const { setResult } = useFunnel();
  const [pending, startTransition] = useTransition();
  const [step, setStep] = useState<1 | 2>(1);
  const [contactId, setContactId] = useState("");
  const [saved, setSaved] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");

  const value = (form: HTMLFormElement, name: string) =>
    String(new FormData(form).get(name) ?? "").trim();

  function submitStep1(form: HTMLFormElement) {
    const data = {
      fullName: value(form, "fullName"),
      email: value(form, "email"),
      phone: value(form, "phone"),
      businessName: value(form, "businessName"),
      consent: (form.elements.namedItem("consent") as HTMLInputElement).checked,
    };
    const next: Record<string, string> = {};
    if (!data.fullName) next.fullName = "Enter your full name.";
    if (!EMAIL_RE.test(data.email)) next.email = "Enter a valid email address.";
    if (data.phone.replace(/\D/g, "").length < 7) next.phone = "Enter a phone number.";
    if (!data.businessName) next.businessName = "Enter your business name.";
    if (!data.consent) next.consent = "Please agree so we can follow up.";
    setErrors(next);
    setFormError("");
    if (Object.keys(next).length) return;

    startTransition(async () => {
      const res = await saveStep1({ ...data, contactId });
      if (!res.ok) {
        setErrors(res.fieldErrors ?? {});
        setFormError(res.error);
        return;
      }
      setContactId(res.contactId);
      setSaved(res.saved);
      setStep(2);
      document.getElementById("qualification-form")?.scrollIntoView({ block: "start" });
    });
  }

  function submitStep2(form: HTMLFormElement) {
    const answers: Record<string, string> = {};
    const next: Record<string, string> = {};
    for (const q of QUESTIONS) {
      answers[q.id] = value(form, q.id);
      if (!answers[q.id]) next[q.id] = "This question is required.";
    }
    setErrors(next);
    setFormError("");
    if (Object.keys(next).length) return;

    startTransition(async () => {
      const res = await saveStep2({ contactId, ...answers });
      if (!res.ok) {
        setErrors(res.fieldErrors ?? {});
        setFormError(res.error);
        return;
      }
      setResult({
        route: res.route,
        contactId,
        summary: [
          value(form, "businessName"),
          answers.businessType,
          answers.timeInBusiness,
          `Credit: ${answers.creditRange}`,
          `Seeking ${answers.fundingAmount}`,
        ],
      });
    });
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending) return;
    if (step === 1) submitStep1(e.currentTarget);
    else submitStep2(e.currentTarget);
  }

  const step2Hidden = step !== 2;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-label="Funding Readiness Form"
      className="rounded-[20px] border border-white/15 p-6 sm:p-8"
    >
      <div className="mb-6">
        <p className="font-[family-name:var(--font-geist-mono)] text-xs uppercase tracking-[0.2em] text-white/80">
          {step === 1 ? "Step 1 of 2 · About you" : "Step 2 of 2 · Your business"}
        </p>
        <div className="mt-3 h-[3px] overflow-hidden rounded bg-white/15" aria-hidden="true">
          <div
            className="h-full bg-cyan transition-[width] duration-300"
            style={{ width: step === 1 ? "50%" : "100%" }}
          />
        </div>
      </div>

      {/* Step 1 */}
      <div className={`grid gap-5 sm:grid-cols-2 ${step === 1 ? "" : "hidden"}`}>
        <Field label="Full name" htmlFor="fullName" error={errors.fullName}>
          <input id="fullName" name="fullName" type="text" autoComplete="name" className={inputClass} placeholder="Jordan Rivera" />
        </Field>
        <Field label="Email address" htmlFor="email" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" className={inputClass} placeholder="you@company.com" />
        </Field>
        <Field label="Phone number" htmlFor="phone" error={errors.phone}>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={inputClass} placeholder="(555) 123-4567" />
        </Field>
        <Field label="Business name" htmlFor="businessName" error={errors.businessName}>
          <input id="businessName" name="businessName" type="text" autoComplete="organization" className={inputClass} placeholder="Your business name" />
        </Field>
        <div className="sm:col-span-2">
          <label htmlFor="consent" className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-white/80">
            <input id="consent" name="consent" type="checkbox" className="mt-1 h-[18px] w-[18px] shrink-0 accent-cyan" />
            <span>{CONSENT_TEXT}</span>
          </label>
          {errors.consent ? <p className="mt-1.5 text-xs text-red-400">{errors.consent}</p> : null}
          <p className="mt-2 text-xs text-white/50">
            <ViewLink to="privacy" className="text-white underline underline-offset-2">Privacy Policy</ViewLink>
            {" | "}
            <ViewLink to="terms" className="text-white underline underline-offset-2">Terms</ViewLink>
            {" · Consent wording pending attorney approval"}
          </p>
        </div>
      </div>

      {/* Step 2: always in the page text, collapsed and not focusable until Step 1 is saved */}
      <div
        className={`grid gap-5 sm:grid-cols-2 ${step2Hidden ? "max-h-0 overflow-hidden" : ""}`}
        inert={step2Hidden}
        aria-hidden={step2Hidden}
      >
        {QUESTIONS.map((q) =>
          "text" in q ? (
            <Field key={q.id} label={q.label} htmlFor={q.id} error={errors[q.id]} className="sm:col-span-2">
              <textarea id={q.id} name={q.id} rows={3} className={inputClass} placeholder={q.placeholder} />
            </Field>
          ) : (
            <Field key={q.id} label={q.label} htmlFor={q.id} error={errors[q.id]}>
              <select id={q.id} name={q.id} defaultValue="" className={inputClass}>
                <option value="" disabled>Select one</option>
                {q.options.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </Field>
          ),
        )}
      </div>

      {step === 2 && !saved ? (
        <p className="mt-4 text-xs text-white/50" role="status">
          Preview mode: the CRM is not connected, so your details were not saved.
        </p>
      ) : null}
      {step === 2 ? (
        <p className="mt-4 text-xs text-white/50">
          Answers are self-reported. We do not collect Social Security numbers, credit reports, card details or documents, and we do not pull your credit.
        </p>
      ) : null}
      {formError ? (
        <p role="alert" className="mt-4 text-sm text-red-400">{formError}</p>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-3">
        {step === 2 ? (
          <button
            type="button"
            onClick={() => { setStep(1); setFormError(""); setErrors({}); }}
            disabled={pending}
            className="rounded-full border border-white/35 px-7 py-4 text-sm font-medium text-white transition hover:border-white disabled:opacity-60"
          >
            Back
          </button>
        ) : null}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-full bg-cyan px-7 py-4 text-center text-sm font-medium text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {pending ? "Saving…" : formError ? "Try again" : "Continue"}
        </button>
      </div>

      <p className="mt-3 text-xs text-white/50">
        Results vary. No guarantees. Consent and privacy wording is a draft pending attorney approval.
      </p>
    </form>
  );
}
