import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    gsap.from(".contact-reveal", {
      y: 60,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 md:py-48 bg-sc-surface relative z-20" id="contact" data-sc-act="contact">
      <div className="sc-container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-4">
            <h2 className="text-xs tracking-[0.2em] uppercase text-sc-text-muted mb-8">03. Contact</h2>
          </div>
          <div className="md:col-span-8">
            <h3 className="contact-reveal text-[clamp(2rem,5vw,5rem)] leading-[1.0] mb-16 md:mb-24 uppercase tracking-tight">
              <span className="block mb-2">Let's create</span>
              <span className="block italic text-sc-text-muted font-display lowercase">exceptional things.</span>
            </h3>
            
            <div className="contact-reveal flex flex-col sm:flex-row gap-8 sm:gap-16 text-xs uppercase tracking-[0.2em] text-sc-text-muted">
              <a href="mailto:hello@example.com" className="hover:text-sc-text-primary transition-colors duration-300">
                hello@example.com
              </a>
              <a href="#" className="hover:text-sc-text-primary transition-colors duration-300">
                Twitter (X)
              </a>
              <a href="#" className="hover:text-sc-text-primary transition-colors duration-300">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
