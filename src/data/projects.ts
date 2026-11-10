export type ProjectKind = 'automation' | 'webdesign';

export type Project = {
  id: string;
  title: string;
  category: string;
  kind: ProjectKind;
  year: string;
  tags: string[];
  image: string;
  description: string;
  overview: string;
  role: string;
  services: string[];
};

export const projects: Project[] = [
  {
    id: '01',
    title: 'Lumina',
    category: 'Digital Exhibition',
    kind: 'webdesign',
    year: '2025',
    tags: ['WebGL', 'Three.js', 'Motion'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop',
    description: 'An immersive digital exhibition platform built around spatial audio and generative visuals. Each room reacts in real-time to the visitor\'s cursor path.',
    overview: 'Lumina turns a traditional exhibition archive into a cinematic browser experience, combining motion-led navigation with responsive visual systems that feel tactile without slowing the site down.',
    role: 'Creative development, interaction design, front-end engineering',
    services: ['Experience Design', 'React Build', 'Motion System'],
  },
  {
    id: '02',
    title: 'Onyx',
    category: 'Editorial Platform',
    kind: 'automation',
    year: '2024',
    tags: ['React', 'CMS', 'Typography'],
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000&auto=format&fit=crop',
    description: 'A bespoke editorial system for a luxury magazine. Custom variable-font renderer, infinite scroll canvas, and an editor dashboard built to eliminate latency.',
    overview: 'Onyx focuses on publishing operations: reusable editorial blocks, automated image treatments, and a lean dashboard that keeps writers and editors moving through production without friction.',
    role: 'System architecture, CMS workflow, front-end engineering',
    services: ['CMS Automation', 'Editorial Tools', 'Performance'],
  },
  {
    id: '03',
    title: 'Verve',
    category: 'Brand Identity',
    kind: 'webdesign',
    year: '2024',
    tags: ['Identity', 'Motion', 'Print'],
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop',
    description: 'Complete brand overhaul for an architectural firm. Logotype constructed on a strict grid, with a motion system that adapts across every touchpoint.',
    overview: 'Verve extends a refreshed identity into a digital presence with precise layouts, restrained motion, and a portfolio structure designed for scanning detailed architectural work.',
    role: 'Brand direction, web design, interaction design',
    services: ['Identity System', 'Website Design', 'Motion Direction'],
  },
  {
    id: '04',
    title: 'Aether',
    category: 'Product Design',
    kind: 'automation',
    year: '2023',
    tags: ['UI/UX', 'Design System', 'Prototyping'],
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=2000&auto=format&fit=crop',
    description: 'End-to-end product design for a fintech startup. Built the full design system from tokens to components, reducing engineering handoff time by 60%.',
    overview: 'Aether brings product design and operational automation together through reusable interface patterns, documented component behavior, and prototype flows that make handoff faster.',
    role: 'Product design, design systems, prototype automation',
    services: ['Design System', 'UX Flows', 'Prototype Tooling'],
  },
];
