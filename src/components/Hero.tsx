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
            duration: 0.35, // Snappier, more mechanical
            delay: 0.8 + lineIndex * 0.12 + charIndex * 0.025, // Tighter stagger
            ease: 'power3.out', // Sharper ease-out
            onUpdate: () => {
              // Resolves to the true character in the last 25% of the animation
              span.textContent = state.progress > 0.75 ? char : randomChar();
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
        .to('.hero-marquee', { xPercent: -12, ease: 'none' }, 0)
        .to('.transition-veil', {
          scaleY: 1,
          transformOrigin: 'bottom',
          ease: 'power2.inOut'
        }, 0.6); // Editorial curtain reveal

      // ---- Ambient plasma canvas (High-End Mesh Gradient Technique) ----
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: true });
      if (!ctx) return;

      // THE TRICK: Render at a low resolution and let CSS upscale + blur it.
      const renderScale = 0.15;
      let w = 0;
      let h = 0;

      const resize = () => {
        w = Math.floor(canvas.offsetWidth * renderScale);
        h = Math.floor(canvas.offsetHeight * renderScale);
        canvas.width = w;
        canvas.height = h;
      };
      resize();
      window.addEventListener('resize', resize);

      // More organic, staggered blob configuration
      const blobs = [
        { x: 0.25, y: 0.35, r: 0.6, color: '#c4a47c', speed: 1.1, phase: 0 },   // Champagne Gold
        { x: 0.75, y: 0.65, r: 0.5, color: '#8a6d4a', speed: 0.8, phase: 2 },   // Warm Bronze
        { x: 0.50, y: 0.20, r: 0.4, color: '#2a2a2a', speed: 0.6, phase: 4 },   // Deep Slate Shadow
        { x: 0.85, y: 0.25, r: 0.3, color: '#c4a47c', speed: 0.9, phase: 1.5 }, // Subtle Gold Accent
      ];

      let t = 0;
      let raf: number;

      const render = () => {
        t += 0.002; // Slower, more cinematic drift
        ctx.clearRect(0, 0, w, h);

        // 'lighter' creates a beautiful luminous blending where colors overlap
        ctx.globalCompositeOperation = 'lighter';

        blobs.forEach((b, i) => {
          // Fractal movement (combining two sine waves) breaks the robotic feel
          const noiseX = Math.sin(t * b.speed + b.phase) * 0.08 + Math.cos(t * b.speed * 0.6 + i) * 0.04;
          const noiseY = Math.cos(t * b.speed * 0.8 + b.phase) * 0.08 + Math.sin(t * b.speed * 0.4 + i) * 0.04;

          const bx = (b.x + noiseX) * w;
          const by = (b.y + noiseY) * h;

          // Radius scales relative to the smaller dimension to prevent clipping
          const r = b.r * Math.min(w, h) * 1.2;

          const grad = ctx.createRadialGradient(bx, by, 0, bx, by, r);
          // Higher core alpha gives the CSS blur more "meat" to work with
          grad.addColorStop(0, `${b.color}cc`);
          grad.addColorStop(0.4, `${b.color}66`);
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
          className="hero-parallax-bg absolute inset-0 z-0 w-full h-full pointer-events-none mix-blend-lighten"
          style={{
            filter: 'blur(32px) contrast(1.15) saturate(1.2)',
            opacity: 0.85,
            imageRendering: 'auto'
          }}
        />

        {/* Outlined ghost word, layered behind the title */}
        <div className="hero-ghost absolute inset-0 z-0 flex items-center justify-center opacity-0 pointer-events-none select-none">
          <span
            className="text-[26vw] font-display uppercase leading-none whitespace-nowrap"
            style={{ WebkitTextStroke: '1px var(--color-sc-accent)', color: 'transparent' }}
          >
            Oliver
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

        {/* Editorial Page-Turn Curtain */}
        <div className="transition-veil absolute inset-0 z-20 bg-sc-surface origin-bottom scale-y-0 pointer-events-none" />
      </section>
    </div>
  );
}