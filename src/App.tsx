import { useEffect, lazy, Suspense } from 'react';
import './styles/main.css';
import useLenis from './scripts/hooks/useLenis';
import { siteConfig } from './scripts/config/index';

// Lazy-load every section for code splitting & faster first paint
const Hero          = lazy(() => import('./sections/Hero'));
const AlbumCube     = lazy(() => import('./sections/AlbumCube'));
const ParallaxGallery = lazy(() => import('./sections/ParallaxGallery'));
const TourSchedule  = lazy(() => import('./sections/TourSchedule'));
const ContactSection = lazy(() => import('./sections/ContactSection'));
const Footer        = lazy(() => import('./sections/Footer'));

// Lightweight spinner shown while sections load
const SectionFallback = () => (
  <div className="w-full h-32 flex items-center justify-center">
    <span className="w-5 h-5 rounded-full border-2 border-neon-cyan/30 border-t-neon-cyan animate-spin" />
  </div>
);

function App() {
  useLenis();

  useEffect(() => {
    if (siteConfig.title) document.title = siteConfig.title;
    const meta = document.querySelector('meta[name="viewport"]');
    if (meta) meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-void-black overflow-x-hidden">
      {/* Hero loads immediately */}
      <Suspense fallback={<div className="w-full h-screen bg-void-black" />}>
        <Hero />
      </Suspense>

      {/* Remaining sections lazy-load as user scrolls */}
      <Suspense fallback={<SectionFallback />}>
        <AlbumCube />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ParallaxGallery />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <TourSchedule />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ContactSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>
    </main>
  );
}

export default App;
