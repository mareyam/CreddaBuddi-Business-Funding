import { BOOKING_URL } from "@/lib/funnel/config";
import { Pill, label } from "./shared";
import ViewLink from "./ViewLink";

/** Funding Strategy Call booking. The link comes from NEXT_PUBLIC_BOOKING_URL. */
export default function BookingSection() {
  return (
    <div id="book" className="scroll-mt-6 rounded-[20px] border border-white/15 p-6 sm:p-8">
      <p className={`${label} text-cyan`}>Funding Strategy Call</p>
      <h2 className="mt-3 text-[clamp(1.6rem,3.4vw,2.2rem)] font-medium tracking-[-0.03em]">
        Pick a time that works for you.
      </h2>
      <p className="mt-2 text-base text-white/60">Available Monday–Friday, 9 AM–5 PM Central.</p>
      <div className="mt-6">
        <Pill href={BOOKING_URL} tone="cyan" disabled={!BOOKING_URL} external>
          Book My Funding Strategy Call
        </Pill>
      </div>
      {!BOOKING_URL ? (
        <p className="mt-3 text-xs text-white/50">Booking link not set yet (NEXT_PUBLIC_BOOKING_URL).</p>
      ) : null}
      <p className="mt-4 text-xs text-white/50">
        <ViewLink to="privacy" className="text-white underline underline-offset-2">
          Privacy Policy
        </ViewLink>
        {" | "}
        <ViewLink to="terms" className="text-white underline underline-offset-2">
          Terms
        </ViewLink>
        {" (publication pending attorney approval)"}
      </p>
    </div>
  );
}
