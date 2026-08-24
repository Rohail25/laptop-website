"use client";

import { useState } from "react";
import { LaptopRender } from "../ui/LaptopRender";
import { Reveal } from "../ui/Reveal";
import { performanceStats } from "../../config/site";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type Part = "cpu" | "gpu" | "ram" | "ssd" | "battery";

const parts: Record<Part, { label: string; pos: [string, string]; title: string; value: string; body: string }> = {
  cpu: {
    label: "CPU",
    pos: ["46%", "26%"],
    title: "10-core CPU",
    value: "4.9 GHz boost",
    body: "Eight performance cores and two efficiency cores schedule work invisibly. Renders finish before the fan would have spun up.",
  },
  gpu: {
    label: "GPU",
    pos: ["63%", "33%"],
    title: "8-core GPU",
    value: "3.6 TFLOPS",
    body: "Hardware ray tracing and mesh shading in a fanless-class envelope. Final Cut exports run 2.1× faster than the previous generation.",
  },
  ram: {
    label: "RAM",
    pos: ["36%", "31%"],
    title: "32GB unified memory",
    value: "120 GB/s",
    body: "One pool of bandwidth shared by CPU, GPU and neural engine. Zero copy overhead between them.",
  },
  ssd: {
    label: "SSD",
    pos: ["60%", "79%"],
    title: "2TB SSD",
    value: "7.4 GB/s read",
    body: "Encrypted NVMe storage soldered directly onto the logic board. Projects open instantly, even at 8K.",
  },
  battery: {
    label: "Battery",
    pos: ["40%", "81%"],
    title: "18-hour battery",
    value: "70 Wh silicon-anode",
    body: "A full workday plus the commute. 30 minutes on the charger returns 50%.",
  },
};

export function Performance() {
  const [selected, setSelected] = useState<Part>("cpu");
  const part = parts[selected];
  const statsRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  /* Count-up stats when entering viewport */
  useEffect(() => {
    if (reduced || !statsRef.current) return;
    const els = statsRef.current.querySelectorAll<HTMLElement>("[data-count]");
    const tweens = Array.from(els).map((el) => {
      const end = Number(el.dataset.count ?? 0);
      const proxy = { v: 0 };
      return gsap.to(proxy, {
        v: end,
        duration: 1.7,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
        onUpdate: () => (el.textContent = String(Math.round(proxy.v))),
      });
    });
    return () => tweens.forEach((t) => {
      t.scrollTrigger?.kill();
      t.kill();
    });
  }, [reduced]);

  return (
    <section id="performance" className="grain relative overflow-hidden py-24 md:py-32" aria-label="Performance">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_30%,rgba(43,80,255,0.06),transparent_65%)]" aria-hidden />
      <div className="container-mr relative">
        <Reveal y={12} className="text-center">
          <p className="label-tech">Performance</p>
          <h2 className="display-tight mx-auto mt-5 max-w-3xl text-4xl text-ink sm:text-5xl lg:text-6xl">
            Power without compromise<span className="text-cobalt">.</span>
          </h2>
        </Reveal>

        {/* Interactive diagram */}
        <div className="relative mx-auto mt-14 max-w-3xl md:mt-20">
          <LaptopRender accent="#2b50ff" float={!reduced} className="relative z-0 mx-auto w-full max-w-2xl" />

          {/* hotspots */}
          {(Object.keys(parts) as Part[]).map((key) => {
            const p = parts[key];
            const active = key === selected;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelected(key)}
                onMouseEnter={() => setSelected(key)}
                aria-pressed={active}
                data-cursor="VIEW"
                className="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: p.pos[0], top: p.pos[1] }}
              >
                <span className={`relative flex h-4 w-4 items-center justify-center rounded-full border transition-all duration-300 ${active ? "border-cobalt bg-cobalt/15 scale-110" : "border-ink/25 bg-paper/90 group-hover:border-cobalt group-hover:scale-110"}`}>
                  <span className={`h-1 w-1 rounded-full transition-colors ${active ? "bg-cobalt" : "bg-graphite group-hover:bg-cobalt"}`} />
                  {active && <span className="animate-pulse-soft absolute inset-0 rounded-full border border-cobalt" aria-hidden />}
                </span>
                <span className={`label-tech absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap !text-[9px] transition-colors ${active ? "!text-cobalt" : ""}`}>
                  {p.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* detail panel */}
        <div key={selected} className="animate-fade-up mx-auto mt-10 max-w-xl rounded-[1.5rem] border border-line bg-paper p-7 shadow-card">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-lg font-semibold tracking-tight text-ink">{part.title}</h3>
            <span className="font-mono text-sm text-cobalt">{part.value}</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">{part.body}</p>
        </div>

        {/* count-up strip */}
        <div ref={statsRef} className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-y-10 border-t border-line pt-12 sm:grid-cols-4">
          {performanceStats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="display-tight text-4xl text-ink sm:text-5xl">
                <span data-count={s.value}>0</span>
                <span className="text-lg text-cobalt">{s.suffix}</span>
              </p>
              <p className="label-tech mt-2 !tracking-[0.16em]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
