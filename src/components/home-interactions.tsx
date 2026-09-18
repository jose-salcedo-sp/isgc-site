"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { Dictionary } from "@/lib/dictionary";
import { localizedPath } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const groupOrder = ["study", "procedures", "career"] as const;

export const StudentResourceSearch = ({
  compact = false,
  dict,
  locale,
  resources,
}: {
  compact?: boolean;
  dict: Dictionary;
  locale: Locale;
  resources: readonly {
    external?: boolean;
    href: string;
    id: string;
  }[];
}) => {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.toLowerCase().trim();
  const visibleResources = useMemo(() => {
    const copy = Object.fromEntries(
      dict.resources.items.map((item) => [item.id, item])
    );
    return resources.flatMap((resource) => {
      const item = copy[resource.id];
      if (!item) {
        return [];
      }
      const group = groupOrder.find((candidate) => candidate === item.group);
      if (!group) {
        return [];
      }
      const haystack =
        `${item.label} ${item.description} ${dict.resources.groups[group]}`.toLowerCase();
      if (normalizedQuery && !haystack.includes(normalizedQuery)) {
        return [];
      }
      return [
        {
          description: item.description,
          external: resource.external,
          group,
          href: resource.external
            ? resource.href
            : localizedPath(locale, resource.href),
          label: item.label,
        },
      ];
    });
  }, [dict, locale, normalizedQuery, resources]);
  return (
    <div>
      <div className={`mb-7 ${compact ? "max-w-sm" : "max-w-xl"}`}>
        <label className="block">
          <span className="sr-only">{dict.resources.searchLabel}</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={dict.resources.placeholder}
            className="placeholder:text-piedra/70 focus:border-tinto w-full rounded-full bg-white px-4 py-3 text-base focus:ring-2 focus:ring-[#5d1028] focus:outline-none"
          />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {groupOrder.map((group) => {
          const grouped = visibleResources.filter(
            (resource) => resource.group === group
          );
          if (grouped.length === 0) {
            return null;
          }
          return (
            <div
              key={group}
              className="rounded-card shadow-soft/50 bg-white p-6"
            >
              <h3 className="text-grafito font-serif text-2xl">
                {dict.resources.groups[group]}
              </h3>
              <ul className="mt-5 space-y-2">
                {grouped.map((resource) => (
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
          {dict.resources.empty}
        </p>
      )}
    </div>
  );
};

export const FaqAccordion = ({
  groups,
}: {
  groups: {
    items: { answer: string; question: string }[];
    title: string;
  }[];
}) => {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {groups.map((group) => (
        <div key={group.title} className="rounded-card bg-white p-6">
          <h3 className="text-grafito py-4 font-serif text-2xl">
            {group.title}
          </h3>
          {group.items.map((item, index) => {
            const key = `${group.title}-${item.question}`;
            const panelId = `faq-${group.title}-${index}`;
            const isOpen = open === key;
            return (
              <div key={key}>
                <button
                  type="button"
                  aria-controls={panelId}
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
                <p
                  className="text-piedra max-w-2xl pr-8 pb-5"
                  hidden={!isOpen}
                  id={panelId}
                >
                  {item.answer}
                </p>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
