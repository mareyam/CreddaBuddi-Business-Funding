import type { Metadata } from "next";
import Image from "next/image";
import QualificationForm from "./QualificationForm";
import FAQAccordion from "./FAQAccordion";
import SuccessFeeCalculator from "./SuccessFeeCalculator";

export const metadata: Metadata = {
  title: "Business Funding Growth Accelerator | CREDA BUDDi",
  description:
    "Get a clearer plan for pursuing the capital your business needs to grow. Funding readiness, lender matching and a personalized funding strategy from CREDA BUDDi.",
};

const LOGO_SRC =
  "https://assets.cdn.filesafe.space/WngHsAfzZPxeecb7veIn/media/6ad8322cf9a985d42c4e4d7b.webp";
const MASCOT_SRC =
  "https://assets.cdn.filesafe.space/WngHsAfzZPxeecb7veIn/media/6ad82defcd7225ed37242428.png";

// Set to false to hide the Black Friday bonus section. Only keep this
// enabled while the bonus (strategy consultation + written roadmap) is
// genuinely additional to the standard program and can be fulfilled.
const BLACK_FRIDAY_BONUS_ENABLED = true;

const included = [
  {
    title: "Funding Readiness Assessment",
    body: "Understand your business's current funding readiness and identify areas that may need attention before you apply.",
    icon: "gauge",
  },
  {
    title: "Lender Matching",
    body: "Explore potential lenders and funding options that may align with your business profile and goals.",
    icon: "network",
  },
  {
    title: "Application Guidance",
    body: "Get guidance on preparing documentation and approaching the application process with more confidence.",
    icon: "document",
  },
  {
    title: "Optional Credit Profile Analysis",
    body: "Understand how your personal and business credit profile may affect your funding strategy.",
    icon: "shield",
  },
  {
    title: "Personalized Funding Strategy",
    body: "Develop a clearer approach based on your specific business circumstances and growth goals.",
    icon: "compass",
  },
  {
    title: "Business Foundation Review",
    body: "A look at your business credit foundation — EIN, D-U-N-S®, structure — and what may need strengthening first.",
    icon: "building",
  },
] as const;

const steps = [
  {
    number: "01",
    title: "Check Your Business Readiness",
    body: "Submit a short qualification form so we can understand where your business stands today.",
  },
  {
    number: "02",
    title: "Understand Your Funding Position",
    body: "We review your business and credit profile to clarify your current funding readiness.",
  },
  {
    number: "03",
    title: "Identify Potential Funding Opportunities",
    body: "We match you with lenders and funding options that may align with your business profile.",
  },
  {
    number: "04",
    title: "Pursue Funding With Strategic Guidance",
    body: "You move forward with application guidance and a personalized funding strategy in hand.",
  },
] as const;

const problems = [
  "Applying to lenders without understanding their eligibility requirements",
  "Not knowing which funding options actually fit your business",
  "Having incomplete or disorganized business documentation",
  "Approaching lenders that were never a good fit to begin with",
  "Making funding decisions without a clear, strategic plan",
];

const faqAnchorId = "qualification-form";

