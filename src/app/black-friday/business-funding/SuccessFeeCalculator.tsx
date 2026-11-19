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
    <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
      <h3 className="text-base font-semibold text-navy sm:text-lg">
        Success fee calculator
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
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
                ? "border-blue bg-blue text-white"
                : "border-border bg-white text-navy hover:border-blue/40"
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
          className="w-full accent-blue"
        />
        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Funding amount</span>
          <span className="font-semibold text-navy">
            {formatCurrency(amount)}
          </span>
        </div>
      </div>

      <div className="mt-6 space-y-2 border-t border-border pt-5 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">
            8% on first $20,000
          </span>
          <span className="font-medium text-navy">
            {formatCurrency(firstTier)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">
            10% on amount over $20,000
          </span>
          <span className="font-medium text-navy">
            {formatCurrency(secondTier)}
          </span>
        </div>
        <div className="flex items-center justify-between border-t border-border pt-3">
          <span className="font-semibold text-navy">Total success fee</span>
          <span className="text-lg font-bold text-blue">
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        No funding, no success fee. Funding is not guaranteed; approvals,
        amounts and terms are set by lenders.
      </p>
    </div>
  );
}
