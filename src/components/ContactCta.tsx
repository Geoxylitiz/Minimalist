import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { site } from '../config/site';
import { useReveal } from '../hooks/useReveal';
import { Arrow, Burst, Label, Line } from './ui';

/** Lime closing block shared by the home, works and about pages. */
export function ContactCta({ index }: { index?: string }) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} className="relative overflow-hidden bg-lime text-ink" data-theme="light" id="contact">
      <Burst className="spin-slow absolute -right-[12vw] -bottom-[12vw] w-[44vw] max-w-[640px] text-ink/[0.07]" />

      <div className="wrap relative py-24 md:py-36">
        <Label index={index}>Contact</Label>

        <h2 className="display mt-8 text-[clamp(4rem,15vw,15rem)]">
          <Line>Let's</Line>
          <Line delay={0.08}>talk.</Line>
        </h2>

        <div className="reveal-up mt-12 md:mt-16 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <a
            href={`mailto:${site.email}`}
            className="group inline-flex items-center gap-4 font-display font-semibold text-[clamp(1.5rem,4vw,3.5rem)] leading-none tracking-tight break-all"
          >
            <span className="link-underline link-underline--thick">{site.email}</span>
            <Arrow className="w-[0.8em] h-[0.8em] shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>

          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="btn btn--ink">
              Start a project <Arrow direction="right" className="w-4 h-4" />
            </Link>
            {site.socials.slice(0, 2).map((s) => (
              <a key={s.label} href={s.href} className="btn btn--outline">{s.label}</a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
