"use client";

import { animate, inView, stagger } from "motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const CURTAIN_MS = 320;
const NAV_RESET_MS = 2500;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Magnetic buttons and tilt only make sense with a mouse or trackpad. */
const hasFinePointer = () =>
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/*
 * Scroll reveals.
 *
 * Content is always visible in the HTML. An element is only hidden for a
 * moment while it is still below the screen (about to scroll in), and it is
 * revealed as soon as it enters. If JavaScript, the IntersectionObserver or
 * motion never run, nothing is ever hidden.
 *
 * Targets:
 * - `data-reveal="mask"`: the element rises from behind its own bottom edge.
 * - `data-reveal="wipe"`: uncovered from left to right, like a table scan.
 * - `data-reveal="line"`: a rule that draws itself from the left.
 * - `data-reveal="draw"`: an SVG group whose strokes draw in order (its paths
 *   and circles need pathLength="1").
 * - `data-reveal="sweep"`: rises while a gold highlight sweeps across.
 * - `data-reveal` (any other value): fade in and rise.
 * - `data-reveal="off"`: opt out (also opts out its children).
 * - `data-delay="0.2"`: wait that many seconds before playing.
 * - Without attributes, every `h2` gets "mask" and every direct child of a
 *   `.grid` gets "rise", so new pages animate without extra markup.
 */
type RevealKind = "draw" | "line" | "mask" | "rise" | "sweep" | "wipe";

/* SVG groups can be revealed too, so targets are HTML or SVG elements. */
type RevealElement = HTMLElement | SVGElement;

interface RevealTarget {
  delay: number;
  element: RevealElement;
  kind: RevealKind;
}

const readKind = (value: string | undefined): RevealKind => {
  if (
    value === "draw" ||
    value === "line" ||
    value === "mask" ||
    value === "sweep" ||
    value === "wipe"
  ) {
    return value;
  }
  return "rise";
};

const findRevealTargets = (main: HTMLElement): RevealTarget[] => {
  const targets: RevealTarget[] = [];
  const seen = new Set<RevealElement>();
  const add = (element: RevealElement, kind: RevealKind, delay: number) => {
    if (seen.has(element) || element.closest('[data-reveal="off"]')) {
      return;
    }
    seen.add(element);
    targets.push({ delay, element, kind });
  };

  for (const element of main.querySelectorAll<RevealElement>("[data-reveal]")) {
    const delay = Number(element.dataset.delay ?? 0);
    add(element, readKind(element.dataset.reveal), delay);
  }
  for (const heading of main.querySelectorAll<HTMLElement>("h2")) {
    add(heading, "mask", 0);
  }
  for (const grid of main.querySelectorAll<HTMLElement>(".grid")) {
    const children = [...grid.children];
    for (const [index, child] of children.entries()) {
      // Skip wrappers that already animate something inside (like an h2),
      // so nothing animates twice.
      if (
        child instanceof HTMLElement &&
        !child.querySelector("h2, [data-reveal]")
      ) {
        add(child, "rise", Math.min(index, 4) * 0.08);
      }
    }
  }
  return targets;
};

const strokesOf = (element: RevealElement) => [
  ...element.querySelectorAll<SVGElement>("path, circle"),
];

const hideForReveal = ({ element, kind }: RevealTarget): void => {
  if (kind === "mask" && element instanceof HTMLElement) {
    const height = element.offsetHeight;
    element.style.clipPath = `inset(0 0 ${height}px 0)`;
    element.style.transform = `translateY(${height}px)`;
  } else if (kind === "wipe") {
    element.style.clipPath = "inset(0 100% 0 0)";
  } else if (kind === "line") {
    element.style.transformOrigin = "left";
    element.style.transform = "scaleX(0)";
  } else if (kind === "draw") {
    for (const stroke of strokesOf(element)) {
      stroke.style.strokeDasharray = "1";
      stroke.style.strokeDashoffset = "1";
    }
  } else {
    element.style.opacity = "0";
    element.style.transform = "translateY(32px)";
  }
};

const clearRevealStyles = (element: RevealElement): void => {
  element.style.clipPath = "";
  element.style.opacity = "";
  element.style.transform = "";
  element.style.transformOrigin = "";
  element.style.backgroundImage = "";
  element.style.backgroundPosition = "";
  element.style.backgroundRepeat = "";
  element.style.backgroundSize = "";
  for (const stroke of strokesOf(element)) {
    stroke.style.strokeDasharray = "";
    stroke.style.strokeDashoffset = "";
  }
};

const rise = (element: RevealElement, delay: number) =>
  animate(
    element,
    { opacity: [0, 1], y: [32, 0] },
    { delay, duration: 0.8, ease: EASE_OUT }
  );

/* A soft gold band crosses the element once, like a highlighter. */
const sweepHighlight = (element: RevealElement, delay: number) => {
  element.style.backgroundImage =
    "linear-gradient(90deg, transparent, #e2c58f55, transparent)";
  element.style.backgroundRepeat = "no-repeat";
  element.style.backgroundSize = "40% 100%";
  return animate(
    element,
    { backgroundPosition: ["-80% 0", "180% 0"] },
    { delay: delay + 0.15, duration: 0.9, ease: "easeInOut" }
  );
};

