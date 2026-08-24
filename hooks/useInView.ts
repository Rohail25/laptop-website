"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Observes when an element approaches the viewport.
 * Used to lazily mount WebGL canvases just before they matter.
 */
export function useInView<T extends HTMLElement>(rootMargin = "400px"): {
  ref: React.RefObject<T | null>;
  inView: boolean;
} {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, rootMargin]);

  return { ref, inView };
}

/**
 * Tracks fine-grained visibility so canvases can pause their
 * render loops whenever the section scrolls out of view.
 */
export function useActiveWhenVisible<T extends HTMLElement>(): {
  ref: React.RefObject<T | null>;
  active: boolean;
} {
  const ref = useRef<T | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "80px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, active };
}

/** Flips to true (permanently) the first time the element nears the viewport. */
export function useEverInView<T extends HTMLElement>(
  rootMargin = "600px",
): { ref: React.RefObject<T | null>; seen: boolean } {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [seen, rootMargin]);

  return { ref, seen };
}
