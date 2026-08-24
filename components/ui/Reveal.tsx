"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../../hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  stagger?: number;
  className?: string;
  selector?: string;
  once?: boolean;
}

/**
 * Viewport-triggered reveal. Animates the wrapper itself, or —
 * when `selector` is provided — its direct children in a stagger.
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
  selector,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reducedMotion) {
      gsap.set(selector ? el.querySelectorAll(selector) : el, { opacity: 1, y: 0 });
      return;
    }

    const targets = selector ? el.querySelectorAll(selector) : [el];
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          stagger: selector ? 0.09 : 0,
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay, y, selector, reducedMotion]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
