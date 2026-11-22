import LegalDraftPage from "../LegalDraftPage";

export default function TermsView() {
  return (
    <LegalDraftPage
      title="Terms"
      sections={[
        {
          name: "Using this site",
          paragraphs: [
            "This site is provided by CREDA BUDDI LLC (\"CREDA BUDDi\"). The information on it is educational. It is not legal, tax or financial advice.",
            "CREDA BUDDi is not a lender and does not make credit decisions.",
          ],
        },
        {
          name: "The Business Funding Program and fees",
          paragraphs: [
            "Program and success-fee pricing is explained before you enroll.",
            "Credit Hero Score monitoring is required separately and is paid directly to Credit Hero Score, not to CREDA BUDDi. CREDA BUDDI LLC is an affiliate of Credit Hero Score.",
            "[Pending: the enrollment agreement that sets out the program fee and what it covers.]",
          ],
        },
        {
          name: "Refunds and cancellation",
          paragraphs: ["Refund terms: wording pending attorney approval."],
        },
        {
          name: "Success fee",
          paragraphs: [
            "[Pending attorney approval: success-fee terms, including what counts as being funded and when a fee is due.]",
          ],
        },
        {
          name: "No guarantee of funding",
          paragraphs: [
            "Funding is not guaranteed. Lenders set approvals, amounts and terms. Results vary. No guarantees.",
          ],
        },
        {
          name: "Third-party marks",
          paragraphs: [
            "D-U-N-S is a registered trademark of Dun & Bradstreet. CREDA BUDDi is not affiliated with Dun & Bradstreet.",
          ],
        },
        {
          name: "Limits of liability and governing law",
          paragraphs: ["[Pending attorney: limitation of liability, governing law and dispute terms.]"],
        },
        {
          name: "Contact",
          paragraphs: ["CREDA BUDDI LLC, info@credabuddi.com."],
        },
      ]}
    />
  );
}
