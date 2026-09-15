"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function HomeMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } });
      intro.from("#inicio .hero-title", { y: 35, opacity: 0 })
        .from("#inicio .hero-title ~ p, #inicio .hero-title ~ div", { y: 20, opacity: 0, stagger: 0.12 }, "-=0.6")
        .from("#inicio .lab-panel", { y: 35, rotation: 3, opacity: 0 }, "-=0.7");
      const paths = gsap.utils.toArray<SVGPathElement>("#inicio .lab-object path");
      paths.forEach((path) => {
        const length = path.getTotalLength();
        intro.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 1.4 }, 0.5);
      });
      gsap.to("#inicio .lab-object", {
        y: -16, rotation: 8, transformOrigin: "50% 50%", ease: "none",
        scrollTrigger: { trigger: "#inicio", start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.utils.toArray<HTMLElement>("#contenido > section:not(#inicio):not(#historia)").forEach((section) => {
        const targets = section.querySelectorAll("h2, article, .grid > a");
        targets.forEach((target) => gsap.from(target, {
          y: 28, opacity: 0, duration: 0.75, ease: "power2.out",
          scrollTrigger: { trigger: target, start: "top 94%", once: true },
          clearProps: "transform,opacity",
        }));
      });
      gsap.utils.toArray<HTMLElement>(".story-step").forEach((step) => {
        gsap.from(step.querySelectorAll(".story-number, h3, p"), {
          y: 24, opacity: 0, stagger: 0.12, duration: 0.7,
          scrollTrigger: { trigger: step, start: "top 85%", once: true },
        });
      });
      gsap.to(".story-progress-fill", {
        scaleY: 1, ease: "none",
        scrollTrigger: { trigger: ".story-steps", start: "top center", end: "bottom center", scrub: true },
      });
      return () => intro.kill();
    });
    media.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: ".story-steps", start: "top 65%", end: "bottom 65%", scrub: 0.8 },
      });
      timeline.fromTo(".story-orbit", { rotation: -45, scale: 0.65 }, { rotation: 90, scale: 1, duration: 2 }, 0)
        .fromTo(".story-core", { borderRadius: "50%", rotation: 0 }, { borderRadius: "18%", rotation: 180, duration: 2 }, 0)
        .fromTo(".story-node", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.12, duration: 0.5 }, 0.5)
        .fromTo(".story-connection", { scaleX: 0 }, { scaleX: 1, stagger: 0.1, duration: 0.5 }, 0.8);
    });
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts.ready.then(() => { if (document.querySelector("#historia")) refresh(); });
    return () => { window.removeEventListener("load", refresh); media.revert(); };
  }, []);
  return null;
}
