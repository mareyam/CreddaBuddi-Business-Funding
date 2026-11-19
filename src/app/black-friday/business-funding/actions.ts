"use server";

export type QualificationFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<string, string>>;
};

const REQUIRED_FIELDS = [
  "fullName",
  "email",
  "phone",
  "businessName",
  "businessType",
  "timeInBusiness",
  "annualRevenue",
  "fundingAmount",
  "useOfFunds",
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9()+\-.\s]{7,20}$/;

export async function submitQualificationForm(
  _prevState: QualificationFormState,
  formData: FormData,
): Promise<QualificationFormState> {
  const fieldErrors: Partial<Record<string, string>> = {};

  for (const field of REQUIRED_FIELDS) {
    const value = formData.get(field);
    if (typeof value !== "string" || value.trim().length === 0) {
      fieldErrors[field] = "This field is required.";
    }
  }

  const email = String(formData.get("email") ?? "");
  if (email && !EMAIL_RE.test(email)) {
    fieldErrors.email = "Enter a valid email address.";
  }

  const phone = String(formData.get("phone") ?? "");
  if (phone && !PHONE_RE.test(phone)) {
    fieldErrors.phone = "Enter a valid phone number.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const submission = {
    fullName: String(formData.get("fullName")),
    email,
    phone,
    businessName: String(formData.get("businessName")),
    businessType: String(formData.get("businessType")),
    timeInBusiness: String(formData.get("timeInBusiness")),
    annualRevenue: String(formData.get("annualRevenue")),
    fundingAmount: String(formData.get("fundingAmount")),
    useOfFunds: String(formData.get("useOfFunds")),
    submittedAt: new Date().toISOString(),
  };

  // NOTE: No CRM/email integration is wired up yet. This logs the
  // qualified lead server-side so the submission is real and auditable,
  // but it is not yet delivered anywhere. Wire this up to the real lead
  // pipeline (e.g. the CREDA BUDDi CRM, an email relay, or a webhook)
  // before this page goes live.
  console.log("[business-funding-lead]", submission);

  return {
    status: "success",
    message:
      "Thanks — your information has been received. A member of the CREDA BUDDi team will follow up by email or phone during business hours (Mon–Fri, 9–5 Central).",
  };
}
