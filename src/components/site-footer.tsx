import Link from "next/link";

import { externalLinks, faculty } from "@/content/site-content";
import type { Dictionary } from "@/lib/dictionary";
import { localizedPath } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export const SiteFooter = ({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) => (
  <footer className="bg-grafito sticky bottom-0 z-0 py-10 text-white">
    <div className="mx-auto flex max-w-300 flex-col gap-8 px-5 lg:flex-row lg:items-end lg:justify-between lg:px-6">
      <div>
        <Link
          href={localizedPath(locale, "/")}
          className="text-3xl font-bold tracking-[-0.025em]"
        >
          CSE
        </Link>
        <p className="mt-2 max-w-sm text-sm text-white/65">
          {dict.brand.footerBlurb}
        </p>
        <ul className="mt-3 grid gap-1 text-sm">
          {faculty.map((person) => (
            <li key={person.id}>
              <span className="text-white/65">
                {dict.faculty[person.id].role}:
              </span>{" "}
              <a
                href={`mailto:${person.email}`}
                className="decoration-dorado font-semibold text-white underline underline-offset-4"
              >
                {person.email}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/75">
        <a
          href={externalLinks.privacy}
          target="_blank"
          rel="noreferrer"
          className="hover:text-white"
        >
          {dict.common.privacy}
        </a>
        <a
          href={externalLinks.generalRegulations}
          target="_blank"
          rel="noreferrer"
          className="hover:text-white"
        >
          {dict.common.regulations}
        </a>
        <a
          href={externalLinks.instagram}
          target="_blank"
          rel="noreferrer"
          className="hover:text-white"
        >
          Instagram
        </a>
        <a
          href={externalLinks.facebook}
          target="_blank"
          rel="noreferrer"
          className="hover:text-white"
        >
          Facebook
        </a>
      </div>
    </div>
  </footer>
);
