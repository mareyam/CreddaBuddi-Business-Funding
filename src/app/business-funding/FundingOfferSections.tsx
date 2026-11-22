import SuccessFeeCalculator from "./SuccessFeeCalculator";
import { Pill, formAnchorId, frame, h2, inner, label } from "./shared";

/*
 * Reusable offer sections, moved off the main landing page.
 * NOT rendered on the main page. They are kept here, unchanged, so they can
 * be reused on the separate Funding Ready Next Step page.
 *
 * Open items before reuse (attorney / client approval):
 *  - The success-fee wording below is the previous page copy and is pending
 *    attorney approval. Refund wording has been removed and is pending
 *    attorney approval; do not add a replacement until it is approved.
 *  - The Black Friday bonus: Corey says the consultation and written roadmap
 *    are already included in the program, so they should not be presented as
 *    a free extra unless a genuinely new bonus is defined.
 */

// Set to false to hide the Black Friday bonus block.
export const BLACK_FRIDAY_BONUS_ENABLED = true;

export const deliverables = [
  "Funding strategy call",
  "Personal and business credit analysis",
  "Business foundation review",
  "D-U-N-S® and business credit file setup",
  "Net-30 vendor tradeline roadmap",
  "Lender-ready document package",
  "Strategic application sequencing",
  "Guidance through your funding rounds",
];

export function PricingSection({ ctaHref = `#${formAnchorId}` }: { ctaHref?: string }) {
  return (
    <section className={`${frame} bg-black text-white`}>
      <div className={inner}>
        <p className={`${label} text-cyan`}>Program pricing</p>
        <h2 className={`${h2} mt-5 max-w-3xl`}>
          Business Funding Program pricing.
        </h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <p className={`${label} text-white/50`}>Business Funding Program</p>
            <div className="mt-3 flex flex-wrap items-baseline gap-x-5">
              <span className="text-[clamp(4.5rem,11vw,8.5rem)] leading-none font-medium tracking-[-0.06em]">
                $2,497
              </span>
              <span className="text-lg text-white/60">one-time fee</span>
            </div>
            <p className="mt-3 max-w-md text-base text-white/60">
              Charged when you sign. Refund terms: wording pending attorney
              approval.
            </p>

            <ul className="mt-10 grid sm:grid-cols-2 sm:gap-x-8">
              {deliverables.map((line) => (
                <li
                  key={line}
                  className="border-t border-white/15 py-3.5 text-[15px] tracking-tight text-white/90"
                >
                  {line}
                </li>
              ))}
            </ul>

            <p className="mt-8 max-w-xl border-t border-white/15 pt-5 text-sm leading-relaxed text-white/55">
              Success fee only when you&apos;re funded: 8% on the first
              $20,000 and 10% above that, due within 5 business days after
              funds are approved and available. Credit Hero Score monitoring is
              required: $29.95/month, paid directly to Credit Hero Score, not
              to CREDA BUDDi. Results vary. No guarantees.
            </p>

            <div className="mt-8">
              <Pill href={ctaHref} tone="cyan">
                Check My Funding Readiness
              </Pill>
            </div>
          </div>

          <SuccessFeeCalculator />
        </div>
      </div>
    </section>
  );
}

export function BlackFridayBonusSection() {
  if (!BLACK_FRIDAY_BONUS_ENABLED) return null;
  return (
    <section className={`${frame} bg-cyan text-black`}>
      <div className={inner}>
        <p className={`${label} text-black/70`}>Black Friday bonus</p>
        <h2 className={`${h2} mt-5 max-w-4xl`}>
          Enroll in the Business Funding Growth Accelerator and receive, at no
          added cost:
        </h2>
        <div className="mt-12 grid sm:grid-cols-2 sm:gap-x-10">
          <div className="border-t border-black/25 py-6">
            <h3 className="text-2xl font-medium tracking-[-0.03em]">
              Dedicated funding strategy consultation
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-black/70">
              A focused session to walk through your readiness and options in
              more depth.
            </p>
          </div>
          <div className="border-t border-black/25 py-6">
            <h3 className="text-2xl font-medium tracking-[-0.03em]">
              Personalized written funding roadmap
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-black/70">
              A written document outlining your funding strategy, yours to keep.
            </p>
          </div>
        </div>
        <p className="mt-4 border-t border-black/25 pt-5 text-xs text-black/65">
          Bonus available for enrollments completed during the Black Friday
          period. Standard program fees and terms still apply.
        </p>
      </div>
    </section>
  );
}
