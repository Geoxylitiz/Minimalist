import { Fragment } from 'react';
import { Burst } from './ui';

/** Endless scrolling band of words separated by bursts. Pauses under reduced motion. */
export function Marquee({
  items,
  className = '',
  reverse = false,
  theme = 'light',
}: {
  items: readonly string[];
  className?: string;
  reverse?: boolean;
  /** Read by the navbar to pick a legible colour. */
  theme?: 'light' | 'dark';
}) {
  const row = (
    <div className="marquee-row" aria-hidden="true">
      {items.map((item) => (
        <Fragment key={item}>
          <span>{item}</span>
          <Burst className="w-[0.7em] h-[0.7em] shrink-0" />
        </Fragment>
      ))}
    </div>
  );

  return (
    <div className={`marquee ${reverse ? 'marquee--reverse' : ''} ${className}`} data-theme={theme}>
      <span className="sr-only">{items.join(', ')}</span>
      <div className="marquee-track">
        {row}
        {row}
      </div>
    </div>
  );
}
