"use client";

import { REGULAR_PRICE, SALE_PRICE, saleActive } from "@/lib/funnel/config";
import { useNow } from "@/lib/funnel/session";
import { deliverables } from "./FundingOfferSections";
import { label } from "./shared";

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

/** Fee box for the Funding Ready page. Sale pricing follows the configured window. */
export default function FundingReadyOffer() {
  const now = useNow(60_000);
  const sale = now > 0 && saleActive(now);

  return (
    <div className="rounded-[20px] border border-white/15 p-6 sm:p-8">
      <p className={`${label} text-cyan`}>Business Funding Growth Accelerator</p>
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
        <span className="text-[clamp(4rem,10vw,7rem)] leading-none font-medium tracking-[-0.06em]">
          {money(sale ? SALE_PRICE : REGULAR_PRICE)}
        </span>
        {sale ? (
          <>
            <span className="text-3xl text-white/50 line-through">{money(REGULAR_PRICE)}</span>
            <span className="rounded-full bg-cyan px-3 py-1 text-sm font-medium text-black">
              Save {money(REGULAR_PRICE - SALE_PRICE)}
            </span>
          </>
        ) : null}
      </div>
      {sale ? (
        <p className="mt-3 text-sm text-white/75">
          Black Friday price. Ends November 30, 2026 at 11:59 PM Central. After that the price is{" "}
          {money(REGULAR_PRICE)}.
        </p>
      ) : null}

      <ul className="mt-6 grid gap-2.5 text-[15px] leading-relaxed text-white/80">
        <li className="border-t border-white/15 pt-2.5">
          <b className="font-medium text-white">{money(REGULAR_PRICE)}</b> one-time program fee, charged when you sign.
        </li>
        <li className="border-t border-white/15 pt-2.5">
          <b className="font-medium text-white">8%</b> success fee on the first $20,000, only when you&apos;re funded.
        </li>
        <li className="border-t border-white/15 pt-2.5">
          <b className="font-medium text-white">10%</b> success fee on amounts above $20,000, only when you&apos;re
          funded. Both are due within 5 business days after funds are approved and available.
        </li>
        <li className="border-t border-white/15 pt-2.5">
          <b className="font-medium text-white">$29.95/month</b> Credit Hero Score monitoring is required and paid
          directly to Credit Hero Score, not to CREDA BUDDi. CREDA BUDDI LLC is an affiliate of Credit Hero Score.
        </li>
        <li className="border-t border-white/15 pt-2.5">
          <b className="font-medium text-white">$99/month</b> optional credit support. This is separate from Credit
          Hero Score.
        </li>
        <li className="border-t border-white/15 pt-2.5">
          Included in the program: a dedicated funding strategy consultation and a personalized written funding
          roadmap.
        </li>
        <li className="border-t border-white/15 pt-2.5">Funding is not guaranteed. Results vary.</li>
        <li className="border-t border-white/15 pt-2.5 text-white/50">
          Success-fee terms and refund terms: wording pending attorney approval.
        </li>
      </ul>

      <ul className="mt-6 grid sm:grid-cols-2 sm:gap-x-8">
        {deliverables.map((line) => (
          <li key={line} className="border-t border-white/15 py-3 text-[15px] tracking-tight text-white/90">
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}
