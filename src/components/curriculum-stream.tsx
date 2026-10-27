"use client";

import { scroll } from "motion";
import { useEffect, useRef, useState } from "react";

/*
 * The real study plan as moving type: one row per semester, every course
 * name in it. Rows slide sideways in alternating directions while the
 * section crosses the screen.
 *
 * The section holds the screen for a short stretch of scroll: each step
 * lights up the courses of the next topic (software, web, data...). The
 * area buttons still work by hand.
 *
 * Without JavaScript (or with reduced motion) nothing is pinned and the rows
 * simply wrap, so every course stays readable.
 */

// Share of each row's hidden width that slides into view while the section
// crosses the screen. Lower is slower.
const SLIDE_SHARE = 0.2;
// Scroll spent on each area while the section is pinned, in screen heights.
const SCREENS_PER_AREA = 0.3;

export interface StreamRow {
  label: string;
  items: { name: string; areas: string[] }[];
}

export const CurriculumStream = ({
  rows,
  areas,
  allLabel,
  filterLabel,
}: {
  rows: StreamRow[];
  areas: { id: string; name: string }[];
  allLabel: string;
  filterLabel: string;
}) => {
  const [activeArea, setActiveArea] = useState<string | null>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLFieldSetElement>(null);

  useEffect(() => {
    const pin = pinRef.current;
    const container = rowsRef.current;
    if (
      !(pin && container) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    // Pinned (CSS) and tall enough to give every area its stretch of scroll.
    pin.dataset.scrub = "";
    pin.style.height = `${(1 + areas.length * SCREENS_PER_AREA) * 100}svh`;
    container.dataset.scrub = "";

    const tracks = [
      ...container.querySelectorAll<HTMLElement>(".stream-track"),
    ];
    // How far each row can slide before its end reaches the screen edge.
    let distances: number[] = [];
    const measure = () => {
      distances = tracks.map(
        (track) =>
          Math.max(0, track.scrollWidth - container.clientWidth) * SLIDE_SHARE
      );
    };
    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(container);

    const stopSliding = scroll(
      (progress: number) => {
        // While an area is lit, the rows stay where its courses are visible.
        if (container.dataset.focus !== undefined) {
          return;
        }
        for (const [index, track] of tracks.entries()) {
          const distance = distances[index] ?? 0;
          // Even rows travel left, odd rows travel right.
          const x =
            index % 2 === 0 ? -distance * progress : -distance * (1 - progress);
          track.style.transform = `translate3d(${x}px, 0, 0)`;
        }
      },
      { offset: ["start end", "end start"], target: pin }
    );

    // While pinned, scroll steps through the areas one by one. Before the
    // pin starts, no area is lit.
    let lastStep = -2;
    const stopStepping = scroll(
      (progress: number) => {
        let step = -1;
        if (progress > 0) {
          step = Math.min(
            areas.length - 1,
            Math.floor(progress * areas.length)
          );
        }
        if (step === lastStep) {
          return;
        }
        lastStep = step;
        setActiveArea(step === -1 ? null : areas[step].id);
      },
      { offset: ["start start", "end end"], target: pin }
    );

    return () => {
      stopSliding();
      stopStepping();
      resizeObserver.disconnect();
      delete pin.dataset.scrub;
      pin.style.removeProperty("height");
      delete container.dataset.scrub;
      for (const track of tracks) {
        track.style.removeProperty("transform");
      }
    };
  }, [areas]);

  // When an area lights up, each row glides to its first lit course, so the
  // change is always visible even though rows are wider than the screen.
  useEffect(() => {
    const container = rowsRef.current;
    if (!container || container.dataset.scrub === undefined) {
      return;
    }
    if (activeArea === null) {
      delete container.dataset.focus;
      return;
    }
    container.dataset.focus = activeArea;
    for (const track of container.querySelectorAll<HTMLElement>(
      ".stream-track"
    )) {
      const lit = track.querySelector<HTMLElement>("[data-lit]");
      if (!lit) {
        continue;
      }
      const maxShift = Math.max(0, track.scrollWidth - container.clientWidth);
      const shift = Math.min(
        maxShift,
        Math.max(0, lit.offsetLeft - track.offsetLeft - 48)
      );
      track.style.transform = `translate3d(${-shift}px, 0, 0)`;
    }
  }, [activeArea]);

  // On phones the buttons sit in a swipeable strip: keep the lit one in view.
  useEffect(() => {
    const filters = filtersRef.current;
    const button = filters?.querySelector<HTMLElement>(
      `[data-area="${activeArea ?? "all"}"]`
    );
    if (filters && button && filters.scrollWidth > filters.clientWidth) {
      filters.scrollTo({ behavior: "smooth", left: button.offsetLeft - 20 });
    }
  }, [activeArea]);

  return (
    <div ref={pinRef} className="stream-pin">
      <div className="stream-sticky">
        <fieldset ref={filtersRef} className="stream-filters">
          <legend className="sr-only">{filterLabel}</legend>
          <button
            type="button"
            aria-pressed={activeArea === null}
            data-area="all"
            onClick={() => setActiveArea(null)}
          >
            {allLabel}
          </button>
          {areas.map((area) => (
            <button
              key={area.id}
              type="button"
              aria-pressed={activeArea === area.id}
              data-area={area.id}
              onClick={() => setActiveArea(area.id)}
            >
              {area.name}
            </button>
          ))}
        </fieldset>
        <div ref={rowsRef} className="stream-rows" data-reveal="off">
          {rows.map((row) => (
            <div key={row.label} className="stream-row">
              <p className="stream-track">
                <span className="stream-label">{row.label}</span>
                {row.items.map((item) => {
                  const dimmed =
                    activeArea !== null && !item.areas.includes(activeArea);
                  return (
                    <span
                      key={item.name}
                      className="stream-item"
                      data-dim={dimmed ? "" : undefined}
                      data-lit={activeArea !== null && !dimmed ? "" : undefined}
                    >
                      {item.name}
                    </span>
                  );
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
