import type { Metadata } from "next";
import Image from "next/image";
import AuraHero from "./AuraHero";
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

const formAnchorId = "qualification-form";

const included = [
  {
    title: "Funding Readiness Assessment",
    body: "Understand your business's current funding readiness and identify areas that may need attention before you apply.",
  },
  {
    title: "Lender Matching",
    body: "Explore potential lenders and funding options that may align with your business profile and goals.",
  },
  {
    title: "Application Guidance",
    body: "Get guidance on preparing documentation and approaching the application process with more confidence.",
  },
  {
    title: "Optional Credit Profile Analysis",
    body: "Understand how your personal and business credit profile may affect your funding strategy.",
  },
  {
    title: "Personalized Funding Strategy",
    body: "Develop a clearer approach based on your specific business circumstances and growth goals.",
  },
  {
    title: "Business Foundation Review",
    body: "A look at your business credit foundation — EIN, D-U-N-S®, structure — and what may need strengthening first.",
  },
] as const;

const steps = [
  {
    title: "Check Your Business Readiness",
    body: "Submit a short qualification form so we can understand where your business stands today.",
  },
  {
    title: "Understand Your Funding Position",
    body: "We review your business and credit profile to clarify your current funding readiness.",
  },
  {
    title: "Identify Potential Funding Opportunities",
    body: "We match you with lenders and funding options that may align with your business profile.",
  },
  {
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

const deliverables = [
  "Funding strategy call",
  "Personal and business credit analysis",
  "Business foundation review",
  "D-U-N-S® and business credit file setup",
  "Net-30 vendor tradeline roadmap",
  "Lender-ready document package",
  "Strategic application sequencing",
  "Guidance through your funding rounds",
];

/* ---------- shared Aura-style building blocks ---------- */

const frame =
  "mx-2.5 my-2.5 overflow-hidden rounded-[18px] sm:mx-4 sm:my-4 sm:rounded-[22px]";
const inner = "mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24";
const label =
  "font-[family-name:var(--font-geist-mono)] text-xs uppercase tracking-[0.2em]";
const h2 =
  "text-[clamp(2.2rem,5.6vw,4.8rem)] font-medium leading-[0.96] tracking-[-0.055em] text-balance";

function Arrow() {
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

function Pill({
  href,
  tone,
  children,
}: {
  href: string;
  tone: "cyan" | "black";
  children: React.ReactNode;
}) {
  const body = tone === "cyan" ? "bg-cyan text-black" : "bg-black text-white";
  const dot = tone === "cyan" ? "bg-black text-cyan" : "bg-cyan text-black";
  return (
    <a
      href={href}
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

/** Radial burst of strokes, the same visual language as the hero field. */
function StrokeIcon({ index }: { index: number }) {
  const n = 6 + ((index * 2) % 8);
  const lines = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 + index * 0.4;
    const r1 = 8 + (i % 2) * 5;
    return {
      x1: 32 + Math.cos(a) * r1,
      y1: 32 + Math.sin(a) * r1,
      x2: 32 + Math.cos(a) * 24,
      y2: 32 + Math.sin(a) * 24,
    };
  });
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14 shrink-0" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="1.4" opacity="0.5" />
      {lines.map((l, i) => (
        <line
          key={i}
          {...l}
          stroke="currentColor"
          strokeWidth={1 + (i % 3) * 0.6}
        />
      ))}
    </svg>
  );
}

/** Static fan of strokes, thin on the left and heavy on the right. */
function StrokeFan() {
  const cols = 7;
  const rows = 7;
  const sp = 440 / (cols - 1);
  const items = [];
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const t = i / (cols - 1);
      const a = -0.8 - 2.95 * t;
      const cx = 40 + i * sp;
      const cy = 40 + j * sp;
      const h = sp * 0.5;
      items.push(
        <line
          key={`${i}-${j}`}
          x1={cx - Math.cos(a) * h}
          y1={cy - Math.sin(a) * h}
          x2={cx + Math.cos(a) * h}
          y2={cy + Math.sin(a) * h}
          stroke="#fff"
          strokeWidth={1.2 + t * 5.5}
          strokeLinecap="butt"
        />,
      );
    }
  }
  return (
    <svg viewBox="0 0 520 520" className="h-full w-full" aria-hidden="true">
      {items}
    </svg>
  );
}

