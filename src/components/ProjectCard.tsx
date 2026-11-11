import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';
import { Arrow } from './ui';

/**
 * A project as a solid colour block. `fill` makes it stretch to its parent's
 * height (used inside the pinned horizontal strip on the home page).
 */
export function ProjectCard({ project, fill = false, className = '' }: { project: Project; fill?: boolean; className?: string }) {
  return (
    <Link
      to={`/works/${project.id}`}
      className={`group flex flex-col rounded-[1.25rem] p-4 md:p-5 transition-transform duration-500 ease-out-expo hover:-translate-y-1 ${fill ? 'h-full' : ''} ${className}`}
      style={{ backgroundColor: project.color, color: project.ink }}
      aria-label={`${project.title} — ${project.category}, ${project.year}`}
    >
      <div className="flex items-center justify-between gap-4 label pb-4">
        <span>{project.id} / {project.category}</span>
        <span>{project.year}</span>
      </div>

      <div className={`relative overflow-hidden rounded-[0.75rem] bg-ink/10 aspect-[16/10] ${fill ? 'md:aspect-auto md:flex-1 md:min-h-0' : ''}`}>
        <img
          src={project.image}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
        />
      </div>

      <div className="flex items-end justify-between gap-4 pt-5">
        <h3 className="display text-[clamp(2.75rem,6.5vw,6.5rem)]">{project.title}</h3>
        <span
          className="mb-1 grid place-items-center w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-full border-2 border-current transition-colors duration-300 group-hover:bg-[var(--card-ink)] group-hover:text-[var(--card-bg)]"
          style={{ ['--card-ink' as string]: project.ink, ['--card-bg' as string]: project.color }}
        >
          <Arrow className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:rotate-45" />
        </span>
      </div>
    </Link>
  );
}
