"use client";

import { animate, inView, scroll, stagger } from "motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import { stripLocale } from "@/lib/i18n";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const CURTAIN_MS = 350;
const NAV_RESET_MS = 2500;

const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const ChapterVisual = ({ words }: { words: readonly string[] }) => (
  <div className="chapter-visual" aria-hidden="true">
    <div className="chapter-wire">
      <i />
      <i />
      <i />
    </div>
    <div className="chapter-words">
      {words.map((word, i) => (
        <span key={word}>
          <small>0{i + 1}</small>
          {word}
        </span>
      ))}
    </div>
    <div className="chapter-track">
      <i />
    </div>
  </div>
);

const playChapterIntro = (): void => {
  const heroCopy = document.querySelectorAll<HTMLElement>(
    "#contenido > section:first-of-type :is(h1, p)"
  );
  if (heroCopy.length) {
    animate(
      [...heroCopy],
      { opacity: [0, 1], y: [30, 0] },
      {
        delay: stagger(0.12, { startDelay: 0.2 }),
        duration: 0.85,
        ease: EASE_OUT,
      }
    );
  }
  const chapterWords = document.querySelectorAll<HTMLElement>(
    ".chapter-words > span"
  );
  if (chapterWords.length) {
    animate(
      [...chapterWords],
      { opacity: [0, 1], y: [35, 0] },
      {
        delay: stagger(0.15, { startDelay: 0.35 }),
        duration: 0.9,
        ease: EASE_OUT,
      }
    );
  }
};

const linkToScroll = (): (() => void)[] => {
  const stops: (() => void)[] = [];
  const wire = document.querySelector<HTMLElement>(".chapter-wire");
  const visual = document.querySelector<HTMLElement>(".chapter-visual");
  if (wire && visual) {
    stops.push(
      scroll(animate(wire, { rotate: [0, 90], scale: [1, 0.75] }), {
        offset: ["start 0.3", "end start"],
        target: visual,
      })
    );
  }
  const track = document.querySelector<HTMLElement>(".chapter-track i");
  const content = document.querySelector<HTMLElement>("#contenido");
  if (track && content) {
    stops.push(
      scroll(animate(track, { scaleX: [0.05, 1] }), { target: content })
    );
  }
  for (const image of document.querySelectorAll<HTMLElement>(
    "#contenido figure img"
  )) {
    stops.push(
      scroll(
        animate(image, {
          clipPath: [
            "inset(12% 0 12% 0 round 20px)",
            "inset(0% 0 0% 0 round 20px)",
          ],
        }),
        { offset: ["start 0.9", "center 0.55"], target: image }
      )
    );
  }
  return stops;
};

const revealSections = (): (() => void)[] => {
  const stops: (() => void)[] = [];
  const sections = document.querySelectorAll<HTMLElement>(
    "#contenido > section:not(:first-of-type)"
  );
  for (const section of sections) {
    const heading = section.querySelector("h2");
    if (heading) {
      stops.push(
        inView(heading, () => {
          animate(
            heading,
            { opacity: [0, 1], y: [30, 0] },
            { duration: 0.8, ease: EASE_OUT }
          );
        })
      );
    }
    const cards = section.querySelectorAll<HTMLElement>("article, .grid > a");
    for (const [index, card] of [...cards].entries()) {
      stops.push(
        inView(card, () => {
          animate(
            card,
            { opacity: [0, 1], rotate: [index % 2 ? 1 : -1, 0], y: [40, 0] },
            { duration: 0.75, ease: EASE_OUT }
          );
        })
      );
    }
  }
  return stops;
};

export const SiteMotion = () => {
  const pathname = usePathname();
  const router = useRouter();
  const curtain = useRef<HTMLDivElement>(null);
  const navigating = useRef(false);

  useEffect(() => {
    navigating.current = false;
    const active = new Set<HTMLElement>();
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const stops: (() => void)[] = [];
    if (!reduced()) {
      const sheet = curtain.current;
      if (sheet) {
        sheet.style.transformOrigin = "top";
        animate(sheet, { scaleY: [1, 0] }, { duration: 0.65, ease: EASE_OUT });
      }
      if (stripLocale(pathname) !== "/") {
        playChapterIntro();
        stops.push(...linkToScroll(), ...revealSections());
      }
    }

    const target = (event: Event) =>
      event.target instanceof Element
        ? event.target.closest<HTMLElement>("a, button")
        : null;
    const lift = (element: HTMLElement, on: boolean, pressed = false) => {
      if (reduced() || element.matches(":disabled")) {
        return;
      }
      active.add(element);
      animate(
        element,
        { scale: pressed ? 0.97 : 1, y: on ? -2 : 0 },
        { duration: 0.25, ease: EASE_OUT }
      );
      const icons = element.querySelectorAll<HTMLElement>(
        '[aria-hidden="true"], .resource-arrow'
      );
      if (icons.length) {
        animate(
          [...icons],
          { rotate: on ? -8 : 0, x: on ? 4 : 0, y: on ? -2 : 0 },
          { duration: 0.3 }
        );
      }
      element.classList.toggle("motion-active", on);
    };
    const enter = (event: Event) => {
      const el = target(event);
      if (el) {
        lift(el, true);
      }
    };
    const leave = (event: Event) => {
      const el = target(event);
      if (
        el &&
        !(
          event instanceof MouseEvent &&
          event.relatedTarget instanceof Node &&
          el.contains(event.relatedTarget)
        )
      ) {
        lift(el, false);
      }
    };
    const down = (event: Event) => {
      const el = target(event);
      if (el) {
        lift(el, true, true);
      }
    };
    const up = () => {
      for (const el of active) {
        lift(el, false);
      }
    };
    const drawCurtain = async (href: string) => {
      const sheet = curtain.current;
      if (sheet) {
        sheet.style.transformOrigin = "bottom";
        await animate(
          sheet,
          { scaleY: [0, 1] },
          { duration: CURTAIN_MS / 1000, ease: EASE_OUT }
        );
      }
      router.push(href);
      const timer = setTimeout(() => {
        navigating.current = false;
        if (sheet) {
          animate(sheet, { scaleY: 0 }, { duration: 0.3 });
        }
      }, NAV_RESET_MS);
      timers.add(timer);
    };
    const click = (event: MouseEvent) => {
      const link = target(event);
      if (
        !(link instanceof HTMLAnchorElement) ||
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
        reduced()
      ) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      if (navigating.current) {
        return;
      }
      navigating.current = true;
      void drawCurtain(url.pathname + url.search + url.hash);
    };
    document.addEventListener("pointerover", enter);
    document.addEventListener("pointerout", leave);
    document.addEventListener("focusin", enter);
    document.addEventListener("focusout", leave);
    document.addEventListener("pointerdown", down);
    document.addEventListener("pointerup", up);
    document.addEventListener("pointercancel", up);
    document.addEventListener("click", click, true);
    return () => {
      for (const stop of stops) {
        stop();
      }
      for (const timer of timers) {
        clearTimeout(timer);
      }
      for (const el of active) {
        el.classList.remove("motion-active");
      }
      document.removeEventListener("pointerover", enter);
      document.removeEventListener("pointerout", leave);
      document.removeEventListener("focusin", enter);
      document.removeEventListener("focusout", leave);
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("pointerup", up);
      document.removeEventListener("pointercancel", up);
      document.removeEventListener("click", click, true);
    };
  }, [pathname, router]);
  return (
    <div ref={curtain} className="route-curtain" aria-hidden="true">
      <span>
        ISGC<span className="curtain-symbol">{"{ }"}</span>
      </span>
    </div>
  );
};
