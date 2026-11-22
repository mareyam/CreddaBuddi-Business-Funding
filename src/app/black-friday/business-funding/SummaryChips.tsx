"use client";

import { useFunnel } from "./funnel-context";

export default function SummaryChips() {
  const { summary } = useFunnel();
  if (!summary.length) return null;
  return (
    <ul className="mt-7 flex flex-wrap gap-2">
      {summary.map((t) => (
        <li key={t} className="rounded-full border border-white/25 px-3.5 py-1.5 text-[13px] text-white/85">
          {t}
        </li>
      ))}
    </ul>
  );
}
