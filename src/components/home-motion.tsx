"use client";

import { scroll } from "motion";
import { useEffect } from "react";

/*
 * Home-only scrollytelling for the "build story" (learning-story.tsx). The
 * hero canvas animates itself (render-hero.tsx) and the curriculum rows move
 * themselves (curriculum-stream.tsx).
 *
 * The story section is three screens tall and its content is sticky. Scroll
 * progress through it (0 → 1) is split into the three steps:
 *   0.00–0.33  code is typed on the phone
 *   0.33–0.66  the code clears and the app's wireframe is drawn
 *   0.66–1.00  the wireframe fills in and someone taps the button
 */

/** 0 before `start`, 1 after `end`, linear in between. */
const between = (value: number, start: number, end: number): number =>
  Math.min(1, Math.max(0, (value - start) / (end - start)));

const scrubBuildStory = (): (() => void) | null => {
  const story = document.querySelector<HTMLElement>(".build-story");
  if (!story) {
    return null;
  }
  const steps = [...story.querySelectorAll<HTMLElement>(".build-story-step")];
  const bars = [
    ...story.querySelectorAll<HTMLElement>(".build-story-progress b"),
  ];
  const code = story.querySelector<SVGGElement>(".build-code");
  const caret = story.querySelector<SVGRectElement>(".build-caret");
  const lines = [...story.querySelectorAll<SVGTextElement>(".build-code text")];
  const wires = [
    ...story.querySelectorAll<SVGGeometryElement>(".build-wire > *"),
  ];
  const fill = story.querySelector<SVGGElement>(".build-fill");
  const tap = story.querySelector<SVGCircleElement>(".build-tap");
  if (!(code && caret && fill && tap)) {
    return null;
  }

  const fullText = lines.map((line) => line.dataset.line ?? "");
  const totalCharacters = fullText.reduce((sum, line) => sum + line.length, 0);

  const render = (progress: number) => {
    // Step 1: type the code, character by character.
    let typed = Math.round(totalCharacters * between(progress, 0.03, 0.28));
    let caretLine = 0;
    let caretColumn = 0;
    for (const [index, line] of lines.entries()) {
      const shown = Math.min(typed, fullText[index].length);
      line.textContent = fullText[index].slice(0, shown);
      if (typed > 0 || index === 0) {
        caretLine = index;
        caretColumn = shown;
      }
      typed -= shown;
    }
    caret.setAttribute("x", String(34 + caretColumn * 8.4));
    caret.setAttribute("y", String(104 + caretLine * 40));

    // Step 2: the code clears and the wireframe draws itself.
    const clear = between(progress, 0.33, 0.43);
    code.style.opacity = String(1 - clear);
    code.style.transform = `translateY(${-24 * clear}px)`;
    const draw = between(progress, 0.36, 0.62);
    for (const [index, wire] of wires.entries()) {
      const own = between(draw, index * 0.12, index * 0.12 + 0.52);
      wire.style.strokeDashoffset = String(1 - own);
    }

    // Step 3: the shapes fill in, then a tap ripples on the button.
    const filled = between(progress, 0.68, 0.84);
    fill.style.opacity = String(filled);
    // Once the app is filled in, the wireframe steps back.
    for (const wire of wires) {
      wire.style.opacity = String(1 - filled * 0.75);
    }
    const ripple = between(progress, 0.86, 0.98);
    tap.style.opacity = String(ripple > 0 ? 1 - ripple : 0);
    tap.style.transform = `scale(${0.4 + ripple * 2.2})`;

    // Text: one step at a time, plus three progress bars.
    let active = 2;
    if (progress < 0.33) {
      active = 0;
    } else if (progress < 0.66) {
      active = 1;
    }
    for (const [index, step] of steps.entries()) {
      step.toggleAttribute("data-active", index === active);
    }
    for (const [index, bar] of bars.entries()) {
      bar.style.transform = `scaleX(${between(progress, index / 3, (index + 1) / 3)})`;
    }
  };

  story.dataset.scrub = "";
  render(0);
  const stop = scroll(render, {
    offset: ["start start", "end end"],
    target: story,
  });

  return () => {
    stop();
    delete story.dataset.scrub;
    // Leave the finished state (the no-JS view) in place.
    for (const [index, line] of lines.entries()) {
      line.textContent = fullText[index];
    }
    for (const step of steps) {
      delete step.dataset.active;
    }
    for (const element of [code, fill, tap, ...wires, ...bars]) {
      element.removeAttribute("style");
    }
  };
};

export const HomeMotion = () => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const stop = scrubBuildStory();
    return () => {
      stop?.();
    };
  }, []);
  return null;
};
