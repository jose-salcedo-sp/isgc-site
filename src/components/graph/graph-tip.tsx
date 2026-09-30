"use client";

import type { RefObject } from "react";

export const GraphTip = ({
  tipRef,
}: {
  tipRef: RefObject<HTMLDivElement | null>;
}) => (
  <div
    className="bg-background/80 pointer-events-none fixed z-20 max-w-64 rounded-md px-2.5 py-1.5 shadow-lg backdrop-blur-md"
    hidden
    ref={tipRef}
  >
    <div className="text-foreground text-xs" data-tip-label />
    <div className="text-muted-foreground text-xs" data-tip-kind />
  </div>
);
