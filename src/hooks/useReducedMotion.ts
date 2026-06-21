"use client";

import { useSyncExternalStore } from "react";

const subscribe = (callback: () => void) => {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
};

const getSnapshot = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const getServerSnapshot = () => false;

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
