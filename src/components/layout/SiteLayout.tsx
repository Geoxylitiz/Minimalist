import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ScrollTrigger, scrollToTop, startSmoothScroll } from '../../lib/motion';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

/** Shared shell for every route: smooth scroll, navbar, footer. */
export function SiteLayout() {
  const { pathname } = useLocation();

  useEffect(() => startSmoothScroll(), []);

  useEffect(() => {
    scrollToTop();
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-ink text-paper">
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
