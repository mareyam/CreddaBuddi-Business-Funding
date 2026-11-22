"use client";

import { useState, useTransition } from "react";
import { triggerFollowUp } from "./actions";
import { useFunnel } from "./funnel-context";

/** Fires a follow-up workflow trigger (guide interest, foundation Notify Me). */
export default function FollowUpButton({
  kind,
  children,
}: {
  kind: "guide" | "foundation-notify";
  children: React.ReactNode;
}) {
  const { contactId } = useFunnel();
  const [pending, start] = useTransition();
  const [note, setNote] = useState("");
  return (
    <div>
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          start(async () => {
            const res = await triggerFollowUp(kind, contactId);
            setNote(
              !res.ok
                ? "We couldn't save that. Try again."
                : res.saved
                  ? "Done. We'll be in touch."
                  : "Preview mode: the CRM is not connected, so this was not saved.",
            );
          })
        }
        className="rounded-full bg-cyan px-7 py-4 text-sm font-medium text-black transition hover:brightness-110 disabled:opacity-60"
      >
        {pending ? "Saving…" : children}
      </button>
      {note ? <p role="status" className="mt-2 text-xs text-white/50">{note}</p> : null}
    </div>
  );
}
