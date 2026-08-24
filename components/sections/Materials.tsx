"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LaptopRender } from "../ui/LaptopRender";
import { Reveal } from "../ui/Reveal";
import { materials } from "../../config/site";
import { useReducedMotion } from "../../hooks/useReducedMotion";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function Materials() {
  const visualRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  /* Gentle scroll parallax on the close-up render */
  useEffect(() => {
    const el = visualRef.current;
    if (!el || reduced) return;
    const tween = gsap.fromTo(
      el,
      { yPercent: 6 },
      {
        yPercent: -6,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduced]);

  return (
    <section id="materials" className="relative overflow-hidden bg-paper py-24 md:py-32" aria-label="Design and materials">
      <div className="container-mr grid items-center gap-14 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
        {/* Visual */}
        <div className="relative">
          <div className="absolute inset-10 rounded-[3rem] bg-gradient-to-tr from-mist via-beige to-mist" aria-hidden />
          <div ref={visualRef} className="relative py-8">
            <LaptopRender accent="#2b50ff" angle="-2deg" className="mx-auto w-full max-w-xl" />
          </div>
          <span className="label-tech absolute bottom-0 left-2">Fig. 02 — Unibody, anodised silver</span>
        </div>

        {/* Copy */}
        <div>
          <Reveal y={12}>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-cobalt" aria-hidden />
              <p className="label-tech">Materials</p>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="display-tight mt-5 text-4xl text-ink sm:text-5xl lg:text-6xl">
              Designed to be seen<span className="text-cobalt">.</span>
            </h2>
          </Reveal>

          <ul role="list" className="mt-12 space-y-2">
            {materials.map((m) => (
              <li key={m.index}>
                <button
                  type="button"
                  data-cursor="VIEW"
                  className="group flex w-full items-start gap-5 rounded-2xl border border-transparent p-4 text-left transition-all duration-400 hover:border-line hover:bg-ivory hover:shadow-card"
                >
                  <span className="label-tech pt-1 transition-colors group-hover:!text-cobalt">{m.index}</span>
                  <span>
                    <span className="block font-semibold tracking-tight text-ink">{m.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted">{m.body}</span>
                  </span>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden
                    className="ml-auto mt-1.5 shrink-0 text-faint opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    <path d="M1.5 8h12M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
