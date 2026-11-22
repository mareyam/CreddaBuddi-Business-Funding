"use client";

import { useState } from "react";

const faqs: { q: string; a: string }[] = [
  {
    q: "What is the Business Funding Growth Accelerator?",
    a: "It's CREDA BUDDi's structured business funding program: a funding-readiness assessment, lender matching, application guidance and a personalized funding strategy, designed to help you approach the capital-raising process strategically instead of guessing.",
  },
  {
    q: "Who is this program for?",
    a: "Business owners who are preparing to pursue funding and want a clearer, more strategic approach — including understanding their current readiness, identifying suitable lenders, and preparing a stronger application.",
  },
  {
    q: "Is funding guaranteed?",
    a: "No. Funding is never guaranteed. Lender approvals, amounts and terms are set entirely by the lenders. CREDA BUDDi provides strategy, preparation and guidance — results vary and there are no guarantees.",
  },
  {
    q: "How does lender matching work?",
    a: "When your readiness supports it, we use your business profile, credit standing and funding goals to help you explore lenders and funding options that may be a reasonable fit. Lenders make every approval decision, and funding is never guaranteed.",
  },
  {
    q: "What happens after I submit the qualification form?",
    a: "A member of the CREDA BUDDi team reviews your information and follows up by email or phone during business hours (Monday–Friday, 9 AM–5 PM Central) to discuss next steps.",
  },
  {
    q: "Do I need established business credit?",
    a: "No. Part of the program includes reviewing your business credit foundation — if it needs to be built or strengthened first, that's addressed as part of your strategy.",
  },
];

/*
 * Fee questions, removed from the main page FAQ. Kept for reuse on the
 * Funding Ready Next Step page. The refund sentence is pending attorney approval.
 */
export const pricingFaqs: { q: string; a: string }[] = [
  {
    q: "What does the $2,497 fee include?",
    a: "The one-time fee covers your funding strategy call, personal and business credit analysis, business foundation review, lender-ready document package, and strategic application sequencing. It's charged when you sign. Refund terms are pending attorney approval.",
  },
  {
    q: "Are there additional fees?",
    a: "Yes. If you're funded, a success fee applies: 8% on the first $20,000 and 10% on amounts above that, due within 5 business days after funds are approved and available. No funding, no success fee. Credit Hero Score monitoring is required separately at $29.95/month, paid directly to Credit Hero Score, not to CREDA BUDDi.",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-white/15 border-y border-white/15">
      {faqs.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-6 text-left"
            >
              <span className="text-xl font-medium tracking-[-0.025em] text-white sm:text-2xl">
                {item.q}
              </span>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/40 text-white transition-transform duration-200 ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden="true"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M6 1v10M1 6h10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>
            {isOpen ? (
              <div className="max-w-2xl pb-6 text-base leading-relaxed text-white/65">
                {item.a}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
