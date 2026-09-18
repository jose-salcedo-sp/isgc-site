import { notFound } from "next/navigation";

import enGB from "@/dictionaries/en-GB.json";
import enUS from "@/dictionaries/en-US.json";
import es from "@/dictionaries/es.json";
import { hasLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export type Dictionary = typeof es;

const dictionaries: Record<Locale, Dictionary> = {
  "en-GB": enGB,
  "en-US": enUS,
  es,
};

export const getDictionary = (locale: string): Dictionary => {
  if (!hasLocale(locale)) {
    notFound();
  }
  return dictionaries[locale];
};
