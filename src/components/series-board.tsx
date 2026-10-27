"use client";

import { useEffect, useRef } from "react";

/*
 * Hovering a course in the study plan lights up its whole prerequisite
 * chain, backward and forward; the rest of the plan dims. Each course item
 * carries `data-course` (its id) and `data-series` (the ids in its chain,
 * space separated), computed on the server.
 */
export const SeriesBoard = ({ children }: { children: React.ReactNode }) => {
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const board = boardRef.current;
    if (!board) {
      return;
    }
    const courses = [...board.querySelectorAll<HTMLElement>("[data-course]")];

    const clear = () => {
      delete board.dataset.active;
      for (const course of courses) {
        delete course.dataset.lit;
      }
    };

    const onPointerOver = (event: PointerEvent) => {
      const hovered =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>("[data-series]")
          : null;
      if (!hovered) {
        clear();
        return;
      }
      const chain = new Set(hovered.dataset.series?.split(" "));
      board.dataset.active = "";
      for (const course of courses) {
        course.toggleAttribute(
          "data-lit",
          chain.has(course.dataset.course ?? "")
        );
      }
    };

    board.addEventListener("pointerover", onPointerOver);
    board.addEventListener("pointerleave", clear);
    return () => {
      board.removeEventListener("pointerover", onPointerOver);
      board.removeEventListener("pointerleave", clear);
    };
  }, []);

  return (
    <div ref={boardRef} className="series-board">
      {children}
    </div>
  );
};
