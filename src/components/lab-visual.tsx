import Link from "next/link";

import type { Dictionary } from "@/lib/dictionary";
import { localizedPath } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export const LabVisual = ({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) => (
  <div className="lab-panel">
    <svg
      viewBox="0 0 480 260"
      className="lab-scene w-full"
      aria-label={dict.pages.home.lab.aria}
    >
      <defs>
        <pattern
          id="lab-grid"
          width="32"
          height="32"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M32 0H0V32"
            fill="none"
            stroke="currentColor"
            strokeOpacity=".12"
          />
        </pattern>
      </defs>
      <path fill="url(#lab-grid)" d="M0 0h480v260H0z" />
      <g
        fill="none"
        stroke="#e2c58f"
        strokeWidth="1.5"
        strokeLinejoin="round"
        className="lab-object"
      >
        <path
          fill="#b08d4f"
          fillOpacity=".08"
          d="m240 35 96 55v110l-96 55-96-55V90Z"
        />
        <path d="m144 90 96 55 96-55M240 145v110M240 35v110m-96 55 96-55 96 55M192 62v110l96 55M288 62v110l-96 55M144 145l96 55 96-55" />
        <circle cx="240" cy="145" r="5" fill="#e2c58f" />
      </g>
    </svg>
    <div className="p-5">
      <p className="text-lg font-bold">{dict.pages.home.lab.text}</p>
      <Link
        href={localizedPath(locale, "/proyectos")}
        className="mt-4 inline-flex items-center gap-4 font-semibold text-white underline decoration-[#e2c58f] underline-offset-4"
      >
        {dict.pages.home.lab.cta} <span aria-hidden="true">→</span>
      </Link>
    </div>
  </div>
);
