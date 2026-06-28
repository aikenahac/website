import type { Action } from 'svelte/action';
import { motionEnabled } from './motion';

interface MagneticOptions {
  /** Fraction of the cursor-to-center distance the element follows (0..1). */
  strength?: number;
  /** Extra activation radius in px beyond the element's bounds. */
  radius?: number;
}

/**
 * Pull an element toward the cursor when it's nearby, easing back on leave.
 * No-op on touch / coarse pointers and under reduced motion.
 */
export const magnetic: Action<HTMLElement, MagneticOptions | undefined> = (node, options) => {
  const { strength = 0.18, radius = 60 } = options ?? {};

  if (!motionEnabled()) return;

  let raf = 0;
  let rect = node.getBoundingClientRect();

  const refresh = () => (rect = node.getBoundingClientRect());

  const apply = (x: number, y: number) => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      node.style.transform = `translate(${x}px, ${y}px)`;
    });
  };

  const reset = () => apply(0, 0);

  const onMove = (e: PointerEvent) => {
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const max = Math.max(rect.width, rect.height) / 2 + radius;
    if (Math.hypot(dx, dy) < max) {
      apply(dx * strength, dy * strength);
    } else {
      reset();
    }
  };

  node.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
  node.style.willChange = 'transform';

  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('scroll', refresh, { passive: true });
  window.addEventListener('resize', refresh);
  node.addEventListener('pointerleave', reset);

  return {
    destroy() {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', refresh);
      window.removeEventListener('resize', refresh);
      node.removeEventListener('pointerleave', reset);
    },
  };
};
