export const brand = {
  name: "MR",
  fullName: "MR Laptops",
  tagline: "Power, beautifully engineered.",
  support: "Performance without compromise.",
} as const;

export const navLinks = [
  { label: "Laptops", href: "#collection" },
  { label: "Brands", href: "#brands" },
  { label: "Technology", href: "#technology" },
  { label: "Accessories", href: "#ecosystem" },
  { label: "Support", href: "#footer" },
] as const;

/* ── Centralized asset URLs — replace "" with real CDN/image
      or video links later; components fall back gracefully. ── */
export const assets = {
  hero: { video: "", image: "" },
  products: {
    x1: "",
    x1Pro: "",
    air: "",
    studio: "",
  },
  technology: { performance: "", display: "" },
} as const;

export type ProductId = "x1" | "x1Pro" | "air" | "studio";

export interface Product {
  id: ProductId;
  name: string;
  short: string;
  screen: string;
  price: number;
  tagline: string;
  blurb: string;
  accent: string;
  specs: {
    display: string;
    processor: string;
    memory: string;
    storage: string;
    battery: string;
    weight: string;
    ports: string;
  };
}

export const products: Product[] = [
  {
    id: "x1",
    name: "MR X1",
    short: "X1",
    screen: '14.2"',
    price: 1499,
    tagline: "Ultra-thin. Exceptionally capable.",
    blurb: "The everyday flagship. Silent, cool and impossibly light.",
    accent: "#2b50ff",
    specs: {
      display: '14.2" Liquid Retina 500 nits',
      processor: "10-core CPU · 8-core GPU",
      memory: "16GB unified",
      storage: "512GB SSD",
      battery: "18 hr",
      weight: "1.24 kg",
      ports: "2× USB-C · HDMI · SD",
    },
  },
  {
    id: "x1Pro",
    name: "MR X1 PRO",
    short: "X1 PRO",
    screen: '16.2"',
    price: 1999,
    tagline: "Studio-grade power. Anywhere.",
    blurb: "For creators who render, compile and colour-grade on the move.",
    accent: "#6a5cff",
    specs: {
      display: '16.2" mini-LED 120Hz',
      processor: "12-core CPU · 16-core GPU",
      memory: "32GB unified",
      storage: "1TB SSD",
      battery: "21 hr",
      weight: "1.62 kg",
      ports: "3× USB-C · HDMI · SD",
    },
  },
  {
    id: "air",
    name: "MR AIR",
    short: "AIR",
    screen: '13.6"',
    price: 1199,
    tagline: "Featherlight. Fearless.",
    blurb: "Under a kilo of fanless aluminium with all-day endurance.",
    accent: "#0ea5a4",
    specs: {
      display: '13.6" Retina 400 nits',
      processor: "8-core CPU · 6-core GPU",
      memory: "16GB unified",
      storage: "256GB SSD",
      battery: "18 hr",
      weight: "0.99 kg",
      ports: "2× USB-C",
    },
  },
  {
    id: "studio",
    name: "MR STUDIO",
    short: "STUDIO",
    screen: '18"',
    price: 2499,
    tagline: "The desktop class. Reimagined.",
    blurb: "A workstation that folds shut. Thermals engineered to vanish.",
    accent: "#c2570e",
    specs: {
      display: '18" mini-LED 120Hz',
      processor: "16-core CPU · 32-core GPU",
      memory: "64GB unified",
      storage: "2TB SSD",
      battery: "16 hr",
      weight: "2.15 kg",
      ports: "4× USB-C · HDMI ×2 · SD",
    },
  },
];

/* ── Available brands stocked by MR ── */
export interface BrandStock {
  id: string;
  name: string;
  families: string;
  modelsInStock: number;
  note: string;
}

