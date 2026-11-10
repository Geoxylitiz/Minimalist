import { Link, useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { projects } from '../data/projects';

export default function WorkDetailPage() {
  const { id } = useParams();
  const project = projects.find((item) => item.id === id);

  if (!project) {
    return (
      <div className="bg-sc-bg min-h-screen text-sc-text-primary selection:bg-sc-accent selection:text-sc-bg">
        <div className="noise-overlay" />
        <Navbar />
        <main className="sc-container min-h-screen flex flex-col justify-center py-48">
          <p className="text-[0.65rem] tracking-[0.3em] uppercase text-sc-accent mb-8">
            Project not found
          </p>
          <h1 className="text-[clamp(3.5rem,9vw,9rem)] font-display font-normal leading-[0.9] tracking-tighter uppercase max-w-4xl">
            No work here
          </h1>
          <Link
            to="/works"
            className="mt-12 inline-flex w-fit items-center gap-3 text-[0.65rem] tracking-[0.2em] uppercase text-sc-text-muted hover:text-sc-accent transition-colors duration-300"
          >
            <span className="transition-transform duration-300">←</span>
            Back to Works
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-sc-bg min-h-screen text-sc-text-primary selection:bg-sc-accent selection:text-sc-bg">
      <div className="noise-overlay" />
      <Navbar />

      <header className="sc-container pt-48 pb-16 md:pb-24 border-b border-sc-border">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-8">
            <p className="text-[0.65rem] tracking-[0.3em] uppercase text-sc-accent mb-8">
              {project.category} - {project.year}
            </p>
            <h1 className="text-[clamp(4rem,11vw,11rem)] font-display font-normal leading-[0.85] tracking-tighter uppercase">
              {project.title}
            </h1>
          </div>
          <div className="md:col-span-4 md:self-end">
            <p className="text-sc-text-muted text-sm leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
      </header>

      <main>
        <section className="sc-container py-12 md:py-16">
          <div className="aspect-[16/10] overflow-hidden bg-sc-surface">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        <section className="sc-container py-16 md:py-24 border-y border-sc-border">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-7">
              <p className="text-[0.6rem] tracking-[0.25em] uppercase text-sc-accent mb-6">
                Overview
              </p>
              <p className="text-xl md:text-3xl font-display leading-snug text-sc-text-primary max-w-3xl">
                {project.overview}
              </p>
            </div>

            <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div>
                <p className="text-[0.55rem] tracking-[0.2em] uppercase text-sc-text-muted mb-4">
                  Role
                </p>
                <p className="text-sm leading-relaxed text-sc-text-primary">
                  {project.role}
                </p>
              </div>
              <div>
                <p className="text-[0.55rem] tracking-[0.2em] uppercase text-sc-text-muted mb-4">
                  Type
                </p>
                <p className="text-sm leading-relaxed text-sc-text-primary uppercase">
                  {project.kind === 'webdesign' ? 'Web Design' : 'Automation'}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="sc-container py-16 md:py-24 border-b border-sc-border">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <p className="md:col-span-3 text-[0.6rem] tracking-[0.25em] uppercase text-sc-text-muted">
              Services
            </p>
            <div className="md:col-span-9 flex flex-wrap gap-3">
              {project.services.map((service) => (
                <span
                  key={service}
                  className="px-4 py-2 border border-sc-border text-[0.6rem] tracking-[0.2em] uppercase text-sc-text-muted"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="sc-container py-20 flex flex-col md:flex-row justify-between items-center gap-6 text-[0.6rem] tracking-[0.25em] uppercase text-sc-text-muted">
        <Link
          to="/works"
          className="hover:text-sc-accent transition-colors duration-200 flex items-center gap-2 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
          Back to Works
        </Link>
        <Link
          to="/"
          className="hover:text-sc-accent transition-colors duration-200"
        >
          Home
        </Link>
      </footer>
    </div>
  );
}
