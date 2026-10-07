import Link from "next/link";

import type { Dictionary } from "@/lib/dictionary";
import { localizedPath } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

/*
 * "From an idea to something someone uses", told with one phone that goes
 * through the three steps: code being typed, a wireframe being drawn, and
 * the finished app being tapped. home-motion.tsx scrubs it with scroll.
 * Without JavaScript (or with reduced motion) the steps are a plain list and
 * the phone shows the finished app.
 */

// Illustrative code, typed one character at a time. Not translated: code
// reads the same in every language.
const CODE_LINES = [
  "const idea = observe(world)",
  "",
  "while (!works(idea)) {",
  "  idea = iterate(idea)",
  "}",
  "",
  "ship(idea)",
];

// The app screen: header, a camera view with a fossil spiral, three lines of
// text and a button. The same shapes are drawn as wireframe, then filled.
const SPIRAL =
  "M160 212c0-10 8-18 18-18s22 10 22 24-12 30-30 30-36-16-36-36 18-44 44-44 52 22 52 52";

const PhoneArt = () => (
  <svg viewBox="0 0 320 580" className="build-phone" aria-hidden="true">
    <rect
      x="6"
      y="6"
      width="308"
      height="568"
      rx="44"
      className="build-phone-frame"
    />
    <g className="build-code">
      {CODE_LINES.map((line, index) => (
        <text
          key={`${index}-${line}`}
          x="34"
          y={120 + index * 40}
          data-line={line}
        >
          {line}
        </text>
      ))}
      <rect className="build-caret" x="34" y="104" width="9" height="20" />
    </g>
    <g className="build-fill">
      <rect x="28" y="44" width="264" height="52" rx="14" fill="#8a1538" />
      <rect x="28" y="112" width="264" height="210" rx="22" fill="#1c1a1c" />
      <path
        d={SPIRAL}
        fill="none"
        stroke="#e2c58f"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect x="28" y="346" width="200" height="14" rx="7" fill="#f7f4ee" />
      <rect x="28" y="372" width="248" height="10" rx="5" fill="#ffffff59" />
      <rect x="28" y="392" width="168" height="10" rx="5" fill="#ffffff59" />
      <rect x="28" y="476" width="264" height="56" rx="28" fill="#e2c58f" />
      <circle className="build-tap" cx="160" cy="504" r="22" />
    </g>
    <g className="build-wire">
      <rect pathLength={1} x="28" y="44" width="264" height="52" rx="14" />
      <rect pathLength={1} x="28" y="112" width="264" height="210" rx="22" />
      <path pathLength={1} d={SPIRAL} />
      <path pathLength={1} d="M28 353h200M28 377h248M28 397h168" />
      <rect pathLength={1} x="28" y="476" width="264" height="56" rx="28" />
    </g>
  </svg>
);

export const LearningStory = ({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) => {
  const { story } = dict.pages.home;

  return (
    <section
      id="historia"
      className="build-story"
      aria-labelledby="story-title"
      data-reveal="off"
    >
      <div className="build-story-sticky">
        <div className="build-story-layout">
          <div className="build-story-text">
            <h2 id="story-title">
              {story.line1}
              <br />
              {story.line2Before}
              <em>{story.line2Emphasis}</em>
            </h2>
            <ol className="build-story-progress" aria-hidden="true">
              {story.steps.map((step) => (
                <li key={step.number}>
                  <span>{step.number}</span>
                  <i>
                    <b />
                  </i>
                </li>
              ))}
            </ol>
            <div className="build-story-steps">
              {story.steps.map((step) => (
                <article key={step.number} className="build-story-step">
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
            <Link
              href={localizedPath(locale, "/proyectos")}
              className="build-story-link"
            >
              {story.cta} <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="build-story-device">
            <PhoneArt />
          </div>
        </div>
      </div>
    </section>
  );
};
