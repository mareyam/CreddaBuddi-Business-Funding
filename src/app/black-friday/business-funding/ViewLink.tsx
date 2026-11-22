"use client";

import type { ReactNode } from "react";
import { useFunnel } from "./funnel-context";
import type { View } from "./funnel-context";

/** A link that switches the in-page view (same URL) instead of navigating. */
export default function ViewLink({
  to,
  className,
  children,
}: {
  to: View;
  className?: string;
  children: ReactNode;
}) {
  const { setView } = useFunnel();
  return (
    <a
      href="#"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        setView(to);
      }}
    >
      {children}
    </a>
  );
}
