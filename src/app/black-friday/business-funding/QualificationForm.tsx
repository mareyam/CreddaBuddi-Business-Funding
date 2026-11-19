"use client";

import { useActionState } from "react";
import { submitQualificationForm, type QualificationFormState } from "./actions";

const initialState: QualificationFormState = { status: "idle" };

const businessTypes = [
  "Sole proprietorship",
  "LLC",
  "S-Corp",
  "C-Corp",
  "Partnership",
  "Not yet registered",
];

const timeInBusinessOptions = [
  "Less than 6 months",
  "6 months – 1 year",
  "1 – 2 years",
  "2 – 5 years",
  "5+ years",
];

const revenueOptions = [
  "Pre-revenue",
  "Under $50,000",
  "$50,000 – $150,000",
  "$150,000 – $500,000",
  "$500,000+",
];

const fundingAmountOptions = [
  "Under $20,000",
  "$20,000 – $50,000",
  "$50,000 – $100,000",
  "$100,000 – $250,000",
  "$250,000+",
];

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-navy">
        {label}
      </label>
      {children}
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-navy placeholder:text-muted-foreground outline-none transition focus:border-blue focus:ring-2 focus:ring-blue/20";

export default function QualificationForm() {
  const [state, formAction, isPending] = useActionState(
    submitQualificationForm,
    initialState,
  );

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-cyan/30 bg-white p-8 text-center shadow-sm sm:p-10">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cyan/15 text-cyan">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-navy">
          You&apos;re on the list
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {state.message}
        </p>
      </div>
    );
  }

  const errors = state.fieldErrors ?? {};

  return (
    <form
      action={formAction}
      noValidate
      className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8"
    >
      {state.status === "error" && state.message ? (
        <p className="mb-5 rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="fullName" error={errors.fullName}>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            className={inputClass}
            placeholder="Jordan Rivera"
          />
        </Field>

        <Field label="Email address" htmlFor="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={inputClass}
            placeholder="you@company.com"
          />
        </Field>

        <Field label="Phone number" htmlFor="phone" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
            placeholder="(555) 123-4567"
          />
        </Field>

        <Field
          label="Business name"
          htmlFor="businessName"
          error={errors.businessName}
        >
          <input
            id="businessName"
            name="businessName"
            type="text"
            autoComplete="organization"
            className={inputClass}
            placeholder="Your business name"
          />
        </Field>

        <Field
          label="Business type"
          htmlFor="businessType"
          error={errors.businessType}
        >
          <select
            id="businessType"
            name="businessType"
            defaultValue=""
            className={inputClass}
          >
            <option value="" disabled>
              Select business type
            </option>
            {businessTypes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Time in business"
          htmlFor="timeInBusiness"
          error={errors.timeInBusiness}
        >
          <select
            id="timeInBusiness"
            name="timeInBusiness"
            defaultValue=""
            className={inputClass}
          >
            <option value="" disabled>
              Select time in business
            </option>
            {timeInBusinessOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Estimated annual revenue"
          htmlFor="annualRevenue"
          error={errors.annualRevenue}
        >
          <select
            id="annualRevenue"
            name="annualRevenue"
            defaultValue=""
            className={inputClass}
          >
            <option value="" disabled>
              Select annual revenue
            </option>
            {revenueOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Desired funding amount"
          htmlFor="fundingAmount"
          error={errors.fundingAmount}
        >
          <select
            id="fundingAmount"
            name="fundingAmount"
            defaultValue=""
            className={inputClass}
          >
            <option value="" disabled>
              Select funding amount
            </option>
            {fundingAmountOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field
            label="Intended use of funds"
            htmlFor="useOfFunds"
            error={errors.useOfFunds}
          >
            <textarea
              id="useOfFunds"
              name="useOfFunds"
              rows={3}
              className={inputClass}
              placeholder="e.g. inventory, equipment, hiring, expansion"
            />
          </Field>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-6 w-full rounded-full bg-blue px-6 py-3.5 text-center text-sm font-semibold text-white shadow-[0_8px_24px_-8px_oklch(42.6%_0.212_262.87/0.55)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isPending ? "Submitting…" : "Check My Business Funding Readiness"}
      </button>

      <p className="mt-3 text-xs text-muted-foreground">
        By submitting, you agree to be contacted by CREDA BUDDi about your
        business funding readiness. No obligation. Results vary.
      </p>
    </form>
  );
}
