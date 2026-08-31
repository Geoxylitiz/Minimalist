/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { Navbar } from './components/Navbar';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Hero } from './components/Hero';
import { Works } from './components/Works';

import WorksPage from './pages/WorksPage';
import AboutPage from './pages/AboutPage';

gsap.registerPlugin(ScrollTrigger);

function HomeLayout() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return (
    <main className="bg-sc-bg min-h-screen text-sc-text-primary">
      <div className="noise-overlay" />
      <Navbar />
      <Hero />
      <About />
      <Works />
      <Contact />
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/works" element={<WorksPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}
