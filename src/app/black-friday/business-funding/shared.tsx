import type { ReactNode } from "react";

/* Shared Aura-style building blocks, used by the landing page and by the
   reusable offer sections in FundingOfferSections.tsx. */

export const frame =
  "mx-2.5 my-2.5 overflow-hidden rounded-[18px] sm:mx-4 sm:my-4 sm:rounded-[22px]";
export const inner = "mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24";
export const label =
  "font-[family-name:var(--font-geist-mono)] text-xs uppercase tracking-[0.2em]";
export const h2 =
  "text-[clamp(2.2rem,5.6vw,4.8rem)] font-medium leading-[0.96] tracking-[-0.055em] text-balance";

export const formAnchorId = "qualification-form";

export function Arrow() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-[18px] w-[18px]">
      <path
        d="M4.5 11.5l7-7M5.5 4.5h6v6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Pill({
  href,
  tone,
  disabled = false,
  external = false,
  children,
}: {
  href: string;
  tone: "cyan" | "black";
  /** Shown but inactive, used while a link has not been provided yet. */
  disabled?: boolean;
  external?: boolean;
  children: ReactNode;
}) {
  const body = tone === "cyan" ? "bg-cyan text-black" : "bg-black text-white";
  const dot = tone === "cyan" ? "bg-black text-cyan" : "bg-cyan text-black";
  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className={`inline-flex items-center gap-4 rounded-full py-1.5 pr-1.5 pl-6 text-base font-medium tracking-tight opacity-50 max-sm:w-full max-sm:justify-between ${body}`}
      >
        {children}
        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${dot}`}>
          <Arrow />
        </span>
      </span>
    );
  }
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex items-center gap-4 rounded-full py-1.5 pr-1.5 pl-6 text-base font-medium tracking-tight transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white max-sm:w-full max-sm:justify-between ${body}`}
    >
      {children}
      <span
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-full transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${dot}`}
      >
        <Arrow />
      </span>
    </a>
  );
}
