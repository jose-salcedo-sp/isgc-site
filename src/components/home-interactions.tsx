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
      <label className={`mb-12 block ${compact ? "max-w-sm" : "max-w-2xl"}`}>
        <span className="sr-only">{dict.resources.searchLabel}</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={dict.resources.placeholder}
          className="border-grafito/25 text-grafito placeholder:text-piedra/70 focus:border-tinto w-full border-b-2 bg-transparent py-3 text-2xl font-medium outline-none sm:text-3xl"
        />
      </label>
      <div className="grid gap-12">
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
              className="grid gap-4 md:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] md:gap-10"
            >
              <h3 className="text-grafito text-2xl md:pt-4">
                {dict.resources.groups[group]}
              </h3>
              <ul className="border-grafito/15 border-t">
                {grouped.map((resource, index) => (
                  <li
                    key={resource.label}
                    className="border-grafito/15 border-b"
                    data-reveal="sweep"
                    data-delay={index * 0.06}
                  >
                    {resource.external ? (
                      <a
                        href={resource.href}
                        target="_blank"
                        rel="noreferrer"
                        className="resource-row"
                      >
                        <strong className="text-grafito text-lg font-semibold">
                          {resource.label}
                        </strong>
                        <span className="text-piedra">
                          {resource.description}
                        </span>
                        <span className="resource-arrow" aria-hidden="true">
                          ↗
                        </span>
                      </a>
                    ) : (
                      <Link href={resource.href} className="resource-row">
                        <strong className="text-grafito text-lg font-semibold">
                          {resource.label}
                        </strong>
                        <span className="text-piedra">
                          {resource.description}
                        </span>
                        <span className="resource-arrow" aria-hidden="true">
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
        <p className="text-piedra text-lg">{dict.resources.empty}</p>
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
    <div className="grid gap-12">
      {groups.map((group) => (
        <div
          key={group.title}
          className="grid gap-4 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-16"
        >
          <h3 className="text-grafito text-2xl md:pt-5">{group.title}</h3>
          <div className="border-grafito/15 border-t">
            {group.items.map((item, index) => {
              const key = `${group.title}-${item.question}`;
              const panelId = `faq-${group.title}-${index}`;
              const isOpen = open === key;
              return (
                <div key={key} className="border-grafito/15 border-b">
                  <button
                    type="button"
                    aria-controls={panelId}
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : key)}
                    className="text-grafito hover:text-tinto flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-semibold sm:text-xl"
                  >
                    {item.question}
                    <span
                      className="text-tinto text-3xl leading-none font-normal"
                      aria-hidden="true"
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  <p
                    className="text-piedra max-w-2xl pr-10 pb-6 text-lg"
                    hidden={!isOpen}
                    id={panelId}
                  >
                    {item.answer}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
