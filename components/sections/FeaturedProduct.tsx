"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LaptopRender } from "../ui/LaptopRender";
import { Reveal } from "../ui/Reveal";
import { useIsTouch } from "../../hooks/useMediaQuery";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { createRig } from "../3d/rig";

const LaptopStage = dynamic(() => import("../3d/LaptopStage"), {
  ssr: false,
  loading: () => <LaptopRender className="mx-auto w-4/5 opacity-0" />,
});

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/** Counts up when scrolled into view. */
function Counter({ value, decimals = 0, className = "" }: { value: number; decimals?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      el.textContent = value.toFixed(decimals);
      return;
    }
    const proxy = { v: 0 };
    const tween = gsap.to(proxy, {
      v: value,
      duration: 1.6,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
      onUpdate: () => (el.textContent = proxy.v.toFixed(decimals)),
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value, decimals, reduced]);

  return <span ref={ref} className={className}>0</span>;
}

export function FeaturedProduct() {
  const rigRef = useRef(createRig());
  const isTouch = useIsTouch();
  const reduced = useReducedMotion();

  /* Viewport-triggered scene: rotate → open → light up. */
  useEffect(() => {
    if (isTouch || reduced) {
      Object.assign(rigRef.current, { lid: 78, screenOn: 1, glow: 0.35, intro: 1 });
      return;
    }
    const r = rigRef.current;
    Object.assign(r, { lid: 8, screenOn: 0, glow: 0, intro: 1 });
    const tl = gsap.timeline({
      scrollTrigger: { trigger: "#featured", start: "top 65%" },
      defaults: { ease: "power3.inOut" },
    });
    tl.to(r, { lid: 92, duration: 1.6 }, 0)
      .to(r, { screenOn: 1, duration: 0.7, ease: "power2.out" }, 0.9)
      .to(r, { glow: 0.55, duration: 0.6 }, 1.15);
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [isTouch, reduced]);

  return (
    <section id="featured" className="relative overflow-hidden bg-paper py-24 md:py-32" aria-label="Meet MR X1">
      <div className="container-mr grid items-center gap-14 lg:grid-cols-2">
        {/* Visual */}
        <div className="relative order-2 lg:order-1">
          <div
            className="absolute inset-8 rounded-[3rem] bg-gradient-to-br from-mist via-skywash to-mist"
            aria-hidden
          />
          {isTouch ? (
            <LaptopRender accent="#2b50ff" angle="-4deg" className="relative mx-auto w-full max-w-xl py-10" />
          ) : (
            <LaptopStage mode="hero" rigRef={rigRef} autoIntro={false} className="relative aspect-[4/3] w-full" />
          )}
          <span className="label-tech absolute bottom-2 left-2 hidden lg:block">Fig. 01 — MR X1</span>
        </div>

        {/* Copy */}
        <div className="order-1 lg:order-2">
          <Reveal y={12}>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-cobalt" aria-hidden />
              <p className="label-tech">Featured</p>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="display-tight mt-5 text-4xl text-ink sm:text-5xl lg:text-6xl">
              Meet MR&nbsp;X1.
              <span className="block text-muted">Ultra-thin. Exceptionally capable.</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-line pt-8">
            {[
              { v: 14.2, d: 1, unit: '"', label: 'Liquid Retina display' },
              { v: 10, d: 0, unit: '-core', label: 'M-class CPU' },
              { v: 18, d: 0, unit: ' hr', label: 'Battery life' },
            ].map((s) => (
              <div key={s.label}>
                <p className="display-tight text-3xl text-ink sm:text-4xl">
                  <Counter value={s.v} decimals={s.d} />
                  <span className="text-cobalt">{s.unit}</span>
                </p>
                <p className="mt-2 text-[13px] leading-snug text-faint">{s.label}</p>
              </div>
            ))}
          </div>

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-md leading-relaxed text-muted">
              A full professional workstation, milled from a single sheet of aluminum —
              silent under load, cool to the touch, and awake instantly all day.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
