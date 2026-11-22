"use client";

import { CREDIT_PLANS_URL, GUIDE_URL } from "@/lib/funnel/config";
import FollowUpButton from "../FollowUpButton";
import ResultShell, { QuestionsLine } from "../ResultShell";
import { Pill, frame, h2, inner, label } from "../shared";

const plans = ["Core", "Pro", "Elite"] as const;

/* No funding pricing and no booking calendar on this page. */
export default function CreditFirstView() {
  return (
      <ResultShell
        tag="Your result · Credit first"
        headline="You're close. Strengthening your credit profile first will make your funding strategy stronger."
        note="Results vary. No guarantees."
      >
        <section className={`${frame} bg-black`}>
          <div className={inner}>
            <p className={`${label} text-cyan`}>Choose your path</p>
            <h2 className={`${h2} mt-5 max-w-3xl`}>Do it yourself, or do it with us.</h2>
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-3 rounded-[20px] border border-white/15 p-6">
                <span className="self-start rounded-full border border-white/35 px-2 py-0.5 font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.2em] text-white/70 uppercase">
                  DIY
                </span>
                <h3 className="text-2xl font-medium tracking-[-0.03em]">Funding Ready in 90 Days</h3>
                <p className="text-[15px] leading-relaxed text-white/60">
                  The CREDA BUDDi Playbook. A paid digital guide you follow on your own.
                </p>
                <div className="mt-auto flex flex-col gap-3 pt-2">
                  <Pill href={GUIDE_URL} tone="cyan" disabled={!GUIDE_URL} external>
                    Get Funding Ready in 90 Days
                  </Pill>
                  {!GUIDE_URL ? (
                    <p className="text-xs text-white/50">Guide link not set yet (NEXT_PUBLIC_GUIDE_URL).</p>
                  ) : null}
                  <FollowUpButton kind="guide">Tell me more about the guide</FollowUpButton>
                </div>
              </div>
              <div className="flex flex-col gap-3 rounded-[20px] border border-white/15 p-6">
                <span className="self-start rounded-full border border-white/35 px-2 py-0.5 font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.2em] text-white/70 uppercase">
                  Do it with us
                </span>
                <h3 className="text-2xl font-medium tracking-[-0.03em]">Core, Pro and Elite credit plans</h3>
                <p className="text-[15px] leading-relaxed text-white/60">
                  Credit education and credit protection plans with the CREDA BUDDi team.
                </p>
                <div className="mt-auto flex flex-col gap-3 pt-2">
                  <Pill href={CREDIT_PLANS_URL} tone="cyan" disabled={!CREDIT_PLANS_URL} external>
                    See My Credit Plans
                  </Pill>
                  {!CREDIT_PLANS_URL ? (
                    <p className="text-xs text-white/50">Credit plans link not set yet (NEXT_PUBLIC_CREDIT_PLANS_URL).</p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${frame} bg-black`}>
          <div className={inner}>
            <p className={`${label} text-cyan`}>Credit education and protection plans</p>
            <h2 className={`${h2} mt-5 max-w-3xl`}>Core, Pro and Elite.</h2>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {plans.map((name) => (
                <div key={name} className="flex flex-col gap-3 rounded-[20px] border border-white/15 p-6">
                  <span className="self-start rounded-full border border-white/35 px-2 py-0.5 font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.2em] text-white/70 uppercase">
                    Draft
                  </span>
                  <h3 className="text-2xl font-medium tracking-[-0.03em]">{name}</h3>
                  <p className="mt-auto border-t border-dashed border-white/25 pt-3 text-[13px] text-white/50">
                    Inclusions and pricing to be added.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`${frame} bg-cyan text-black`}>
          <div className={inner}>
            <p className={`${label} text-black/70`}>DIY guide</p>
            <h2 className={`${h2} mt-5 max-w-3xl`}>
              Funding Ready in 90 Days (the CREDA BUDDi Playbook).
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-snug tracking-tight text-black/75">
              A paid digital guide with educational content on getting your credit profile ready for funding.
            </p>
            <p className="mt-6 border-t border-black/25 pt-4 text-xs text-black/65">
              Educational content. Results vary. No guarantees. Not legal, tax or financial advice.
            </p>
          </div>
        </section>

        <section className={`${frame} bg-black`}>
          <div className={`${inner} py-10 sm:py-12`}>
            <QuestionsLine />
          </div>
        </section>
      </ResultShell>
  );
}
