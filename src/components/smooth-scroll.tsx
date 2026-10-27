"use client";

import Lenis from "lenis";
import { useEffect } from "react";

import "lenis/dist/lenis.css";

/*
 * Smooth wheel scrolling (Lenis). Touch scrolling stays native, which is
 * already smooth and cheaper on phones. Skipped with reduced motion.
 * Elements with their own scroll or wheel handling opt out with
 * `data-lenis-prevent`.
 */
export const SmoothScroll = () => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const lenis = new Lenis({ anchors: true, autoRaf: true });
    return () => lenis.destroy();
  }, []);
  return null;
};
