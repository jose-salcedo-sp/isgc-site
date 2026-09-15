"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { primaryNavigation } from "@/content/site-content";

export const SiteHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-tinto sticky top-0 z-50 text-white shadow-sm">
      <div className="mx-auto flex max-w-300 items-center justify-between gap-5 px-5 py-3 lg:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
          aria-label="ISGC, inicio"
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
            <span className="text-xs text-white/70">UP · Guadalajara</span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Navegación principal"
        >
          {primaryNavigation.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded px-3 py-2 text-[15px] font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/aspirantes"
            className="hidden rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/20 sm:inline-flex"
          >
            Admisiones <span aria-hidden="true">↗</span>
          </Link>
          <Link
            href="/alumnos"
            className="rounded px-2 py-2 text-sm font-semibold text-white lg:hidden"
          >
            Alumnos
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/35 text-xl lg:hidden"
          >
            <span className="sr-only">Abrir menú</span>
            {open ? "×" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-navigation"
          className="px-5 py-3 lg:hidden"
          aria-label="Navegación móvil"
        >
          <div className="mx-auto grid max-w-300 gap-1">
            {primaryNavigation.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded px-3 py-3 font-semibold text-white/90 hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/aspirantes"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-white/10 px-3 py-3 font-bold text-white"
            >
              Admisiones <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};
