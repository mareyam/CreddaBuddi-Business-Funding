"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Route } from "@/lib/funnel/config";
import { FunnelContext, type View } from "./funnel-context";
import CreditFirstView from "./views/CreditFirstView";
import FoundationFirstView from "./views/FoundationFirstView";
import FundingReadyView from "./views/FundingReadyView";
import PrivacyView from "./views/PrivacyView";
import TermsView from "./views/TermsView";

/**
 * One link for the whole funnel. The landing page, the three result pages and
 * the Privacy Policy / Terms are views on the same URL. A result view can only
 * be reached by finishing the form, because nothing else sets it.
 */
export default function FunnelShell({ children }: { children: ReactNode }) {
  const [view, setViewState] = useState<View>("home");
  const [summary, setSummary] = useState<string[]>([]);
  const [contactId, setContactId] = useState("");

  const setView = useCallback((v: View) => {
    // Same URL; a history entry lets the browser Back button return to the previous view.
    window.history.pushState({ view: v }, "", window.location.href);
    setViewState(v);
  }, []);

  const setResult = useCallback(
    (r: { route: Route; summary: string[]; contactId: string }) => {
      setSummary(r.summary);
      setContactId(r.contactId);
      setView(r.route);
    },
    [setView],
  );

  useEffect(() => {
    const onPop = (e: PopStateEvent) => {
      const v = (e.state as { view?: View } | null)?.view;
      // A result view needs a completed form; on Back/Forward to one we did not set, show the landing page.
      setViewState(v && (v === "privacy" || v === "terms" || v === "home") ? v : "home");
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const value = useMemo(
    () => ({ view, setView, summary, contactId, setResult }),
    [view, setView, summary, contactId, setResult],
  );

  return (
    <FunnelContext.Provider value={value}>
      {view === "home" ? children : null}
      {view === "ready" ? <FundingReadyView /> : null}
      {view === "credit-first" ? <CreditFirstView /> : null}
      {view === "foundation-first" ? <FoundationFirstView /> : null}
      {view === "privacy" ? <PrivacyView /> : null}
      {view === "terms" ? <TermsView /> : null}
    </FunnelContext.Provider>
  );
}
