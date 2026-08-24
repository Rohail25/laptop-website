"use client";

import { useState } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { comparisonRows, formatPrice, products, type ProductId } from "../../config/site";

export function Comparison() {
  const [selected, setSelected] = useState<ProductId[]>(["x1", "x1Pro", "air"]);
  const [hoverCol, setHoverCol] = useState<number | null>(null);

  const toggle = (id: ProductId) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.length > 1 ? prev.filter((p) => p !== id) : prev;
      }
      return prev.length >= 3 ? [...prev.slice(1), id] : [...prev, id];
    });
  };

  const cols = products.filter((p) => selected.includes(p.id));

  const cellValue = (key: string, product: (typeof products)[number]) =>
    key === "price" ? formatPrice(product.price) : product.specs[key as keyof typeof product.specs];

  return (
    <section id="comparison" className="relative bg-paper py-24 md:py-32" aria-label="Product comparison">
      <div className="container-mr">
        <SectionHeading
          label="Compare"
          title={<>Choose your MR<span className="text-cobalt">.</span></>}
          body="Select up to three machines and compare them line by line."
        />

        {/* selector chips */}
        <Reveal>
          <div role="group" aria-label="Select products to compare" className="mb-10 flex flex-wrap gap-2.5">
            {products.map((p) => {
              const active = selected.includes(p.id);
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => toggle(p.id)}
                  aria-pressed={active}
                  data-cursor="OPEN"
                  className={`rounded-full border px-5 py-2.5 text-[12px] font-semibold tracking-[0.14em] uppercase transition-all duration-300 ${
                    active
                      ? "border-cobalt bg-cobalt text-white shadow-[0_8px_24px_-8px_rgba(43,80,255,0.5)]"
                      : "border-line bg-ivory text-graphite hover:border-ink/30 hover:text-ink"
                  }`}
                >
                  {p.name}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* table */}
        <Reveal delay={0.08}>
          <div className="overflow-x-auto rounded-[1.75rem] border border-line bg-ivory shadow-card">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <caption className="sr-only">MR laptop comparison</caption>
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="w-36 p-6 align-bottom">
                    <span className="label-tech">Spec</span>
                  </th>
                  {cols.map((p, ci) => (
                    <th
                      key={p.id}
                      scope="col"
                      onMouseEnter={() => setHoverCol(ci)}
                      onMouseLeave={() => setHoverCol(null)}
                      className={`p-6 align-bottom transition-colors duration-300 ${hoverCol === ci ? "bg-skywash/60" : ""}`}
                    >
                      <span className="block h-1.5 w-1.5 rounded-full" style={{ background: p.accent }} aria-hidden />
                      <span className="display-tight mt-3 block text-xl text-ink">{p.name}</span>
                      <span className="label-tech mt-1 block">{p.screen} · {formatPrice(p.price)}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.key} className="border-b border-line/70 last:border-0">
                    <th scope="row" className="p-5 pl-6 align-top">
                      <span className="text-sm font-medium text-muted">{row.label}</span>
                    </th>
                    {cols.map((p, ci) => (
                      <td
                        key={p.id}
                        onMouseEnter={() => setHoverCol(ci)}
                        onMouseLeave={() => setHoverCol(null)}
                        className={`p-5 align-top transition-colors duration-300 ${
                          row.key === "price" ? "font-semibold text-ink" : "text-graphite"
                        } ${hoverCol === ci ? "bg-skywash/60" : ""}`}
                      >
                        <span className="font-mono text-[13px] leading-relaxed">{cellValue(row.key, p)}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
