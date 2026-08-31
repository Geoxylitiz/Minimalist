import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '../components/Navbar';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: '01',
    title: 'Lumina',
    category: 'Digital Exhibition',
    year: '2025',
    tags: ['WebGL', 'Three.js', 'Motion'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop',
    description: 'An immersive digital exhibition platform built around spatial audio and generative visuals. Each room reacts in real-time to the visitor\'s cursor path.',
  },
  {
    id: '02',
    title: 'Onyx',
    category: 'Editorial Platform',
    year: '2024',
    tags: ['React', 'CMS', 'Typography'],
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000&auto=format&fit=crop',
    description: 'A bespoke editorial system for a luxury magazine. Custom variable-font renderer, infinite scroll canvas, and an editor dashboard built to eliminate latency.',
  },
  {
    id: '03',
    title: 'Verve',
    category: 'Brand Identity',
    year: '2024',
    tags: ['Identity', 'Motion', 'Print'],
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop',
    description: 'Complete brand overhaul for an architectural firm. Logotype constructed on a strict grid, with a motion system that adapts across every touchpoint.',
  },
  {
    id: '04',
    title: 'Aether',
    category: 'Product Design',
    year: '2023',
    tags: ['UI/UX', 'Design System', 'Prototyping'],
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=2000&auto=format&fit=crop',
    description: 'End-to-end product design for a fintech startup. Built the full design system from tokens to components, reducing engineering handoff time by 60%.',
  },
];

export default function WorksPage() {
  const pageRef = useRef<HTMLDivElement>(null);


  return (
    <div ref={pageRef} className="bg-sc-bg min-h-screen text-sc-text-primary selection:bg-sc-accent selection:text-sc-bg">
      <div className="noise-overlay" />
      <Navbar />

      {/* ── Hero Section ── */}
      <header className="sc-container pt-48 pb-24 md:pb-32 border-b border-sc-border">
        <p className="wp-hero-meta text-[0.65rem] tracking-[0.3em] uppercase text-sc-accent mb-8">
          Selected Works — {projects.length} Projects
        </p>
        <h1 className="overflow-hidden">
          <span className="wp-hero-line block text-[clamp(3.5rem,9vw,10rem)] font-display font-normal leading-[0.9] tracking-tighter uppercase">
            The Craft
          </span>
          <span className="wp-hero-line block text-[clamp(3.5rem,9vw,10rem)] font-display font-normal leading-[0.9] tracking-tighter uppercase text-sc-text-muted mt-2">
            & Code
          </span>
        </h1>
      </header>

      {/* ── Project List ── */}
      <main className="sc-container">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/works/${project.id}`}
            className="wp-project-row group relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0 py-16 md:py-24 border-b border-sc-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sc-accent focus-visible:ring-offset-4 focus-visible:ring-offset-sc-bg rounded-sm"
            aria-label={`View ${project.title} project`}
          >
            {/* Hover line accent */}
            <div className="absolute left-20 top-0 w-[2px] h-full bg-sc-accent origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out hidden md:block" />

            {/* Index & Category */}
            <div className="md:col-span-1 flex md:flex-col justify-between md:justify-start gap-4 wp-project-content">
              <span className="text-[0.6rem] tracking-[0.25em] text-sc-text-muted uppercase">{project.id}</span>
              <span className="text-[0.55rem] tracking-[0.2em] text-sc-accent uppercase md:mt-2">{project.category}</span>
            </div>

            {/* Image with Clip Reveal */}
            <div className="md:col-span-4 overflow-hidden wp-project-content">
              <div className="aspect-[4/3] overflow-hidden bg-sc-surface">
                <img
                  src={project.image}
                  alt={project.title}
                  className="wp-project-img w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out will-change-transform"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Title & Description */}
            <div className="md:col-span-5 md:px-12 flex flex-col justify-center wp-project-content">
              <h2 className="text-[clamp(2.2rem,4.5vw,4.5rem)] font-display font-normal leading-[0.95] tracking-tight text-sc-text-primary mb-6 uppercase group-hover:text-sc-accent transition-colors duration-300">
                {project.title}
              </h2>
              <p className="text-sc-text-muted text-sm leading-relaxed max-w-md opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-8">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[0.5rem] tracking-[0.2em] uppercase px-3 py-1.5 border border-sc-border text-sc-text-muted rounded-full group-hover:border-sc-accent/30 transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Year & Arrow */}
            <div className="md:col-span-2 flex md:flex-col justify-between md:justify-center md:items-end gap-4 wp-project-content">
              <span className="text-xs tracking-[0.15em] text-sc-text-muted tabular-nums">{project.year}</span>
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-sc-border text-sc-text-muted group-hover:bg-sc-accent group-hover:border-sc-accent group-hover:text-sc-bg transition-all duration-300">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </main>

      {/* ── Footer Strip ── */}
      <footer className="sc-container py-20 flex flex-col md:flex-row justify-between items-center gap-6 text-[0.6rem] tracking-[0.25em] uppercase text-sc-text-muted">
        <span>© {new Date().getFullYear()} — End of selected works</span>
        <Link
          to="/"
          className="hover:text-sc-accent transition-colors duration-200 flex items-center gap-2 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
          Back to Home
        </Link>
      </footer>
    </div>
  );
}