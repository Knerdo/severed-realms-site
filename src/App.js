import Sessions from './components/Sessions';
import Novel from './components/Novel';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Lore from './components/Lore';
import ErrorBoundary from './components/common/ErrorBoundary';
import React, { useState } from "react";
import { Sword } from "lucide-react";




const App = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // We use this key to force re-render when clicking the SAME tab to reset it
  const [resetKey, setResetKey] = useState(0);

  const handleNavClick = (tabId) => {
    if (activeTab === tabId) {
      // Trigger a reset by incrementing key
      setResetKey((prev) => prev + 1);
    } else {
      setActiveTab(tabId);
      // We don't necessarily need to reset key on tab switch,
      // as the component unmounts anyway, but good practice.
      setResetKey(0);
    }
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-[#0c0a09] min-h-screen text-stone-200 selection:bg-orange-900 selection:text-white font-body">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-orange-900 focus:text-white focus:p-2 focus:z-[60]"
      >
        Skip to content
      </a>
      <Navigation
        activeTab={activeTab}
        onNavClick={handleNavClick}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <main id="main-content" className="animate-[fadeIn_0.5s_ease-out]">
        {activeTab === "home" && <Hero setActiveTab={handleNavClick} />}

        {/* We use the resetKey as the React key.
            When it changes, React unmounts the old instance and mounts a new one,
            effectively resetting internal state (like open folders or selected sessions). */}
        {activeTab === "lore" && (
          <ErrorBoundary>
            <Lore key={resetKey} />
          </ErrorBoundary>
        )}
        {activeTab === "sessions" && (
          <ErrorBoundary>
            <Sessions key={resetKey} />
          </ErrorBoundary>
        )}
        {activeTab === "novel" && (
          <ErrorBoundary>
            <Novel key={resetKey} />
          </ErrorBoundary>
        )}
      </main>

      {/* Footer */}
      {activeTab !== "home" && (
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

