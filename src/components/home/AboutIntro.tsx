import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { site } from '../../config/site';
import { useReveal } from '../../hooks/useReveal';
import { Arrow, Label } from '../ui';

const principles = [
  {
    title: 'Clarity first',
    body: 'Strong ideas deserve a clear frame. Contrast, rhythm and generous space make complex stories feel instinctive to navigate.',
  },
  {
    title: 'Built with intent',
    body: 'Design and code stay close throughout, so every interaction feels considered and every detail earns its place.',
  },
];

export function AboutIntro() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} className="bg-paper text-ink" data-theme="light" id="about">
      <div className="wrap py-24 md:py-36">
        <div className="grid gap-10 md:grid-cols-12">
          <Label index="01" className="md:col-span-3 reveal-up">About</Label>
          <p className="reveal-up md:col-span-9 font-display font-medium text-[clamp(1.9rem,4.6vw,4.75rem)] leading-[1.02] tracking-[-0.025em]">
            I build digital systems with a{' '}
            <span className="bg-lime px-[0.15em] box-decoration-clone">point of view</span>
            {' '}— precise in design, powerful in automation, and engineered to scale.
          </p>
        </div>

        <ul className="mt-20 md:mt-28 border-b-2 border-ink" aria-label="Services">
          {site.services.map((service, i) => (
            <li key={service} className="reveal-up group relative border-t-2 border-ink overflow-hidden">
              <span
                className="absolute inset-0 bg-cobalt origin-bottom scale-y-0 transition-transform duration-500 ease-out-expo group-hover:scale-y-100"
                aria-hidden="true"
              />
              <div className="relative flex items-center justify-between gap-6 py-5 md:py-7 transition-colors duration-300 group-hover:text-paper">
                <span className="display text-[clamp(2.2rem,7vw,7rem)] transition-transform duration-500 ease-out-expo md:group-hover:translate-x-6">
                  {service}
                </span>
                <span className="label shrink-0">0{i + 1}</span>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-16 md:mt-24 grid gap-10 md:grid-cols-12">
          {principles.map((p, i) => (
            <div key={p.title} className={`reveal-up md:col-span-4 ${i === 0 ? 'md:col-start-4' : ''}`} data-delay={i * 0.08}>
              <h3 className="text-2xl md:text-3xl tracking-tight mb-3">{p.title}</h3>
              <p className="text-ink/70 max-w-sm">{p.body}</p>
            </div>
          ))}
          <div className="reveal-up md:col-span-1 md:col-start-12 flex md:justify-end md:items-end">
            <Link to="/about" className="btn btn--outline whitespace-nowrap">
              More <Arrow direction="right" className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
