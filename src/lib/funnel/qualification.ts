import type { Route } from "./config";

/*
 * Centralized qualification rules (client-specified). Business gates are
 * checked first, then credit readiness. Edit the lists below to change them.
 */

export type Answers = Record<string, string>;

export const QUAL = {
  // A gate FAILS when its condition returns true.
  gatesFailWhen: {
    ein: (a: Answers) => a.hasEin !== "Yes",
    registeredType: (a: Answers) => a.businessType === "Not yet registered",
    operating6Months: (a: Answers) => a.timeInBusiness === "Under 6 months",
    hasRevenue: (a: Answers) => a.annualRevenue === "Pre-revenue",
    bankAccount: (a: Answers) => a.hasBank !== "Yes",
  } as Record<string, (a: Answers) => boolean>,
  weakCreditScores: ["Under 600", "600 to 649", "Not sure"],
  // Pending client approval: "revenue under $150,000" read as the three lowest revenue answers.
  advisorRevenue: ["Pre-revenue", "Under $50,000", "$50,000 to $150,000"],
  advisorAmount: "$250,000+",
};

export type Qualification = {
  route: Route;
  tags: string[];
  failedGates: string[];
  weakCredit: boolean;
};

export function qualify(a: Answers): Qualification {
  const failedGates = Object.keys(QUAL.gatesFailWhen).filter((k) => QUAL.gatesFailWhen[k](a));
  const weakCredit =
    QUAL.weakCreditScores.includes(a.creditRange) ||
    a.negHistory === "Yes" ||
    a.negHistory === "Not sure" ||
    a.bankruptcy === "Yes";
  const route: Route = failedGates.length ? "foundation-first" : weakCredit ? "credit-first" : "ready";

  const tags: string[] = [];
  if (route === "foundation-first" && weakCredit) tags.push("Also Needs Credit Work");
  if (a.hasDebt === "Yes") tags.push("Has Existing Debt");
  if (a.fundingAmount === QUAL.advisorAmount && QUAL.advisorRevenue.includes(a.annualRevenue)) {
    tags.push("Advisor Review");
  }
  return { route, tags, failedGates, weakCredit };
}
