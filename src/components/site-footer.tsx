import Link from "next/link";

import { externalLinks } from "@/content/site-content";
import type { Dictionary } from "@/lib/dictionary";
import { localizedPath } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { org } from "@/lib/site";

export const SiteFooter = ({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) => (
  <footer className="bg-grafito py-10 text-white">
    <div className="mx-auto flex max-w-300 flex-col gap-8 px-5 lg:flex-row lg:items-end lg:justify-between lg:px-6">
      <div>
        <Link href={localizedPath(locale, "/")} className="font-serif text-3xl">
          ISGC
        </Link>
        <p className="mt-2 max-w-sm text-sm text-white/65">
          {dict.brand.footerBlurb}
        </p>
        <a
          href={`mailto:${org.coordinationEmail}`}
          className="decoration-dorado mt-3 inline-flex text-sm font-semibold text-white underline underline-offset-4"
        >
          {org.coordinationEmail}
        </a>
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
