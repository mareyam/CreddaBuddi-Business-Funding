import LegalDraftPage from "../LegalDraftPage";

export default function PrivacyView() {
  return (
    <LegalDraftPage
      title="Privacy Policy"
      sections={[
        {
          name: "Who we are",
          paragraphs: [
            "This Privacy Policy explains how CREDA BUDDI LLC (\"CREDA BUDDi\") handles information you give us through this website and the Funding Readiness Form.",
          ],
        },
        {
          name: "What we collect",
          paragraphs: [
            "Contact details you enter: full name, email address, phone number and business name.",
            "Funding-readiness answers you choose to give: whether your business has an EIN, business type, time in business, estimated annual revenue, whether you have a business bank account, your own estimate of your personal credit score range, whether you have had recent collections, charge-offs or accounts 60+ days late, any bankruptcy in the last four years, desired funding amount, intended use of funds, and whether you have existing business debt or financing.",
            "We do not ask for Social Security numbers, credit reports, payment card details or uploaded documents through the Funding Readiness Form, and we do not pull your credit through it.",
            "[Pending: analytics, cookies and device or browser data collected by this website, if any.]",
          ],
        },
        {
          name: "How we use it",
          paragraphs: [
            "To review your answers, understand your funding readiness and show you the next step that fits.",
            "To contact you about your funding readiness by phone, text message and email, where you have given consent. Message and data rates may apply.",
            "To answer your questions and improve our service.",
          ],
        },
        {
          name: "Who we share it with",
          paragraphs: [
            "[Pending attorney and client confirmation: the service providers that receive this information (for example CRM, scheduling, email and text messaging providers), and whether any information is shared with affiliates such as Credit Hero Score.]",
          ],
        },
        {
          name: "How long we keep it",
          paragraphs: ["[Pending: retention period.]"],
        },
        {
          name: "Your choices",
          paragraphs: [
            "You can opt out of text messages at any time by replying STOP, and out of emails using the unsubscribe link. Consent is not a condition of purchase.",
            "To ask about, correct or delete your information, email info@credabuddi.com.",
            "[Pending: state-specific privacy rights and how requests are handled.]",
          ],
        },
        {
          name: "Contact",
          paragraphs: ["CREDA BUDDI LLC, info@credabuddi.com. Monday to Friday, 9:00 AM to 5:00 PM Central."],
        },
      ]}
    />
  );
}
