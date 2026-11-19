"use client";

import { useMemo, useState } from "react";

const PRESETS = [15000, 20000, 50000, 100000, 150000];

function formatCurrency(amount: number) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export default function SuccessFeeCalculator() {
  const [amount, setAmount] = useState(50000);

  const { firstTier, secondTier, total } = useMemo(() => {
    const firstPortion = Math.min(amount, 20000);
    const secondPortion = Math.max(amount - 20000, 0);
    const firstFee = firstPortion * 0.08;
    const secondFee = secondPortion * 0.1;
    return {
      firstTier: firstFee,
      secondTier: secondFee,
      total: firstFee + secondFee,
    };
  }, [amount]);

  return (
    <div className="rounded-[20px] border border-white/20 p-6 text-white sm:p-8">
      <h3 className="text-lg font-medium tracking-tight text-white sm:text-xl">
        Success fee calculator
      </h3>
      <p className="mt-1 text-sm text-white/60">
        Estimate your success fee. Due within 5 business days after funds are
        approved and available.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => setAmount(preset)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
              amount === preset
                ? "border-cyan bg-cyan text-black"
                : "border-white/25 text-white hover:border-white"
            }`}
          >
            {formatCurrency(preset)}
          </button>
        ))}
      </div>

      <div className="mt-5">
        <label htmlFor="funding-amount-range" className="sr-only">
          Funding amount
        </label>
        <input
          id="funding-amount-range"
          type="range"
          min={1000}
          max={250000}
          step={1000}
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
          className="w-full accent-cyan"
        />
        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-white/60">Funding amount</span>
          <span className="font-medium text-white">
            {formatCurrency(amount)}
          </span>
        </div>
      </div>

      <div className="mt-6 space-y-2 border-t border-white/15 pt-5 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-white/60">
            8% on first $20,000
          </span>
          <span className="font-medium text-white">
            {formatCurrency(firstTier)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white/60">
            10% on amount over $20,000
          </span>
          <span className="font-medium text-white">
            {formatCurrency(secondTier)}
          </span>
        </div>
        <div className="flex items-center justify-between border-t border-white/15 pt-3">
          <span className="font-medium text-white">Total success fee</span>
          <span className="text-xl font-medium text-cyan">
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      <p className="mt-4 text-xs text-white/50">
        No funding, no success fee. Funding is not guaranteed; approvals,
        amounts and terms are set by lenders.
      </p>
    </div>
  );
}
