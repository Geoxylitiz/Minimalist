'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#$%&';

function randomChar() {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
}

export function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // ---- Scramble / decode title reveal ----
      // Target text is read from data-text (set once in JSX), never from
      // live textContent — textContent gets overwritten with scramble
      // spans below, so re-running this effect (Strict Mode double-invoke,
      // Fast Refresh, etc.) would otherwise "resolve" toward whatever
      // garbled text was left over from the previous run.
      const scrambleEls = gsap.utils.toArray<HTMLElement>('.scramble');
      scrambleEls.forEach((el, lineIndex) => {
        const finalText = el.dataset.text ?? el.textContent ?? '';
        el.textContent = '';

        const chars = finalText.split('').map((char) => {
          const span = document.createElement('span');
          span.style.display = 'inline-block';
          span.textContent = char === ' ' ? '\u00A0' : randomChar();
          el.appendChild(span);
          return { span, char };
        });

        if (reduceMotion) {
          chars.forEach(({ span, char }) => {
            span.textContent = char === ' ' ? '\u00A0' : char;
          });
          return;
        }

        chars.forEach(({ span, char }, charIndex) => {
          if (char === ' ') return;
          const state = { progress: 0 };
          gsap.to(state, {
            progress: 1,
            duration: 0.9,
            delay: 0.6 + lineIndex * 0.18 + charIndex * 0.028,
            ease: 'power2.out',
            onUpdate: () => {
              span.textContent = state.progress > 0.85 ? char : randomChar();
            },
            onComplete: () => {
              span.textContent = char;
            }
          });
        });
      });

      // ---- Chrome fade-in ----
      gsap.from('.hero-fade', {
        opacity: 0,
        y: 12,
        duration: 1.2,
        delay: 0.4,
        stagger: 0.1,
        ease: 'power2.out'
      });

      gsap.from('.hero-marquee', {
        opacity: 0,
        duration: 1.5,
        delay: 1,
        ease: 'power2.out'
      });

      if (reduceMotion) return;

      // ---- Cinematic pinned scroll sequence ----
      gsap
        .timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            pin: containerRef.current
          }
        })
        .to('.hero-title-scale', { scale: 0.82, yPercent: -6, opacity: 0, ease: 'none' }, 0)
        .to('.hero-parallax-bg', { yPercent: 20, opacity: 0.35, ease: 'none' }, 0)
        .to('.hero-fade', { opacity: 0, y: -20, ease: 'none' }, 0.1)
        .to('.hero-ghost', { opacity: 0.14, scale: 1.12, ease: 'none' }, 0)
        .to('.hero-marquee', { xPercent: -12, ease: 'none' }, 0);

      // ---- Ambient plasma canvas ----
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;

      let w = (canvas.width = canvas.offsetWidth);
      let h = (canvas.height = canvas.offsetHeight);

      const blobs = [
        { x: 0.25, y: 0.35, r: 0.3, color: '#c4a47c', speed: 1 },
        { x: 0.72, y: 0.6, r: 0.24, color: '#8a6d4a', speed: 0.8 },
        { x: 0.5, y: 0.18, r: 0.2, color: '#3a3a3a', speed: 0.65 }
      ];

      const resize = () => {
        w = canvas.width = canvas.offsetWidth;
        h = canvas.height = canvas.offsetHeight;
      };
      window.addEventListener('resize', resize);

      let t = 0;
      let raf: number;
      const render = () => {
        t += 0.004;
        ctx.clearRect(0, 0, w, h);
        blobs.forEach((b, i) => {
          const bx = (b.x + Math.sin(t * b.speed + i) * 0.07) * w;
          const by = (b.y + Math.cos(t * b.speed * 0.8 + i) * 0.07) * h;
          const r = b.r * Math.max(w, h);
          const grad = ctx.createRadialGradient(bx, by, 0, bx, by, r);
          grad.addColorStop(0, `${b.color}33`);
          grad.addColorStop(1, `${b.color}00`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(bx, by, r, 0, Math.PI * 2);
          ctx.fill();
        });
        raf = requestAnimationFrame(render);
      };
      render();

      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', resize);
      };
    },
    { scope: wrapperRef }
  );

  return (
    <div ref={wrapperRef} className="relative h-[220vh]">
      <section
        ref={containerRef}
        className="relative h-screen w-full flex flex-col justify-between overflow-hidden pt-8 pb-12"
        data-sc-act="hero"
      >
        {/* Ambient plasma canvas — WebGL-style glow without the dependency weight */}
        <canvas
          ref={canvasRef}
          className="hero-parallax-bg absolute inset-0 z-0 w-full h-full pointer-events-none mix-blend-screen opacity-70"
        />

        {/* Outlined ghost word, layered behind the title */}
        <div className="hero-ghost absolute inset-0 z-0 flex items-center justify-center opacity-0 pointer-events-none select-none">
          <span
            className="text-[26vw] font-display uppercase leading-none whitespace-nowrap"
            style={{ WebkitTextStroke: '1px var(--color-sc-accent)', color: 'transparent' }}
          >
            Vision
          </span>
        </div>

        {/* Vertical marquee, right edge — unconventional structural device */}
        <div className="hero-marquee hidden md:flex absolute top-0 right-6 lg:right-10 h-full items-center z-10 pointer-events-none">
          <div className="flex flex-col gap-6 [writing-mode:vertical-rl] text-[0.65rem] tracking-[0.3em] uppercase text-sc-text-muted whitespace-nowrap">
            <span>Studio&reg; — Est. 2016</span>
            <span>Curated Works — No. 001</span>
          </div>
        </div>

        {/* Top Nav */}
        <div className="sc-container hero-fade flex justify-between items-center text-[0.65rem] md:text-xs tracking-widest uppercase text-sc-text-muted z-10 w-full relative">
          <div>Studio&reg;</div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-sc-accent animate-pulse" />
            Available for Commissions
          </div>
        </div>

        {/* Main Title */}
        <div className="sc-container z-10 hero-title-scale">
          <h1 className="text-[clamp(3.5rem,10vw,12rem)] leading-[0.85] tracking-tighter uppercase flex flex-col relative w-full">
            <div className="overflow-hidden">
              <span className="scramble block text-sc-text-primary" data-text="Vision">
                Vision
              </span>
            </div>
            <div className="overflow-hidden">
              <span
                className="scramble block text-sc-text-muted italic font-display lowercase pl-[15vw] md:pl-[20vw]"
                data-text="& Execution"
              >
                &amp; Execution
              </span>
            </div>
            <div className="overflow-hidden">
              <span
                className="scramble block text-sc-text-primary pl-[5vw] md:pl-[10vw]"
                data-text="By Design"
              >
                By Design
              </span>
            </div>
          </h1>
        </div>

        {/* Bottom Info */}
        <div className="sc-container hero-fade flex justify-between items-end text-xs tracking-[0.2em] uppercase text-sc-text-muted z-10 w-full relative">
          <div className="flex flex-col gap-3">
            <span>Scroll to explore</span>
            <div className="w-[1px] h-12 bg-sc-text-muted origin-top opacity-30 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-sc-accent animate-scroll-line" />
            </div>
          </div>
        </div>
        <div className="transition-veil absolute inset-0 z-20 bg-sc-surface origin-bottom scale-y-0 pointer-events-none" />
      </section>
    </div>
  );
}