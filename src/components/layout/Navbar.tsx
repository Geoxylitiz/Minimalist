import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { site } from '../../config/site';

const links = [
  { to: '/', label: 'Home' },
  { to: '/works', label: 'Works' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

type Theme = 'dark' | 'light';

/** Vertical centre of the nav pill when shown, in px from the viewport top. */
const NAV_SAMPLE_Y = 40;

/**
 * Floating pill nav. It reads the `data-theme` of whichever section sits under
 * it and inverts so it stays legible on every colour block, and tucks away
 * while scrolling down.
 */
export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  const [theme, setTheme] = useState<Theme>('dark');
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const nav = navRef.current;
      if (!nav) return;

      // Theme: sample the section beneath the nav's resting spot. A fixed point
      // keeps this correct while the nav itself is translated off-screen.
      const under = document
        .elementsFromPoint(window.innerWidth / 2, NAV_SAMPLE_Y)
        .find((el) => !nav.contains(el))
        ?.closest<HTMLElement>('[data-theme]');
      setTheme((under?.dataset.theme as Theme) ?? 'dark');

      // Visibility: hide on scroll down, show on scroll up or near the top.
      const currentY = window.scrollY;
      const diff = currentY - lastY;
      if (currentY < 80) setHidden(false);
      else if (Math.abs(diff) > 6) setHidden(diff > 0);
      lastY = currentY;
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    // Re-sample after the new route has painted.
    const t = window.setTimeout(update, 60);
    setHidden(false);

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.clearTimeout(t);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return (
    <nav
      ref={navRef}
      aria-label="Main navigation"
      data-nav-theme={theme}
      data-hidden={hidden}
      className="navbar"
      onFocus={() => setHidden(false)}
    >
      <Link to="/" className="navbar-logo" aria-label={`${site.name}, home`}>
        {site.shortName}
      </Link>

      <ul className="navbar-links" role="list">
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) => `navbar-link${isActive ? ' is-active' : ''}`}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      {site.available && (
        <span className="navbar-status">
          <span className="navbar-status-dot" aria-hidden="true" />
          Available
        </span>
      )}
    </nav>
  );
}