const playReveal = async ({
  delay,
  element,
  kind,
}: RevealTarget): Promise<void> => {
  if (kind === "mask" && element instanceof HTMLElement) {
    // Moving the element and its clip by the same amount makes the text
    // slide up from behind a fixed line, like a masked title.
    const height = element.offsetHeight;
    await animate(
      element,
      {
        clipPath: [`inset(0 0 ${height}px 0)`, "inset(0 0 0px 0)"],
        y: [height, 0],
      },
      { delay, duration: 0.9, ease: EASE_OUT }
    );
  } else if (kind === "wipe") {
    await animate(
      element,
      { clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"] },
      { delay, duration: 0.9, ease: EASE_OUT }
    );
  } else if (kind === "line") {
    await animate(
      element,
      { scaleX: [0, 1] },
      { delay, duration: 0.9, ease: [0.65, 0, 0.35, 1] }
    );
  } else if (kind === "draw") {
    const strokes = strokesOf(element);
    // Many strokes start closer together, so the whole drawing takes about
    // the same time however detailed it is.
    const gap = Math.min(0.15, 1.2 / strokes.length);
    await animate(
      strokes,
      { strokeDashoffset: [1, 0] },
      {
        delay: stagger(gap, { startDelay: delay }),
        duration: 1.4,
        ease: [0.65, 0, 0.35, 1],
      }
    );
  } else if (kind === "sweep") {
    await Promise.all([rise(element, delay), sweepHighlight(element, delay)]);
  } else {
    await rise(element, delay);
  }
  clearRevealStyles(element);
};

const watchReveals = (main: HTMLElement): (() => void) => {
  const stops: (() => void)[] = [];
  const hidden = new Set<RevealElement>();

  for (const target of findRevealTargets(main)) {
    const { element } = target;
    // Already on screen when the page loads: leave it alone, no flicker.
    if (element.getBoundingClientRect().top < window.innerHeight) {
      continue;
    }
    // Step 1: when it gets close (just below the screen), hide it.
    const stopArm = inView(
      element,
      () => {
        const box = element.getBoundingClientRect();
        // Skip it if it is already on screen, or sideways out of view inside
        // a horizontal strip (it might never "enter" while you scroll down).
        if (box.top < window.innerHeight || box.left >= window.innerWidth) {
          return;
        }
        hideForReveal(target);
        hidden.add(element);
        // Step 2: as soon as it enters the screen, reveal it.
        stops.push(
          inView(
            element,
            () => {
              hidden.delete(element);
              void playReveal(target);
            },
            { margin: "0px 0px -6% 0px" }
          )
        );
      },
      { margin: "0px 0px 30% 0px" }
    );
    stops.push(stopArm);
  }

  return () => {
    for (const stop of stops) {
      stop();
    }
    // Never leave anything hidden behind.
    for (const element of hidden) {
      clearRevealStyles(element);
    }
  };
};

/*
 * `data-follow` on a list: the item crossing the middle of the screen leads
 * and the others dim a little (CSS). Dimmed items stay readable.
 */
const keepFollowing = (): void => {
  // Leaving the middle band changes nothing: the item stays active until the
  // next one takes over.
};

const watchFollow = (main: HTMLElement): (() => void) => {
  const stops: (() => void)[] = [];
  for (const list of main.querySelectorAll<HTMLElement>("[data-follow]")) {
    const items = [...list.querySelectorAll<HTMLElement>(":scope > *")];
    if (items.length === 0) {
      continue;
    }
    const setActive = (active: Element) => {
      for (const item of items) {
        item.toggleAttribute("data-active", item === active);
      }
    };
    list.dataset.scrub = "";
    setActive(items[0]);
    const stop = inView(
      items,
      (item) => {
        setActive(item);
        // Returning a function keeps watching, so an item can lead again
        // when you scroll back to it.
        return keepFollowing;
      },
      { margin: "-45% 0px -45% 0px" }
    );
    stops.push(() => {
      stop();
      delete list.dataset.scrub;
      for (const item of items) {
        delete item.dataset.active;
      }
    });
  }
  return () => {
    for (const stop of stops) {
      stop();
    }
  };
};

/*
 * `data-count` on an element whose text is a whole number: it counts up from
 * zero the first time it is seen. The real number is in the HTML and is put
 * back on cleanup, so nothing depends on the animation.
 */
const watchCounts = (main: HTMLElement): (() => void) => {
  const stops: (() => void)[] = [];
  for (const element of main.querySelectorAll<HTMLElement>("[data-count]")) {
    const target = Number(element.textContent);
    if (!Number.isInteger(target)) {
      continue;
    }
    const showValue = (value: number) => {
      element.textContent = String(Math.round(value));
    };
    stops.push(
      inView(element, () => {
        animate(0, target, {
          delay: 0.3,
          duration: 1.4,
          ease: EASE_OUT,
          onUpdate: showValue,
        });
      }),
      () => showValue(target)
    );
  }
  return () => {
    for (const stop of stops) {
      stop();
    }
  };
};

/* `data-magnetic`: the element leans a few pixels toward the pointer. */
const watchMagnetic = (): (() => void) => {
  const stops: (() => void)[] = [];
  for (const element of document.querySelectorAll<HTMLElement>(
    "[data-magnetic]"
  )) {
    const move = (event: PointerEvent) => {
      const box = element.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      animate(element, { x: x * 10, y: y * 6 }, { duration: 0.3 });
    };
    const leave = () => {
      animate(
        element,
        { x: 0, y: 0 },
        { bounce: 0.4, duration: 0.5, type: "spring" }
      );
    };
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", leave);
    stops.push(() => {
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", leave);
      element.style.transform = "";
    });
  }
  return () => {
    for (const stop of stops) {
      stop();
    }
  };
};

/* `data-tilt`: the element turns slightly in 3D to follow the pointer. */
const watchTilt = (): (() => void) => {
  const stops: (() => void)[] = [];
  for (const element of document.querySelectorAll<HTMLElement>("[data-tilt]")) {
    const area = element.parentElement ?? element;
    const move = (event: PointerEvent) => {
      const box = area.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      animate(
        element,
        { rotateX: y * -10, rotateY: x * 14 },
        { duration: 0.6, ease: EASE_OUT }
      );
    };
    const leave = () => {
      animate(element, { rotateX: 0, rotateY: 0 }, { duration: 0.8 });
    };
    area.addEventListener("pointermove", move);
    area.addEventListener("pointerleave", leave);
    stops.push(() => {
      area.removeEventListener("pointermove", move);
      area.removeEventListener("pointerleave", leave);
      element.style.transform = "";
    });
  }
  return () => {
    for (const stop of stops) {
      stop();
    }
  };
};

export const SiteMotion = () => {
  const pathname = usePathname();
  const router = useRouter();
  const curtain = useRef<HTMLDivElement>(null);
  // Path the curtain was lowered from; null while the curtain is up.
  const curtainFrom = useRef<string | null>(null);
  const navigating = useRef(false);

  // Page motion: set up for each route, torn down when the route changes.
  useEffect(() => {
    navigating.current = false;
    const sheet = curtain.current;
    // Only lift the curtain once a navigation that lowered it has landed on
    // a new route; a first load never shows it.
    if (sheet && curtainFrom.current && curtainFrom.current !== pathname) {
      curtainFrom.current = null;
      // router.push() after the curtain lands at the top; jump to the
      // anchor (e.g. /carrera#mapa) while the curtain still covers the page.
      if (location.hash) {
        const id = decodeURIComponent(location.hash.slice(1));
        document
          .querySelector(`[id="${CSS.escape(id)}"]`)
          ?.scrollIntoView({ behavior: "instant" });
      }
      sheet.style.transformOrigin = "bottom";
      animate(sheet, { scaleY: 0 }, { duration: 0.5, ease: EASE_OUT });
    }
    const main = document.querySelector<HTMLElement>("main");
    if (!main || prefersReducedMotion()) {
      return;
    }
    const stops = [watchReveals(main), watchFollow(main), watchCounts(main)];
    if (hasFinePointer()) {
      stops.push(watchMagnetic(), watchTilt());
    }
    return () => {
      for (const stop of stops) {
        stop?.();
      }
    };
  }, [pathname]);

  // Route curtain: covers the page while the next route loads.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const lowerCurtain = async (href: string) => {
      const sheet = curtain.current;
      if (sheet) {
        sheet.style.transformOrigin = "top";
        curtainFrom.current = location.pathname;
        await animate(
          sheet,
          { scaleY: [0, 1] },
          { duration: CURTAIN_MS / 1000, ease: EASE_OUT }
        );
      }
      router.push(href);
      // Safety net: if the route never changes, lift the curtain anyway.
      clearTimeout(timer);
      timer = setTimeout(() => {
        navigating.current = false;
        curtainFrom.current = null;
        if (sheet) {
          animate(sheet, { scaleY: 0 }, { duration: 0.3 });
        }
      }, NAV_RESET_MS);
    };
    const click = (event: MouseEvent) => {
      const link =
        event.target instanceof Element ? event.target.closest("a") : null;
      if (
        !link ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        link.hasAttribute("download") ||
        (link.target && link.target !== "_self")
      ) {
        return;
      }
      const url = new URL(link.href);
      if (
        url.origin !== location.origin ||
        url.pathname === location.pathname ||
        prefersReducedMotion()
      ) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      if (navigating.current) {
        return;
      }
      navigating.current = true;
      void lowerCurtain(url.pathname + url.search + url.hash);
    };
    document.addEventListener("click", click, true);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", click, true);
    };
  }, [router]);

  return (
    <div ref={curtain} className="route-curtain" aria-hidden="true">
      <span>
        CSE<span className="curtain-symbol">{"{ }"}</span>
      </span>
    </div>
  );
};
