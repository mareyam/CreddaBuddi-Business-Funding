import { CONSENT_TEXT, QUESTIONS } from "./config";

/*
 * Direct GrowthHub365 (GoHighLevel) API integration, server side only.
 *
 *   Step 1  -> POST /contacts/upsert        creates the contact (or finds the same email/phone, so no duplicates)
 *           -> POST /contacts/{id}/notes    records consent wording + timestamp
 *   Step 2  -> PUT  /contacts/{id}          updates custom fields that exist in the sub-account
 *           -> POST /contacts/{id}/tags     adds route and flag tags
 *           -> POST /contacts/{id}/notes    records all 11 answers (so nothing is lost if a field is missing)
 *
 * Configuration (environment variables, never in code):
 *   GHL_API_TOKEN    Private Integration Token for the CREDA BUDDI sub-account
 *   GHL_LOCATION_ID  the sub-account (location) ID
 *   GHL_API_BASE     optional, defaults to the real API (used for testing)
 */

const BASE = process.env.GHL_API_BASE ?? "https://services.leadconnectorhq.com";
const TOKEN = process.env.GHL_API_TOKEN;
const LOCATION = process.env.GHL_LOCATION_ID;

export const ghlConfigured = (): boolean => !!(TOKEN && LOCATION);

async function api<T>(method: "GET" | "POST" | "PUT", path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Version: "2021-07-28",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  });
  if (!res.ok) {
    // Include only GHL's short error message (e.g. "Invalid phone number"), never the request or contact data.
    let reason = "";
    try {
      const j = (await res.json()) as { message?: unknown };
      reason = Array.isArray(j.message) ? j.message.join("; ") : String(j.message ?? "");
    } catch {
      /* no body */
    }
    throw new Error(`GHL ${method} ${path.split("?")[0].replace(/\/[A-Za-z0-9]{15,}/g, "/{id}")} failed (${res.status}) ${reason.slice(0, 200)}`.trim());
  }
  return (await res.json()) as T;
}

/**
 * Which GrowthHub365 custom field each answer goes to (matched by field KEY, because two fields can share a
 * name, e.g. "Business Type"). `values` translates the form's exact answer into the dropdown option that field
 * uses in GrowthHub365. An answer with no matching option is NOT written to the field (it is still saved in
 * the contact note), so nothing is stored inaccurately.
 */
export const FIELD_MAP: Record<string, { fieldKey: string; label: string; values?: Record<string, string> }> = {
  hasEin: { fieldKey: "contact.ein_registered", label: "EIN Registered" },
  businessType: {
    fieldKey: "contact.contactfunding_readiness_business_type",
    label: "Business Type",
    values: { "Not yet registered": "Not registered yet" },
  },
  timeInBusiness: {
    fieldKey: "contact.business_operating_duration",
    label: "Business Operating Duration",
    values: {
      "Under 6 months": "Less than 6 months",
      "6 to 12 months": "6-12 months",
      "1 to 2 years": "1-2 years",
      "2 to 5 years": "2+ years",
      "5+ years": "2+ years",
    },
  },
  annualRevenue: {
    fieldKey: "contact.estimated_annual_revenue",
    label: "Estimated Annual Revenue",
    values: { "Under $50,000": "Under $50K", "$500,000+": "$500K+" },
  },
  hasBank: { fieldKey: "contact.business_bank_account", label: "Business Bank Account" },
  creditRange: {
    fieldKey: "contact.personal_credit_score_range",
    label: "Personal Credit Score Range",
    values: { "600 to 649": "600-649", "650 to 699": "650-699" },
  },
  negHistory: { fieldKey: "contact.recent_negative_credit_history", label: "Recent Negative Credit History" },
  bankruptcy: { fieldKey: "contact.bankruptcy_in_last_4_years", label: "Bankruptcy in Last 4 Years" },
  fundingAmount: {
    fieldKey: "contact.desired_funding_amount",
    label: "Desired Funding Amount",
    values: { "$50,000 to $100,000": "$50K-$99K", "$100,000 to $250,000": "$100K-$249K" },
  },
  useOfFunds: { fieldKey: "contact.intended_use_of_funds", label: "Intended Use of Funds" },
  hasDebt: { fieldKey: "contact.existing_business_debt_or_financing", label: "Existing Business Debt or Financing" },
};

const CONSENT_FIELD_KEY = "contact.funding_readiness_consent";

