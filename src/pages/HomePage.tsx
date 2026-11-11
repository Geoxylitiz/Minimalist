import { site } from '../config/site';
import { ContactCta } from '../components/ContactCta';
import { Marquee } from '../components/Marquee';
import { AboutIntro } from '../components/home/AboutIntro';
import { Hero } from '../components/home/Hero';
import { SelectedWorks } from '../components/home/SelectedWorks';

export default function HomePage() {
  return (
    <>
      {/* The sticky hero only sticks within this wrapper, so later sections slide over it. */}
      <div className="relative">
        <Hero />
        <div className="relative z-10">
          <Marquee
            items={[...site.services, 'Available ' + new Date().getFullYear()]}
            className="bg-lime text-ink display text-[clamp(2rem,5.5vw,5rem)] py-4 md:py-5 border-y-2 border-ink"
          />
          <AboutIntro />
        </div>
      </div>
      <SelectedWorks />
      <ContactCta index="03" />
    </>
  );
}
