import type { Action } from 'svelte/action';
import { motionEnabled } from './motion';

interface TiltOptions {
  /** Max rotation in degrees at the element's edge. */
  max?: number;
  /** Forward pop toward the cursor in px. */
  lift?: number;
}

/**
 * Tilt an element in 3D toward the cursor while hovering, easing back on leave.
 * No-op on touch / coarse pointers and under reduced motion.
 * The element's parent should set a `perspective` for the effect to read.
 */
export const tilt: Action<HTMLElement, TiltOptions | undefined> = (node, options) => {
  const { max = 9, lift = 14 } = options ?? {};

  if (!motionEnabled()) return;

  let raf = 0;
  let rect = node.getBoundingClientRect();

  const refresh = () => (rect = node.getBoundingClientRect());

  const apply = (transform: string) => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      node.style.transform = transform;
    });
  };

  const reset = () => apply('rotateX(0deg) rotateY(0deg) translateZ(0)');

  const onMove = (e: PointerEvent) => {
    // Normalized position within the element, -0.5..0.5 on each axis.
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const rotY = px * max * 2;
    const rotX = -py * max * 2;
    apply(`rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(${lift}px)`);
  };

  node.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
  node.style.willChange = 'transform';

  node.addEventListener('pointermove', onMove, { passive: true });
  node.addEventListener('pointerleave', reset);
  window.addEventListener('scroll', refresh, { passive: true });
  window.addEventListener('resize', refresh);

  return {
    destroy() {
      cancelAnimationFrame(raf);
      node.removeEventListener('pointermove', onMove);
      node.removeEventListener('pointerleave', reset);
      window.removeEventListener('scroll', refresh);
      window.removeEventListener('resize', refresh);
    },
  };
};
