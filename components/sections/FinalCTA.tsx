"use client";

import { Button } from "../ui/Button";
import { LaptopRender } from "../ui/LaptopRender";
import { Reveal } from "../ui/Reveal";

export function FinalCTA() {
  return (
    <section id="cta" className="grain relative overflow-hidden pb-10 pt-24 md:pt-32" aria-label="Get started">
      <div className="hairline-grid absolute inset-0" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-skywash/70 to-transparent" aria-hidden />

      <div className="container-mr relative flex flex-col items-center text-center">
        <Reveal y={12}>
          <p className="label-tech">The next chapter</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="display-tight mt-6 max-w-4xl text-[clamp(2.75rem,7vw,5.5rem)] text-ink">
            Ready for what&apos;s next<span className="text-cobalt">?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-6 max-w-md text-lg text-muted">Meet the new MR.</p>
        </Reveal>
        <Reveal delay={0.22}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
            <Button href="#collection" arrow>Explore laptops</Button>
            <Button href="#comparison" variant="secondary">Configure yours</Button>
          </div>
        </Reveal>

        <Reveal delay={0.3} className="mt-16 w-full">
          <LaptopRender
            accent="#2b50ff"
            float
            angle="-2deg"
            className="mx-auto w-full max-w-3xl drop-shadow-none"
          />
        </Reveal>
      </div>
    </section>
  );
}
