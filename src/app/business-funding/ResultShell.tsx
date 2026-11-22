import Image from "next/image";
import type { ReactNode } from "react";
import { frame, h2, inner, label } from "./shared";
import SummaryChips from "./SummaryChips";
import ViewLink from "./ViewLink";

const LOGO_SRC =
  "https://assets.cdn.filesafe.space/WngHsAfzZPxeecb7veIn/media/6ad8322cf9a985d42c4e4d7b.webp";

export function QuestionsLine() {
  return (
    <p className="text-[15px] text-white/60">
      Questions? Email{" "}
      <a href="mailto:info@credabuddi.com" className="text-white underline underline-offset-2">
        info@credabuddi.com
      </a>
    </p>
  );
}

/** Common frame for the three result pages: logo, result headline, content, footer. */
export default function ResultShell({
  tag,
  headline,
  note,
  children,
}: {
  tag: string;
  headline: string;
  note: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0b0d12] font-[family-name:var(--font-geist)] text-white">
      <header className="flex items-center justify-between px-5 pt-6 sm:px-10">
        <ViewLink to="home">
          <Image src={LOGO_SRC} alt="CREDA BUDDi" width={160} height={50} className="h-10 w-auto" />
        </ViewLink>
        <ViewLink to="home" className="text-[15px] underline underline-offset-4">
          Back to start
        </ViewLink>
      </header>

      <main>
        <section className={`${frame} bg-black`}>
          <div className={inner}>
            <p className={`${label} text-cyan`}>{tag}</p>
            <h1 className={`${h2} mt-5 max-w-4xl`}>{headline}</h1>
            <p className="mt-6 max-w-xl text-lg leading-snug tracking-tight text-white/60">{note}</p>
            <SummaryChips />
          </div>
        </section>
        {children}
      </main>

      <footer className={`${frame} bg-black`}>
        <div className="mx-auto max-w-6xl space-y-2 px-5 py-8 text-xs leading-relaxed text-white/50 sm:px-8">
          <p>
            &copy; CREDA BUDDI LLC.{" "}
            <ViewLink to="privacy" className="underline underline-offset-2 hover:text-white">Privacy Policy</ViewLink>
            {" | "}
            <ViewLink to="terms" className="underline underline-offset-2 hover:text-white">Terms</ViewLink>
          </p>
          <p>Results vary. No guarantees. Funding is not guaranteed; approvals, amounts and terms are set by lenders.</p>
          <p>CREDA BUDDi is not a lender and does not make credit decisions.</p>
          <p>Not legal, tax or financial advice.</p>
          <p>D-U-N-S is a registered trademark of Dun &amp; Bradstreet. CREDA BUDDi is not affiliated with Dun &amp; Bradstreet.</p>
        </div>
      </footer>
    </div>
  );
}
