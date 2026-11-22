import type { Metadata } from "next";
import Image from "next/image";
import FunnelShell from "../business-funding/FunnelShell";
import QualificationForm from "../business-funding/QualificationForm";
import ViewLink from "../business-funding/ViewLink";
import { frame, h2, inner, label } from "../business-funding/shared";

export const metadata: Metadata = {
  title: "Funding Readiness Form | CREDA BUDDi",
  description:
    "Check your funding readiness in two short steps. Self-reported answers only. No credit pull.",
};

const LOGO_SRC =
  "https://assets.cdn.filesafe.space/WngHsAfzZPxeecb7veIn/media/6ad8322cf9a985d42c4e4d7b.webp";

/** The Funding Readiness Form page. Every "Check My Funding Readiness" button opens this page. */
export default function FundingReadinessPage() {
  return (
    <FunnelShell>
      <div className="min-h-screen bg-[#0b0d12] font-[family-name:var(--font-geist)] text-white">
        <header className="flex items-center justify-between px-5 pt-6 sm:px-10">
          <a href="/business-funding">
            <Image src={LOGO_SRC} alt="CREDA BUDDi" width={160} height={50} className="h-10 w-auto" priority />
          </a>
          <a href="/business-funding" className="text-[15px] underline underline-offset-4">
            Back to website
          </a>
        </header>

        <main>
          <section id="qualification-form" className={`${frame} bg-black`}>
            <div className={`${inner} mx-auto max-w-3xl`}>
              <p className={`${label} text-cyan`}>Get started</p>
              <h1 className={`${h2} mt-5`}>Check your funding readiness.</h1>
              <p className="mt-5 max-w-xl text-lg leading-snug tracking-tight text-white/60">
                Two short steps. Your answers help us show you the next step that fits your business.
              </p>
              <p className="mt-3 max-w-xl text-sm text-white/50">
                Program and success-fee pricing is explained before you enroll.
              </p>
              <div className="mt-10">
                <QualificationForm />
              </div>
            </div>
          </section>
        </main>

        <footer className={`${frame} bg-black`}>
          <div className="mx-auto max-w-6xl space-y-2 px-5 py-8 text-xs leading-relaxed text-white/50 sm:px-8">
            <p>
              &copy; CREDA BUDDI LLC.{" "}
              <ViewLink to="privacy" className="underline underline-offset-2 hover:text-white">
                Privacy Policy
              </ViewLink>
              {" | "}
              <ViewLink to="terms" className="underline underline-offset-2 hover:text-white">
                Terms
              </ViewLink>
            </p>
            <p>Results vary. No guarantees. Funding is not guaranteed; approvals, amounts and terms are set by lenders.</p>
            <p>CREDA BUDDi is not a lender and does not make credit decisions.</p>
            <p>Not legal, tax or financial advice.</p>
            <p>
              D-U-N-S is a registered trademark of Dun &amp; Bradstreet. CREDA BUDDi is not affiliated with Dun &amp;
              Bradstreet.
            </p>
          </div>
        </footer>
      </div>
    </FunnelShell>
  );
}