export default function BusinessFundingLandingPage() {
  return (
    <div className="bg-[#0b0d12] font-[family-name:var(--font-geist)] text-white">
      <main>
        <AuraHero />

        {/* ---------- Problem ---------- */}
        <section className={`${frame} bg-black text-white`}>
          <div className={`${inner} grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16`}>
            <div>
              <p className={`${label} text-cyan`}>The challenge</p>
              <h2 className={`${h2} mt-5`}>
                Most business owners apply too early, with the wrong strategy.
              </h2>
            </div>
            <ul className="self-end">
              {problems.map((problem, i) => (
                <li
                  key={problem}
                  className="grid grid-cols-[44px_1fr] gap-3 border-t border-white/15 py-5 last:border-b"
                >
                  <span className={`${label} pt-1.5 text-white/50`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg leading-snug tracking-tight text-white/90 sm:text-xl">
                    {problem}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- Solution ---------- */}
        <section className={`${frame} bg-black text-white`}>
          <div className={inner}>
            <p className={`${label} text-cyan`}>The solution</p>
            <h2 className={`${h2} mt-5 max-w-4xl`}>
              A structured path to a clearer funding strategy.
            </h2>
            <p className="mt-10 max-w-5xl text-[clamp(1.5rem,3.2vw,2.8rem)] leading-[1.08] tracking-[-0.04em] text-white/40">
              The Business Funding Growth Accelerator gives you a{" "}
              <span className="text-white">personalized look at your readiness</span>
              , matches you with{" "}
              <span className="text-white">lenders and options that may fit your business</span>
              , and walks you through the application process with{" "}
              <span className="text-white">real guidance</span> — not guesswork.
            </p>
          </div>
        </section>

        {/* ---------- What's included ---------- */}
        <section className={`${frame} bg-black text-white`}>
          <div className={inner}>
            <p className={`${label} text-cyan`}>What&apos;s included</p>
            <h2 className={`${h2} mt-5 max-w-3xl`}>
              Everything built around your funding readiness.
            </h2>
            <ul className="mt-14">
              {included.map((item, i) => (
                <li
                  key={item.title}
                  className="grid items-start gap-4 border-t border-white/15 py-7 last:border-b sm:grid-cols-[72px_1fr_1.1fr] sm:gap-8"
                >
                  <span className="text-white/90">
                    <StrokeIcon index={i} />
                  </span>
                  <h3 className="text-2xl leading-tight font-medium tracking-[-0.03em] sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="text-base leading-relaxed text-white/60 sm:pt-1.5">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- How it works ---------- */}
        <section className={`${frame} grid lg:grid-cols-2`}>
          <div className="bg-cyan px-5 py-14 text-black sm:px-10 sm:py-20">
            <p className={`${label} text-black/70`}>How it works</p>
            <h2 className={`${h2} mt-5`}>Four steps from uncertain to strategic.</h2>
            <ol className="mt-12">
              {steps.map((step, i) => (
                <li
                  key={step.title}
                  className="grid grid-cols-[44px_1fr] gap-3 border-t border-black/25 py-5 last:border-b"
                >
                  <span className={`${label} pt-1.5 text-black/60`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl font-medium tracking-[-0.025em] sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-black/70">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="flex min-h-[420px] flex-col justify-between gap-10 bg-black p-6 text-white sm:p-10">
            <div className="mx-auto aspect-square w-full max-w-[420px] opacity-95">
              <StrokeFan />
            </div>
            <div>
              <Pill href={`#${formAnchorId}`} tone="cyan">
                Check My Business Funding Readiness
              </Pill>
            </div>
          </div>
        </section>

        {/* ---------- Why CREDA BUDDi ---------- */}
        <section className={`${frame} bg-black text-white`}>
          <div className={`${inner} grid gap-12 lg:grid-cols-2 lg:gap-16`}>
            <div>
              <p className={`${label} text-cyan`}>Why CREDA BUDDi</p>
              <h2 className={`${h2} mt-5`}>
                Credit and funding guidance in one system, not a one-time
                conversation.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-snug tracking-tight text-white/60">
                CREDA BUDDi connects personal credit education, business credit
                development and funding readiness into a single, online process,
                with a secure client portal, a written strategy, and real team
                support during business hours (Monday–Friday, 9 AM–5 PM
                Central).
              </p>
              <ul className="mt-8">
                {[
                  "Online enrollment and a secure client portal",
                  "A written funding strategy, yours to keep",
                  "Business foundation review before you apply",
                  "Real team support, not an automated chatbot",
                ].map((line) => (
                  <li
                    key={line}
                    className="border-t border-white/15 py-4 text-base tracking-tight text-white/90 last:border-b"
                  >
                    {line}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-white/50">Results vary. No guarantees.</p>
            </div>

            <div className="self-center rounded-[20px] border border-white/15 p-6 text-white sm:p-8">
              <div className="flex items-center gap-3">
                <Image
                  src={MASCOT_SRC}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-xl object-cover"
                />
                <div>
                  <p className="text-sm font-medium">CREDA BUDDi client portal</p>
                  <p className={`${label} text-[10px] text-white/50`}>
                    Example message from the CREDA BUDDi team
                  </p>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-white/20 px-4 py-3 text-sm text-white/90">
                  What do lenders look at first when reviewing a business for
                  funding?
                </div>
                <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-cyan px-4 py-3 text-sm text-black">
                  Your business foundation and credit profile first —
                  we&apos;ll walk through your readiness assessment together.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Pricing ---------- */}
        <section className={`${frame} bg-black text-white`}>
          <div className={inner}>
            <p className={`${label} text-cyan`}>Program pricing</p>
            <h2 className={`${h2} mt-5 max-w-3xl`}>
              Transparent pricing. No hidden fees.
            </h2>

            <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <div>
                <p className={`${label} text-white/50`}>Business Funding Program</p>
                <div className="mt-3 flex flex-wrap items-baseline gap-x-5">
                  <span className="text-[clamp(4.5rem,11vw,8.5rem)] leading-none font-medium tracking-[-0.06em]">
                    $2,497
                  </span>
                  <span className="text-lg text-white/60">one-time fee</span>
                </div>
                <p className="mt-3 max-w-md text-base text-white/60">
                  Charged when you sign. Cancel within 3 business days for a
                  full refund.
                </p>

                <ul className="mt-10 grid sm:grid-cols-2 sm:gap-x-8">
                  {deliverables.map((line) => (
                    <li
                      key={line}
                      className="border-t border-white/15 py-3.5 text-[15px] tracking-tight text-white/90"
                    >
                      {line}
                    </li>
                  ))}
                </ul>

                <p className="mt-8 max-w-xl border-t border-white/15 pt-5 text-sm leading-relaxed text-white/55">
                  Success fee only when you&apos;re funded: 8% on the first
                  $20,000 and 10% above that, due within 5 business days after
                  funds are approved and available. Credit Hero Score
                  monitoring is required: $29.95/month, paid directly to Credit
                  Hero Score, not to CREDA BUDDi. Results vary. No guarantees.
                </p>

                <div className="mt-8">
                  <Pill href={`#${formAnchorId}`} tone="cyan">
                    Check My Business Funding Readiness
                  </Pill>
                </div>
              </div>

              <SuccessFeeCalculator />
            </div>
          </div>
        </section>

        {/* ---------- Black Friday Bonus ---------- */}
        {BLACK_FRIDAY_BONUS_ENABLED ? (
          <section className={`${frame} bg-cyan text-black`}>
            <div className={inner}>
              <p className={`${label} text-black/70`}>Black Friday bonus</p>
              <h2 className={`${h2} mt-5 max-w-4xl`}>
                Enroll in the Business Funding Growth Accelerator and receive,
                at no added cost:
              </h2>
              <div className="mt-12 grid sm:grid-cols-2 sm:gap-x-10">
                <div className="border-t border-black/25 py-6">
                  <h3 className="text-2xl font-medium tracking-[-0.03em]">
                    Dedicated funding strategy consultation
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-black/70">
                    A focused session to walk through your readiness and
                    options in more depth.
                  </p>
                </div>
                <div className="border-t border-black/25 py-6">
                  <h3 className="text-2xl font-medium tracking-[-0.03em]">
                    Personalized written funding roadmap
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-black/70">
                    A written document outlining your funding strategy, yours
                    to keep.
                  </p>
                </div>
              </div>
              <p className="mt-4 border-t border-black/25 pt-5 text-xs text-black/65">
                Bonus available for enrollments completed during the Black
                Friday period. Standard program fees and terms still apply.
              </p>
            </div>
          </section>
        ) : null}

        {/* ---------- Qualification Form ---------- */}
        <section id={formAnchorId} className={`${frame} bg-black text-white`}>
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
            <p className={`${label} text-cyan`}>Get started</p>
            <h2 className={`${h2} mt-5`}>Check your business funding readiness.</h2>
            <p className="mt-5 max-w-xl text-lg leading-snug tracking-tight text-white/60">
              Tell us a bit about your business. A member of the CREDA BUDDi
              team will follow up to discuss your funding strategy.
            </p>
            <div className="mt-10">
              <QualificationForm />
            </div>
          </div>
        </section>

        {/* ---------- FAQ ---------- */}
        <section className={`${frame} bg-black text-white`}>
          <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-24">
            <p className={`${label} text-cyan`}>FAQ</p>
            <h2 className={`${h2} mt-5`}>Questions, answered.</h2>
            <div className="mt-12">
              <FAQAccordion />
            </div>
          </div>
        </section>

        {/* ---------- Final CTA ---------- */}
        <section className={`${frame} bg-cyan text-black`}>
          <div className={`${inner} text-left`}>
            <h2 className="max-w-4xl text-[clamp(2.6rem,7vw,6.4rem)] font-medium leading-[0.94] tracking-[-0.058em] text-balance">
              Stop Guessing. Start Building Your Funding Strategy.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-snug tracking-tight text-black/75">
              Understand where your business stands and take a more strategic
              approach to pursuing funding.
            </p>
            <div className="mt-9">
              <Pill href={`#${formAnchorId}`} tone="black">
                Check My Business Funding Readiness
              </Pill>
            </div>
          </div>
        </section>
      </main>

      {/* ---------- Footer ---------- */}
      <footer className={`${frame} bg-black text-white`}>
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
              <p className="mt-3 max-w-xs text-sm text-white/60">
                Your Credit. Our Support. A Brighter Future.
              </p>
            </div>
            <div className="text-sm text-white/60">
              <p className={`${label} text-white`}>Contact</p>
              <p className="mt-3">info@credabuddi.com</p>
              <p>credabuddi.com</p>
              <p>Monday to Friday, 9:00 AM to 5:00 PM Central</p>
            </div>
          </div>

          <div className="mt-10 space-y-2 border-t border-white/15 pt-6 text-xs leading-relaxed text-white/50">
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
