"use client";

import { scroll } from "motion";
import { useEffect, useRef, useState } from "react";

/*
 * The real study plan as moving type: one row per semester, every course
 * name in it. While the section crosses the screen, rows slide sideways in
 * alternating directions. The area buttons light up the courses of one area.
 *
 * Without JavaScript (or with reduced motion) the rows simply wrap, so every
 * course stays readable.
 */

// Share of each row's hidden width that slides into view while the section
// crosses the screen. Lower is slower.
const SLIDE_SHARE = 0.2;

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
  const rowsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = rowsRef.current;
    if (
      !container ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
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

    const stop = scroll(
      (progress: number) => {
        for (const [index, track] of tracks.entries()) {
          const distance = distances[index] ?? 0;
          // Even rows travel left, odd rows travel right.
          const x =
            index % 2 === 0 ? -distance * progress : -distance * (1 - progress);
          track.style.transform = `translate3d(${x}px, 0, 0)`;
        }
      },
      { offset: ["start end", "end start"], target: container }
    );

    return () => {
      stop();
      resizeObserver.disconnect();
      delete container.dataset.scrub;
      for (const track of tracks) {
        track.style.removeProperty("transform");
      }
    };
  }, []);

  return (
    <>
      <fieldset className="stream-filters">
        <legend className="sr-only">{filterLabel}</legend>
        <button
          type="button"
          aria-pressed={activeArea === null}
          onClick={() => setActiveArea(null)}
        >
          {allLabel}
        </button>
        {areas.map((area) => (
          <button
            key={area.id}
            type="button"
            aria-pressed={activeArea === area.id}
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
    </>
  );
};
