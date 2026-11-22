import Image from "next/image";
import { frame, h2, inner, label } from "./shared";
import ViewLink from "./ViewLink";

const LOGO_SRC =
  "https://assets.cdn.filesafe.space/WngHsAfzZPxeecb7veIn/media/6ad8322cf9a985d42c4e4d7b.webp";

export type LegalSection = { name: string; paragraphs: string[] };

/**
 * Privacy Policy and Terms pages. The text is a DRAFT built only from facts
 * already on the site. Anything unknown is marked "[Pending ...]". The whole
 * page must be reviewed and approved by the attorney before launch.
 */
export default function LegalDraftPage({
  title,
  sections,
}: {
  title: string;
  sections: LegalSection[];
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
            <p className={`${label} text-cyan`}>Draft · pending attorney approval</p>
            <h1 className={`${h2} mt-5 max-w-3xl`}>{title}</h1>
            <p className="mt-6 max-w-xl text-lg leading-snug tracking-tight text-white/60">
              This is a draft prepared for attorney review. Text in [brackets] is
              still to be confirmed. Do not rely on this page as final legal text.
            </p>
            <ul className="mt-12">
              {sections.map((section) => (
                <li
                  key={section.name}
                  className="grid gap-3 border-t border-white/15 py-7 last:border-b"
                >
                  <h2 className="text-xl font-medium tracking-[-0.02em]">{section.name}</h2>
                  {section.paragraphs.map((text) => (
                    <p key={text} className="max-w-3xl text-[15px] leading-relaxed text-white/70">
                      {text}
                    </p>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className={`${frame} bg-black`}>
        <div className="mx-auto max-w-6xl px-5 py-8 text-xs leading-relaxed text-white/50 sm:px-8">
          <p>
            &copy; CREDA BUDDI LLC. Contact:{" "}
            <a href="mailto:info@credabuddi.com" className="underline underline-offset-2">
              info@credabuddi.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
