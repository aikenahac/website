import type { Action } from 'svelte/action';
import { prefersReducedMotion } from './motion';

interface RevealOptions {
  /** Stagger delay in ms before the element animates in. */
  delay?: number;
  /** Vertical travel distance in px. */
  y?: number;
  /** Reveal only once, then stop observing. */
  once?: boolean;
  /** IntersectionObserver threshold. */
  threshold?: number;
}

/**
 * Fade + slide an element into view as it enters the viewport.
 * Falls back to immediately-visible when reduced motion is requested or
 * IntersectionObserver is unavailable, so content is never left hidden.
 */
export const reveal: Action<HTMLElement, RevealOptions | undefined> = (node, options) => {
  const { delay = 0, y = 24, once = true, threshold = 0.15 } = options ?? {};

  if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
    node.classList.add('reveal-visible');
    return;
  }

  node.classList.add('reveal');
  node.style.setProperty('--reveal-delay', `${delay}ms`);
  node.style.setProperty('--reveal-y', `${y}px`);

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          node.classList.add('reveal-visible');
          if (once) observer.unobserve(node);
        } else if (!once) {
          node.classList.remove('reveal-visible');
        }
      }
    },
    { threshold, rootMargin: '0px 0px -8% 0px' },
  );

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    },
  };
};
