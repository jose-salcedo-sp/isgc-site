"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const chapters = {
  "/alumnos": ["Explora", "Resuelve", "Avanza"],
  "/aspirantes": ["Imagina", "Da el paso", "Empieza"],
  "/carrera": ["Entiende", "Construye", "Comparte"],
  "/comunidad": ["Conecta", "Colabora", "Crea"],
  "/oportunidades": ["Construye", "Muéstralo", "Trasciende"],
  "/proyectos": ["Código", "Experiencia", "Impacto"],
} satisfies Record<string, [string, string, string]>;

export const ChapterVisual = () => {
  const pathname = usePathname();
  // SAFETY: `Object.hasOwn` confirms `pathname` is one of the `chapters` keys.
  const words: readonly string[] | undefined = Object.hasOwn(chapters, pathname)
    ? chapters[pathname as keyof typeof chapters]
    : undefined;
  if (!words) {
    return null;
  }
  return (
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
};

export const SiteMotion = () => {
  const pathname = usePathname();
  const router = useRouter();
  const curtain = useRef<HTMLDivElement>(null);
  const navigating = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    navigating.current = false;
    const media = gsap.matchMedia();
    const active = new Set<HTMLElement>();
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const ctx = gsap.context();
    const motion = () =>
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        curtain.current,
        { scaleY: 1, transformOrigin: "top" },
        { duration: 0.65, ease: "power4.inOut", scaleY: 0 }
      );
      if (pathname !== "/") {
        gsap.from(
          "#contenido > section:first-child h1, #contenido > section:first-child p",
          {
            clearProps: "all",
            delay: 0.2,
            duration: 0.85,
            opacity: 0,
            stagger: 0.12,
            y: 30,
          }
        );
        gsap.from(".chapter-words > span", {
          delay: 0.35,
          duration: 0.9,
          opacity: 0,
          stagger: 0.15,
          y: 35,
        });
        gsap.to(".chapter-wire", {
          ease: "none",
          rotation: 90,
          scale: 0.75,
          scrollTrigger: {
            end: "bottom top",
            scrub: 1,
            start: "top 30%",
            trigger: ".chapter-visual",
          },
        });
        gsap.to(".chapter-track i", {
          ease: "none",
          scaleX: 1,
          scrollTrigger: {
            end: "bottom bottom",
            scrub: true,
            start: "top top",
            trigger: "#contenido",
          },
        });
        const sections = document.querySelectorAll<HTMLElement>(
          "#contenido > section:not(:first-child)"
        );
        for (const section of sections) {
          const heading = section.querySelector("h2");
          if (heading) {
            gsap.from(heading, {
              clearProps: "transform,opacity",
              duration: 0.8,
              opacity: 0,
              scrollTrigger: {
                once: true,
                start: "top 92%",
                trigger: heading,
              },
              y: 30,
            });
          }
          const cards = section.querySelectorAll("article, .grid > a");
          for (const [index, card] of [...cards].entries()) {
            gsap.from(card, {
              clearProps: "transform,opacity",
              duration: 0.75,
              opacity: 0,
              rotation: index % 2 ? 1 : -1,
              scrollTrigger: {
                once: true,
                start: "top 96%",
                trigger: card,
              },
              y: 40,
            });
          }
          for (const image of section.querySelectorAll("figure img")) {
            gsap.fromTo(
              image,
              { clipPath: "inset(12% 0 12% 0 round 20px)" },
              {
                clipPath: "inset(0% 0 0% 0 round 20px)",
                scrollTrigger: {
                  end: "center 55%",
                  scrub: 0.5,
                  start: "top 90%",
                  trigger: image,
                },
              }
            );
          }
        }
      }
    });
    const target = (event: Event) =>
      event.target instanceof Element
        ? event.target.closest<HTMLElement>("a, button")
        : null;
    const animate = (element: HTMLElement, on: boolean, pressed = false) => {
      if (!motion() || element.matches(":disabled")) {
        return;
      }
      active.add(element);
      ctx.add(() => {
        gsap.to(element, {
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
          scale: pressed ? 0.97 : 1,
          y: on ? -2 : 0,
        });
        const icons = element.querySelectorAll(
          '[aria-hidden="true"], .resource-arrow'
        );
        if (icons.length) {
          gsap.to(icons, {
            duration: 0.3,
            overwrite: "auto",
            rotation: on ? -8 : 0,
            x: on ? 4 : 0,
            y: on ? -2 : 0,
          });
        }
      });
      element.classList.toggle("motion-active", on);
    };
    const enter = (event: Event) => {
      const el = target(event);
      if (el) {
        animate(el, true);
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
        animate(el, false);
      }
    };
    const down = (event: Event) => {
      const el = target(event);
      if (el) {
        animate(el, true, true);
      }
    };
    const up = () => {
      for (const el of active) {
        animate(el, false);
      }
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
        !motion()
      ) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      if (navigating.current) {
        return;
      }
      navigating.current = true;
      ctx.add(() =>
        gsap.fromTo(
          curtain.current,
          { scaleY: 0, transformOrigin: "bottom" },
          {
            duration: 0.35,
            ease: "power3.inOut",
            onComplete: () => {
              router.push(url.pathname + url.search + url.hash);
              const timer = setTimeout(() => {
                navigating.current = false;
                gsap.to(curtain.current, { duration: 0.3, scaleY: 0 });
              }, 2500);
              timers.add(timer);
            },
            scaleY: 1,
          }
        )
      );
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
      media.revert();
      ctx.revert();
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
