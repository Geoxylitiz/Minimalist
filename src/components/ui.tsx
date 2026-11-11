import type { CSSProperties, ReactNode } from 'react';

/** One line of display type that slides up into view (see useReveal). */
export function Line({
  children,
  className = '',
  delay = 0,
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
}) {
  return (
    <span className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
      <span className={`reveal-line block ${className}`} data-delay={delay} style={style}>
        {children}
      </span>
    </span>
  );
}

/** Small section marker, e.g. "(01) About". */
export function Label({ index, children, className = '' }: { index?: string; children: ReactNode; className?: string }) {
  return (
    <p className={`label ${className}`}>
      {index && <span className="opacity-60">({index})&nbsp;</span>}
      {children}
    </p>
  );
}

export function Arrow({ className = '', direction = 'up-right' }: { className?: string; direction?: 'up-right' | 'right' | 'left' | 'up' }) {
  const rotate = { 'up-right': -45, right: 0, left: 180, up: -90 }[direction];
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="square"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

/** Eight-point burst used as a playful graphic accent. */
export function Burst({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      <path
        fill="currentColor"
        d="M50 0l9 28 26-14-14 26 29 10-29 10 14 26-26-14-9 28-9-28-26 14 14-26L0 50l29-10L15 14l26 14z"
      />
    </svg>
  );
}
