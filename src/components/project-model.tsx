"use client";

import { useEffect, useRef, useState } from "react";

import { createModelViewer } from "@/components/project-model-scene";

type ModelStatus = "idle" | "loading" | "ready" | "error";

const ModelBackdrop = () => (
  <div
    aria-hidden="true"
    className="bg-grafito absolute inset-0 grid place-items-center"
  >
    <svg
      className="size-20 opacity-60"
      fill="none"
      stroke="#e2c58f"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 48 48"
    >
      <path d="M24 5 42 15v18L24 43 6 33V15z" />
    </svg>
  </div>
);

export const ProjectModel = ({ alt, src }: { alt: string; src: string }) => {
  const [status, setStatus] = useState<ModelStatus>("idle");
  const canvas = useRef<HTMLCanvasElement>(null);
  const dispose = useRef<(() => void) | null>(null);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      dispose.current?.();
    };
  }, []);

  // The button disappears once the model is ready; hand the focus to the
  // canvas so keyboard users do not land back at the top of the page.
  useEffect(() => {
    if (status === "ready") {
      canvas.current?.focus();
    }
  }, [status]);

  const start = async () => {
    const element = canvas.current;
    if (!element) {
      return;
    }
    setStatus("loading");
    try {
      const viewer = await createModelViewer({
        canvas: element,
        lowPower: window.matchMedia("(pointer: coarse)").matches,
        src,
      });
      if (!viewer) {
        setStatus("error");
        return;
      }
      if (!alive.current) {
        viewer.dispose();
        return;
      }
      dispose.current = viewer.dispose;
      setStatus("ready");
    } catch {
      if (alive.current) {
        setStatus("error");
      }
    }
  };

  return (
    <div aria-busy={status === "loading"} className="relative size-full">
      <canvas
        aria-hidden={status !== "ready"}
        aria-label={alt}
        className="size-full"
        ref={canvas}
        tabIndex={status === "ready" ? 0 : -1}
      />

      {status !== "ready" && (
        <div className="absolute inset-0">
          <ModelBackdrop />
          <div className="absolute inset-0 grid place-items-center p-6 text-center">
            {status === "idle" && (
              <div className="max-w-xs">
                <p className="text-xs font-bold tracking-[0.18em] text-[#e2c58f] uppercase">
                  Modelo 3D
                </p>
                <button
                  className="text-grafito hover:bg-marfil mt-4 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 font-bold"
                  onClick={() => {
                    void start();
                  }}
                  type="button"
                >
                  Explorar en 3D <span aria-hidden="true">↗</span>
                </button>
                <p className="mt-3 text-sm text-white/70">
                  Arrastra para girar. Rueda para acercar.
                </p>
              </div>
            )}

            {status === "loading" && (
              <output className="block font-semibold text-white">
                Cargando modelo 3D…
              </output>
            )}

            {status === "error" && (
              <output className="block max-w-xs text-white">
                No se pudo cargar el modelo.{" "}
                <a
                  className="text-[#e2c58f] underline underline-offset-4"
                  download
                  href={src}
                >
                  Descarga el archivo .glb
                </a>
                .
              </output>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
