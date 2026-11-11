import { useRef, useState, type FormEvent } from 'react';
import { site } from '../config/site';
import { useReveal } from '../hooks/useReveal';
import { Arrow, Label, Line } from '../components/ui';

const fieldClass =
  'w-full bg-transparent border-b-2 border-ink/25 focus:border-ink py-3 text-xl md:text-2xl outline-none transition-colors placeholder:text-ink/30';

export default function ContactPage() {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');
  useReveal(ref);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setState('sending');
    // Placeholder: no backend yet — simulates a send. Wire to a form service or API route.
    await new Promise((r) => setTimeout(r, 1200));
    setState('sent');
  };

  return (
    <div ref={ref}>
      <header className="bg-lime text-ink" data-theme="light">
        <div className="wrap pt-32 md:pt-44 pb-14 md:pb-20">
          <Label className="reveal-up">Get in touch</Label>
          <h1 className="display mt-6 text-[clamp(3.5rem,13vw,13rem)]">
            <Line>Let's build</Line>
            <Line delay={0.08}>something.</Line>
          </h1>
        </div>
      </header>

      <section className="bg-paper text-ink" data-theme="light">
        <div className="wrap py-16 md:py-28 grid gap-16 lg:grid-cols-12">
          <aside className="lg:col-span-4 space-y-12">
            <div className="reveal-up">
              <Label className="mb-5">Direct</Label>
              <ul className="border-t-2 border-ink">
                {[{ label: 'Email', handle: site.email, href: `mailto:${site.email}` }, ...site.socials].map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="group flex items-center justify-between gap-4 py-4 border-b-2 border-ink hover:bg-ink hover:text-paper hover:px-3 transition-all duration-300">
                      <span className="label">{l.label}</span>
                      <span className="inline-flex items-center gap-2 break-all text-right">
                        {l.handle} <Arrow className="w-4 h-4 shrink-0" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal-up">
              <Label className="mb-3">Based in</Label>
              <p className="text-xl">{site.location}</p>
            </div>
          </aside>

          <div className="lg:col-span-7 lg:col-start-6">
            {state === 'sent' ? (
              <div className="rounded-[1.25rem] bg-cobalt text-paper p-8 md:p-12" role="status">
                <p className="display text-[clamp(2.5rem,6vw,5rem)]">Message received.</p>
                <p className="mt-4 max-w-md text-paper/80">Thanks for reaching out — I read every message myself and usually reply within two working days.</p>
                <button type="button" onClick={() => setState('idle')} className="btn btn--paper mt-8">Send another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="reveal-up space-y-8">
                <Label>Start a project</Label>
                <div className="grid gap-8 sm:grid-cols-2">
                  <label className="block">
                    <span className="label text-ink/60">Name</span>
                    <input name="name" required autoComplete="name" placeholder="Your name" className={fieldClass} />
                  </label>
                  <label className="block">
                    <span className="label text-ink/60">Email</span>
                    <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={fieldClass} />
                  </label>
                </div>
                <fieldset>
                  <legend className="label text-ink/60 mb-3">I need help with</legend>
                  <div className="flex flex-wrap gap-2">
                    {site.services.map((s, i) => (
                      <label key={s} className="cursor-pointer">
                        <input type="radio" name="type" value={s} defaultChecked={i === 0} className="peer sr-only" />
                        <span className="btn btn--outline peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-3 peer-focus-visible:outline-flame">{s}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <label className="block">
                  <span className="label text-ink/60">Message</span>
                  <textarea name="message" required rows={4} placeholder="Tell me about the project, timeline and budget…" className={`${fieldClass} resize-none`} />
                </label>
                <button type="submit" disabled={state === 'sending'} className="btn btn--ink text-base min-h-14 px-8 disabled:opacity-60">
                  {state === 'sending' ? 'Sending…' : 'Send message'} <Arrow direction="right" className="w-5 h-5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
