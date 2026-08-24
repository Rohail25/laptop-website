"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navLinks, brand } from "../../config/site";

function Icon({ path, label }: { path: string; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      data-cursor="OPEN"
      className="hidden h-9 w-9 items-center justify-center rounded-full text-graphite transition-colors hover:bg-ink/5 hover:text-ink md:flex"
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d={path} />
      </svg>
    </button>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (menuRef.current) {
      menuRef.current.style.opacity = open ? "1" : "0";
      menuRef.current.style.visibility = open ? "visible" : "hidden";
      const links = menuRef.current.querySelectorAll("a");
      links.forEach((a, i) => {
        a.style.transitionDelay = open ? `${120 + i * 60}ms` : "0ms";
        a.style.transform = open ? "translateY(0)" : "translateY(18px)";
        a.style.opacity = open ? "1" : "0";
      });
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-line/80 bg-ivory/75 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-mr flex h-16 items-center justify-between">
          <Link href="/" data-cursor="VIEW" aria-label={`${brand.fullName} home`}
            className="flex items-baseline gap-1.5">
            <span className="text-lg font-extrabold tracking-tight text-ink">MR</span>
            <span className="label-tech !text-[9px] !tracking-[0.3em]">Laptops</span>
          </Link>

          <nav aria-label="Primary" className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                data-cursor="VIEW"
                className="relative text-[13px] font-medium text-graphite transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-cobalt after:transition-all after:duration-300 hover:text-ink hover:after:w-full"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <Icon label="Search" path="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
            <Icon label="Account" path="M20 21v-1a6 6 0 00-6-6h-4a6 6 0 00-6 6v1M12 11a4 4 0 100-8 4 4 0 000 8z" />
            <Icon label="Cart" path="M6 7h12l1.2 12.2a1.8 1.8 0 01-1.8 1.98H6.6a1.8 1.8 0 01-1.8-1.98L6 7zm3 0a3 3 0 016 0" />
            {/* Mobile trigger */}
            <button
              type="button"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center lg:hidden"
            >
              <span className="relative block h-3 w-5">
                <span className={`absolute left-0 top-0 h-px w-full bg-ink transition-all duration-300 ${open ? "top-1/2 rotate-45" : ""}`} />
                <span className={`absolute left-0 bottom-0 h-px w-full bg-ink transition-all duration-300 ${open ? "bottom-1/2 -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <div
        ref={menuRef}
        className="invisible fixed inset-0 z-40 flex flex-col justify-center bg-ivory px-8 opacity-0 transition-[opacity,visibility] duration-500 lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="hairline-grid pointer-events-none absolute inset-0" />
        <nav aria-label="Mobile" className="relative flex flex-col gap-2">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="display-tight py-3 text-4xl text-ink transition-[transform,opacity] duration-500 ease-out"
              style={{ transitionProperty: "transform, opacity" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="label-tech relative mt-12">{brand.tagline}</p>
      </div>
    </>
  );
}
