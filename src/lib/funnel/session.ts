"use client";

import { useSyncExternalStore } from "react";

/** Read a sessionStorage key without hydration mismatches (null on the server). */
export function useSessionValue(key: string): string | null {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener("storage", cb);
      return () => window.removeEventListener("storage", cb);
    },
    () => {
      try {
        return sessionStorage.getItem(key);
      } catch {
        return null;
      }
    },
    () => null,
  );
}

/** A clock that ticks every `ms`. Returns 0 on the server and before hydration. */
export function useNow(ms: number): number {
  return useSyncExternalStore(
    (cb) => {
      const id = setInterval(cb, ms);
      return () => clearInterval(id);
    },
    () => Math.floor(Date.now() / ms) * ms,
    () => 0,
  );
}
