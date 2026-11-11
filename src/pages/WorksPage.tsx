import { useRef, useState } from 'react';
import { projects, kindLabel, type ProjectKind } from '../data/projects';
import { useReveal } from '../hooks/useReveal';
import { ContactCta } from '../components/ContactCta';
import { ProjectCard } from '../components/ProjectCard';
import { Label, Line } from '../components/ui';

type Filter = 'all' | ProjectKind;

const filters: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: kindLabel.webdesign, value: 'webdesign' },
  { label: kindLabel.automation, value: 'automation' },
];

export default function WorksPage() {
  const ref = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Filter>('all');
  useReveal(ref);

  const visible = filter === 'all' ? projects : projects.filter((p) => p.kind === filter);
  const count = (f: Filter) => (f === 'all' ? projects.length : projects.filter((p) => p.kind === f).length);

  return (
    <div ref={ref}>
      <header className="bg-flame text-ink" data-theme="light">
        <div className="wrap pt-32 md:pt-44 pb-14 md:pb-20">
          <Label className="reveal-up">Selected works — {projects.length} projects</Label>
          <h1 className="display mt-6 text-[clamp(3.5rem,13vw,13rem)]">
            <Line>The craft</Line>
            <Line delay={0.08}>&amp; the code</Line>
          </h1>
        </div>
      </header>

      <section className="bg-ink text-paper" data-theme="dark" aria-label="Projects">
        <div className="wrap py-10 md:py-14">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10 md:mb-14">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
              {filters.map((f) => {
                const active = filter === f.value;
                return (
                  <button
                    key={f.value}
                    type="button"
                    onClick={() => setFilter(f.value)}
                    aria-pressed={active}
                    className={`btn ${active ? 'btn--paper' : 'border-paper/30 hover:border-paper'}`}
                  >
                    {f.label}
                    <span className={`text-[0.65rem] ${active ? 'opacity-60' : 'opacity-50'}`}>{count(f.value)}</span>
                  </button>
                );
              })}
            </div>
            <p className="label text-paper/50" aria-live="polite">
              Showing {visible.length} of {projects.length}
            </p>
          </div>

          <div className="grid gap-5 md:gap-6 md:grid-cols-2">
            {visible.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      <ContactCta />
    </div>
  );
}
