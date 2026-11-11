import { Link } from 'react-router-dom';
import { site } from '../../config/site';
import { Arrow } from '../ui';
import { scrollToTop } from '../../lib/motion';

export function Footer() {
  return (
    <footer className="bg-ink text-paper border-t border-paper/15" data-theme="dark">
      <div className="wrap py-16 md:py-20 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-4xl md:text-5xl font-semibold uppercase leading-none tracking-tight">
            {site.name}
          </p>
          <p className="mt-4 text-paper/60 max-w-xs">{site.role}. {site.location}.</p>
        </div>

        <nav className="md:col-span-3" aria-label="Footer">
          <p className="label text-paper/50 mb-4">Pages</p>
          <ul className="space-y-2 text-lg">
            {[['/', 'Home'], ['/works', 'Works'], ['/about', 'About'], ['/contact', 'Contact']].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="link-underline">{label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="label text-paper/50 mb-4">Elsewhere</p>
          <ul className="space-y-2 text-lg">
            <li><a href={`mailto:${site.email}`} className="link-underline">{site.email}</a></li>
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="link-underline">{s.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="wrap pb-10 flex flex-wrap items-center justify-between gap-4 label text-paper/50">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <button type="button" onClick={scrollToTop} className="inline-flex items-center gap-2 uppercase hover:text-lime transition-colors">
          Back to top <Arrow direction="up" className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
