"use client";

import { SALE_END } from "@/lib/funnel/config";
import { useNow } from "@/lib/funnel/session";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/**
 * Persistent, real-time countdown to SALE_END. Always derived from the
 * actual clock (useNow ticks every second from Date.now()), so it never
 * resets on refresh and never runs ahead or behind the real deadline.
 * Renders an expired message once the deadline has passed.
 */
export default function CountdownTimer() {
  const now = useNow(1000);
  const end = Date.parse(SALE_END);

  // 0 before hydration (server/first paint) — render nothing rather than a
  // misleading value.
  if (now === 0) return null;

  const ms = end - now;

  if (ms <= 0) {
    return (
      <p
        role="status"
        className="font-[family-name:var(--font-geist-mono)] text-sm text-white/60"
      >
        This Black Friday offer has ended. The regular price now applies.
      </p>
    );
  }

  const days = Math.floor(ms / 864e5);
  const hours = Math.floor((ms % 864e5) / 36e5);
  const minutes = Math.floor((ms % 36e5) / 6e4);
  const seconds = Math.floor((ms % 6e4) / 1e3);

  return (
    <p
      role="status"
      aria-live="off"
      className="font-[family-name:var(--font-geist-mono)] text-sm tabular-nums text-cyan motion-reduce:tracking-normal"
    >
      Offer ends in {days}d {pad(hours)}h {pad(minutes)}m {pad(seconds)}s (November 30, 2026, 11:59 PM Central)
    </p>
  );
}
