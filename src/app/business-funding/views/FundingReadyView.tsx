"use client";

import BlackFridayPopup from "../BlackFridayPopup";
import BookingSection from "../BookingSection";
import FundingReadyOffer from "../FundingReadyOffer";
import ResultShell, { QuestionsLine } from "../ResultShell";
import SuccessFeeCalculator from "../SuccessFeeCalculator";
import { frame, inner } from "../shared";

export default function FundingReadyView() {
  return (
      <ResultShell
        tag="Your result · Funding Ready"
        headline="Based on your answers, a strategy call is the right next step."
        note="Funding is not guaranteed. Lenders set approvals, amounts and terms."
      >
        <section className={`${frame} bg-black`}>
          <div className={`${inner} mx-auto grid max-w-3xl gap-7`}>
            {/* Order matters: fee box, then calculator directly under it, then booking directly under the calculator. */}
            <FundingReadyOffer />
            <SuccessFeeCalculator />
            <BookingSection />
            <QuestionsLine />
          </div>
        </section>
        <BlackFridayPopup />
      </ResultShell>
  );
}
