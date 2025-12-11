import React from "react";
import { Crown, Map, Scroll, Book, Menu, X, ChevronRight, Sword } from 'lucide-react';

const navItems = [
  { id: "home", label: "Overview", icon: Crown },
  { id: "lore", label: "Grimoire", icon: Map },
  { id: "sessions", label: "Chronicles", icon: Scroll },
  { id: "novel", label: "The Tome", icon: Book },
];

const Navigation = ({ activeTab, onNavClick, isMenuOpen, setIsMenuOpen }) => {

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-gradient-to-b from-black via-black/90 to-transparent pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Brand */}
          <div
            className="flex items-center gap-4 cursor-pointer group"
            onClick={() => onNavClick("home")}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-orange-800 blur-md opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <Sword size={28} className="text-stone-200 relative z-10" />
            </div>
            <div className="flex flex-col">
              <span className="font-title text-xl tracking-[0.2em] text-stone-200 leading-none group-hover:text-orange-600 transition-colors">
                SEVERED
              </span>
              <span className="font-title text-[0.6rem] tracking-[0.4em] text-orange-800 uppercase">
                Realms
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavClick(item.id)}
                className={`flex items-center gap-2 text-sm font-title tracking-widest uppercase transition-all duration-300 relative group py-2 ${
                  activeTab === item.id
                    ? "text-orange-600"
                    : "text-stone-500 hover:text-stone-300"
                }`}
              >
                {activeTab === item.id && (
                  <span className="absolute -bottom-1 left-0 w-full h-px bg-orange-600 shadow-[0_0_10px_#ea580c]"></span>
                )}
                <span className="group-hover:text-orange-600 transition-colors">
                  {item.label}
                </span>
                <item.icon size={16} />
              </button>
            ))}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-stone-400 hover:text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-24 left-0 w-full bg-stone-950 border-b border-orange-900/50 p-4">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavClick(item.id);
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-4 p-3 rounded-lg border border-transparent ${
                  activeTab === item.id
                    ? "bg-orange-950/50 border-orange-900 text-orange-600"
                    : "text-stone-400 hover:bg-stone-900"
                }`}
              >
               <item.icon size={16} />
               <span className="font-title tracking-wider">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;