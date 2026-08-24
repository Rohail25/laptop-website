"use client";

import dynamic from "next/dynamic";
import { useCallback, useRef, useState } from "react";
import gsap from "gsap";
import { LaptopRender } from "../ui/LaptopRender";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { useIsTouch } from "../../hooks/useMediaQuery";
import { createRig, LID_MAX, LID_MIN } from "../3d/rig";

const LaptopStage = dynamic(() => import("../3d/LaptopStage"), {
  ssr: false,
  loading: () => <LaptopRender className="mx-auto w-3/4 opacity-0" />,
});

export function InteractiveShowcase() {
  const rigRef = useRef(createRig());
  const [open, setOpen] = useState(true);
  const [trackpadHint, setTrackpadHint] = useState(false);
  const isTouch = useIsTouch();

  const toggleLid = useCallback(() => {
    const next = !open;
    setOpen(next);
    const r = rigRef.current;
    if (r) {
      gsap.to(r, {
        lid: next ? LID_MAX - 4 : LID_MIN,
        duration: 1.5,
        ease: "power3.inOut",
      });
      gsap.to(r, { screenOn: next ? 1 : 0.06, glow: next ? 0.45 : 0, duration: 0.8, ease: "power2.out", delay: next ? 0.55 : 0.15 });
    }
  }, [open]);

  return (
    <section id="showcase" className="grain relative overflow-hidden py-24 md:py-32" aria-label="Interactive 3D showcase">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_60%,rgba(43,80,255,0.07),transparent_65%)]" aria-hidden />
      <div className="container-mr relative">
        <SectionHeading
          align="center"
          label="Interactive"
          title={<>Look closer<span className="text-cobalt">.</span></>}
          body="Drag to orbit. Open the display. Run your cursor across the keyboard — every part of this model behaves like the machine itself."
        />

        {/* Stage */}
        <Reveal className="relative">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-3xl sm:aspect-[16/10]">
            {isTouch ? (
              <>
                <LaptopRender accent="#2b50ff" float angle="-2deg" className="absolute inset-x-6 top-1/2 mx-auto w-[calc(100%-3rem)] -translate-y-1/2" />
                <button type="button" onClick={toggleLid} data-cursor="OPEN"
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-line bg-paper px-5 py-2.5 text-[11px] font-semibold tracking-[0.16em] text-ink uppercase shadow-card transition-colors hover:border-cobalt/40 hover:text-cobalt">
                  {open ? "Close display" : "Open display"}
                </button>
              </>
            ) : (
              <>
                <LaptopStage mode="showcase" rigRef={rigRef} onTrackpadHover={setTrackpadHint} className="absolute inset-0" />
                <button
                  type="button"
                  onClick={toggleLid}
                  data-cursor="OPEN"
                  aria-pressed={open}
                  className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 rounded-full border border-line bg-paper/90 px-5 py-2.5 text-[11px] font-semibold tracking-[0.16em] text-ink uppercase shadow-card backdrop-blur transition-colors hover:border-cobalt/40 hover:text-cobalt"
                >
                  {open ? "Close display" : "Open display"}
                </button>
              </>
            )}

            {/* trackpad hint */}
            <span
              className={`label-tech pointer-events-none absolute right-2 top-2 rounded-full border px-3 py-1.5 transition-all duration-400 ${
                trackpadHint ? "border-cobalt/40 bg-skywash text-cobalt opacity-100" : "border-line bg-paper/70 opacity-0"
              }`}
              role="status"
            >
              Precision trackpad
            </span>
          </div>
        </Reveal>

        <p className="label-tech mt-8 text-center">Drag to explore · Scroll to zoom</p>
      </div>
    </section>
  );
}
