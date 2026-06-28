/** Shared motion helpers. All guard against SSR and respect user/device capabilities. */

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export function isFinePointer(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;
}

/** True when fancy pointer-driven motion (custom cursor, magnetic) should run. */
export function motionEnabled(): boolean {
  return isFinePointer() && !prefersReducedMotion();
}
