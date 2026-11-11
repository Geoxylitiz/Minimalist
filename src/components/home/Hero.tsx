import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { site } from '../../config/site';
import { gsap, prefersReducedMotion } from '../../lib/motion';
import { Arrow, Burst } from '../ui';

/**
 * Cobalt opening block. It is sticky, so the next section slides up over it
 * like a stacked card while the title shrinks back.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap
        .timeline({ delay: 0.15 })
        .from('.hero-line', { yPercent: 115, duration: 1.1, stagger: 0.09, ease: 'expo.out' })
        .from('.hero-burst', { scale: 0, rotate: -120, duration: 1.2, ease: 'back.out(1.6)' }, 0.35)
        .from('.hero-meta', { autoAlpha: 0, y: 16, duration: 0.8, stagger: 0.06, ease: 'power3.out' }, 0.45);

      gsap.to('.hero-inner', {
        scale: 0.9,
        autoAlpha: 0.25,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="sticky top-0 h-svh min-h-[560px] overflow-hidden bg-cobalt text-paper"
      data-theme="dark"
      aria-label="Introduction"
    >
      <div className="hero-inner wrap h-full flex flex-col justify-between pt-24 md:pt-28 pb-8 md:pb-10 origin-top">
        <div className="flex justify-between gap-6 label">
          <span className="hero-meta">{site.name}</span>
          <span className="hero-meta hidden sm:block">{site.role}</span>
          <span className="hero-meta">{site.location}</span>
        </div>

        <h1 className="display relative text-[clamp(3.4rem,14.2vw,15.5rem)]">
          <span className="block overflow-hidden"><span className="hero-line block">Vision &amp;</span></span>
          <span className="block overflow-hidden"><span className="hero-line block text-lime">Execution</span></span>
          <span className="block overflow-hidden">
            <span className="hero-line flex items-center gap-[0.12em]">
              By design
            </span>
          </span>
          <Burst className="hero-burst spin-slow absolute right-0 bottom-[0.05em] w-[0.75em] h-[0.75em] text-flame" />
        </h1>

        <div className="flex flex-wrap items-end justify-between gap-6 label">
          <span className="hero-meta inline-flex items-center gap-2">
            <Arrow direction="right" className="w-4 h-4 rotate-90" /> Scroll
          </span>
          <ul className="hero-meta hidden md:flex gap-6">
            {site.services.map((s) => <li key={s}>{s}</li>)}
          </ul>
          <span className="hero-meta">Est. {site.since}</span>
        </div>
      </div>
    </section>
  );
}
