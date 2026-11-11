import type { RefObject } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion } from '../lib/motion';

/**
 * Shared entrance motion inside `scope`:
 * - `.reveal-line` slides up from behind an overflow-hidden parent (use <Line>)
 * - `.reveal-up` fades and rises
 * Elements already in view on load animate immediately.
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.utils.toArray<HTMLElement>('.reveal-line').forEach((el) => {
        gsap.from(el, {
          yPercent: 110,
          duration: 1,
          ease: 'expo.out',
          delay: Number(el.dataset.delay ?? 0),
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('.reveal-up').forEach((el) => {
        gsap.from(el, {
          y: 40,
          autoAlpha: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: Number(el.dataset.delay ?? 0),
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        });
      });
    },
    { scope },
  );
}
