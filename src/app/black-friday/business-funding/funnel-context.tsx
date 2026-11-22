"use client";

import { createContext, useContext } from "react";
import type { Route } from "@/lib/funnel/config";

/** Everything the page can show. The URL never changes: views switch in place. */
export type View = "home" | Route | "privacy" | "terms";

export type FunnelState = {
  view: View;
  setView: (v: View) => void;
  /** Short facts about the visitor shown as chips on a result page. */
  summary: string[];
  contactId: string;
  setResult: (r: { route: Route; summary: string[]; contactId: string }) => void;
};

export const FunnelContext = createContext<FunnelState | null>(null);

export function useFunnel(): FunnelState {
  const ctx = useContext(FunnelContext);
  if (!ctx) throw new Error("useFunnel must be used inside FunnelShell");
  return ctx;
}
