import React from "react";
import { Crown, Map, Scroll, Book, Menu, X, Sword, Volume2, VolumeX } from 'lucide-react';
import useTickSfx from './common/useTickSfx';

const navItems = [
  { id: "home", label: "Overview", icon: Crown },
  { id: "lore", label: "Grimoire", icon: Map },
  { id: "sessions", label: "Chronicles", icon: Scroll },
  { id: "novel", label: "The Tome", icon: Book },
];

const Navigation = ({ activeTab, onNavClick, isMenuOpen, setIsMenuOpen }) => {
  const { enabled: sfxEnabled, toggleEnabled: toggleSfx, playTick } = useTickSfx({
    // Extremely low by default, and gated behind first real user interaction.
    volume: 0.03,
    minIntervalMs: 170,
  });

  return (
    <nav className="fixed top-0 w-full z-50">
      <div className="tome-nav-glass relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Brand */}
            <div
              className="flex items-center gap-4 cursor-pointer group nav-interactive"
              onClick={() => onNavClick('home')}
              onPointerEnter={playTick}
              onFocus={playTick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onNavClick('home');
              }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-orange-800 blur-md opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <Sword size={28} className="text-stone-200 relative z-10" />
              </div>
              <div className="flex flex-col">
                <span className="font-title text-xl tracking-[0.2em] text-stone-200 leading-none group-hover:text-orange-200 transition-colors">
                  SEVERED
                </span>
                <span className="font-title text-[0.6rem] tracking-[0.4em] text-orange-300/70 uppercase">
                  Realms
                </span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavClick(item.id)}
                  onPointerEnter={playTick}
                  onFocus={playTick}
                  className={`nav-interactive flex items-center gap-2 text-sm font-title tracking-widest uppercase transition-all duration-300 relative group py-2 ${
                    activeTab === item.id
                      ? 'text-orange-200'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {activeTab === item.id && (
                    <span className="absolute -bottom-1 left-0 w-full h-px bg-orange-200/70 shadow-[0_0_10px_rgba(234,88,12,0.25)]"></span>
                  )}
                  <span className="group-hover:text-orange-200 transition-colors">
                    {item.label}
                  </span>
                  <item.icon size={16} />
                </button>
              ))}

              {/* SFX Toggle */}
              <button
                type="button"
                className="nav-interactive inline-flex items-center gap-2 px-3 py-2 border border-stone-800/70 bg-black/10 hover:bg-black/20 text-stone-300 hover:text-stone-100 transition-colors"
                aria-pressed={sfxEnabled}
                aria-label={sfxEnabled ? 'Disable navigation sound' : 'Enable navigation sound'}
                onPointerEnter={playTick}
                onFocus={playTick}
                onClick={() => {
                  playTick();
                  toggleSfx();
                }}
              >
                {sfxEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                <span className="font-title text-[11px] tracking-[0.24em] uppercase">SFX</span>
              </button>
            </div>

            {/* Mobile Button */}
            <div className="md:hidden flex items-center gap-3">
              <button
                type="button"
                className="nav-interactive text-stone-300 hover:text-stone-100"
                aria-pressed={sfxEnabled}
                aria-label={sfxEnabled ? 'Disable navigation sound' : 'Enable navigation sound'}
                onPointerEnter={playTick}
                onFocus={playTick}
                onClick={() => {
                  playTick();
                  toggleSfx();
                }}
              >
                {sfxEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="nav-interactive text-stone-300 hover:text-stone-100"
                onPointerEnter={playTick}
                onFocus={playTick}
                aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-24 left-0 w-full p-4">
            <div className="tome-nav-glass relative rounded-sm border border-stone-800/70 overflow-hidden">
              <div className="flex flex-col space-y-2 p-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavClick(item.id);
                      setIsMenuOpen(false);
                    }}
                    onPointerEnter={playTick}
                    onFocus={playTick}
                    className={`nav-interactive flex items-center justify-between gap-4 p-3 border border-transparent ${
                      activeTab === item.id
                        ? 'bg-black/25 border-orange-900/30 text-orange-200'
                        : 'text-stone-300 hover:bg-black/15'
                    }`}
                  >
                    <span className="inline-flex items-center gap-3">
                      <item.icon size={16} />
                      <span className="font-title tracking-wider">{item.label}</span>
                    </span>
                    <span className="font-title text-[10px] tracking-[0.24em] uppercase text-stone-500">
                      Enter
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
