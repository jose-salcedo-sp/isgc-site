"use client";

import { animate, inView, scroll, stagger } from "motion";
import { useEffect } from "react";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Hide what is still below the fold so it fades in rather than blinking out. */
const prime = (element: HTMLElement): void => {
  if (element.getBoundingClientRect().top > window.innerHeight * 0.9) {
    element.style.opacity = "0";
  }
};

const revealOnScroll = (selector: string, amount = 0.15): (() => void)[] =>
  [...document.querySelectorAll<HTMLElement>(selector)].map((element) => {
    prime(element);
    return inView(
      element,
      () => {
        animate(
          element,
          { opacity: [0, 1], y: [28, 0] },
          { duration: 0.75, ease: EASE_OUT }
        );
      },
      { amount }
    );
  });

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

/** The story illustration assembles as you scroll, wide screens only. */
const assembleStory = (): (() => void)[] => {
  const steps = document.querySelector<HTMLElement>(".story-steps");
  if (!(steps && window.matchMedia("(min-width: 900px)").matches)) {
    return [];
  }
  const sequence = animate(
    [
      [
        ".story-orbit",
        { rotate: [-45, 90], scale: [0.65, 1] },
        { at: 0, duration: 2 },
      ],
      [
        ".story-core",
        { borderRadius: ["50%", "18%"], rotate: [0, 180] },
        { at: 0, duration: 2 },
      ],
      [
        ".story-node",
        { opacity: [0, 1], scale: [0, 1] },
        { at: 0.5, delay: stagger(0.12), duration: 0.5 },
      ],
      [
        ".story-connection",
        { scaleX: [0, 1] },
        { at: 0.8, delay: stagger(0.1), duration: 0.5 },
      ],
    ],
    { defaultTransition: { ease: "linear" } }
  );
  return [
    scroll(sequence, { offset: ["start 0.65", "end 0.65"], target: steps }),
  ];
};

/** Each step's number, heading, and copy arrive together as it comes up. */
const revealSteps = (): (() => void)[] =>
  [...document.querySelectorAll<HTMLElement>(".story-step")].map((step) => {
    const parts = [
      ...step.querySelectorAll<HTMLElement>(".story-number, h3, p"),
    ];
    for (const part of parts) {
      prime(part);
    }
    return inView(
      step,
      () => {
        animate(
          parts,
          { opacity: [0, 1], y: [24, 0] },
          { delay: stagger(0.12), duration: 0.7, ease: EASE_OUT }
        );
      },
      { amount: 0.15 }
    );
  });

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
      ...assembleStory(),
      ...revealSteps(),
      ...revealOnScroll(
        "#contenido > section:not(#inicio):not(#historia) :is(h2, article, .grid > a)"
      ),
    ];
    return () => {
      for (const stop of stops) {
        stop();
      }
    };
  }, []);
  return null;
};
