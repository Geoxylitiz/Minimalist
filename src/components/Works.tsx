import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Lumina',
    category: 'Digital Exhibition',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Onyx',
    category: 'Editorial Platform',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Verve',
    category: 'Brand Identity',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop'
  },
];

export function Works() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const panels = gsap.utils.toArray('.work-panel');

    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1, // Smooth scrubbing
        end: () => "+=" + (sliderRef.current?.offsetWidth || 0),
      }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="h-screen bg-sc-bg relative overflow-hidden" id="works" data-sc-act="works">
      {/* Header */}
      <div className="absolute top-16 md:top-32 left-0 w-full sc-container z-10 pointer-events-none">
        <h2 className="text-xs tracking-[0.2em] uppercase text-sc-text-muted mix-blend-difference">02. Selected Works</h2>
      </div>

      <div ref={sliderRef} className="flex w-[300vw] h-full items-center">
        {projects.map((project, idx) => (
          <div key={project.id} className="work-panel w-screen h-full flex-shrink-0 flex items-center justify-center px-4 md:px-16 lg:px-32 relative">
            <div className="relative w-full max-w-4xl group">
              <div className="aspect-[4/3] md:aspect-[16/9] w-full overflow-hidden bg-sc-surface relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover origin-center  transition-all duration-700 ease-[0.16,1,0.3,1] scale-105 group-hover:scale-100 group-hover:grayscale-0"
                />
              </div>
              <div className="mt-8 flex justify-between items-start">
                <div>
                  <h3 className="text-2xl md:text-3xl font-display mb-2 text-sc-text-primary">{project.title}</h3>
                  <p className="text-sc-text-muted text-sm">{project.category}</p>
                </div>
                <div className="text-sm text-sc-text-muted">{project.year}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
