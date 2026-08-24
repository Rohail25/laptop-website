"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { LaptopRender } from "../ui/LaptopRender";
import { useIsTouch } from "../../hooks/useMediaQuery";
import { createRig } from "../3d/rig";

const LaptopStage = dynamic(() => import("../3d/LaptopStage"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center">
      <LaptopRender className="w-4/5 max-w-xl opacity-0" />
    </div>
  ),
});

export function Hero() {
  const rigRef = useRef(createRig());
  const isTouch = useIsTouch();

  return (
    <section className="grain relative flex min-h-[100svh] items-end overflow-hidden pt-16" aria-label="MR X1 hero">
      {/* backdrop */}
      <div className="hairline-grid absolute inset-0" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_68%_38%,rgba(43,80,255,0.08),transparent_65%)]" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/70 to-transparent" aria-hidden />

      <div className="container-mr relative grid w-full grid-cols-1 items-end gap-6 pb-16 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:pb-24">
        {/* Copy */}
        <div className="relative z-10 flex flex-col justify-center py-10 lg:py-0">
          <Reveal y={12}>
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-cobalt/25 bg-skywash px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-cobalt uppercase">
                New
              </span>
              <p className="label-tech">MR X1 · 2026</p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="display-tight mt-6 text-[clamp(3rem,8vw,5.75rem)] text-ink">
              Power,
              <br />
              beautifully
              <br />
              engineered<span className="text-cobalt">.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-muted">
              Professional performance. Designed for everyday life.
            </p>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-9 flex flex-wrap items-center gap-3.5">
              <Button href="#featured" arrow cursor="OPEN">Explore MR X1</Button>
              <Button href="#collection" variant="secondary" cursor="EXPLORE">Buy now</Button>
            </div>
          </Reveal>

          <Reveal delay={0.34}>
            <dl className="mt-12 hidden gap-10 border-t border-line pt-6 sm:flex">
              {[
                ["14.2″", "Display"],
                ["10-core", "CPU"],
                ["18 hr", "Battery"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="display-tight text-2xl text-ink">{v}</dd>
                  <dd className="label-tech mt-1">{l}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* 3D stage */}
        <div className="relative h-[46svh] min-h-[300px] sm:h-[54svh] lg:h-auto lg:self-stretch">
          <div className="absolute inset-0 lg:-inset-y-10">
            {isTouch ? (
              <LaptopRender accent="#2b50ff" angle="-3deg" className="absolute inset-x-0 top-1/2 mx-auto w-[86%] -translate-y-1/2" />
            ) : (
              <LaptopStage mode="hero" rigRef={rigRef} className="absolute inset-0" />
            )}
          </div>
          <p className="label-tech absolute right-2 top-2 hidden lg:block" aria-hidden>
            ↖ Interactive model
          </p>
        </div>
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex" aria-hidden>
        <span className="label-tech !text-[9px]">Scroll</span>
        <span className="relative block h-10 w-px overflow-hidden bg-line">
          <span className="animate-float-slow absolute inset-x-0 top-0 h-4 bg-cobalt" />
        </span>
      </div>
    </section>
  );
}
