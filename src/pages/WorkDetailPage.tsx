import { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { projects, kindLabel } from '../data/projects';
import { useReveal } from '../hooks/useReveal';
import { Arrow, Label, Line } from '../components/ui';

/** Pick a nav theme for an arbitrary project colour from its ink. */
const themeFor = (ink: string) => (ink.toLowerCase() === '#0a0a0a' ? 'light' : 'dark');

export default function WorkDetailPage() {
  const { id } = useParams();
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);

  const index = projects.findIndex((p) => p.id === id);
  const project = projects[index];

  if (!project) {
    return (
      <section className="bg-cobalt text-paper min-h-svh flex items-center" data-theme="dark">
        <div className="wrap py-40">
          <Label>Error 404</Label>
          <h1 className="display mt-6 text-[clamp(3.5rem,12vw,12rem)]">No work<br />here</h1>
          <Link to="/works" className="btn btn--paper mt-12">
            <Arrow direction="left" className="w-4 h-4" /> Back to works
          </Link>
        </div>
      </section>
    );
  }

  const next = projects[(index + 1) % projects.length];
  const facts = [
    ['Year', project.year],
    ['Type', kindLabel[project.kind]],
    ['Category', project.category],
    ['Role', project.role],
  ];

  return (
    <div ref={ref} key={project.id}>
      <header style={{ backgroundColor: project.color, color: project.ink }} data-theme={themeFor(project.ink)}>
        <div className="wrap pt-32 md:pt-44 pb-12 md:pb-16">
          <Link to="/works" className="reveal-up label inline-flex items-center gap-2 hover:underline underline-offset-4">
            <Arrow direction="left" className="w-3.5 h-3.5" /> All works
          </Link>
          <h1 className="display mt-8 text-[clamp(4rem,17vw,17rem)]">
            <Line>{project.title}</Line>
          </h1>
          <div className="mt-10 grid gap-8 md:grid-cols-12 items-end">
            <p className="reveal-up md:col-span-6 text-lg md:text-xl max-w-xl">{project.description}</p>
            <div className="reveal-up md:col-span-6 flex flex-wrap md:justify-end gap-2">
              {project.tags.map((t) => <span key={t} className="chip">{t}</span>)}
            </div>
          </div>
        </div>

        <div className="wrap pb-6 md:pb-10">
          <div className="reveal-up aspect-[16/10] md:aspect-[16/8] overflow-hidden rounded-[1.25rem] bg-ink/10">
            <img src={project.image} alt={`${project.title} project preview`} className="h-full w-full object-cover" />
          </div>
        </div>
      </header>

      <section className="bg-paper text-ink" data-theme="light">
        <div className="wrap py-20 md:py-32 grid gap-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <Label className="reveal-up mb-6">Overview</Label>
            <p className="reveal-up font-display font-medium text-[clamp(1.6rem,3.2vw,3rem)] leading-[1.08] tracking-[-0.02em]">
              {project.overview}
            </p>
          </div>

          <dl className="md:col-span-4 md:col-start-9 border-t-2 border-ink">
            {facts.map(([k, v]) => (
              <div key={k} className="reveal-up grid grid-cols-3 gap-4 py-4 border-b-2 border-ink">
                <dt className="label pt-1">{k}</dt>
                <dd className="col-span-2">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="wrap pb-20 md:pb-32">
          <Label className="reveal-up mb-6">Services</Label>
          <ul className="flex flex-wrap gap-3">
            {project.services.map((s) => (
              <li key={s} className="reveal-up display text-[clamp(1.75rem,4vw,3.5rem)] px-5 py-3 rounded-full bg-ink text-paper">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Link
        to={`/works/${next.id}`}
        className="group block"
        style={{ backgroundColor: next.color, color: next.ink }}
        data-theme={themeFor(next.ink)}
      >
        <div className="wrap py-20 md:py-28 flex items-end justify-between gap-6">
          <div>
            <Label>Next project</Label>
            <p className="display mt-4 text-[clamp(3.5rem,12vw,12rem)]">{next.title}</p>
          </div>
          <Arrow direction="right" className="w-[clamp(3rem,8vw,7rem)] h-[clamp(3rem,8vw,7rem)] shrink-0 transition-transform duration-500 ease-out-expo group-hover:translate-x-3" />
        </div>
      </Link>
    </div>
  );
}
