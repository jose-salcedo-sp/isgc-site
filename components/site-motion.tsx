"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const chapters: Record<string, [string, string, string]> = {
  "/carrera": ["Entiende", "Construye", "Comparte"],
  "/proyectos": ["Código", "Experiencia", "Impacto"],
  "/comunidad": ["Conecta", "Colabora", "Crea"],
  "/alumnos": ["Explora", "Resuelve", "Avanza"],
  "/aspirantes": ["Imagina", "Da el paso", "Empieza"],
  "/oportunidades": ["Construye", "Muéstralo", "Trasciende"],
};

export function ChapterVisual() {
  const pathname = usePathname();
  const words = chapters[pathname];
  if (!words) return null;
  return <div className="chapter-visual" aria-hidden="true">
    <div className="chapter-wire"><i /><i /><i /></div>
    <div className="chapter-words">{words.map((word, i) => <span key={word}><small>0{i + 1}</small>{word}</span>)}</div>
    <div className="chapter-track"><i /></div>
  </div>;
}

export function SiteMotion() {
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
    const ctx = gsap.context(() => {});
    const motion = () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(curtain.current, { scaleY: 1, transformOrigin: "top" }, { scaleY: 0, duration: 0.65, ease: "power4.inOut" });
      if (pathname !== "/") {
        gsap.from("#contenido > section:first-child h1, #contenido > section:first-child p", { y: 30, opacity: 0, stagger: 0.12, duration: 0.85, delay: 0.2, clearProps: "all" });
        gsap.from(".chapter-words > span", { y: 35, opacity: 0, stagger: 0.15, duration: 0.9, delay: 0.35 });
        gsap.to(".chapter-wire", { rotation: 90, scale: 0.75, ease: "none", scrollTrigger: { trigger: ".chapter-visual", start: "top 30%", end: "bottom top", scrub: 1 } });
        gsap.to(".chapter-track i", { scaleX: 1, ease: "none", scrollTrigger: { trigger: "#contenido", start: "top top", end: "bottom bottom", scrub: true } });
        document.querySelectorAll<HTMLElement>("#contenido > section:not(:first-child)").forEach((section) => {
          const heading = section.querySelector("h2");
          if (heading) gsap.from(heading, { y: 30, opacity: 0, duration: 0.8, scrollTrigger: { trigger: heading, start: "top 92%", once: true }, clearProps: "transform,opacity" });
          section.querySelectorAll("article, .grid > a").forEach((card, index) => {
            gsap.from(card, { y: 40, opacity: 0, rotation: index % 2 ? 1 : -1, duration: 0.75, scrollTrigger: { trigger: card, start: "top 96%", once: true }, clearProps: "transform,opacity" });
          });
          section.querySelectorAll("figure img").forEach((image) => gsap.fromTo(image, { clipPath: "inset(12% 0 12% 0 round 20px)" }, { clipPath: "inset(0% 0 0% 0 round 20px)", scrollTrigger: { trigger: image, start: "top 90%", end: "center 55%", scrub: 0.5 } }));
        });
      }
    });
    const target = (event: Event) => event.target instanceof Element ? event.target.closest<HTMLElement>("a, button") : null;
    const animate = (element: HTMLElement, on: boolean, pressed = false) => {
      if (!motion() || element.matches(":disabled")) return;
      active.add(element);
      ctx.add(() => {
        gsap.to(element, { y: on ? -2 : 0, scale: pressed ? 0.97 : 1, duration: 0.25, ease: "power2.out", overwrite: "auto" });
        const icons = element.querySelectorAll('[aria-hidden="true"], .resource-arrow');
        if (icons.length) gsap.to(icons, { x: on ? 4 : 0, y: on ? -2 : 0, rotation: on ? -8 : 0, duration: 0.3, overwrite: "auto" });
      });
      element.classList.toggle("motion-active", on);
    };
    const enter = (event: Event) => { const el = target(event); if (el) animate(el, true); };
    const leave = (event: Event) => {
      const el = target(event);
      if (el && !(event instanceof MouseEvent && event.relatedTarget instanceof Node && el.contains(event.relatedTarget))) animate(el, false);
    };
    const down = (event: Event) => { const el = target(event); if (el) animate(el, true, true); };
    const up = () => active.forEach(el => animate(el, false));
    const click = (event: MouseEvent) => {
      const link = target(event);
      if (!(link instanceof HTMLAnchorElement) || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
      const url = new URL(link.href);
      if (url.origin !== location.origin || url.pathname === location.pathname || !motion()) return;
      event.preventDefault();
      event.stopPropagation();
      if (navigating.current) return;
      navigating.current = true;
      ctx.add(() => gsap.fromTo(curtain.current, { scaleY: 0, transformOrigin: "bottom" }, { scaleY: 1, duration: 0.35, ease: "power3.inOut", onComplete: () => {
        router.push(url.pathname + url.search + url.hash);
        const timer = setTimeout(() => { navigating.current = false; gsap.to(curtain.current, { scaleY: 0, duration: 0.3 }); }, 2500);
        timers.add(timer);
      } }));
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
      media.revert(); ctx.revert(); timers.forEach(clearTimeout);
      active.forEach(el => el.classList.remove("motion-active"));
      document.removeEventListener("pointerover", enter); document.removeEventListener("pointerout", leave);
      document.removeEventListener("focusin", enter); document.removeEventListener("focusout", leave);
      document.removeEventListener("pointerdown", down); document.removeEventListener("pointerup", up); document.removeEventListener("pointercancel", up); document.removeEventListener("click", click, true);
    };
  }, [pathname, router]);
  return <div ref={curtain} className="route-curtain" aria-hidden="true"><span>ISGC<span className="curtain-symbol">{ "{ }" }</span></span></div>;
}
