"use client";

import { Reveal } from "../ui/Reveal";
import { testimonials } from "../../config/site";

function Stars() {
  return (
    <div className="flex gap-1 text-cobalt" role="img" aria-label="Five star rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path d="M10 1.6l2.5 5.2 5.7.8-4.1 4 1 5.7L10 14.6l-5.1 2.7 1-5.7-4.1-4 5.7-.8z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const featured = testimonials.find((t) => t.featured)!;
  const rest = testimonials.filter((t) => !t.featured);

  return (
    <section id="testimonials" className="relative overflow-hidden py-24 md:py-32" aria-label="Customer testimonials">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_0%,rgba(43,80,255,0.05),transparent_60%)]" aria-hidden />
      <div className="container-mr relative">
        {/* Featured quote */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <Stars />
          <blockquote className="display-tight mt-8 text-3xl text-ink sm:text-4xl lg:text-[2.75rem]">
            &ldquo;{featured.quote}&rdquo;
          </blockquote>
          <p className="label-tech mt-7">{featured.author} · MR X1 PRO</p>
        </Reveal>

        {/* Supporting quotes */}
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {rest.map((t, i) => (
            <Reveal key={t.author} delay={i * 0.08}>
              <figure
                data-cursor="VIEW"
                className="h-full rounded-[1.5rem] border border-line bg-paper p-7 shadow-card transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-lift"
              >
                <Stars />
                <blockquote className="mt-4 leading-relaxed text-graphite">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-5 flex items-center justify-between">
                  <span className="text-sm font-semibold text-ink">{t.author}</span>
                  <span className="text-xs text-faint">{t.detail}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="label-tech mt-12 text-center">4.9 average · 12,400+ verified reviews</p>
        </Reveal>
      </div>
    </section>
  );
}