export const brands: BrandStock[] = [
  {
    id: "hp",
    name: "HP",
    families: "Spectre · Envy · Omen",
    modelsInStock: 28,
    note: "Business and gaming lineups, configured to order.",
  },
  {
    id: "dell",
    name: "Dell",
    families: "XPS · Inspiron · Precision",
    modelsInStock: 31,
    note: "InfinityEdge displays with on-site warranty options.",
  },
  {
    id: "lenovo",
    name: "Lenovo",
    families: "ThinkPad · Yoga · IdeaPad",
    modelsInStock: 34,
    note: "Legendary keyboards, from ultralight to mobile workstation.",
  },
  {
    id: "macbook",
    name: "MacBook",
    families: "Air · Pro 14\" · Pro 16\"",
    modelsInStock: 19,
    note: "Every Apple silicon configuration, sealed and certified.",
  },
];

export interface Accessory {
  id: string;
  name: string;
  price: number;
  glyph: "monitor" | "dock" | "keyboard" | "mouse" | "headphones" | "sleeve";
}

export const accessories: Accessory[] = [
  { id: "monitor", name: "MR Monitor 5K", price: 1299, glyph: "monitor" },
  { id: "dock", name: "MR Dock Pro", price: 299, glyph: "dock" },
  { id: "keyboard", name: "MR Keyboard", price: 199, glyph: "keyboard" },
  { id: "mouse", name: "MR Mouse", price: 129, glyph: "mouse" },
  { id: "headphones", name: "MR Headphones", price: 349, glyph: "headphones" },
  { id: "sleeve", name: "MR Sleeve", price: 79, glyph: "sleeve" },
];

export const performanceStats = [
  { value: 12, suffix: "-CORE", label: "CPU" },
  { value: 32, suffix: "GB", label: "Unified memory" },
  { value: 2, suffix: "TB", label: "SSD storage" },
  { value: 18, suffix: "HR", label: "Battery life" },
] as const;

export const materials = [
  {
    index: "01",
    title: "Precision aluminum",
    body: "A single billet, milled for 9 hours, anodised in three finishes.",
  },
  {
    index: "02",
    title: "Edge-to-edge display",
    body: "3.4mm bezels. 500 nits. True tone calibrated per unit.",
  },
  {
    index: "03",
    title: "Precision hinge",
    body: "One-finger opening, tuned over 40,000 test cycles.",
  },
  {
    index: "04",
    title: "Tactile keyboard",
    body: "1.2mm travel, backlit, spill resistant. Silence engineered in.",
  },
] as const;

export const technologies = [
  {
    id: "thermal",
    title: "Thermal architecture",
    body: "Vapor chamber spreads heat across 100% of the chassis. No burns, no throttle, no noise.",
    diagram: "airflow" as const,
  },
  {
    id: "ai",
    title: "AI performance",
    body: "38 TOPS neural engine accelerates on-device models without touching the cloud.",
    diagram: "nodes" as const,
  },
  {
    id: "display",
    title: "Display engine",
    body: "Adaptive 120Hz, hardware tone mapping and factory calibration for every panel.",
    diagram: "display" as const,
  },
  {
    id: "battery",
    title: "All-day battery",
    body: "Silicon-anode cells deliver 18 hours of real work, then charge to 50% in 30 minutes.",
    diagram: "battery" as const,
  },
] as const;

export const testimonials = [
  {
    quote: "Everything I need. Nothing I don't.",
    author: "NOVA customer",
    detail: "Verified buyer · MR X1 PRO",
    featured: true,
  },
  {
    quote: "The Air disappeared into my bag and outlasted my workday twice over.",
    author: "Priya S.",
    detail: "Product designer",
    featured: false,
  },
  {
    quote: "Compiles our monorepo faster than my desktop did. Quietly.",
    author: "Daniel K.",
    detail: "Staff engineer",
    featured: false,
  },
  {
    quote: "Best keyboard I've typed a novel on. And I've typed four.",
    author: "Marta L.",
    detail: "Author",
    featured: false,
  },
];

export const comparisonRows = [
  { key: "display", label: "Display" },
  { key: "processor", label: "Processor" },
  { key: "memory", label: "Memory" },
  { key: "storage", label: "Storage" },
  { key: "battery", label: "Battery" },
  { key: "weight", label: "Weight" },
  { key: "ports", label: "Ports" },
  { key: "price", label: "Price" },
] as const;

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
