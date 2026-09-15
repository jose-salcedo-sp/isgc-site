import Link from "next/link";

import { externalLinks } from "@/content/site-content";

export const SiteFooter = () => (
  <footer className="bg-grafito py-10 text-white">
    <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-5 lg:flex-row lg:items-end lg:justify-between lg:px-6">
      <div>
        <Link href="/" className="font-serif text-3xl">
          ISGC
        </Link>
        <p className="mt-2 max-w-sm text-sm text-white/65">
          Ingeniería en Sistemas y Gráficas Computacionales · Universidad
          Panamericana Guadalajara.
        </p>
        <a
          href="mailto:arodrig@up.edu.mx"
          className="decoration-dorado mt-3 inline-flex text-sm font-semibold text-white underline underline-offset-4"
        >
          arodrig@up.edu.mx
        </a>
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/75">
        <a
          href={externalLinks.privacy}
          target="_blank"
          rel="noreferrer"
          className="hover:text-white"
        >
          Privacidad
        </a>
        <a
          href={externalLinks.generalRegulations}
          target="_blank"
          rel="noreferrer"
          className="hover:text-white"
        >
          Reglamentos
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
