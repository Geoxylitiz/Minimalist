'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) return;

      // The headline crosses the seam right where the Hero unpins. Scrubbing
      // it against scroll position (instead of playing it as a fixed-
      // duration tween once a threshold is crossed) keeps it on the same
      // motion language as the Hero's exit, so the handoff reads as one
      // continuous move rather than a hard cut followed by a pop-in.
      gsap.fromTo(
        '.about-headline',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'top 45%',
            scrub: 1
          }
        }
      );

      // Supporting content further down the section can stay on a normal
      // enter-trigger — it's no longer adjacent to the Hero's exit, so the
      // style change doesn't read as a seam.
      const els = gsap.utils.toArray<HTMLElement>('.reveal-up');
      els.forEach((el, i) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 1,
          delay: i * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%'
          }
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="py-32 md:py-48 bg-sc-surface text-sc-text-primary relative z-20"
      id="about"
      data-sc-act="about"
    >
      <div className="sc-container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-4">
            <h2 className="text-xs tracking-[0.2em] uppercase text-sc-text-muted mb-8 md:sticky top-32">
              01. Background
            </h2>
          </div>
          <div className="md:col-span-8">
            <h3 className="about-headline text-[clamp(1.5rem,3vw,3rem)] leading-[1.2] mb-16 md:mb-24 text-sc-text-primary">
              I build bespoke, scroll-driven digital experiences. Form and function balanced with mathematical
              precision.
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div className="reveal-up">
                <h4 className="text-lg md:text-xl mb-4 text-sc-text-primary">Philosophy</h4>
                <p className="text-sc-text-muted text-sm sm:text-base">
                  Rejecting generic tropes and soft clay dioramas. Embracing deep charcoal grounds, high contrast
                  typography, and architectural spacing. Every visual decision must have an optical purpose.
                </p>
              </div>
              <div className="reveal-up">
                <h4 className="text-lg md:text-xl mb-4 text-sc-text-primary">Execution</h4>
                <p className="text-sc-text-muted text-sm sm:text-base">
                  Deploying fluid grid systems and rigorous padding math. Animations are strictly limited to
                  transform and opacity properties for maximum runtime performance and zero frame drops.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}