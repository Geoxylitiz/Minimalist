import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import gsap from 'gsap';

const links = [
  { to: '/', label: 'Home' },
  { to: '/works', label: 'Works' },
  { to: '/about', label: 'About' },
];

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();

  // Track hidden state for UI feedback if needed, 
  // but GSAP will handle the actual visual transform
  const [isHidden, setIsHidden] = useState(false);

  // Mount entrance animation
  useEffect(() => {
    // Ensure nav starts visible for GSAP to animate from
    gsap.set(navRef.current, { autoAlpha: 1 });

    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'power3.out' }
    );
  }, []);

  // Scroll-aware hide/show logic
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    // Threshold to prevent jitter at the very top
    const SCROLL_THRESHOLD = 10;
    // Distance user must scroll before nav reacts (prevents micro-scroll hiding)
    const DIRECTION_THRESHOLD = 5;

    const updateNav = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;

      // Only react if we've scrolled past threshold and moved enough
      if (currentScrollY > SCROLL_THRESHOLD && Math.abs(diff) > DIRECTION_THRESHOLD) {
        const shouldHide = diff > 0; // Scrolling DOWN

        if (shouldHide !== isHidden) {
          setIsHidden(shouldHide);

          // Use GSAP for consistent animation with entrance
          gsap.to(navRef.current, {
            y: shouldHide ? -120 : 0,
            opacity: shouldHide ? 0 : 1,
            duration: 0.4,
            ease: 'power2.inOut',
            overwrite: true, // Kill any competing tweens
          });
        }

        lastScrollY = currentScrollY;
      } else if (currentScrollY <= SCROLL_THRESHOLD) {
        // Always show when at top
        if (isHidden) {
          setIsHidden(false);
          gsap.to(navRef.current, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' });
          lastScrollY = currentScrollY;
        }
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNav);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHidden]);

  // Optional: Re-show nav on route change so users aren't lost
  useEffect(() => {
    if (isHidden) {
      setIsHidden(false);
      gsap.to(navRef.current, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' });
    }
  }, [location.pathname]);

  return (
    <nav
      ref={navRef}
      className="navbar-float"
      aria-label="Main navigation"
      style={{ visibility: 'hidden' }} // Prevents flash before GSAP mount
    >
      {/* Nav links */}
      <ul className="navbar-links" role="list">
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `navbar-link${isActive ? ' navbar-link--active' : ''}`
              }
            >
              {label}
              <span className="navbar-link-line" aria-hidden="true" />
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Status pill */}
      <div className="navbar-status" aria-label="Availability status">
        <span className="navbar-status-dot" aria-hidden="true" />
        <span>Available</span>
      </div>
    </nav>
  );
}