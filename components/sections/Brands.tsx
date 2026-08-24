"use client";

import { Reveal } from "../ui/Reveal";
import { brands } from "../../config/site";

/**
 * Shop-by-brand — MR also stocks HP, Dell, Lenovo and MacBook.
 */
export function Brands() {
  return (
    <section id="brands" className="relative overflow-hidden bg-paper py-24 md:py-32" aria-label="Available laptop brands">
      <div className="absolute inset-x-0 top-0 h-px bg-line" aria-hidden />
      <div className="container-mr">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
          <div className="max-w-2xl">
            <Reveal y={12}>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-cobalt" aria-hidden />
                <p className="label-tech">Available at MR</p>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="display-tight mt-5 text-4xl text-ink sm:text-5xl lg:text-6xl">
                Every major brand.
                <span className="block text-muted">One destination.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Alongside our own lineup, MR stocks, configures and certifies laptops from
              the world&apos;s most trusted manufacturers.
            </p>
          </Reveal>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4" role="list">
          {brands.map((b, i) => (
            <li key={b.id}>
              <Reveal delay={i * 0.07}>
                <a
                  href="#footer"
                  data-cursor="EXPLORE"
                  className="group relative flex h-full flex-col rounded-[1.75rem] border border-line bg-ivory p-7 transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:border-cobalt/30 hover:shadow-lift"
                  aria-label={`Browse ${b.name} laptops at MR`}
                >
                  {/* index + stock */}
                  <div className="flex items-center justify-between">
                    <span className="label-tech">/{String(i + 1).padStart(2, "0")}</span>
                    <span className="rounded-full border border-line px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-faint uppercase transition-colors group-hover:border-cobalt/25 group-hover:text-cobalt">
                      {b.modelsInStock} models
                    </span>
                  </div>

                  {/* wordmark */}
                  <p className="display-tight mt-10 text-[2rem] leading-none text-ink transition-colors duration-300 group-hover:text-cobalt">
                    {b.name}
                  </p>
                  <p className="mt-3 text-sm font-medium text-graphite">{b.families}</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-faint">{b.note}</p>

                  {/* footer row */}
                  <span className="mt-auto flex items-center gap-2 pt-8 text-[12px] font-semibold tracking-[0.14em] text-graphite uppercase">
                    Browse
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-1.5">
                      <path d="M1.5 8h12M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>

                  {/* hover wash */}
                  <span
                    className="pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: "radial-gradient(120% 90% at 50% 110%, rgba(43,80,255,0.06), transparent 60%)" }}
                    aria-hidden
                  />
                </a>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={0.15}>
          <p className="label-tech mt-10 text-center !tracking-[0.18em]">
            MR-certified · Manufacturer warranty · Configured to order
          </p>
        </Reveal>
      </div>
    </section>
  );
}
