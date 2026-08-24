"use client";

import { LaptopRender } from "../ui/LaptopRender";
import { Reveal } from "../ui/Reveal";
import { formatPrice, products, type Product } from "../../config/site";

export function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <article
      data-cursor="EXPLORE"
      className="group relative flex flex-col rounded-[1.75rem] border border-line bg-paper p-7 shadow-card transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1.5 hover:border-ink/12 hover:shadow-lift"
    >
      <div className="flex items-start justify-between">
        <span className="label-tech">/{String(index + 1).padStart(2, "0")}</span>
        <span
          className="h-2 w-2 rounded-full transition-transform duration-500 group-hover:scale-150"
          style={{ background: product.accent }}
          aria-hidden
        />
      </div>

      {/* Visual */}
      <div
        className="relative my-6 overflow-hidden rounded-2xl px-4 py-8 transition-colors duration-500 group-hover:bg-mist/70"
        style={{ background: `linear-gradient(160deg, ${product.accent}0f, transparent 60%)` }}
      >
        <LaptopRender
          accent={product.accent}
          angle="-3deg"
          className="mx-auto w-[92%] transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:rotate-[1.5deg] group-hover:scale-[1.04]"
        />
      </div>

      {/* Details */}
      <div className="mt-auto">
        <h3 className="text-lg font-semibold tracking-tight text-ink">{product.name}</h3>
        <p className="mt-1 h-5 text-sm text-faint opacity-0 transition-all duration-400 ease-out group-hover:opacity-100">
          {product.tagline}
        </p>

        <div className="mt-4 flex items-end justify-between border-t border-line pt-4">
          <div>
            <p className="label-tech">{product.screen}</p>
            <p className="mt-1 text-sm font-medium text-graphite">
              From <span className="text-ink">{formatPrice(product.price)}</span>
            </p>
          </div>
          <a
            href="#comparison"
            aria-label={`Explore ${product.name}`}
            className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] text-cobalt uppercase"
          >
            Explore
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M1.5 8h12M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}

export function Collection() {
  return (
    <section id="collection" className="relative py-24 md:py-32" aria-label="Product collection">
      <div className="container-mr">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
          <div className="max-w-2xl">
            <Reveal y={12}>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-cobalt" aria-hidden />
                <p className="label-tech">The lineup</p>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="display-tight mt-5 text-4xl text-ink sm:text-5xl lg:text-6xl">
                Find your MR.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Four machines. One engineering standard. Every MR laptop shares the same
              aluminum DNA, display engine and silence.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.07}>
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
