"use client";

import { useEffect, useState } from "react";

/*
 * Home only: after a few seconds without scrolling, a small "scroll down"
 * arrow appears at the bottom of the screen. Any scroll, key or touch hides
 * it and restarts the wait; it never shows near the end of the page.
 * Clicking it moves down most of a screen.
 */

const IDLE_MS = 5000;
// Closer than this to the end of the page, there is nothing left to hint.
const END_MARGIN_PX = 400;

export const ScrollHint = ({ label }: { label: string }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const nearEnd = () =>
      window.scrollY + window.innerHeight >
      document.documentElement.scrollHeight - END_MARGIN_PX;

    const restart = () => {
      setVisible(false);
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (!nearEnd()) {
          setVisible(true);
        }
      }, IDLE_MS);
    };

    restart();
    window.addEventListener("scroll", restart, { passive: true });
    window.addEventListener("keydown", restart);
    window.addEventListener("touchstart", restart, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", restart);
      window.removeEventListener("keydown", restart);
      window.removeEventListener("touchstart", restart);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      className="scroll-hint"
      onClick={() =>
        window.scrollBy({ behavior: "smooth", top: window.innerHeight * 0.8 })
      }
    >
      {label}
      <span className="scroll-hint-arrow" aria-hidden="true">
        ↓
      </span>
    </button>
  );
};
