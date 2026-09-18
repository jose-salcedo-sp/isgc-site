import Link from "next/link";

import type { Dictionary } from "@/lib/dictionary";
import { localizedPath } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

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
      className="learning-story"
      aria-labelledby="story-title"
    >
      <div className="story-layout">
        <div className="story-stage">
          <span className="story-eyebrow">{story.eyebrow}</span>
          <h2 id="story-title">
            {story.line1}
            <br />
            {story.line2Before}
            <em>{story.line2Emphasis}</em>
          </h2>
          <div className="story-art" aria-hidden="true">
            <div className="story-grid" />
            <div className="story-orbit">
              <i />
              <i />
            </div>
            <div className="story-connection connection-one" />
            <div className="story-connection connection-two" />
            <div className="story-core">
              <span>{"{ }"}</span>
            </div>
            <div className="story-node node-one">01</div>
            <div className="story-node node-two">02</div>
            <div className="story-node node-three">03</div>
            <span className="story-art-caption">{story.caption}</span>
          </div>
        </div>
        <div className="story-steps">
          <div className="story-progress" aria-hidden="true">
            <div className="story-progress-fill" />
          </div>
          {story.steps.map((step) => (
            <article key={step.number} className="story-step">
              <span className="story-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
          <Link
            href={localizedPath(locale, "/proyectos")}
            className="story-link"
          >
            {story.cta} <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
