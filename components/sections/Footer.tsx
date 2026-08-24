"use client";

import Link from "next/link";
import { brand, brands, products } from "../../config/site";

const columns = [
  {
    title: "Shop",
    links: products.map((p) => ({ label: p.name, href: "#collection" })),
  },
  {
    title: "Brands in stock",
    links: brands.map((b) => ({ label: b.name, href: "#brands" })),
  },
  {
    title: "Company",
    links: [
      { label: "Technology", href: "#technology" },
      { label: "Design", href: "#materials" },
      { label: "Reviews", href: "#testimonials" },
      { label: "Accessories", href: "#ecosystem" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "#footer" },
      { label: "Warranty", href: "#footer" },
      { label: "Trade-in", href: "#footer" },
      { label: "Stores", href: "#footer" },
    ],
  },
];

export function Footer() {
  return (
    <footer id="footer" className="relative border-t border-line bg-paper" aria-label="Footer">
      <div className="container-mr grid gap-12 py-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* Brand */}
        <div>
          <Link href="/" className="flex items-baseline gap-1.5" aria-label={`${brand.fullName} home`}>
            <span className="text-2xl font-extrabold tracking-tight text-ink">MR</span>
            <span className="label-tech !text-[9px] !tracking-[0.3em]">Laptops</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {brand.tagline} Premium laptops — ours and the world&apos;s best brands,
            configured and certified by MR.
          </p>
          <form
            className="mt-8 flex max-w-sm items-center gap-2"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Newsletter signup"
          >
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Email address"
              className="h-11 w-full rounded-full border border-line bg-ivory px-4 text-sm text-ink placeholder:text-faint focus:border-cobalt focus:outline-none"
            />
            <button
              type="submit"
              data-cursor="OPEN"
              className="flex h-11 shrink-0 items-center rounded-full bg-ink px-5 text-[11px] font-semibold tracking-[0.14em] text-white uppercase transition-colors hover:bg-cobalt"
            >
              Join
            </button>
          </form>
        </div>

        {/* Link columns */}
        <nav className="grid grid-cols-2 gap-10 sm:grid-cols-4" aria-label="Footer">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="label-tech mb-4">{col.title}</p>
              <ul role="list" className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} data-cursor="VIEW" className="text-sm text-graphite transition-colors hover:text-cobalt">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="container-mr flex flex-wrap items-center justify-between gap-3 py-6">
          <p className="text-xs text-faint">© 2026 {brand.fullName}. A fictional brand concept.</p>
          <div className="flex items-center gap-6 text-xs text-faint">
            <span>Privacy</span>
            <span>Terms</span>
            <span className="font-mono tracking-widest">EN / USD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
