"use client";

import { animate, inView, scroll, stagger } from "motion";
import { useEffect } from "react";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const revealOnScroll = (selector: string, amount = 0.15): (() => void)[] =>
  [...document.querySelectorAll<HTMLElement>(selector)].map((element) =>
    inView(
      element,
      () => {
        animate(
          element,
          { opacity: [0, 1], y: [28, 0] },
          { duration: 0.75, ease: EASE_OUT }
        );
      },
      { amount }
    )
  );

const playIntro = (): void => {
  animate(
    "#inicio .hero-title",
    { opacity: [0, 1], y: [35, 0] },
    { duration: 0.9, ease: EASE_OUT }
  );
  animate(
    "#inicio .hero-title ~ p, #inicio .hero-title ~ div",
    { opacity: [0, 1], y: [20, 0] },
    { delay: stagger(0.12, { startDelay: 0.3 }), duration: 0.9, ease: EASE_OUT }
  );
  animate(
    "#inicio .lab-panel",
    { opacity: [0, 1], rotate: [3, 0], y: [35, 0] },
    { delay: 0.2, duration: 0.9, ease: EASE_OUT }
  );
  for (const path of document.querySelectorAll<SVGPathElement>(
    "#inicio .lab-object path"
  )) {
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    animate(
      path,
      { strokeDashoffset: [length, 0] },
      { delay: 0.5, duration: 1.4, ease: EASE_OUT }
    );
  }
};

const linkToScroll = (): (() => void)[] => {
  const stops: (() => void)[] = [];
  const lab = document.querySelector<SVGElement>("#inicio .lab-object");
  const hero = document.querySelector<HTMLElement>("#inicio");
  if (lab && hero) {
    stops.push(
      scroll(animate(lab, { rotate: [0, 8], y: [0, -16] }), {
        offset: ["start start", "end start"],
        target: hero,
      })
    );
  }
  const fill = document.querySelector<HTMLElement>(".story-progress-fill");
  const steps = document.querySelector<HTMLElement>(".story-steps");
  if (fill && steps) {
    stops.push(
      scroll(animate(fill, { scaleY: [0, 1] }), {
        offset: ["start center", "end center"],
        target: steps,
      })
    );
  }
  return stops;
};

export const HomeMotion = () => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    playIntro();
    const stops = [
      ...linkToScroll(),
      ...revealOnScroll(
        "#contenido > section:not(#inicio) :is(h2, article, .grid > a)"
      ),
      ...revealOnScroll(".story-step :is(.story-number, h3, p)", 0.4),
    ];
    return () => {
      for (const stop of stops) {
        stop();
      }
    };
  }, []);
  return null;
};
