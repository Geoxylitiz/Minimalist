'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Updated focus areas array
  const focusAreas = ['Web design', 'Motion & interaction', 'AI Automation Workflow'];

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) return;

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
          <div className="md:col-span-3">
           
            <div className="hidden md:block md:sticky top-56 border-l border-sc-border pl-5">
              <span className="block text-[0.6rem] tracking-[0.18em] uppercase text-sc-accent mb-3">Patrick Oliver</span>
              <span className="block text-xs leading-relaxed text-sc-text-muted">Independent digital design<br />&amp; development</span>
            </div>
          </div>

          <div className="md:col-span-9">
            <div className="max-w-5xl">
              <p className="reveal-up text-xs tracking-[0.2em] uppercase text-sc-accent mb-8">A considered approach to the web</p>
              <h3 className="about-headline text-[clamp(2rem,4.5vw,4.5rem)] leading-[1.05] tracking-tight mb-16 md:mb-24 text-sc-text-primary">
               I build digital systems with a point of view — precise in design, powerful in automation, and engineered to scale.
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 border-t border-sc-border pt-8">
              <div className="reveal-up lg:col-span-5">
                <h4 className="text-xs tracking-[0.2em] uppercase text-sc-text-muted mb-6">What I do</h4>
                <ul className="divide-y divide-sc-border border-y border-sc-border">
                  {focusAreas.map((area, index) => (
                    <li key={area} className="flex items-center justify-between gap-4 py-4 text-sm text-sc-text-primary">
                      <span>{area}</span>
                      <span className="text-xs text-sc-accent">0{index + 1}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="reveal-up lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div>
                  <h4 className="text-lg md:text-xl mb-4 text-sc-text-primary">Clarity first</h4>
                  <p className="text-sc-text-muted text-sm sm:text-base leading-relaxed">
                    Strong ideas deserve a clear frame. I use contrast, rhythm, and generous spacing to make complex stories feel instinctive to navigate.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg md:text-xl mb-4 text-sc-text-primary">Built with intent</h4>
                  <p className="text-sc-text-muted text-sm sm:text-base leading-relaxed">
                    Design and code stay close throughout the process, so every interaction feels considered and every detail earns its place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}