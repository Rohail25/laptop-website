"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  arrow?: boolean;
  cursor?: string;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full text-[13px] font-medium tracking-[0.08em] uppercase transition-colors duration-300 px-7 py-3.5 select-none";

const variants: Record<Variant, string> = {
  primary: "bg-cobalt text-white hover:bg-cobalt-deep shadow-[0_10px_30px_-10px_rgba(43,80,255,0.55)]",
  secondary:
    "border border-ink/15 bg-paper/60 text-ink hover:border-ink/35 hover:bg-paper",
  ghost: "text-graphite hover:text-ink",
};

function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      gsap.to(el, { x: dx * 0.18, y: dy * 0.22, duration: 0.4, ease: "power2.out" });
    };
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.55)" });
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, [reducedMotion]);

  return (
    <span ref={ref} className="inline-flex items-center gap-2.5">
      {children}
    </span>
  );
}

export function Button({
  children,
  href,
  variant = "primary",
  arrow = false,
  cursor = "OPEN",
  className = "",
  onClick,
  ariaLabel,
}: ButtonProps) {
  const inner = (
    <Magnetic>
      <span>{children}</span>
      {arrow && (
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
          className="transition-transform duration-300 ease-out group-hover:translate-x-1"
        >
          <path
            d="M1.5 8h12M9 3.5 13.5 8 9 12.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </Magnetic>
  );

  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    const isHash = href.startsWith("#");
    return (
      <Link
        href={href}
        aria-label={ariaLabel}
        data-cursor={cursor}
        className={cls}
        {...(isHash ? {} : { prefetch: true })}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" aria-label={ariaLabel} data-cursor={cursor} onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}
