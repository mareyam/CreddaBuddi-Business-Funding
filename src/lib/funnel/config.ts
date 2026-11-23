/*
 * Funding funnel configuration. Everything the client may change lives here
 * or in environment variables. Nothing here is a CRM credential.
 */

/** The separate page that holds the Funding Readiness Form. Every CTA opens it. */
export const FORM_PATH = "/funding-readiness";

export type Route = "ready" | "credit-first" | "foundation-first";

export const CONSENT_TEXT =
  "I agree that CREDA BUDDI LLC may contact me at the phone number and email I provided about my business funding readiness, including by calls and text messages that may use automated technology. Message and data rates may apply. Consent is not a condition of purchase. Reply STOP to opt out.";

/* ---- Step 2 questions: exact wording and answer choices from the client ---- */
export type Question =
  | { id: string; label: string; options: readonly string[] }
  | { id: string; label: string; text: true; placeholder: string };

export const QUESTIONS: readonly Question[] = [
  { id: "hasEin", label: "Is your business registered with an EIN?", options: ["Yes", "No", "In progress"] },
  { id: "businessType", label: "Business type", options: ["Sole Proprietorship", "LLC", "S-Corp", "C-Corp", "Partnership", "Not yet registered"] },
  { id: "timeInBusiness", label: "How long has the business been operating?", options: ["Under 6 months", "6 to 12 months", "1 to 2 years", "2 to 5 years", "5+ years"] },
  { id: "annualRevenue", label: "Estimated annual revenue", options: ["Pre-revenue", "Under $50,000", "$50,000 to $150,000", "$150,000 to $500,000", "$500,000+"] },
  { id: "hasBank", label: "Do you have a business bank account?", options: ["Yes", "No"] },
  { id: "creditRange", label: "Personal credit score range (your best estimate)", options: ["Under 600", "600 to 649", "650 to 699", "700+", "Not sure"] },
  { id: "negHistory", label: "In the last 24 months, any collections, charge-offs, or accounts 60+ days late?", options: ["Yes", "No", "Not sure"] },
  { id: "bankruptcy", label: "Any bankruptcy in the last 4 years?", options: ["Yes", "No"] },
  { id: "fundingAmount", label: "Desired funding amount", options: ["Under $20,000", "$20,000 to $50,000", "$50,000 to $100,000", "$100,000 to $250,000", "$250,000+"] },
  { id: "useOfFunds", label: "What will the funds be used for?", text: true, placeholder: "Short answer, e.g. inventory or equipment" },
  { id: "hasDebt", label: "Do you currently have business debt or financing?", options: ["Yes", "No"] },
];

/* ---- CRM names (as specified by the client) ---- */
export const TAGS = {
  ready: "Funding Ready",
  "credit-first": "Funding Credit First",
  "foundation-first": "Funding Foundation First",
  source: "Came From Funding Readiness Form",
} as const;

export const STAGES = {
  ready: "Ready To Book",
  "credit-first": "Credit First",
  "foundation-first": "Foundation First",
} as const;

export const WORKFLOWS = {
  notFinished: "Funding Form Not Finished",
  ready: "Funding Ready Follow Up",
  "credit-first": "Credit First Follow Up",
  "foundation-first": "Foundation First Follow Up",
  guide: "Funding Guide Follow Up",
} as const;

export const SENDER = {
  fromEmail: "info@credabuddi.com",
  fromName: "CREDA BUDDi Team",
  signature: "Powered by Mr. What's Next",
} as const;

/* ---- Offer and sale window ---- */
export const REGULAR_PRICE = 2497;
export const SALE_PRICE = 1997;
// Empty start = running now. Set to the actual launch date, e.g. "2026-11-24T00:00:00-06:00".
export const SALE_START = "2026-11-22T00:00:00-06:00";
// Monday, November 30, 2026, 11:59 PM Central (CST, UTC-6).
export const SALE_END = "2026-11-30T23:59:59-06:00";
// November 27 special promotion. Wording not provided, so nothing is shown until it is set.
export const SPECIAL_START = "2026-11-27T00:00:00-06:00";
export const SPECIAL_END = "2026-11-27T23:59:59-06:00";
export const SPECIAL_TEXT = "";

export function saleActive(now: number): boolean {
  if (SALE_START && now < Date.parse(SALE_START)) return false;
  return now <= Date.parse(SALE_END);
}
export function specialActive(now: number): boolean {
  return !!SPECIAL_TEXT && now >= Date.parse(SPECIAL_START) && now <= Date.parse(SPECIAL_END);
}

/* ---- Links (set in .env.local; empty keeps the button off) ---- */
export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ?? "";
export const CREDIT_PLANS_URL = process.env.NEXT_PUBLIC_CREDIT_PLANS_URL ?? "";
export const GUIDE_URL = process.env.NEXT_PUBLIC_GUIDE_URL ?? "";