function IconBadge({ icon }: { icon: (typeof included)[number]["icon"] }) {
  const paths: Record<(typeof included)[number]["icon"], React.ReactNode> = {
    gauge: (
      <path
        d="M12 13a2 2 0 1 0 0 .01M12 13l3.5-4.5M4.2 17a9 9 0 1 1 15.6 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
    network: (
      <path
        d="M12 5v4m0 0-5 4m5-4 5 4M7 13v3a2 2 0 0 0 2 2h1m4-5v3a2 2 0 0 1-2 2h-1m0 0v2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
    document: (
      <path
        d="M8 4h5l4 4v12a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm5 0v4h4M9 13h6m-6 4h6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
    shield: (
      <path
        d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Zm-3 9 2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
    compass: (
      <>
        <circle
          cx="12"
          cy="12"
          r="8.5"
          stroke="currentColor"
          strokeWidth="1.6"
          fill="none"
        />
        <path
          d="M15 9l-2 6-4 2 2-6 4-2Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
          fill="none"
        />
      </>
    ),
    building: (
      <path
        d="M4 21V7l6-3 6 3v14M4 21h16M10 11h0m4 0h0m-4 4h0m4 0h0M9 21v-4h6v4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  };

  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue/10 text-blue">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        {paths[icon]}
      </svg>
    </div>
  );
}

export default function BusinessFundingLandingPage() {
  return (
    <div className="bg-ice">
      {/* ---------- Header ---------- */}
      <header className="sticky top-0 z-40 border-b border-navy/5 bg-ice/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
          <a href="https://credabuddi.com/" className="flex items-center gap-2">
            <Image
              src={LOGO_SRC}
              alt="CREDA BUDDi"
              width={160}
              height={50}
              className="h-9 w-auto"
              priority
            />
          </a>
          <a
            href={`#${faqAnchorId}`}
            className="hidden rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-light sm:inline-flex"
          >
            Check My Readiness
          </a>
        </div>
      </header>

      <main>
        {/* ---------- Hero ---------- */}
        <section className="relative overflow-hidden bg-navy text-white">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(60% 50% at 85% 10%, oklch(42.6% 0.212 262.87 / 0.55), transparent), radial-gradient(45% 40% at 10% 90%, oklch(67.8% 0.1174 210.13 / 0.35), transparent)",
            }}
            aria-hidden="true"
          />
          <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-gold uppercase">
                Business Funding Growth Accelerator
              </span>
              <h1 className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.75rem]">
                Your Business Is Ready for Its Next Move.
                <br className="hidden sm:block" /> Is Your Funding Strategy?
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                Stop guessing which lenders to approach. Get a clearer plan
                for pursuing the capital your business needs to grow.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={`#${faqAnchorId}`}
                  className="inline-flex items-center gap-2 rounded-full bg-cyan px-7 py-3.5 text-sm font-semibold text-navy shadow-[0_10px_30px_-10px_oklch(67.8%_0.1174_210.13/0.7)] transition hover:brightness-105"
                >
                  Check My Business Funding Readiness
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M3 8h10m0 0L9 4m4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <span className="text-sm text-white/60">
                  Starting at <span className="font-semibold text-white">$2,497</span>
                </span>
              </div>

              <p className="mt-6 text-xs text-white/45">
                Success fee of 8% on the first $20,000 funded and 10% above
                that, only if you&apos;re funded. Results vary. No
                guarantees.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-sm animate-fade-up [animation-delay:150ms] lg:max-w-none">
              <div className="relative rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-sm sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wide text-white/50">
                    Funding Readiness
                  </span>
                  <span className="rounded-full bg-cyan/15 px-2.5 py-1 text-[11px] font-semibold text-cyan">
                    In progress
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  {[
                    { label: "Business foundation", pct: 82 },
                    { label: "Credit profile", pct: 64 },
                    { label: "Lender fit", pct: 47 },
                  ].map((row) => (
                    <div key={row.label}>
                      <div className="flex items-center justify-between text-xs text-white/70">
                        <span>{row.label}</span>
                        <span>{row.pct}%</span>
                      </div>
                      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue to-cyan"
                          style={{ width: `${row.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white/5 p-3.5">
                  <Image
                    src={MASCOT_SRC}
                    alt=""
                    width={44}
                    height={44}
                    className="h-11 w-11 shrink-0 rounded-xl object-cover"
                  />
                  <p className="text-xs leading-relaxed text-white/70">
                    A personalized funding strategy, built around where your
                    business stands today.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Problem ---------- */}
        <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue">
              The Challenge
            </p>
            <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">
              Most business owners apply too early, with the wrong strategy.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {problems.map((problem) => (
              <div
                key={problem}
                className="flex items-start gap-3 rounded-xl border border-border bg-white p-4"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy/5 text-navy">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path
                      d="M3 3l6 6M9 3l-6 6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <p className="text-sm leading-relaxed text-navy/80">{problem}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- Solution intro ---------- */}
        <section className="bg-navy-deep text-white">
          <div className="mx-auto max-w-5xl px-5 py-16 text-center sm:px-8 sm:py-20">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan">
              The Solution
            </p>
            <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-bold sm:text-3xl">
              A structured path to a clearer funding strategy.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70">
              The Business Funding Growth Accelerator gives you a
              personalized look at your readiness, matches you with lenders
              and options that may fit your business, and walks you through
              the application process with real guidance — not guesswork.
            </p>
          </div>
        </section>

        {/* ---------- What's Included ---------- */}
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue">
              What&apos;s Included
            </p>
            <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">
              Everything built around your funding readiness.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {included.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-white p-6 transition hover:border-blue/30 hover:shadow-md"
              >
                <IconBadge icon={item.icon} />
                <h3 className="mt-4 text-base font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- How It Works ---------- */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue">
                How It Works
              </p>
              <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">
                Four steps from uncertain to strategic.
              </h2>
            </div>

            <div className="relative mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div
                className="absolute top-6 right-0 left-0 hidden h-px bg-border lg:block"
                aria-hidden="true"
              />
              {steps.map((step) => (
                <div key={step.number} className="relative">
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                    {step.number}
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-navy">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <a
                href={`#${faqAnchorId}`}
                className="inline-flex items-center gap-2 rounded-full bg-blue px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_oklch(42.6%_0.212_262.87/0.6)] transition hover:brightness-110"
              >
                Check My Business Funding Readiness
              </a>
            </div>
          </div>
        </section>

        {/* ---------- Why CREDA BUDDi ---------- */}
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-blue">
                Why CREDA BUDDi
              </p>
              <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">
                Credit and funding guidance in one system — not a one-time
                conversation.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                CREDA BUDDi connects personal credit education, business
                credit development and funding readiness into a single,
                online process — with a secure client portal, a written
                strategy, and real team support during business hours
                (Monday–Friday, 9 AM–5 PM Central).
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  "Online enrollment and a secure client portal",
                  "A written funding strategy, yours to keep",
                  "Business foundation review before you apply",
                  "Real team support, not an automated chatbot",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3 text-sm text-navy/80">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan/15 text-cyan">
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path
                          d="M2.5 6.5l2.2 2.2L9.5 3.5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {line}
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-xs text-muted-foreground">
                Results vary. No guarantees.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <Image
                  src={MASCOT_SRC}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-xl object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-navy">
                    CREDA BUDDi client portal
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Example message from the CREDA BUDDi team
                  </p>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-sm text-navy">
                  What do lenders look at first when reviewing a business for
                  funding?
                </div>
                <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-blue px-4 py-3 text-sm text-white">
                  Your business foundation and credit profile first —
                  we&apos;ll walk through your readiness assessment together.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Pricing ---------- */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue">
                Program Pricing
              </p>
              <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">
                Transparent pricing. No hidden fees.
              </h2>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
              <div className="rounded-3xl border border-navy/10 bg-navy p-7 text-white sm:p-9">
                <p className="text-sm font-semibold text-cyan">
                  Business Funding Program
                </p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-bold">$2,497</span>
                  <span className="text-sm text-white/60">one-time fee</span>
                </div>
                <p className="mt-2 text-sm text-white/60">
                  Charged when you sign. Cancel within 3 business days for a
                  full refund.
                </p>

                <ul className="mt-6 space-y-3 text-sm text-white/85">
                  {[
                    "Funding strategy call",
                    "Personal and business credit analysis",
                    "Business foundation review",
                    "D-U-N-S® and business credit file setup",
                    "Net-30 vendor tradeline roadmap",
                    "Lender-ready document package",
                    "Strategic application sequencing",
                    "Guidance through your funding rounds",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2.5">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                      {line}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 rounded-xl bg-white/5 p-4 text-xs leading-relaxed text-white/60">
                  Success fee only when you&apos;re funded: 8% on the first
                  $20,000 and 10% above that, due within 5 business days
                  after funds are approved and available. Credit Hero Score
                  monitoring is required: $29.95/month, paid directly to
                  Credit Hero Score, not to CREDA BUDDi. Results vary. No
                  guarantees.
                </div>

                <a
                  href={`#${faqAnchorId}`}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-cyan px-6 py-3.5 text-sm font-semibold text-navy transition hover:brightness-105"
                >
                  Check My Business Funding Readiness
                </a>
              </div>

              <SuccessFeeCalculator />
            </div>
          </div>
        </section>

        {/* ---------- Black Friday Bonus ---------- */}
        {BLACK_FRIDAY_BONUS_ENABLED ? (
          <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
            <div className="rounded-3xl border border-gold/30 bg-gradient-to-br from-navy to-navy-deep p-8 text-white sm:p-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-gold">
                Black Friday Bonus
              </span>
              <h2 className="mt-4 text-xl font-bold sm:text-2xl">
                Enroll in the Business Funding Growth Accelerator and
                receive, at no added cost:
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">
                    Dedicated funding strategy consultation
                  </p>
                  <p className="mt-1 text-xs text-white/65">
                    A focused session to walk through your readiness and
                    options in more depth.
                  </p>
                </div>
                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">
                    Personalized written funding roadmap
                  </p>
                  <p className="mt-1 text-xs text-white/65">
                    A written document outlining your funding strategy,
                    yours to keep.
                  </p>
                </div>
              </div>
              <p className="mt-6 text-xs text-white/50">
                Bonus available for enrollments completed during the Black
                Friday period. Standard program fees and terms still apply.
              </p>
            </div>
          </section>
        ) : null}

        {/* ---------- Qualification Form ---------- */}
        <section id={faqAnchorId} className="bg-white">
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue">
                Get Started
              </p>
              <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">
                Check your business funding readiness.
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Tell us a bit about your business. A member of the CREDA
                BUDDi team will follow up to discuss your funding strategy.
              </p>
            </div>

            <div className="mt-10">
              <QualificationForm />
            </div>
          </div>
        </section>

        {/* ---------- FAQ ---------- */}
        <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue">
              FAQ
            </p>
            <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">
              Questions, answered.
            </h2>
          </div>
          <div className="mt-10">
            <FAQAccordion />
          </div>
        </section>

        {/* ---------- Final CTA ---------- */}
        <section className="bg-navy text-white">
          <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-24">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Stop Guessing. Start Building Your Funding Strategy.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70">
              Understand where your business stands and take a more
              strategic approach to pursuing funding.
            </p>
            <a
              href={`#${faqAnchorId}`}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan px-8 py-4 text-sm font-semibold text-navy shadow-[0_10px_30px_-10px_oklch(67.8%_0.1174_210.13/0.7)] transition hover:brightness-105"
            >
              Check My Business Funding Readiness
            </a>
          </div>
        </section>
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="border-t border-navy/10 bg-ice">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row">
            <div>
              <Image
                src={LOGO_SRC}
                alt="CREDA BUDDi"
                width={140}
                height={44}
                className="h-8 w-auto"
              />
              <p className="mt-3 max-w-xs text-sm text-muted-foreground">
                Your Credit. Our Support. A Brighter Future.
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold text-navy">Contact</p>
              <p className="mt-2">info@credabuddi.com</p>
              <p>credabuddi.com</p>
              <p>Monday to Friday, 9:00 AM to 5:00 PM Central</p>
            </div>
          </div>

          <div className="mt-10 space-y-2 border-t border-navy/10 pt-6 text-xs leading-relaxed text-muted-foreground">
            <p>
              Results vary. No guarantees. Funding is not guaranteed;
              approvals, amounts and terms are set by lenders.
            </p>
            <p>
              Business Funding Program: $2,497 one-time fee, charged when you
              sign. Cancel within 3 business days for a full refund. Success
              fee, only when you&apos;re funded: 8% on the first $20,000 and
              10% on amounts above that, due within 5 business days after
              funds are approved and available.
            </p>
            <p>
              Credit Hero Score monitoring is required: $29.95/month, paid
              directly to Credit Hero Score, not to CREDA BUDDi.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
