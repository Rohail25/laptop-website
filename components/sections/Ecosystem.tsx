"use client";

import { useRef } from "react";
import { Reveal } from "../ui/Reveal";
import { accessories, formatPrice, type Accessory } from "../../config/site";

function Glyph({ type }: { type: Accessory["glyph"] }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <svg viewBox="0 0 96 96" className="h-20 w-20 text-graphite transition-colors duration-400 group-hover:text-cobalt" aria-hidden>
      {type === "monitor" && (
        <g {...common}>
          <rect x="14" y="18" width="68" height="42" rx="4" />
          <path d="M40 74h16M48 60v14M24 78h48" />
          <path d="M20 52c8-6 14-2 20-8s10-10 16-6" opacity="0.35" />
        </g>
      )}
      {type === "dock" && (
        <g {...common}>
          <rect x="12" y="38" width="72" height="22" rx="8" />
          <path d="M26 49h.5M34 49h.5M70 45v8M62 45v8" />
          <path d="M30 60v8M66 60v8" opacity="0.4" />
        </g>
      )}
      {type === "keyboard" && (
        <g {...common}>
          <rect x="10" y="32" width="76" height="32" rx="6" />
          {[0, 1, 2].map((r) =>
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((c) => (
              <rect key={`${r}-${c}`} x={17 + c * 5.4} y={38 + r * 7.4} width="3.6" height="3.6" rx="1" opacity="0.45" fill="currentColor" stroke="none" />
            )),
          )}
          <path d="M36 57h24" />
        </g>
      )}
      {type === "mouse" && (
        <g {...common}>
          <rect x="32" y="16" width="32" height="56" rx="16" />
          <path d="M48 16v14M32 34h32" opacity="0.4" />
          <path d="M44 26h.5" />
        </g>
      )}
      {type === "headphones" && (
        <g {...common}>
          <path d="M22 58v-8a26 26 0 0152 0v8" />
          <rect x="16" y="54" width="12" height="22" rx="5" />
          <rect x="68" y="54" width="12" height="22" rx="5" />
        </g>
      )}
      {type === "sleeve" && (
        <g {...common}>
          <rect x="14" y="28" width="68" height="44" rx="6" />
          <path d="M14 40h68" opacity="0.4" />
          <path d="M38 28l-6 12M58 28l6 12" opacity="0.25" />
        </g>
      )}
    </svg>
  );
}

export function Ecosystem() {
  const rowRef = useRef<HTMLUListElement>(null);

  const nudge = (dir: number) => {
    rowRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section id="ecosystem" className="relative py-24 md:py-32" aria-label="Accessories and ecosystem">
      <div className="container-mr">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <Reveal y={12}>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-cobalt" aria-hidden />
                <p className="label-tech">Ecosystem</p>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="display-tight mt-5 text-4xl text-ink sm:text-5xl">
                The space around
                <span className="block text-muted">your laptop.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => nudge(-1)} aria-label="Scroll accessories left" data-cursor="OPEN"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper text-graphite transition-all hover:border-ink/40 hover:text-ink">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M14.5 8h-12M7 3.5 2.5 8 7 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button type="button" onClick={() => nudge(1)} aria-label="Scroll accessories right" data-cursor="OPEN"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper text-graphite transition-all hover:border-ink/40 hover:text-ink">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M1.5 8h12M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </Reveal>
        </div>

        <ul ref={rowRef} role="list"
          className="scroll-row -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 md:-mx-10 md:px-10">
          {accessories.map((a) => (
            <li key={a.id} className="w-[240px] shrink-0 snap-start">
              <article
                data-cursor="VIEW"
                className="group relative h-full rounded-[1.5rem] border border-line bg-paper p-6 shadow-card transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1.5 hover:border-cobalt/25 hover:shadow-lift"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex h-32 items-center justify-center rounded-xl bg-mist/60 transition-colors duration-500 group-hover:bg-skywash/50">
                  <Glyph type={a.glyph} />
                </div>
                <h3 className="mt-5 font-semibold tracking-tight text-ink">{a.name}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-sm text-muted">{formatPrice(a.price)}</p>
                  <button type="button" data-cursor="OPEN"
                    className="translate-y-1 rounded-full border border-line px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.14em] text-graphite uppercase opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:border-cobalt hover:text-cobalt">
                    Quick view
                  </button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
