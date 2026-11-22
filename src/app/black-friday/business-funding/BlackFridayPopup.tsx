"use client";

import { useCallback, useEffect, useState } from "react";
import {
  REGULAR_PRICE,
  SALE_END,
  SALE_PRICE,
  SPECIAL_TEXT,
  saleActive,
  specialActive,
} from "@/lib/funnel/config";
import { useNow } from "@/lib/funnel/session";

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

const SPARKS = [
  "top-[14%] left-[8%] text-base",
  "top-[30%] right-[12%] text-xl [animation-delay:0.7s]",
  "bottom-[26%] left-[6%] text-xs [animation-delay:1.4s]",
  "bottom-[12%] right-[9%] text-base [animation-delay:2.1s]",
  "top-[8%] right-[30%] text-xs text-cyan [animation-delay:2.8s]",
];

/**
 * Black Friday Funding Offer Pop Up. Rendered only on the Funding Ready page,
 * once per visit, never again after it is dismissed, only inside the sale window.
 */
export default function BlackFridayPopup() {
  const [open, setOpen] = useState(false);
  const now = useNow(1000);

  const close = useCallback((dismiss: boolean) => {
    setOpen(false);
    if (dismiss) {
      try {
        localStorage.setItem("ppDismissed", "1");
      } catch {
        /* ignore */
      }
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!saleActive(Date.now())) return;
      try {
        if (localStorage.getItem("ppDismissed") === "1") return;
        if (sessionStorage.getItem("ppShown") === "1") return;
        sessionStorage.setItem("ppShown", "1");
      } catch {
        /* storage blocked: show once for this page view */
      }
      setOpen(true);
    }, 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(true);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open) return null;

  const ms = Date.parse(SALE_END) - now;
  const countdown =
    now > 0 && ms > 0
      ? `Ends in ${Math.floor(ms / 864e5)}d ${Math.floor((ms % 864e5) / 36e5)}h ${Math.floor((ms % 36e5) / 6e4)}m ${Math.floor((ms % 6e4) / 1e3)}s (Central Time)`
      : "";

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Black Friday Funding Offer"
      onClick={(e) => {
        if (e.target === e.currentTarget) close(true);
      }}
    >
      <div className="relative w-full max-w-[520px] overflow-hidden rounded-[22px] border border-[#e8c26a] bg-[radial-gradient(120%_90%_at_50%_0%,#0f2a30_0%,#06090d_70%)] p-8 text-white shadow-[0_0_40px_rgba(59,176,207,0.25)]">
        <button
          type="button"
          onClick={() => close(true)}
          aria-label="Close offer"
          className="absolute top-2.5 right-3.5 h-10 w-10 rounded-full text-3xl leading-none text-white hover:bg-white/10"
        >
          ×
        </button>
        {SPARKS.map((cls) => (
          <span
            key={cls}
            aria-hidden="true"
            className={`pointer-events-none absolute text-[#e8c26a] motion-safe:animate-[twinkle_3.6s_ease-in-out_infinite] ${cls}`}
          >
            ✦
          </span>
        ))}

        <p className="font-[family-name:var(--font-geist-mono)] text-xs tracking-[0.2em] text-[#e8c26a] uppercase">
          Black Friday Funding Offer
        </p>
        <p className="mt-3 flex flex-wrap items-baseline gap-x-4 text-[clamp(3.4rem,14vw,5.4rem)] leading-none font-medium tracking-[-0.06em]">
          <s className="text-[0.38em] tracking-tight text-white/55">{money(REGULAR_PRICE)}</s>
          <b className="font-medium text-[#e8c26a] [text-shadow:0_0_18px_rgba(232,194,106,0.55),0_0_40px_rgba(59,176,207,0.35)]">
            {money(SALE_PRICE)}
          </b>
        </p>
        <p className="mt-2 inline-block rounded-full bg-[#e8c26a] px-3 py-1 text-sm font-medium text-black">
          Save {money(REGULAR_PRICE - SALE_PRICE)}
        </p>
        {countdown ? (
          <p className="mt-3.5 font-[family-name:var(--font-geist-mono)] text-[13px] text-cyan tabular-nums">
            {countdown}
          </p>
        ) : null}
        <p className="mt-3 text-[15px] leading-normal text-white/90">
          Book your Funding Strategy Call by November 30 and enroll within 3 days of your call to lock in this price.
        </p>
        {specialActive(now) ? <p className="mt-3 text-sm font-medium text-[#e8c26a]">{SPECIAL_TEXT}</p> : null}
        <button
          type="button"
          onClick={() => {
            close(true);
            document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="mt-6 w-full rounded-full bg-[#e8c26a] px-7 py-4 text-sm font-medium text-black transition hover:brightness-110"
        >
          Book My Funding Strategy Call
        </button>
      </div>
    </div>
  );
}
