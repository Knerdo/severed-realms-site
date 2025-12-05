import React, { useState, useEffect } from "react";
import {
  Book,
  Scroll,
  Skull,
  Feather,
  Menu,
  X,
  ChevronRight,
  Map,
  Sword,
  Flame,
  Crown,
  Ghost,
} from "lucide-react";

// --- Custom Styles & Textures ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700;900&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500&display=swap');
    
    .font-title { font-family: 'Cinzel', serif; }
    .font-serif-text { font-family: 'Playfair Display', serif; }
    .font-body { font-family: 'Inter', sans-serif; }

    /* Custom Scrollbar - Updated to darker orange */
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #0c0a09; }
    ::-webkit-scrollbar-thumb { background: #7c2d12; border-radius: 4px; } /* orange-900 */
    ::-webkit-scrollbar-thumb:hover { background: #c2410c; } /* orange-700 */

    /* Animation Keyframes */
    /* Updated fog-flow for a continuous right-to-left drift */
    @keyframes fog-flow {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    /* Updated animation to be slow and continuous */
    .animate-fog { animation: fog-flow 60s linear infinite; }
    
    /* Glow Text - Updated to darker, richer orange */
    .text-glow { text-shadow: 0 0 25px rgba(234, 88, 12, 0.8); } /* orange-600 with high opacity */
    
    /* Glass Effect - Updated to darker orange borders */
    .glass-panel {
      background: rgba(67, 20, 7, 0.4); /* orange-950 opacity */
      backdrop-filter: blur(12px);
      border: 1px solid rgba(124, 45, 18, 0.4); /* orange-900 opacity */
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
    }
  `}</style>
);

// --- UI Components ---

const Divider = () => (
  <div className="flex items-center justify-center py-8 opacity-50">
    <div className="h-px bg-gradient-to-r from-transparent via-orange-900 to-transparent w-full max-w-xs"></div>
    <div className="mx-4 text-orange-800">
      <Skull size={12} />
    </div>
    <div className="h-px bg-gradient-to-r from-transparent via-orange-900 to-transparent w-full max-w-xs"></div>
  </div>
);

const Navigation = ({ activeTab, setActiveTab, isMenuOpen, setIsMenuOpen }) => {
  const navItems = [
    { id: "home", label: "Overview", icon: <Crown size={16} /> },
    { id: "lore", label: "Grimoire", icon: <Map size={16} /> },
    { id: "sessions", label: "Chronicles", icon: <Scroll size={16} /> },
    { id: "novel", label: "The Tome", icon: <Book size={16} /> },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-gradient-to-b from-black via-black/90 to-transparent pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Brand */}
          <div
            className="flex items-center gap-4 cursor-pointer group"
            onClick={() => setActiveTab("home")}
          >
            <div className="relative">
              {/* Darker orange blur */}
              <div className="absolute inset-0 bg-orange-800 blur-md opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <Sword size={28} className="text-stone-200 relative z-10" />
            </div>
            <div className="flex flex-col">
              {/* Darker hover text */}
              <span className="font-title text-xl tracking-[0.2em] text-stone-200 leading-none group-hover:text-orange-600 transition-colors">
                SEVERED
              </span>
              {/* Darker subtitle */}
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
                onClick={() => setActiveTab(item.id)}
                // Updated active and hover states to darker orange
                className={`flex items-center gap-2 text-sm font-title tracking-widest uppercase transition-all duration-300 relative group py-2 ${
                  activeTab === item.id
                    ? "text-orange-600"
                    : "text-stone-500 hover:text-stone-300"
                }`}
              >
                {activeTab === item.id && (
                  // Updated underline shadow to darker orange
                  <span className="absolute -bottom-1 left-0 w-full h-px bg-orange-600 shadow-[0_0_10px_#ea580c]"></span>
                )}
                <span className="group-hover:text-orange-600 transition-colors">
                  {item.label}
                </span>
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
                  setActiveTab(item.id);
                  setIsMenuOpen(false);
                }}
                // Updated active state bg and text to darker orange
                className={`flex items-center gap-4 p-3 rounded-lg border border-transparent ${
                  activeTab === item.id
                    ? "bg-orange-950/50 border-orange-900 text-orange-600"
                    : "text-stone-400 hover:bg-stone-900"
                }`}
              >
                {item.icon}
                <span className="font-title tracking-wider">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = ({ setActiveTab }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* --- Main Background Layers --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 1. Custom Background Image */}
        <img
          src="https://cdn.discordapp.com/attachments/1438550799834939484/1446582489832226937/Background.png?ex=6934826d&is=693330ed&hm=32fdb47ced35d62bad71cca405153e3a457e6cf832e0f99e18e8dbb5a2167bc9&"
          alt="Campaign Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* 2. Darkener (Slightly reduced to let fog show) */}
        <div className="absolute inset-0 bg-black/60 z-0"></div>

        {/* 3. Gray Fog Overlay - No longer breathing, lower opacity */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-800/60 to-transparent opacity-30 z-10"></div>

        {/* 4. Moving Fog Patches - Drifting right to left, lower opacity */}
        <div className="absolute -inset-[50%] bg-[radial-gradient(circle,rgba(220,220,220,0.15)_0%,transparent_60%)] animate-fog opacity-20 z-20"></div>
      </div>

      <div className="relative z-30 text-center px-4 max-w-6xl mx-auto mt-16">
        {/* Top Label - Updated colors to darker orange */}
        <div className="flex items-center justify-center gap-4 mb-6 opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
          <div className="h-px w-12 bg-orange-800"></div>
          <span className="text-orange-700 font-title tracking-[0.4em] text-xs md:text-sm uppercase">
            A Severed Realms Campaign
          </span>
          <div className="h-px w-12 bg-orange-800"></div>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-title font-black text-transparent bg-clip-text bg-gradient-to-b from-stone-100 via-stone-400 to-stone-800 drop-shadow-2xl mb-8 tracking-tighter leading-[0.9] opacity-0 animate-[slideUp_1s_ease-out_0.5s_forwards]">
          A DIRGE TO
          <br />
          <span className="text-orange-600 text-glow">THE FALSEBLOOD</span>
        </h1>

        {/* Quote */}
        <p className="text-stone-400 max-w-2xl mx-auto text-lg md:text-2xl font-serif-text italic mb-12 leading-relaxed opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
          "A severed existence is a wound that festers."
        </p>

        {/* CTA Buttons - Updated to darker orange theme */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center opacity-0 animate-[fadeIn_1s_ease-out_1.5s_forwards]">
          <button
            onClick={() => setActiveTab("novel")}
            className="group relative px-8 py-4 bg-orange-950/50 hover:bg-orange-900/60 text-orange-100 border border-orange-800/60 overflow-hidden transition-all duration-300"
          >
            {/* Updated gradient on hover to darker orange */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-orange-600/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <span className="relative font-title tracking-[0.2em] uppercase text-sm font-bold flex items-center gap-2">
              <Book size={16} /> Read the Tome
            </span>
          </button>

          <button
            onClick={() => setActiveTab("lore")}
            // Updated hover colors to darker orange
            className="px-8 py-4 text-stone-500 hover:text-orange-600 font-title tracking-[0.2em] uppercase text-sm border-b border-transparent hover:border-orange-800 transition-all"
          >
            Enter the Archives
          </button>
        </div>
      </div>
    </div>
  );
};

const LoreCard = ({ title, type, desc, icon: Icon }) => (
  <div className="glass-panel p-8 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
    {/* Updated icon color to darker orange */}
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-orange-700">
      <Icon size={64} />
    </div>
    <div className="relative z-10">
      {/* Updated badge colors to darker orange */}
      <span className="inline-block px-3 py-1 mb-4 text-[10px] font-title tracking-[0.2em] uppercase text-orange-600 border border-orange-900/40 bg-orange-950/30">
        {type}
      </span>
      {/* Updated title hover color to darker orange */}
      <h3 className="text-2xl font-title text-stone-200 mb-3 group-hover:text-orange-500 transition-colors">
        {title}
      </h3>
      {/* Updated border hover color to darker orange */}
      <p className="text-stone-500 text-sm leading-relaxed font-body border-l-2 border-stone-800 pl-4 group-hover:border-orange-800 transition-colors">
        {desc}
      </p>
    </div>
  </div>
);

const Lore = () => {
  const loreItems = [
    {
      icon: Crown,
      title: "The Sanguine Court",
      type: "Faction",
      desc: "A cabal of vampire aristocrats who believe the Falseblood curse is a divine gift. They rule the lower districts with velvet gloves hiding iron claws.",
    },
    {
      icon: Skull,
      title: "Ulderoth, The Weeping God",
      type: "Deity",
      desc: "Patron of lost causes and martyrs. His statues are said to weep real blood during the convergence.",
    },
    {
      icon: Map,
      title: "The Obsidian Spire",
      type: "Location",
      desc: "A tower of black glass that appeared overnight. It emits a low hum that drives the weak-minded to madness.",
    },
    {
      icon: Flame,
      title: "Falseblood Curse",
      type: "Condition",
      desc: "A magical affliction turning the blood of the infected into a corrosive ichor. Power comes at the cost of humanity.",
    },
    {
      icon: Sword,
      title: "Knights of the Severed Hand",
      type: "Military",
      desc: "Elite guards sworn to protect the King. Rumors say they are hollow armor animated by souls.",
    },
    {
      icon: Map,
      title: "The Whispering Wastes",
      type: "Geography",
      desc: "A desert of gray ash where the wind carries the voices of the dead.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0c0a09] pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-title text-stone-200 mb-6">
            Archives of the Realm
          </h2>
          <p className="text-stone-500 font-body max-w-2xl mx-auto">
            Fragments of history gathered from the ashes. Knowledge is power,
            and power corrupts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loreItems.map((item, idx) => (
            <LoreCard key={idx} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

const SessionCard = ({ num, title, date, summary }) => (
  <div className="flex flex-col md:flex-row gap-8 items-start group">
    {/* Date Column */}
    <div className="md:w-32 flex-shrink-0 pt-2">
      {/* Updated session number color to darker orange */}
      <span className="block font-title text-orange-700 text-xl font-bold">
        Session {num}
      </span>
      <span className="block font-body text-xs text-stone-600 mt-1 uppercase tracking-wide">
        {date}
      </span>
    </div>

    {/* Content Column */}
    {/* Updated borders and hover states to darker orange */}
    <div className="flex-grow glass-panel p-6 md:p-8 hover:bg-stone-900/80 transition-colors border-l-4 border-l-orange-900 group-hover:border-l-orange-700">
      <h3 className="text-2xl font-title text-stone-200 mb-3">{title}</h3>
      <p className="text-stone-400 font-body leading-relaxed mb-6">{summary}</p>
      <button className="flex items-center gap-2 text-xs font-title tracking-widest text-stone-500 hover:text-stone-300 uppercase">
        Read Log <ChevronRight size={12} />
      </button>
    </div>
  </div>
);

const Sessions = () => {
  const sessions = [
    {
      num: 4,
      title: "Into the Sewers",
      date: "Nov 02, 2024",
      summary:
        "To bypass the blockade, the group ventured into the ancient sewers, facing giant rats and a cult worshipping a slime mold deity.",
    },
    {
      num: 3,
      title: "Siege of the Belltower",
      date: "Oct 26, 2024",
      summary:
        "Defending the last stronghold of the living from a horde of Falseblood thralls. The Paladin's shield cracked, but the bell was rung.",
    },
    {
      num: 2,
      title: "The Merchant of Teeth",
      date: "Oct 19, 2024",
      summary:
        "Seeking supplies, the party encountered a fey merchant who trades only in teeth. The Warlock made a questionable bargain.",
    },
    {
      num: 1,
      title: "Awakening in the Crypts",
      date: "Oct 12, 2024",
      summary:
        "The party awoke in mass graves with no memory of their demise. Upon escaping the crypts, they found the sky burned red.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0c0a09] pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end justify-between mb-16 border-b border-stone-800 pb-6">
          <h2 className="text-4xl font-title text-stone-200">Chronicles</h2>
          {/* Updated status color to darker orange */}
          <span className="font-body text-stone-600 text-sm">
            Campaign Status: <span className="text-orange-700">Active</span>
          </span>
        </div>

        <div className="space-y-8">
          {sessions.map((s) => (
            <SessionCard key={s.num} {...s} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Novel = () => {
  const [chapter, setChapter] = useState(1);

  return (
    <div className="min-h-screen bg-[#0c0a09] pt-28 pb-20 px-4 md:px-0">
      <div className="max-w-3xl mx-auto">
        {/* Reader Interface */}
        {/* Updated border color to darker orange */}
        <div className="bg-[#0f172a] border border-orange-900/50 shadow-2xl relative">
          {/* Top Bar - Updated to darker orange */}
          <div className="h-1 bg-orange-900 w-full"></div>
          <div className="p-8 md:p-16">
            <div className="flex justify-between items-center mb-12 text-stone-500 font-title text-xs tracking-widest uppercase">
              <span>A Dirge to the Falseblood</span>
              <span>Draft I</span>
            </div>

            <h2 className="font-title text-4xl md:text-5xl text-stone-200 mb-8 text-center">
              Chapter {chapter}: The Red Dawn
            </h2>

            <Divider />

            <div className="prose prose-invert prose-stone max-w-none font-serif-text leading-loose text-lg text-stone-300">
              <p>
                {/* Updated drop cap color to darker orange */}
                <span className="float-left text-6xl font-title text-orange-800 mr-3 mt-[-6px] leading-none">
                  T
                </span>
                he moon hung heavy in the sky, a bloated tick gorged on the
                blood of stars. Kaelen wiped the sweat from his brow, though the
                air in the crypt was freezing. The silence was absolute, save
                for the rhythmic dripping of something viscous onto the stone
                floor.
              </p>
              <p>
                "They aren't coming," Mara whispered, clutching her staff so
                tightly her knuckles were white. "The messenger said dawn. It's
                past dawn."
              </p>
              <p>
                Kaelen looked up at the slit of a window high above. The light
                filtering through wasn't the golden promise of morning, but a
                bruised purple. "Dawn is different here," he muttered, checking
                the edge of his blade. "In the Severed Realms, the sun doesn't
                rise. It bleeds."
              </p>
              <p>
                A scrape of metal against stone echoed from the corridor. They
                both froze. The sound came again—rhythmic, heavy. The sound of
                plate mail dragging a dead leg.
              </p>
              {/* Updated blockquote colors to darker orange */}
              <p className="text-orange-600 italic font-medium border-l-2 border-orange-900 pl-4 my-8">
                "Prepare yourself," Kaelen said, his voice steady despite the
                fear coiling in his gut. "The Falseblood are here."
              </p>
            </div>

            <Divider />

            {/* Navigation */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-stone-800">
              <button
                onClick={() => setChapter((c) => Math.max(1, c - 1))}
                disabled={chapter === 1}
                className={`text-stone-400 hover:text-white font-title text-sm tracking-widest uppercase transition-colors ${
                  chapter === 1 && "opacity-20"
                }`}
              >
                Previous Chapter
              </button>
              <button
                onClick={() => setChapter((c) => c + 1)}
                // Updated hover color to darker orange
                className="text-stone-400 hover:text-orange-700 font-title text-sm tracking-widest uppercase transition-colors"
              >
                Next Chapter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

const App = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  return (
    // Updated selection color to darker orange
    <div className="bg-[#0c0a09] min-h-screen text-stone-200 selection:bg-orange-900 selection:text-white font-body">
      <GlobalStyles />
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <main className="animate-[fadeIn_0.5s_ease-out]">
        {activeTab === "home" && <Hero setActiveTab={setActiveTab} />}
        {activeTab === "lore" && <Lore />}
        {activeTab === "sessions" && <Sessions />}
        {activeTab === "novel" && <Novel />}
      </main>

      {/* Footer */}
      {activeTab !== "home" && (
        <footer className="bg-black border-t border-stone-900 py-16 text-center">
          <div className="flex flex-col items-center gap-4 opacity-40 hover:opacity-100 transition-opacity">
            {/* Updated icon color to darker orange */}
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
