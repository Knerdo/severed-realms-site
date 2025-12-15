import { Navigation, ErrorBoundary } from './components';
import React, { Suspense, lazy, useMemo, useState } from "react";
import { Sword } from "lucide-react";
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import LoadingOverlay from './components/common/LoadingOverlay';

  const LandingPage = lazy(() => import('./components/LandingPage'));
  const CodexPage = lazy(() => import('./components/CodexPage'));
  const SagasPage = lazy(() => import('./components/SagasPage'));
  const ReliquaryPage = lazy(() => import('./components/ReliquaryPage'));
  const ArchitectPage = lazy(() => import('./components/ArchitectPage'));
  const Hero = lazy(() => import('./components/Hero'));
  const Lore = lazy(() => import('./components/Lore'));
  const Sessions = lazy(() => import('./components/Sessions'));
  const Novel = lazy(() => import('./components/Novel'));
  const TomeChapter = lazy(() => import('./components/TomeChapter'));




const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const isMarketing = useMemo(() => {
    const p = location.pathname;
    return (
      p === '/' ||
      p === '/landing' ||
      p === '/codex' ||
      p === '/sagas' ||
      p === '/reliquary' ||
      p === '/architect'
    );
  }, [location.pathname]);

  const activeTab = useMemo(() => {
    const p = location.pathname;
    if (p === '/overview') return 'home';
    if (p.startsWith('/grimoire')) return 'lore';
    if (p.startsWith('/chronicles')) return 'sessions';
    if (p.startsWith('/tome')) return 'novel';
    return 'home';
  }, [location.pathname]);

  const handleNavClick = (tab) => {
    setIsMenuOpen(false);
    if (tab === 'home') navigate('/overview');
    else if (tab === 'lore') navigate('/grimoire');
    else if (tab === 'sessions') navigate('/chronicles');
    else if (tab === 'novel') navigate('/tome');
  };

  return (
    <div className="bg-[#0c0a09] min-h-screen text-stone-200 selection:bg-orange-900 selection:text-white font-body">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-orange-900 focus:text-white focus:p-2 focus:z-[60]"
      >
        Skip to content
      </a>
      {!isMarketing && (
        <Navigation
          activeTab={activeTab}
          onNavClick={handleNavClick}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      )}

      <main id="main-content" className="animate-[fadeIn_0.5s_ease-out]">
        <Suspense fallback={<LoadingOverlay delayMs={240} />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/codex" element={<CodexPage />} />
            <Route path="/sagas" element={<SagasPage />} />
            <Route path="/reliquary" element={<ReliquaryPage />} />
            <Route path="/architect" element={<ArchitectPage />} />
            <Route path="/overview" element={<Hero />} />
            <Route
              path="/grimoire"
              element={
                <ErrorBoundary>
                  <Lore />
                </ErrorBoundary>
              }
            />
            <Route
              path="/chronicles"
              element={
                <ErrorBoundary>
                  <Sessions />
                </ErrorBoundary>
              }
            />
            <Route
              path="/chronicles/:sessionId"
              element={
                <ErrorBoundary>
                  <Sessions />
                </ErrorBoundary>
              }
            />
            <Route
              path="/tome"
              element={
                <ErrorBoundary>
                  <Novel />
                </ErrorBoundary>
              }
            />
            <Route
              path="/tome/:chapterId"
              element={
                <ErrorBoundary>
                  <TomeChapter />
                </ErrorBoundary>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

      {/* Footer */}
      {!isMarketing && activeTab !== "home" && (
        <footer className="bg-black border-t border-stone-900 py-16 text-center">
          <div className="flex flex-col items-center gap-4 opacity-40 hover:opacity-100 transition-opacity">
            <Sword size={24} className="text-orange-900" />
            <span className="font-title tracking-[0.3em] text-xs uppercase text-stone-500">
              Severed Realms Campaign Setting
            </span>
            <p className="text-[10px] text-stone-700 font-body">
              © 2025 A Dirge to the Falseblood. All rights reserved.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;

