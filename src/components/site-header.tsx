"use client";

import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import type { Dictionary } from "@/lib/dictionary";
import { locales, localizedPath, stripLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const flagLabels: Record<Locale, string> = {
  "en-GB": "UK",
  "en-US": "US",
  es: "ES",
};

const FlagIcon = ({ locale }: { locale: Locale }) => {
  if (locale === "es") {
    return (
      <svg
        viewBox="0 0 24 16"
        aria-hidden="true"
        className="h-4 w-6 rounded-[2px]"
      >
        <path fill="#006847" d="M0 0h8v16H0z" />
        <path fill="#fff" d="M8 0h8v16H8z" />
        <path fill="#ce1126" d="M16 0h8v16h-8z" />
        <circle cx="12" cy="8" r="2" fill="#8b5e3c" />
        <path fill="#006847" d="m10.2 8.6 1.8-.8 1.8.8-.4.7h-2.8z" />
        <path fill="#ce1126" d="m11.2 6.2.8.8.8-.8.4.5-.5 1.1h-1.4l-.5-1.1z" />
      </svg>
    );
  }

  if (locale === "en-GB") {
    return (
      <svg
        viewBox="0 0 24 16"
        aria-hidden="true"
        className="h-4 w-6 rounded-[2px]"
      >
        <path fill="#012169" d="M0 0h24v16H0z" />
        <path stroke="#fff" strokeWidth="4" d="m0 0 24 16M24 0 0 16" />
        <path stroke="#c8102e" strokeWidth="2" d="m0 0 24 16M24 0 0 16" />
        <path stroke="#fff" strokeWidth="6" d="M12 0v16M0 8h24" />
        <path stroke="#c8102e" strokeWidth="3" d="M12 0v16M0 8h24" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 16"
      aria-hidden="true"
      className="h-4 w-6 rounded-[2px]"
    >
      <path fill="#fff" d="M0 0h24v16H0z" />
      {[0, 4, 8, 12].map((y) => (
        <path key={y} fill="#b22234" d={`M0 ${y}h24v2H0z`} />
      ))}
      <path fill="#3c3b6e" d="M0 0h11v9H0z" />
      <path
        fill="#fff"
        d="M2 2h1v1H2zm3 0h1v1H5zm3 0h1v1H8zM3.5 4h1v1h-1zm3 0h1v1h-1zm-4 2h1v1h-1zm3 0h1v1h-1zm3 0h1v1H8z"
      />
    </svg>
  );
};

const LanguageSwitcher = ({
  dict,
  locale,
  path,
}: {
  dict: Dictionary;
  locale: Locale;
  path: string;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!(event.target instanceof Node)) {
        return;
      }
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) {
      return;
    }

    if (open) {
      gsap.fromTo(
        menu,
        { autoAlpha: 0, scale: 0.96, y: -8 },
        {
          autoAlpha: 1,
          duration: 0.28,
          ease: "power3.out",
          overwrite: true,
          scale: 1,
          y: 0,
        }
      );
    } else {
      gsap.to(menu, {
        autoAlpha: 0,
        duration: 0.2,
        ease: "power2.in",
        overwrite: true,
        scale: 0.98,
        y: -6,
      });
    }
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={dict.common.language}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-bold text-white transition hover:bg-white/20"
      >
        <FlagIcon locale={locale} />
        <span>{flagLabels[locale]}</span>
        <span
          aria-hidden="true"
          className={`text-[10px] transition-transform ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>
      <div
        ref={menuRef}
        role="menu"
        aria-label={dict.common.language}
        className="invisible absolute top-[calc(100%+10px)] right-0 z-20 min-w-48 origin-top-right rounded-2xl bg-[#30272a] p-2 opacity-0 shadow-2xl"
      >
        {locales.map((item) => (
          <Link
            key={item}
            href={localizedPath(item, path)}
            hrefLang={item}
            role="menuitem"
            aria-current={item === locale ? "true" : undefined}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${item === locale ? "bg-white/15 text-white" : "text-white/75 hover:bg-white/10 hover:text-white"}`}
          >
            <FlagIcon locale={item} />
            <span>{dict.locales[item]}</span>
            {item === locale && (
              <span className="ml-auto text-[#e2c58f]" aria-hidden="true">
                ✓
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

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
          <LanguageSwitcher dict={dict} locale={locale} path={path} />
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-xl lg:hidden"
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
