import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { projects } from '../../data/projects';
import { gsap } from '../../lib/motion';
import { useReveal } from '../../hooks/useReveal';
import { ProjectCard } from '../ProjectCard';
import { Arrow, Label, Line } from '../ui';

/**
 * Ink block with the projects as colour cards. On wide screens the section
 * pins and the cards scroll sideways; on phones (or with reduced motion) they
 * simply stack.
 */
export function SelectedWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  useReveal(sectionRef);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const track = trackRef.current!;
        const distance = () => track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => '+=' + distance(),
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="works-pin relative bg-ink text-paper overflow-hidden md:h-svh md:min-h-[640px] flex flex-col"
      data-theme="dark"
      id="works"
    >
      <div className="wrap pt-24 md:pt-28 pb-8 flex items-end justify-between gap-6">
        <div>
          <Label index="02" className="text-lime mb-4">Selected works</Label>
          <h2 className="display text-[clamp(2.75rem,7vw,7rem)]">
            <Line>Recent work</Line>
          </h2>
        </div>
        <Link to="/works" className="reveal-up btn btn--paper hidden sm:inline-flex">
          All {projects.length} projects <Arrow direction="right" className="w-4 h-4" />
        </Link>
      </div>

      <div
        ref={trackRef}
        className="works-track flex flex-col md:flex-row gap-5 md:gap-6 px-5 sm:px-8 lg:px-14 pb-16 md:pb-10 md:flex-1 md:min-h-0 md:w-max"
      >
        {projects.map((project) => (
          <div key={project.id} className="md:h-full md:w-[min(68vw,62rem)] shrink-0">
            <ProjectCard project={project} fill />
          </div>
        ))}

        <Link
          to="/works"
          className="group shrink-0 md:h-full md:w-[min(34vw,26rem)] rounded-[1.25rem] border-2 border-lime text-lime p-6 flex flex-col justify-between min-h-56 hover:bg-lime hover:text-ink transition-colors duration-300"
        >
          <span className="label">Archive</span>
          <span className="display text-[clamp(2.5rem,5vw,5rem)]">
            See all
            <br />
            works
          </span>
          <Arrow className="w-12 h-12 transition-transform duration-300 group-hover:rotate-45" />
        </Link>
      </div>
    </section>
  );
}
