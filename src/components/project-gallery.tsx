"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

import { ProjectModel } from "@/components/project-model";
import type { ProjectMedia } from "@/components/project-showcase";

const tabLabel = (media: ProjectMedia, index: number): string => {
  if (media.kind === "photo") {
    return `Foto ${index + 1}`;
  }
  return media.kind === "video" ? "Video" : "Modelo 3D";
};

const VideoStage = ({
  captions,
  poster,
  src,
  type,
}: {
  captions: string;
  poster: string;
  src: string;
  type: string;
}) => {
  const video = useRef<HTMLVideoElement>(null);

  // Switching tabs unmounts the player; stop the sound with it.
  useEffect(() => {
    const element = video.current;
    return () => {
      element?.pause();
    };
  }, []);

  return (
    <video
      aria-label="Video del proyecto"
      className="size-full object-cover"
      controls
      playsInline
      poster={poster}
      preload="none"
      ref={video}
    >
      <source src={src} type={type} />
      <track kind="captions" label="Español" src={captions} srcLang="es" />
      Tu navegador no puede reproducir este video.
    </video>
  );
};

const MediaGlyph = ({ media }: { media: ProjectMedia }) => {
  if (media.kind === "video") {
    return (
      <>
        <Image
          alt=""
          className="object-cover"
          fill
          sizes="96px"
          src={media.poster}
        />
        <span className="bg-grafito/40 absolute inset-0 grid place-items-center">
          <span className="bg-marfil grid size-8 place-items-center rounded-full">
            <svg
              aria-hidden="true"
              className="text-grafito size-3.5 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M9 6.5v11l9-5.5z" />
            </svg>
          </span>
        </span>
      </>
    );
  }

  return (
    <span className="bg-grafito absolute inset-0 grid place-items-center">
      <svg
        aria-hidden="true"
        className="size-8"
        fill="none"
        stroke="#e2c58f"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 48 48"
      >
        <path d="M24 5 42 15v18L24 43 6 33V15z" />
      </svg>
    </span>
  );
};

export const ProjectGallery = ({ media }: { media: ProjectMedia[] }) => {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const panelId = `${id}-panel`;
  const tabId = (index: number) => `${id}-tab-${index}`;
  const item = media[active];

  if (!item) {
    return null;
  }

  const select = (index: number) => {
    setActive(index);
    tabs.current[index]?.focus();
  };

  const onKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    const last = media.length - 1;
    let next = index;

    if (event.key === "ArrowRight") {
      next = index === last ? 0 : index + 1;
    } else if (event.key === "ArrowLeft") {
      next = index === 0 ? last : index - 1;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = last;
    } else {
      return;
    }

    event.preventDefault();
    select(next);
  };

  return (
    <div className="min-w-0">
      <div
        aria-labelledby={tabId(active)}
        className="lab-panel relative aspect-[16/10] overflow-hidden"
        id={panelId}
        role="tabpanel"
      >
        {item.kind === "photo" && (
          <Image
            alt={item.alt}
            className="object-cover"
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            src={item.src}
          />
        )}
        {item.kind === "video" && (
          <VideoStage
            captions={item.captions}
            poster={item.poster}
            src={item.src}
            type={item.type}
          />
        )}
        {item.kind === "model" && (
          <ProjectModel alt={item.alt} src={item.src} />
        )}
      </div>

      <p className="text-piedra mt-3 min-h-10 text-sm">{item.caption}</p>

      <div
        aria-label="Material del proyecto"
        aria-orientation="horizontal"
        className="mt-4 flex gap-3 overflow-x-auto pb-2"
        role="tablist"
      >
        {media.map((entry, index) => {
          const isActive = index === active;
          return (
            <button
              aria-controls={panelId}
              aria-label={tabLabel(entry, index)}
              aria-selected={isActive}
              className={`relative h-[4.5rem] w-24 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                isActive
                  ? "border-dorado"
                  : "border-transparent opacity-65 hover:opacity-100"
              }`}
              id={tabId(index)}
              key={`${entry.kind}-${entry.src}`}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              role="tab"
              tabIndex={isActive ? 0 : -1}
              type="button"
            >
              {entry.kind === "photo" ? (
                <Image
                  alt=""
                  className="object-cover"
                  fill
                  sizes="96px"
                  src={entry.src}
                />
              ) : (
                <MediaGlyph media={entry} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
