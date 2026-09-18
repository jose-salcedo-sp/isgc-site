import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { hasLocale, localizedPath, negotiateLocale } from "@/lib/i18n";

const PUBLIC_FILE = /\.[^/]+$/u;

export const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  const firstSegment = pathname.split("/")[1] ?? "";
  if (hasLocale(firstSegment)) {
    return;
  }

  const locale = negotiateLocale(request.headers.get("accept-language"));
  const path = pathname === "/" ? "/" : pathname;
  request.nextUrl.pathname = localizedPath(locale, path);
  return NextResponse.redirect(request.nextUrl);
};

export const config = {
  matcher: ["/((?!_next|api|sitemap.xml|robots.txt).*)"],
};
