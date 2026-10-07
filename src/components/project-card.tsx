import type { Dictionary } from "@/lib/dictionary";

/* Illustrations until the projects have their own photographs. Their strokes
   draw in when scrolled into view (data-reveal="draw" needs pathLength). */
const FossilArt = () => (
  <g fill="none" stroke="#e2c58f" strokeLinecap="round" data-reveal="draw">
    <g transform="translate(240 180) scale(1.3) translate(-245 -156)">
      <path
        pathLength={1}
        strokeWidth="1.5"
        d="M214 192L214 190L213 189L211 188L209 189L207 191L206 194L207 198L211 201L216 202L221 200L225 196L228 189L227 183L222 174L216 169L207 167L197 167L187 172L178 181L172 193L171 208L175 225L186 240L203 252L226 259L252 256L278 244L301 221L316 188L320 148L308 105L279 65L267 54"
      />
      <path
        pathLength={1}
        strokeOpacity=".55"
        d="M209 200L212 193M216 202L213 193M224 197L214 193M228 185L214 191M220 171L213 189M200 167L210 188M178 181L207 190M171 213L206 195M195 248L210 200M248 257L217 202M304 217L225 196M317 130L227 183"
      />
    </g>
    <path
      pathLength={1}
      strokeWidth="2"
      d="M72 60V40h28M380 40h28v20M408 300v20h-28M100 320H72v-20"
    />
  </g>
);

const dataPoints = [
  [96, 262],
  [118, 248],
  [140, 256],
  [162, 226],
  [184, 236],
  [206, 204],
  [228, 214],
  [250, 182],
  [272, 190],
  [294, 158],
  [316, 168],
  [338, 132],
  [360, 140],
  [382, 104],
] as const;

const DataArt = () => (
  <g data-reveal="draw">
    <path
      pathLength={1}
      stroke="#e2c58f"
      strokeOpacity=".5"
      d="M72 60v232h336"
      fill="none"
    />
    <path
      pathLength={1}
      stroke="#e08a9c"
      strokeOpacity=".8"
      strokeWidth="2"
      d="M90 270 392 96"
      fill="none"
    />
    {dataPoints.map(([x, y], index) => (
      <circle
        key={`${x}-${y}`}
        pathLength={1}
        cx={x}
        cy={y}
        r={index % 3 === 0 ? 7 : 4.5}
        fill={index % 3 === 0 ? "#e2c58f" : "none"}
        stroke="#e2c58f"
        strokeWidth="1.5"
      />
    ))}
  </g>
);

export const ProjectCard = ({
  index,
  project,
}: {
  index: number;
  project: Dictionary["projects"][number];
}) => (
  <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
    <div
      className={`lab-panel aspect-[4/3] ${index % 2 === 1 ? "lg:order-last" : ""}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 480 360" className="size-full" data-tilt>
        <defs>
          <pattern
            id={`project-grid-${index}`}
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M24 0H0V24"
              fill="none"
              stroke="#f7f4ee"
              strokeOpacity=".07"
            />
          </pattern>
        </defs>
        <path fill={`url(#project-grid-${index})`} d="M0 0h480v360H0z" />
        {index === 0 ? <FossilArt /> : <DataArt />}
      </svg>
    </div>
    <div>
      <h3 className="text-grafito text-4xl leading-[1.05] sm:text-5xl">
        {project.title}
      </h3>
      <p className="text-piedra mt-5 max-w-lg text-lg">{project.process}</p>
      <p className="text-grafito border-dorado mt-6 max-w-lg border-l-2 pl-4 text-lg font-medium">
        {project.learning}
      </p>
      <p className="text-piedra mt-6 text-sm">{project.caption}</p>
    </div>
  </article>
);
