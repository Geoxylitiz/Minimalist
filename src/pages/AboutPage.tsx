import { useRef } from 'react';
import { site } from '../config/site';
import { useReveal } from '../hooks/useReveal';
import { ContactCta } from '../components/ContactCta';
import { Marquee } from '../components/Marquee';
import { Burst, Label, Line } from '../components/ui';

const services = [
  {
    title: 'Web design',
    body: 'Editorial layouts, design systems and responsive builds that hold up from a phone to a 5K display.',
    color: 'bg-lime text-ink',
  },
  {
    title: 'Motion & interaction',
    body: 'Scroll choreography, micro-interactions and transitions that guide attention instead of competing for it.',
    color: 'bg-flame text-ink',
  },
  {
    title: 'AI automation',
    body: 'Workflows that remove repetitive work — content pipelines, internal tools and integrations that run themselves.',
    color: 'bg-paper text-ink',
  },
];

const process = [
  ['Listen', 'Goals, audience, constraints. A short brief we both agree on before anything is drawn.'],
  ['Shape', 'Structure and visual direction, tested early in the browser rather than polished in mock-ups.'],
  ['Build', 'Production code with motion and automation built in, reviewed in small, frequent steps.'],
  ['Launch', 'Performance checks, handover docs and support while the work settles in.'],
];

const tools = ['React', 'TypeScript', 'GSAP', 'Tailwind', 'Figma', 'Node', 'n8n', 'OpenAI & Claude APIs', 'Vite'];

export default function AboutPage() {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);

  return (
    <div ref={ref}>
      {/* Intro */}
      <header className="relative overflow-hidden bg-cobalt text-paper" data-theme="dark">
        <Burst className="spin-slow absolute -right-[8vw] top-[18%] w-[38vw] max-w-[560px] text-lime" />
        <div className="wrap relative pt-32 md:pt-44 pb-16 md:pb-24">
          <Label className="reveal-up">About — {site.name}</Label>
          <h1 className="display mt-6 text-[clamp(3.25rem,11vw,11rem)]">
            <Line>Design that</Line>
            <Line delay={0.06} className="text-lime">moves.</Line>
            <Line delay={0.12}>Systems that</Line>
            <Line delay={0.18} className="text-lime">work.</Line>
          </h1>
        </div>
      </header>

      {/* Bio */}
      <section className="bg-paper text-ink" data-theme="light">
        <div className="wrap py-20 md:py-32 grid gap-12 md:grid-cols-12">
          <div className="reveal-up md:col-span-4">
            {/* Portrait placeholder — replace with a real photo */}
            <div className="aspect-[4/5] rounded-[1.25rem] bg-flame grid place-items-center overflow-hidden">
              <span className="display text-[clamp(5rem,14vw,12rem)] text-ink">
                {site.name.split(' ').map((w) => w[0]).join('')}
              </span>
            </div>
          </div>
          <div className="md:col-span-7 md:col-start-6 flex flex-col justify-between gap-10">
            <p className="reveal-up font-display font-medium text-[clamp(1.75rem,3.6vw,3.4rem)] leading-[1.06] tracking-[-0.02em]">
              I'm {site.name.split(' ')[0]}, an independent designer and developer in {site.location.split(',')[0]}. I make websites with a strong point of view, and the automation that keeps them running.
            </p>
            <div className="reveal-up grid gap-6 sm:grid-cols-2 text-ink/75">
              <p>
                Since {site.since} I've worked with studios, start-ups and cultural institutions — usually as the person who
                carries an idea from the first sketch all the way to production code.
              </p>
              <p>
                Lately that work includes AI: workflows that draft, sort and publish so that small teams can spend their time on
                the parts that need taste.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-ink text-paper" data-theme="dark">
        <div className="wrap py-20 md:py-32">
          <Label index="01" className="reveal-up text-lime mb-10">What I do</Label>
          <div className="grid gap-5 lg:grid-cols-3">
            {services.map((s, i) => (
              <article key={s.title} className={`reveal-up rounded-[1.25rem] p-6 md:p-8 min-h-72 flex flex-col justify-between ${s.color}`} data-delay={i * 0.08}>
                <span className="label">0{i + 1}</span>
                <div>
                  <h2 className="display text-[clamp(2.25rem,6vw,3.5rem)] lg:text-[clamp(2rem,2.9vw,3.25rem)] mb-4">{s.title}</h2>
                  <p className="opacity-80">{s.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-paper text-ink" data-theme="light">
        <div className="wrap py-20 md:py-32">
          <Label index="02" className="reveal-up mb-10">How I work</Label>
          <ol className="border-t-2 border-ink">
            {process.map(([title, body], i) => (
              <li key={title} className="reveal-up grid gap-4 md:grid-cols-12 items-baseline py-6 md:py-8 border-b-2 border-ink">
                <span className="label md:col-span-2">Step 0{i + 1}</span>
                <h3 className="display text-[clamp(2.5rem,6vw,6rem)] md:col-span-5">{title}</h3>
                <p className="md:col-span-5 text-ink/75 max-w-md">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Tools */}
      <section className="bg-ink text-paper py-6 border-y-2 border-paper/10" data-theme="dark" aria-label="Tools">
        <Marquee items={tools} theme="dark" reverse className="display text-[clamp(2rem,5vw,4.5rem)] text-lime" />
      </section>

      <ContactCta index="03" />
    </div>
  );
}
