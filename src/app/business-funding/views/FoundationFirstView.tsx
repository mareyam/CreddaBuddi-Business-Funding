"use client";

import { GUIDE_URL } from "@/lib/funnel/config";
import FollowUpButton from "../FollowUpButton";
import ResultShell, { QuestionsLine } from "../ResultShell";
import { Pill, frame, h2, inner, label } from "../shared";

const foundation = [
  ["EIN", "A federal tax ID for your business, so lenders can identify it."],
  ["Business structure", "A registered entity such as an LLC or corporation."],
  ["Business bank account", "A separate account for business income and expenses."],
  ["D-U-N-S®", "A D-U-N-S Number so your business can have a business credit file."],
  ["Net-30 vendor accounts", "Vendor accounts that report payments and build business credit history."],
] as const;

/* No funding pricing and no booking calendar on this page. */
export default function FoundationFirstView() {
  return (
      <ResultShell
        tag="Your result · Foundation first"
        headline="Let's build the foundation lenders look for first."
        note="Results vary. No guarantees."
      >
        <section className={`${frame} bg-black`}>
          <div className={inner}>
            <p className={`${label} text-cyan`}>The foundation</p>
            <h2 className={`${h2} mt-5 max-w-3xl`}>Five things to put in place.</h2>
            <ul className="mt-12">
              {foundation.map(([title, body]) => (
                <li
                  key={title}
                  className="grid gap-2 border-t border-white/15 py-6 last:border-b sm:grid-cols-[1fr_1.2fr] sm:gap-8"
                >
                  <h3 className="text-2xl font-medium tracking-[-0.03em] sm:text-3xl">{title}</h3>
                  <p className="text-base leading-relaxed text-white/60">{body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={`${frame} bg-black`}>
          <div className={inner}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-3 rounded-[20px] border border-white/15 p-6">
                <span className="self-start rounded-full border border-white/35 px-2 py-0.5 font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.2em] text-white/70 uppercase">
                  DIY
                </span>
                <h3 className="text-2xl font-medium tracking-[-0.03em]">Funding Ready in 90 Days</h3>
                <p className="text-[15px] leading-relaxed text-white/60">
                  The CREDA BUDDi Playbook. A paid digital guide. Educational content. Results vary. No guarantees.
                </p>
                <div className="mt-auto flex flex-col gap-3 pt-2">
                  <Pill href={GUIDE_URL} tone="cyan" disabled={!GUIDE_URL} external>
                    Get the playbook
                  </Pill>
                  {!GUIDE_URL ? (
                    <p className="text-xs text-white/50">Guide link not set yet (NEXT_PUBLIC_GUIDE_URL).</p>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col gap-3 rounded-[20px] border border-white/15 p-6">
                <span className="self-start rounded-full border border-white/35 px-2 py-0.5 font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.2em] text-white/70 uppercase">
                  Offer
                </span>
                <h3 className="text-2xl font-medium tracking-[-0.03em]">Business Foundation offer</h3>
                <p className="mt-auto border-t border-dashed border-white/25 pt-3 text-[13px] text-white/50">
                  Offer details to be added.
                </p>
                <FollowUpButton kind="foundation-notify">Notify Me</FollowUpButton>
              </div>
            </div>
            <p className="mt-10 max-w-2xl text-[15px] leading-relaxed text-white/80">
              We will also email you this checklist, so you can work through it at your own pace.
            </p>
            <div className="mt-6">
              <QuestionsLine />
            </div>
          </div>
        </section>
      </ResultShell>
  );
}
