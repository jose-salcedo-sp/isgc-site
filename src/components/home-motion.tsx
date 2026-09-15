"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

export const HomeMotion = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const intro = gsap.timeline({
        defaults: { duration: 0.9, ease: "power3.out" },
      });
      intro
        .from("#inicio .hero-title", { opacity: 0, y: 35 })
        .from(
          "#inicio .hero-title ~ p, #inicio .hero-title ~ div",
          { opacity: 0, stagger: 0.12, y: 20 },
          "-=0.6"
        )
        .from(
          "#inicio .lab-panel",
          { opacity: 0, rotation: 3, y: 35 },
          "-=0.7"
        );
      const paths = gsap.utils.toArray<SVGPathElement>(
        "#inicio .lab-object path"
      );
      for (const path of paths) {
        const length = path.getTotalLength();
        intro.fromTo(
          path,
          { strokeDasharray: length, strokeDashoffset: length },
          { duration: 1.4, strokeDashoffset: 0 },
          0.5
        );
      }
      gsap.to("#inicio .lab-object", {
        ease: "none",
        rotation: 8,
        scrollTrigger: {
          end: "bottom top",
          scrub: 1,
          start: "top top",
          trigger: "#inicio",
        },
        transformOrigin: "50% 50%",
        y: -16,
      });
      const sections = gsap.utils.toArray<HTMLElement>(
        "#contenido > section:not(#inicio):not(#historia)"
      );
      for (const section of sections) {
        const targets = section.querySelectorAll("h2, article, .grid > a");
        for (const target of targets) {
          gsap.from(target, {
            clearProps: "transform,opacity",
            duration: 0.75,
            ease: "power2.out",
            opacity: 0,
            scrollTrigger: { once: true, start: "top 94%", trigger: target },
            y: 28,
          });
        }
      }
      for (const step of gsap.utils.toArray<HTMLElement>(".story-step")) {
        gsap.from(step.querySelectorAll(".story-number, h3, p"), {
          duration: 0.7,
          opacity: 0,
          scrollTrigger: { once: true, start: "top 85%", trigger: step },
          stagger: 0.12,
          y: 24,
        });
      }
      gsap.to(".story-progress-fill", {
        ease: "none",
        scaleY: 1,
        scrollTrigger: {
          end: "bottom center",
          scrub: true,
          start: "top center",
          trigger: ".story-steps",
        },
      });
      return () => intro.kill();
    });
    media.add(
      "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
      () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            end: "bottom 65%",
            scrub: 0.8,
            start: "top 65%",
            trigger: ".story-steps",
          },
        });
        timeline
          .fromTo(
            ".story-orbit",
            { rotation: -45, scale: 0.65 },
            { duration: 2, rotation: 90, scale: 1 },
            0
          )
          .fromTo(
            ".story-core",
            { borderRadius: "50%", rotation: 0 },
            { borderRadius: "18%", duration: 2, rotation: 180 },
            0
          )
          .fromTo(
            ".story-node",
            { opacity: 0, scale: 0 },
            { duration: 0.5, opacity: 1, scale: 1, stagger: 0.12 },
            0.5
          )
          .fromTo(
            ".story-connection",
            { scaleX: 0 },
            { duration: 0.5, scaleX: 1, stagger: 0.1 },
            0.8
          );
      }
    );
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const refreshAfterFonts = async () => {
      await document.fonts.ready;
      if (document.querySelector("#historia")) {
        refresh();
      }
    };
    void refreshAfterFonts();
    return () => {
      window.removeEventListener("load", refresh);
      media.revert();
    };
  }, []);
  return null;
};
