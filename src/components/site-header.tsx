"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import type { Dictionary } from "@/lib/dictionary";
import { locales, localizedPath, stripLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export const SiteHeader = ({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const path = stripLocale(pathname);

  return (
    <header className="bg-tinto sticky top-0 z-50 text-white shadow-sm">
      <div className="mx-auto flex max-w-300 items-center justify-between gap-5 px-5 py-3 lg:px-6">
        <Link
          href={localizedPath(locale, "/")}
          className="flex shrink-0 items-center gap-3"
          aria-label={dict.common.homeAria}
        >
          <Image
            src="/isgc-logo-embedded.png"
            alt="ISGC"
            width={39}
            height={45}
            className="h-11 w-auto object-contain"
            priority
          />
          <span className="pl-1 leading-tight">
            <span className="block text-base font-bold tracking-[0.12em]">
              ISGC
            </span>
            <span className="text-xs text-white/70">
              {dict.brand.campusShort}
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label={dict.nav.mainAria}
        >
          {dict.nav.items.map((link) => (
            <Link
              key={link.href}
              href={localizedPath(locale, link.href)}
              className="rounded px-3 py-2 text-[15px] font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <nav aria-label={dict.common.language} className="hidden sm:flex">
            <ul className="flex items-center gap-1 text-xs font-semibold">
              {locales.map((item) => (
                <li key={item}>
                  <Link
                    href={localizedPath(item, path)}
                    hrefLang={item}
                    aria-current={item === locale ? "true" : undefined}
                    className={`rounded px-2 py-1 ${item === locale ? "bg-white/20 text-white" : "text-white/70 hover:text-white"}`}
                  >
                    {dict.locales[item]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link
            href={localizedPath(locale, "/aspirantes")}
            className="hidden rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/20 sm:inline-flex"
          >
            {dict.common.admissions} <span aria-hidden="true">↗</span>
          </Link>
          <Link
            href={localizedPath(locale, "/alumnos")}
            className="rounded px-2 py-2 text-sm font-semibold text-white lg:hidden"
          >
            {dict.common.students}
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/35 text-xl lg:hidden"
          >
            <span className="sr-only">{dict.nav.openMenu}</span>
            {open ? "×" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-navigation"
          className="px-5 py-3 lg:hidden"
          aria-label={dict.nav.mobileAria}
        >
          <div className="mx-auto grid max-w-300 gap-1">
            {dict.nav.items.map((link) => (
              <Link
                key={link.href}
                href={localizedPath(locale, link.href)}
                onClick={() => setOpen(false)}
                className="rounded px-3 py-3 font-semibold text-white/90 hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-wrap gap-2">
              {locales.map((item) => (
                <Link
                  key={item}
                  href={localizedPath(item, path)}
                  hrefLang={item}
                  className="rounded-full bg-white/10 px-3 py-2 text-sm font-semibold text-white"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  {dict.locales[item]}
                </Link>
              ))}
            </div>
            <Link
              href={localizedPath(locale, "/aspirantes")}
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-white/10 px-3 py-3 font-bold text-white"
            >
              {dict.common.admissions} <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};
