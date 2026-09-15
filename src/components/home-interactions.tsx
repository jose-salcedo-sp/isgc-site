"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { audienceFaqs, studentResources } from "@/content/site-content";

const resourceGroups = [
  "Estudio",
  "Trámites",
  "Desarrollo profesional",
] as const;

export const StudentResourceSearch = ({
  compact = false,
}: {
  compact?: boolean;
}) => {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.toLowerCase().trim();
  const visibleResources = useMemo(
    () =>
      studentResources.filter((resource) =>
        `${resource.label} ${resource.description} ${resource.group}`
          .toLowerCase()
          .includes(normalizedQuery)
      ),
    [normalizedQuery]
  );
  return (
    <div>
      <div className={`mb-7 ${compact ? "max-w-sm" : "max-w-xl"}`}>
        <label className="block">
          <span className="sr-only">Buscar recursos</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar un recurso"
            className="placeholder:text-piedra/70 focus:border-tinto w-full rounded-full bg-white px-4 py-3 text-base focus:ring-2 focus:ring-[#5d1028] focus:outline-none"
          />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {resourceGroups.map((group) => {
          const resources = visibleResources.filter(
            (resource) => resource.group === group
          );
          if (resources.length === 0) {
            return null;
          }
          return (
            <div
              key={group}
              className="rounded-card shadow-soft/50 bg-white p-6"
            >
              <h3 className="text-grafito font-serif text-2xl">{group}</h3>
              <ul className="mt-5 space-y-2">
                {resources.map((resource) => (
                  <li key={resource.label}>
                    {resource.external ? (
                      <a
                        href={resource.href}
                        target="_blank"
                        rel="noreferrer"
                        className="resource-card text-tinto flex items-center justify-between gap-3 py-3"
                      >
                        <span>
                          <strong className="block font-semibold">
                            {resource.label}
                          </strong>
                          <span className="text-piedra block text-sm">
                            {resource.description}
                          </span>
                        </span>
                        <span
                          className="resource-arrow text-dorado shrink-0"
                          aria-hidden="true"
                        >
                          ↗
                        </span>
                      </a>
                    ) : (
                      <Link
                        href={resource.href}
                        className="resource-card text-tinto flex items-center justify-between gap-3 py-3"
                      >
                        <span>
                          <strong className="block font-semibold">
                            {resource.label}
                          </strong>
                          <span className="text-piedra block text-sm">
                            {resource.description}
                          </span>
                        </span>
                        <span
                          className="resource-arrow text-dorado shrink-0"
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      {visibleResources.length === 0 && (
        <p className="rounded-card border-piedra text-piedra border border-dashed p-5">
          No encontramos ese recurso.
        </p>
      )}
    </div>
  );
};

export const FaqAccordion = ({
  audience = "all",
}: {
  audience?: "all" | "aspirantes" | "alumnos";
}) => {
  const [open, setOpen] = useState<string | null>(null);
  const groups =
    audience === "all"
      ? [
          { items: audienceFaqs.aspirantes, title: "Aspirantes" },
          { items: audienceFaqs.alumnos, title: "Alumnos" },
        ]
      : [
          {
            items: audienceFaqs[audience],
            title: audience === "aspirantes" ? "Aspirantes" : "Alumnos",
          },
        ];

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {groups.map((group) => (
        <div key={group.title} className="rounded-card bg-white p-6">
          <h3 className="text-grafito py-4 font-serif text-2xl">
            {group.title}
          </h3>
          {group.items.map((item) => {
            const key = `${group.title}-${item.question}`;
            const isOpen = open === key;
            return (
              <div key={key}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : key)}
                  className="text-grafito flex w-full items-center justify-between gap-6 py-5 text-left font-semibold"
                >
                  {item.question}
                  <span
                    className="text-tinto text-2xl font-normal"
                    aria-hidden="true"
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <p className="text-piedra max-w-2xl pr-8 pb-5">
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
