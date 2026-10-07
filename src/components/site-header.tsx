"use client";

import {
  AnimatePresence,
  domMax,
  LazyMotion,
  m,
  MotionConfig,
} from "motion/react";
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
      if (
        event.key === "Escape" &&
        containerRef.current?.contains(document.activeElement)
      ) {
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

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={dict.common.language}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-bold text-white transition duration-300 hover:bg-white/20"
      >
        <FlagIcon locale={locale} />
        <span>{flagLabels[locale]}</span>
        <span
          aria-hidden="true"
          className={`text-[10px] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <m.div
            ref={menuRef}
            role="menu"
            aria-label={dict.common.language}
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -6 }}
            transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[calc(100%+10px)] right-0 z-20 min-w-48 origin-top-right rounded-2xl bg-[#30272a] p-2 shadow-2xl"
          >
            {locales.map((item) => (
              <Link
                key={item}
                href={localizedPath(item, path)}
                hrefLang={item}
                role="menuitem"
                aria-current={item === locale ? "true" : undefined}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition duration-300 ${item === locale ? "bg-white/15 text-white" : "text-white/75 hover:bg-white/10 hover:text-white"}`}
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
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

type NavItem = Dictionary["nav"]["items"][number];

const isCurrentPath = (path: string, href: string) =>
  path === href || path.startsWith(`${href}/`);

const DesktopNav = ({
  dict,
  locale,
  openIndex,
  path,
  setOpenIndex,
  setPanelHeight,
}: {
  dict: Dictionary;
  locale: Locale;
  openIndex: number | null;
  path: string;
  setOpenIndex: (index: number | null) => void;
  setPanelHeight: (height: number) => void;
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const items: NavItem[] = dict.nav.items;
  const currentIndex = items.findIndex((item) =>
    isCurrentPath(path, item.href)
  );
  const selectedIndex =
    hoverIndex ?? (currentIndex === -1 ? null : currentIndex);

  const open = (index: number) => {
    setHoverIndex(index);
    if (items[index].sections.length === 0) {
      setOpenIndex(null);
      setPanelHeight(0);
      return;
    }
    setOpenIndex(index);
    // Panels are always rendered (just invisible), so they can be measured.
    setPanelHeight(panelRefs.current[index]?.offsetHeight ?? 0);
  };

  const close = () => {
    setHoverIndex(null);
    setOpenIndex(null);
    setPanelHeight(0);
  };

  // Moving between an item's link and its panel keeps the panel open.
  const leave = (
    event: React.PointerEvent<HTMLElement> | React.FocusEvent<HTMLElement>
  ) => {
    const item = event.currentTarget.closest("[data-nav-item]");
    if (
      event.relatedTarget instanceof Node &&
      item?.contains(event.relatedTarget)
    ) {
      return;
    }
    close();
  };

  const closeOnEscape = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "Escape" && openIndex === index) {
      // Focus first: focusing the link reopens its panel.
      linkRefs.current[index]?.focus();
      setOpenIndex(null);
      setPanelHeight(0);
    }
  };

  // The list items are not positioned, so each panel is placed against the
  // whole bar and spans its full width while staying next to its link in
  // the tab order.
  return (
    <nav className="hidden h-full lg:block" aria-label={dict.nav.mainAria}>
      <ul className="flex h-full items-center gap-1">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `nav-panel-${index}`;
          const hasSections = item.sections.length > 0;
          return (
            <li key={item.href} className="h-full" data-nav-item>
              <Link
                ref={(node) => {
                  linkRefs.current[index] = node;
                }}
                href={localizedPath(locale, item.href)}
                aria-current={currentIndex === index ? "page" : undefined}
                aria-expanded={hasSections ? isOpen : undefined}
                aria-controls={hasSections ? panelId : undefined}
                onFocus={() => open(index)}
                onPointerEnter={(event) => {
                  // Touch taps just navigate; only a mouse opens on hover.
                  if (event.pointerType === "mouse") {
                    open(index);
                  }
                }}
                onPointerLeave={leave}
                onBlur={leave}
                onKeyDown={(event) => closeOnEscape(event, index)}
                onClick={close}
                className="nav-link relative flex h-full items-center px-5"
              >
                {selectedIndex === index && (
                  <m.span
                    layoutId="nav-selector"
                    className="absolute inset-x-0 top-[calc(50%-20px)] h-10 rounded-[10px] bg-white/[0.14]"
                    transition={{
                      bounce: 0.18,
                      duration: 0.9,
                      type: "spring",
                    }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </Link>
              {hasSections && (
                <div
                  ref={(node) => {
                    panelRefs.current[index] = node;
                  }}
                  id={panelId}
                  className="site-nav-panel"
                  data-open={isOpen}
                  onPointerLeave={leave}
                >
                  <div className="site-nav-panel-inner mx-auto grid max-w-300 grid-cols-[1fr_2fr] gap-10 px-6 pt-2">
                    <Link
                      href={localizedPath(locale, item.href)}
                      onClick={close}
                      onBlur={leave}
                      onKeyDown={(event) => closeOnEscape(event, index)}
                      className="nav-panel-title self-start border-t border-white/20 pt-6"
                    >
                      {item.label} <span aria-hidden="true">→</span>
                    </Link>
                    <ul className="grid grid-cols-2 gap-x-10 gap-y-3 border-t border-white/20 pt-6">
                      {item.sections.map((section) => (
                        <li key={section.id}>
                          <Link
                            href={localizedPath(
                              locale,
                              `${item.href}#${section.id}`
                            )}
                            onClick={close}
                            onBlur={leave}
                            onKeyDown={(event) => closeOnEscape(event, index)}
                            className="nav-panel-link block py-1"
                          >
                            {section.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

const MobileMenu = ({
  close,
  dict,
  locale,
  path,
}: {
  close: () => void;
  dict: Dictionary;
  locale: Locale;
  path: string;
}) => {
  const items: NavItem[] = dict.nav.items;
  return (
    <m.nav
      id="mobile-navigation"
      aria-label={dict.nav.mobileAria}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.44, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-card shadow-soft mt-2 max-h-[calc(100dvh-6.5rem)] overflow-y-auto bg-white p-3 lg:hidden"
      data-lenis-prevent
    >
      <ul className="grid gap-1">
        {items.map((item) => {
          const isCurrent = isCurrentPath(path, item.href);
          return (
            <li key={item.href} className="py-1">
              <Link
                href={localizedPath(locale, item.href)}
                aria-current={isCurrent ? "page" : undefined}
                onClick={close}
                className="nav-sheet-link block rounded-[10px] px-3 py-2"
              >
                {item.label}
              </Link>
              {item.sections.length > 0 && (
                <ul className="mt-0.5 grid">
                  {item.sections.map((section) => (
                    <li key={section.id}>
                      <Link
                        href={localizedPath(
                          locale,
                          `${item.href}#${section.id}`
                        )}
                        onClick={close}
                        className="nav-sheet-sublink block rounded-[10px] px-3 py-1.5"
                      >
                        {section.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
      <Link
        href={localizedPath(locale, "/aspirantes")}
        onClick={close}
        className="nav-sheet-cta mt-3 flex items-center justify-between rounded-full px-5 py-3"
      >
        {dict.common.admissions} <span aria-hidden="true">↗</span>
      </Link>
    </m.nav>
  );
};

const IDLE_HIDE_MS = 3500;
const LEAVE_TOP_GRACE_MS = 1500;

export const SiteHeader = ({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [panelHeight, setPanelHeight] = useState(0);
  const [atTop, setAtTop] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [pointerNearTop, setPointerNearTop] = useState(false);
  // Last time the user scrolled up or moved the mouse near the bar.
  const lastActivity = useRef(0);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const path = stripLocale(pathname);
  const inUse = menuOpen || openIndex !== null || pointerNearTop;

  // Close menus after navigation. Link onClick is not enough: the route
  // curtain in site-motion.tsx intercepts clicks before they reach React.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
    setOpenIndex(null);
    setPanelHeight(0);
  }

  // Scroll: leave the top state, hide while scrolling down, show on scroll up.
  useEffect(() => {
    let lastY = window.scrollY;
    // When the page leaves the top state, keep the floating bar visible for a
    // moment so the user sees the shrink before it slides away.
    let leftTopAt = 0;
    let wasAtTop = lastY < 8;
    const onScroll = () => {
      const y = window.scrollY;
      const isAtTop = y < 8;
      setAtTop(isAtTop);
      if (isAtTop) {
        setHidden(false);
      } else if (wasAtTop) {
        leftTopAt = Date.now();
      }
      wasAtTop = isAtTop;
      if (Math.abs(y - lastY) < 8) {
        return;
      }
      const inGracePeriod = Date.now() - leftTopAt < LEAVE_TOP_GRACE_MS;
      if (y > lastY && y > 120 && !inGracePeriod) {
        setHidden(true);
      }
      if (y < lastY) {
        setHidden(false);
        lastActivity.current = Date.now();
      }
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Desktop: bring the bar back when the mouse approaches the top edge.
  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        return;
      }
      const near = event.clientY < 110;
      setPointerNearTop(near);
      if (near) {
        setHidden(false);
        lastActivity.current = Date.now();
      }
    };
    document.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => document.removeEventListener("pointermove", onPointerMove);
  }, []);

  // Idle: away from the top and not in use, the bar slides away after a
  // while. Recent activity pushes the deadline back.
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (atTop || hidden || inUse || reduceMotion) {
      return;
    }
    lastActivity.current = Date.now();
    let timer: ReturnType<typeof setTimeout>;
    const check = () => {
      const idleFor = Date.now() - lastActivity.current;
      if (idleFor >= IDLE_HIDE_MS) {
        setHidden(true);
      } else {
        timer = setTimeout(check, IDLE_HIDE_MS - idleFor);
      }
    };
    timer = setTimeout(check, IDLE_HIDE_MS);
    return () => clearTimeout(timer);
  }, [atTop, hidden, inUse]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="site-nav">
      <LazyMotion features={domMax}>
        <MotionConfig reducedMotion="user">
          <div
            className="site-nav-shell fixed inset-x-0 top-0 z-50"
            data-floating={!atTop}
            data-hidden={hidden && !inUse}
            data-expanded={openIndex !== null}
          >
            <div className="site-nav-shadow" aria-hidden="true">
              <div
                className="site-nav-surface"
                style={{ height: `calc(var(--nav-h) + ${panelHeight}px)` }}
              />
            </div>
            <div className="site-nav-row relative mx-auto flex max-w-300 items-center justify-between gap-4 px-5 text-white lg:px-6">
              <Link
                href={localizedPath(locale, "/")}
                className="flex shrink-0 items-center gap-3 rounded-[10px]"
                aria-label={dict.common.homeAria}
              >
                <Image
                  src="/isgc-logo-embedded.png"
                  alt="CSE"
                  width={39}
                  height={45}
                  className="h-10 w-auto object-contain"
                  priority
                />
                <span className="leading-tight">
                  <span className="block text-base font-bold tracking-[0.12em]">
                    CSE
                  </span>
                  <span className="text-xs text-white/70">
                    {dict.brand.campusShort}
                  </span>
                </span>
              </Link>

              <DesktopNav
                dict={dict}
                locale={locale}
                openIndex={openIndex}
                path={path}
                setOpenIndex={setOpenIndex}
                setPanelHeight={setPanelHeight}
              />

              <div className="flex items-center gap-3">
                <LanguageSwitcher dict={dict} locale={locale} path={path} />
                <Link
                  href={localizedPath(locale, "/aspirantes")}
                  aria-current={path === "/aspirantes" ? "page" : undefined}
                  className="nav-cta hidden rounded-full px-4 py-2 sm:inline-flex"
                >
                  {dict.common.admissions}
                </Link>
                <button
                  ref={menuButtonRef}
                  type="button"
                  aria-expanded={menuOpen}
                  aria-controls="mobile-navigation"
                  onClick={() => setMenuOpen((value) => !value)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 hover:bg-white/10 lg:hidden"
                >
                  <span className="sr-only">{dict.nav.openMenu}</span>
                  <span
                    aria-hidden="true"
                    className="menu-icon"
                    data-open={menuOpen}
                  >
                    <i />
                    <i />
                  </span>
                </button>
              </div>
            </div>
            <div className="relative mx-auto max-w-300 px-2">
              <AnimatePresence>
                {menuOpen && (
                  <MobileMenu
                    close={() => setMenuOpen(false)}
                    dict={dict}
                    locale={locale}
                    path={path}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </MotionConfig>
      </LazyMotion>
    </header>
  );
};
