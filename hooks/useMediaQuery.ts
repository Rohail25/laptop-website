"use client";

import { useSyncExternalStore } from "react";

function subscribe(query: string, onChange: () => void): () => void {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** Reactive media query — SSR-safe, no cascading renders. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (cb) => subscribe(query, cb),
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Coarse pointers (touch) — used to skip cursor + heavy 3D. */
export function useIsTouch(): boolean {
  return useMediaQuery("(pointer: coarse)");
}
