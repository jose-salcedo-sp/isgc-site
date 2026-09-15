"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { audienceFaqs, studentResources } from "@/content/site-content";

export function StudentResourceSearch({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.toLowerCase().trim();
  const visibleResources = useMemo(
    () => studentResources.filter((resource) => `${resource.label} ${resource.description} ${resource.group}`.toLowerCase().includes(normalizedQuery)),
    [normalizedQuery],
  );
  const groups = ["Estudio", "Trámites", "Desarrollo profesional"] as const;

  return (
    <div>
      <div className={`mb-7 ${compact ? "max-w-sm" : "max-w-xl"}`}>
        <label className="block">
          <span className="sr-only">Buscar recursos</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar un recurso" className="w-full rounded-full bg-white px-4 py-3 text-base placeholder:text-piedra/70 focus:border-tinto focus:outline-none focus:ring-2 focus:ring-[#5d1028]" />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {groups.map((group) => {
          const resources = visibleResources.filter((resource) => resource.group === group);
          if (resources.length === 0) return null;
          return (
            <div key={group} className="rounded-card bg-white p-6 shadow-soft/50">
              <h3 className="font-serif text-2xl text-grafito">{group}</h3>
              <ul className="mt-5 space-y-2">
                {resources.map((resource) => (
                  <li key={resource.label}>
                    {resource.external ? (
                      <a href={resource.href} target="_blank" rel="noreferrer" className="resource-card flex items-center justify-between gap-3 py-3 text-tinto">
                        <span><strong className="block font-semibold">{resource.label}</strong><span className="block text-sm text-piedra">{resource.description}</span></span>
                        <span className="resource-arrow shrink-0 text-dorado" aria-hidden="true">↗</span>
                      </a>
                    ) : (
                      <Link href={resource.href} className="resource-card flex items-center justify-between gap-3 py-3 text-tinto">
                        <span><strong className="block font-semibold">{resource.label}</strong><span className="block text-sm text-piedra">{resource.description}</span></span>
                        <span className="resource-arrow shrink-0 text-dorado" aria-hidden="true">→</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      {visibleResources.length === 0 && <p className="rounded-card border border-dashed border-piedra p-5 text-piedra">No encontramos ese recurso.</p>}
    </div>
  );
}

export function FaqAccordion({ audience = "all" }: { audience?: "all" | "aspirantes" | "alumnos" }) {
  const [open, setOpen] = useState<string | null>(null);
  const groups = audience === "all"
    ? [{ title: "Aspirantes", items: audienceFaqs.aspirantes }, { title: "Alumnos", items: audienceFaqs.alumnos }]
    : [{ title: audience === "aspirantes" ? "Aspirantes" : "Alumnos", items: audienceFaqs[audience] }];

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {groups.map((group) => (
        <div key={group.title} className="rounded-card bg-white p-6">
          <h3 className="py-4 font-serif text-2xl text-grafito">{group.title}</h3>
          {group.items.map((item) => {
            const key = `${group.title}-${item.question}`;
            const isOpen = open === key;
            return (
              <div key={key}>
                <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : key)} className="flex w-full items-center justify-between gap-6 py-5 text-left font-semibold text-grafito">
                  {item.question}<span className="text-2xl font-normal text-tinto" aria-hidden="true">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && <p className="max-w-2xl pb-5 pr-8 text-piedra">{item.answer}</p>}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
