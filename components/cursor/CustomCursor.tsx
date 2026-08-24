"use client";

import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";

type CursorState = "default" | "VIEW" | "OPEN" | "ROTATE" | "EXPLORE";

/**
 * Premium two-part cursor: precise dot + trailing thin ring that
 * morphs into a labelled disc over interactive targets.
 * Desktop (fine pointer) only.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [label, setLabel] = useState<CursorState>("default");
  const finePointer = useMediaQuery("(pointer: fine)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = finePointer && !reducedMotion;

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("has-custom-cursor");

    const pos = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let scale = 1;
    let targetScale = 1;
    let visible = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!visible) {
        visible = true;
        ring.x = pos.x;
        ring.y = pos.y;
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest?.("[data-cursor]");
      const value = (target?.getAttribute("data-cursor") as CursorState | null) ?? "default";
      setLabel(value);
      targetScale = value === "default" ? 1 : 2.6;
    };

    const onDown = () => (targetScale *= 0.82);
    const onUp = () => (targetScale /= 0.82);

    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.16;
      ring.y += (pos.y - ring.y) * 0.16;
      scale += (targetScale - scale) * 0.18;

      if (dotRef.current)
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  useEffect(() => {
    if (labelRef.current) {
      labelRef.current.textContent = label === "default" ? "" : label;
    }
  }, [label]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block">
      {/* trailing ring / labelled disc */}
      <div
        ref={ringRef}
        className={`absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300 ${
          label === "default"
            ? "border-ink/35 bg-transparent"
            : "border-cobalt/70 bg-cobalt text-white"
        }`}
      >
        <span
          ref={labelRef}
          className="text-[8px] font-semibold tracking-[0.18em] uppercase opacity-0 transition-opacity duration-200 data-[show=true]:opacity-100"
          data-show={label !== "default"}
        />
      </div>
      {/* center dot */}
      <div ref={dotRef} className="absolute left-0 top-0 h-1 w-1 rounded-full bg-ink" />
    </div>
  );
}