export type CustomField = { id: string; name: string; fieldKey: string; dataType: string; picklistOptions?: string[] };
let fieldCache: { at: number; fields: CustomField[] } | null = null;

async function customFields(): Promise<CustomField[]> {
  if (fieldCache && Date.now() - fieldCache.at < 10 * 60_000) return fieldCache.fields;
  const res = await api<{ customFields: CustomField[] }>(
    "GET",
    `/locations/${LOCATION}/customFields?model=contact`,
  );
  fieldCache = { at: Date.now(), fields: res.customFields ?? [] };
  return fieldCache.fields;
}

function toE164(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return raw.trim().startsWith("+") ? `+${digits}` : digits;
}

export async function upsertContact(input: {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  tags: string[];
}): Promise<{ id: string; isNew: boolean }> {
  const [firstName, ...rest] = input.fullName.trim().split(/\s+/);
  const res = await api<{ contact: { id: string }; new?: boolean }>("POST", "/contacts/upsert", {
    locationId: LOCATION,
    firstName,
    lastName: rest.join(" ") || undefined,
    name: input.fullName,
    email: input.email,
    phone: toE164(input.phone),
    companyName: input.businessName,
    source: "Funding Readiness Form",
  });
  if (!res.contact?.id) throw new Error("GHL upsert returned no contact id");
  // Add tags separately: sending them in the upsert would overwrite the contact's existing tags.
  if (input.tags.length) await api("POST", `/contacts/${res.contact.id}/tags`, { tags: input.tags });
  return { id: res.contact.id, isNew: !!res.new };
}

export async function addNote(contactId: string, body: string): Promise<void> {
  await api("POST", `/contacts/${contactId}/notes`, { body });
}

export async function recordConsent(contactId: string, timestamp: string): Promise<void> {
  await addNote(
    contactId,
    `CONSENT GIVEN (Funding Readiness Form)\nTimestamp: ${timestamp}\nWording shown:\n${CONSENT_TEXT}`,
  );
}

/** Decide which answers can be written to which GrowthHub365 custom fields. Pure, so it can be tested. */
export function planFieldWrites(
  fields: CustomField[],
  answers: Record<string, string>,
): { writes: { id: string; field_value: string }[]; skipped: string[] } {
  const byKey = new Map(fields.map((f) => [f.fieldKey, f]));
  const writes: { id: string; field_value: string }[] = [];
  const skipped: string[] = [];
  for (const q of QUESTIONS) {
    const map = FIELD_MAP[q.id];
    const field = byKey.get(map.fieldKey);
    if (!field) {
      skipped.push(`${map.label} (field not found)`);
      continue;
    }
    const answer = answers[q.id];
    const value = map.values?.[answer] ?? answer;
    const ok = !field.picklistOptions?.length || field.picklistOptions.includes(value);
    if (ok) writes.push({ id: field.id, field_value: value });
    else skipped.push(`${map.label} (no matching option for "${answer}")`);
  }
  return { writes, skipped };
}

/** Best effort: tick the "Funding Readiness Consent" checkbox. The consent note is the authoritative record. */
export async function markConsentField(contactId: string): Promise<void> {
  try {
    const field = (await customFields()).find((f) => f.fieldKey === CONSENT_FIELD_KEY);
    if (field) await api("PUT", `/contacts/${contactId}`, { customFields: [{ id: field.id, field_value: ["I agree"] }] });
  } catch {
    /* the consent note already holds the record */
  }
}

/** Update the contact with the 11 answers. Returns the fields that were not written. */
export async function saveAnswers(
  contactId: string,
  answers: Record<string, string>,
  tags: string[],
  route: string,
): Promise<{ skippedFields: string[] }> {
  const { writes, skipped } = planFieldWrites(await customFields(), answers);

  if (writes.length) await api("PUT", `/contacts/${contactId}`, { customFields: writes });
  if (tags.length) await api("POST", `/contacts/${contactId}/tags`, { tags });

  const lines = QUESTIONS.map((q) => `${q.label}\n  ${answers[q.id]}`).join("\n");
  await addNote(
    contactId,
    `FUNDING READINESS ANSWERS (self-reported)\nRoute: ${route}\nTags: ${tags.join(", ")}\n\n${lines}` +
      (skipped.length ? `\n\nNot written to custom fields: ${skipped.join("; ")}` : ""),
  );
  return { skippedFields: skipped };
}
