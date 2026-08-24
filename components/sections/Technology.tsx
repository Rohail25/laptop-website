"use client";

import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { technologies } from "../../config/site";

function Diagram({ kind }: { kind: (typeof technologies)[number]["diagram"] }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" } as const;
  return (
    <svg viewBox="0 0 120 64" className="h-16 w-full text-cobalt" aria-hidden>
      {kind === "airflow" && (
        <g {...common}>
          <circle cx="60" cy="32" r="10" />
          <g className="origin-center animate-spin-slower" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
            <path d="M60 24v16M52 32h16M54.3 26.3l11.4 11.4M65.7 26.3 54.3 37.7" />
          </g>
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              d={`M14 ${20 + i * 12}c18 ${-6 + i * 4} 34 ${-6 + i * 4} 92 ${-2 + i * 5}`}
              strokeDasharray="6 8"
              className="animate-dash-flow"
              opacity={0.35 - i * 0.08}
            />
          ))}
        </g>
      )}
      {kind === "nodes" && (
        <g {...common}>
          <path d="M30 44 60 20l30 22M30 44l30-2 30 2M60 20v22" opacity="0.3" />
          <circle cx="30" cy="44" r="5" className="animate-pulse-soft" />
          <circle cx="60" cy="20" r="5" className="animate-pulse-soft" style={{ animationDelay: "0.5s" }} fill="currentColor" fillOpacity="0.15" />
          <circle cx="90" cy="42" r="5" className="animate-pulse-soft" style={{ animationDelay: "1s" }} />
          <circle cx="60" cy="44" r="3" fill="currentColor" fillOpacity="0.3" />
        </g>
      )}
      {kind === "display" && (
        <g>
          <rect x="18" y="10" width="84" height="44" rx="5" {...common} />
          <rect x="24" y="16" width="72" height="32" rx="3" fill="#eef2ff" />
          <rect x="24" y="16" width="26" height="32" rx="3" fill="#2b50ff" fillOpacity="0.75">
            <animate attributeName="x" values="24;70;70;24" keyTimes="0;0.45;0.55;1" dur="3.2s" repeatCount="indefinite" />
          </rect>
          <path d="M48 62h24" {...common} opacity="0.4" />
        </g>
      )}
      {kind === "battery" && (
        <g {...common}>
          <rect x="22" y="18" width="68" height="28" rx="7" />
          <path d="M96 27v10" strokeWidth="4" opacity="0.5" />
          <rect x="28" y="24" width="13" height="16" rx="3" fill="currentColor" fillOpacity="0.85">
            <animate attributeName="opacity" values="0.25;1;1;0.25" dur="2.4s" repeatCount="indefinite" />
          </rect>
          <rect x="45" y="24" width="13" height="16" rx="3" fill="currentColor" fillOpacity="0.85">
            <animate attributeName="opacity" values="0.25;1;1;0.25" dur="2.4s" begin="0.4s" repeatCount="indefinite" />
          </rect>
          <rect x="62" y="24" width="13" height="16" rx="3" fill="currentColor" fillOpacity="0.85">
            <animate attributeName="opacity" values="0.25;1;1;0.25" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
          </rect>
        </g>
      )}
    </svg>
  );
}

export function Technology() {
  return (
    <section id="technology" className="relative overflow-hidden bg-paper py-24 md:py-32" aria-label="Technology">
      <div className="container-mr">
        <SectionHeading
          label="Technology"
          title={<>Engineered for what&apos;s next<span className="text-cobalt">.</span></>}
          body="Four systems, designed together, tuned as one."
        />

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {technologies.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.07}>
              <article
                data-cursor="VIEW"
                className="group relative h-full rounded-[1.5rem] border border-line bg-ivory p-7 transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-cobalt/25 hover:shadow-lift"
              >
                <div className="rounded-xl border border-line/70 bg-paper p-4 transition-colors duration-500 group-hover:bg-skywash/40">
                  <Diagram kind={t.diagram} />
                </div>
                <h3 className="mt-6 font-semibold tracking-tight text-ink">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t.body}</p>
                <span className="label-tech mt-6 block">MR/{String(i + 1).padStart(2, "0")}</span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
