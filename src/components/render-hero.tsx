"use client";

import { scroll } from "motion";
import { useEffect, useRef } from "react";

import { createTeapotScene } from "@/components/teapot-scene";

/*
 * Hero canvas: the Utah teapot going from vertices to wireframe to a
 * smooth-shaded surface as you scroll (scene in teapot-scene.ts).
 *
 * three.js loads after the page is interactive, so the hero text never
 * waits for it. Scroll is tracked right away, so the hero has its final
 * height from the first paint.
 */

const isLowPowerDevice = (): boolean => {
  // SAFETY: deviceMemory is a Chromium-only field missing from the DOM types;
  // it is optional here and read with a fallback below.
  const { deviceMemory } = navigator as Navigator & { deviceMemory?: number };
  return (
    (navigator.hardwareConcurrency ?? 8) <= 4 ||
    (deviceMemory ?? 8) <= 4 ||
    window.matchMedia("(pointer: coarse)").matches
  );
};

export const RenderHeroCanvas = ({ label }: { label: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.closest("section");
    if (!(canvas && section)) {
      return;
    }
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let stage = still ? 1 : 0;
    let stopScroll: (() => void) | undefined;
    if (!still) {
      // Makes the hero taller (CSS) so there is room to scroll through stages.
      section.dataset.scrub = "";
      stopScroll = scroll(
        (progress: number) => {
          stage = progress;
        },
        { offset: ["start start", "end end"], target: section }
      );
    }

    let unmounted = false;
    let disposeScene: (() => void) | null = null;
    const startScene = async () => {
      const dispose = await createTeapotScene({
        canvas,
        getStage: () => stage,
        lowPower: isLowPowerDevice(),
        still,
      });
      // The page may have changed while three.js was loading.
      if (unmounted) {
        dispose?.();
      } else {
        disposeScene = dispose;
      }
    };
    void startScene();

    return () => {
      unmounted = true;
      disposeScene?.();
      stopScroll?.();
      delete section.dataset.scrub;
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="render-hero-canvas"
        aria-hidden="true"
      />
      <p className="sr-only">{label}</p>
    </>
  );
};
