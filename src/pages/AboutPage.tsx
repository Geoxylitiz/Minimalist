import { useEffect, useRef, useState, React } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Navbar } from '../components/Navbar';

gsap.registerPlugin(ScrollTrigger);

const contactLinks = [
  { label: 'Email', value: 'hello@studio-oliver.com', href: 'mailto:hello@studio-oliver.com' },
  { label: 'LinkedIn', value: '/in/studio-oliver', href: '#' },
  { label: 'Instagram', value: '@studio.oliver', href: '#' },
  { label: 'Read.cv', value: '/oliver', href: '#' },
];

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate submission — replace with actual API call
    await new Promise((r) => setTimeout(r, 1500));
    setFormState('success');
  };

  return (
    <div ref={pageRef} className="bg-sc-bg min-h-screen text-sc-text-primary selection:bg-sc-accent selection:text-sc-bg">
      <div className="noise-overlay" />
      <Navbar />

      {/* ── Hero Heading ── */}
      <header className="sc-container pt-48 pb-24 md:pb-32 border-b border-sc-border">
        <p className="cp-title text-[0.65rem] tracking-[0.3em] uppercase text-sc-accent mb-8">
          Get in Touch
        </p>
        <h1 className="overflow-hidden">
          <span className="cp-title block text-[clamp(3rem,8vw,9rem)] font-display font-normal leading-[0.9] tracking-tighter uppercase">
            Let's Build
          </span>
          <span className="cp-title block text-[clamp(3rem,8vw,9rem)] font-display font-normal leading-[0.9] tracking-tighter uppercase text-sc-text-muted mt-2">
            Something
          </span>
        </h1>
      </header>

      {/* ── Main Content Grid ── */}
      <main className="sc-container py-24 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

        {/* Left Column: Direct Contact */}
        <div className="lg:col-span-5 cp-links-section flex flex-col justify-between gap-16">
          <div>
            <h2 className="text-xs tracking-[0.25em] uppercase text-sc-text-muted mb-10">Direct Lines</h2>
            <div className="flex flex-col gap-0">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="cp-link-row group flex items-baseline justify-between py-5 border-b border-sc-border last:border-none"
                >
                  <span className="text-[0.6rem] tracking-[0.2em] uppercase text-sc-text-muted group-hover:text-sc-accent transition-colors duration-300">
                    {link.label}
                  </span>
                  <span className="text-sm md:text-base text-sc-text-primary group-hover:text-sc-accent transition-colors duration-300">
                    {link.value}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs tracking-[0.25em] uppercase text-sc-text-muted mb-6">Studio</h2>
            <address className="not-italic text-sm leading-relaxed text-sc-text-muted">
              Studio Oliver<br />
              Torstraße 123<br />
              10119 Berlin, Germany
            </address>
          </div>
        </div>

        {/* Right Column: Inquiry Form */}
        <div className="lg:col-span-7 cp-form-section">
          <h2 className="text-xs tracking-[0.25em] uppercase text-sc-text-muted mb-10">Start a Project</h2>

          {formState === 'success' ? (
            <div className="py-20 flex flex-col items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-sc-accent/10 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sc-accent">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h3 className="text-2xl font-display text-sc-text-primary">Message Received</h3>
              <p className="text-sm text-sc-text-muted max-w-md leading-relaxed">
                Thank you for reaching out. I review every inquiry personally and typically respond within 48 hours.
              </p>
              <button
                onClick={() => setFormState('idle')}
                className="mt-6 text-[0.6rem] tracking-[0.2em] uppercase text-sc-accent hover:text-sc-text-primary transition-colors duration-300"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-0">
              {/* Name */}
              <div className="cp-form-field group relative border-b border-sc-border py-6 focus-within:border-sc-accent transition-colors duration-300">
                <label htmlFor="name" className="block text-[0.55rem] tracking-[0.2em] uppercase text-sc-text-muted mb-2 group-focus-within:text-sc-accent transition-colors duration-300">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="w-full bg-transparent text-sc-text-primary text-lg md:text-xl outline-none placeholder:text-sc-border"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div className="cp-form-field group relative border-b border-sc-border py-6 focus-within:border-sc-accent transition-colors duration-300">
                <label htmlFor="email" className="block text-[0.55rem] tracking-[0.2em] uppercase text-sc-text-muted mb-2 group-focus-within:text-sc-accent transition-colors duration-300">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full bg-transparent text-sc-text-primary text-lg md:text-xl outline-none placeholder:text-sc-border"
                  placeholder="your@email.com"
                />
              </div>

              {/* Project Type */}
              <div className="cp-form-field group relative border-b border-sc-border py-6 focus-within:border-sc-accent transition-colors duration-300">
                <label htmlFor="type" className="block text-[0.55rem] tracking-[0.2em] uppercase text-sc-text-muted mb-2 group-focus-within:text-sc-accent transition-colors duration-300">
                  Project Type
                </label>
                <select
                  id="type"
                  name="type"
                  className="w-full bg-transparent text-sc-text-primary text-lg md:text-xl outline-none appearance-none cursor-pointer [&>option]:bg-sc-surface"
                >
                  <option value="">Select an option</option>
                  <option value="brand">Brand Identity</option>
                  <option value="web">Web Design & Development</option>
                  <option value="motion">Motion & Animation</option>
                  <option value="direction">Creative Direction</option>
                  <option value="other">Other</option>
                </select>
                {/* Custom arrow */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-sc-text-muted">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                </div>
              </div>

              {/* Message */}
              <div className="cp-form-field group relative border-b border-sc-border py-6 focus-within:border-sc-accent transition-colors duration-300">
                <label htmlFor="message" className="block text-[0.55rem] tracking-[0.2em] uppercase text-sc-text-muted mb-2 group-focus-within:text-sc-accent transition-colors duration-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full bg-transparent text-sc-text-primary text-lg md:text-xl outline-none resize-none placeholder:text-sc-border"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit */}
              <div className="cp-form-field pt-10">
                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="group inline-flex items-center gap-4 text-sm tracking-[0.15em] uppercase text-sc-text-primary hover:text-sc-accent transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{formState === 'submitting' ? 'Sending...' : 'Send Inquiry'}</span>
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-sc-border group-hover:bg-sc-accent group-hover:border-sc-accent group-hover:text-sc-bg transition-all duration-300">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      {/* ── Pull Quote ── */}
      <section className="sc-container py-24 border-t border-sc-border">
        <blockquote className="cp-quote text-[clamp(1.5rem,3.5vw,4rem)] font-display font-normal leading-[1.15] tracking-tight text-sc-text-primary max-w-4xl">
          "Great collaboration starts with a simple hello. Don't overthink it — just reach out."
        </blockquote>
      </section>

      {/* ── Footer Strip ── */}
      <footer className="sc-container py-16 border-t border-sc-border flex flex-col md:flex-row justify-between items-center gap-6 text-[0.6rem] tracking-[0.25em] uppercase text-sc-text-muted">
        <span>Studio® — Est. 2016</span>
        <Link to="/" className="hover:text-sc-accent transition-colors duration-200 flex items-center gap-2 group">
          <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
          Back to Home
        </Link>
      </footer>
    </div>
  );
}