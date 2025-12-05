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
} from "lucide-react";

// --- Components ---

const Navigation = ({ activeTab, setActiveTab, isMenuOpen, setIsMenuOpen }) => {
  const navItems = [
    { id: "home", label: "Home", icon: <Skull size={18} /> },
    { id: "lore", label: "World Lore", icon: <Map size={18} /> },
    { id: "sessions", label: "Session Notes", icon: <Scroll size={18} /> },
    { id: "novel", label: "The Novel", icon: <Book size={18} /> },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/90 border-b border-red-900/30 backdrop-blur-sm text-stone-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div
            className="flex-shrink-0 flex items-center cursor-pointer"
            onClick={() => setActiveTab("home")}
          >
            {/* Brand Logo / Icon */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-b from-red-900 to-black border border-red-600 flex items-center justify-center mr-3 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
              <Sword size={20} className="text-red-500" />
            </div>
            <div>
              <span className="font-serif text-xl tracking-widest text-red-600 block leading-none">
                SEVERED
              </span>
              <span className="font-serif text-xs tracking-[0.3em] text-stone-500 block">
                REALMS
              </span>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    activeTab === item.id
                      ? "text-red-500 bg-red-900/10 border border-red-900/30"
                      : "text-stone-400 hover:text-red-400 hover:bg-red-900/5"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-stone-400 hover:text-white hover:bg-red-900/20 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black border-b border-red-900/50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-3 py-4 rounded-md text-base font-medium ${
                  activeTab === item.id
                    ? "text-red-500 bg-red-900/10"
                    : "text-stone-400 hover:text-white hover:bg-red-900/5"
                }`}
              >
                {item.icon}
                {item.label}
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
      {/* Background Image - Updated to use your Title Page file */}
      <img
        src="https://cdn.discordapp.com/attachments/1438550799834939484/1446582489832226937/Background.png?ex=6934826d&is=693330ed&hm=32fdb47ced35d62bad71cca405153e3a457e6cf832e0f99e18e8dbb5a2167bc9&"
        alt="Campaign Title"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />

      {/* Fog/Mist Animation Overlay */}
      <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black via-red-950/30 to-transparent"></div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
        <h2 className="text-red-500 font-serif tracking-[0.2em] text-sm md:text-xl mb-4 uppercase animate-pulse">
          A Severed Realms Campaign
        </h2>

        <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-red-100 via-red-500 to-red-900 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] mb-8 tracking-tighter leading-tight">
          A DIRGE TO THE
          <br />
          FALSEBLOOD
        </h1>

        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto mb-8"></div>

        <p className="text-stone-400 max-w-2xl mx-auto text-lg md:text-xl font-serif italic mb-12 leading-relaxed">
          "When the blood moon rises over the citadel, the silent dead shall
          sing the song of the end."
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => setActiveTab("novel")}
            className="px-8 py-3 bg-red-900 hover:bg-red-800 text-red-100 border border-red-700 rounded transition-colors duration-300 font-serif tracking-widest uppercase text-sm shadow-[0_0_20px_rgba(153,27,27,0.4)]"
          >
            Read the Novel
          </button>
          <button
            onClick={() => setActiveTab("lore")}
            className="px-8 py-3 bg-transparent hover:bg-red-900/20 text-red-500 border border-red-900/50 rounded transition-colors duration-300 font-serif tracking-widest uppercase text-sm"
          >
            Explore Lore
          </button>
        </div>
      </div>
    </div>
  );
};

const LoreCard = ({ title, type, desc }) => (
  <div className="group relative p-6 bg-stone-900/50 border border-stone-800 hover:border-red-900 transition-all duration-300 rounded-lg overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-900 to-stone-900 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    <div className="mb-4">
      <span className="text-xs font-serif tracking-widest text-red-500 uppercase">
        {type}
      </span>
      <h3 className="text-xl font-serif text-stone-200 mt-1">{title}</h3>
    </div>
    <p className="text-stone-400 text-sm leading-relaxed font-sans">{desc}</p>
    <div className="mt-4 flex justify-end">
      <Feather
        size={16}
        className="text-stone-700 group-hover:text-red-700 transition-colors"
      />
    </div>
  </div>
);

const Lore = () => {
  const loreItems = [
    {
      title: "The Sanguine Court",
      type: "Faction",
      desc: "A cabal of vampire aristocrats who believe the Falseblood curse is a divine gift. They rule the lower districts with velvet gloves hiding iron claws.",
    },
    {
      title: "Ulderoth, The Weeping God",
      type: "Deity",
      desc: "Patron of lost causes and martyrs. His statues are said to weep real blood during the convergence. His followers are dwindling, hunted by the Inquisition.",
    },
    {
      title: "The Obsidian Spire",
      type: "Location",
      desc: "A tower of black glass that appeared overnight in the center of the capital. It emits a low hum that drives the weak-minded to madness.",
    },
    {
      title: "Falseblood Curse",
      type: "Condition",
      desc: "A magical affliction turning the blood of the infected into a corrosive ichor. The infected gain power but slowly lose their humanity.",
    },
    {
      title: "Knights of the Severed Hand",
      type: "Military",
      desc: "Elite guards sworn to protect the King, though they have not been seen without their helms for a decade. Rumors say they are hollow armor animated by souls.",
    },
    {
      title: "The Whispering Wastes",
      type: "Geography",
      desc: "A desert of gray ash where the wind carries the voices of the dead. Travelers must cover their ears or risk being lured into the dust forever.",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-red-500 mb-4 tracking-tight">
            Archives of the Realm
          </h2>
          <div className="w-24 h-1 bg-red-900 mx-auto rounded-full opacity-50"></div>
          <p className="mt-4 text-stone-500 max-w-2xl mx-auto">
            Knowledge is a dangerous weapon in the Severed Realms. Tread
            carefully.
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
  <div className="border-l-2 border-red-900/30 pl-8 py-8 relative hover:border-red-600 transition-colors duration-300">
    <div className="absolute -left-[9px] top-10 w-4 h-4 rounded-full bg-stone-950 border-2 border-red-900 group-hover:bg-red-900 transition-colors"></div>
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
      <span className="text-red-500 font-serif font-bold text-lg">
        Session {num}:
      </span>
      <h3 className="text-xl text-stone-200 font-serif">{title}</h3>
      <span className="text-stone-600 text-sm sm:ml-auto font-mono">
        {date}
      </span>
    </div>
    <p className="text-stone-400 leading-relaxed mb-4">{summary}</p>
    <button className="text-stone-500 hover:text-red-400 text-sm flex items-center gap-1 transition-colors">
      Read full log <ChevronRight size={14} />
    </button>
  </div>
);

const Sessions = () => {
  const sessions = [
    {
      num: 1,
      title: "Awakening in the Crypts",
      date: "Oct 12, 2024",
      summary:
        "The party awoke in mass graves with no memory of their demise. Upon escaping the crypts, they found the sky burned red and the city of Oakhaven in ruins.",
    },
    {
      num: 2,
      title: "The Merchant of Teeth",
      date: "Oct 19, 2024",
      summary:
        "Seeking supplies, the party encountered a fey merchant who trades only in teeth. The Warlock made a questionable bargain for a map to the surface.",
    },
    {
      num: 3,
      title: "Siege of the Belltower",
      date: "Oct 26, 2024",
      summary:
        "Defending the last stronghold of the living from a horde of Falseblood thralls. The Paladin's shield cracked, but the bell was rung, signaling hope.",
    },
    {
      num: 4,
      title: "Into the Sewers",
      date: "Nov 02, 2024",
      summary:
        "To bypass the blockade, the group ventured into the ancient sewers, facing giant rats and a cult worshipping a slime mold deity.",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-serif text-red-500 mb-12 border-b border-red-900/30 pb-4">
          Session Chronicles
        </h2>
        <div className="space-y-2">
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
    <div className="min-h-screen bg-[#1c1917] pt-24 pb-12 px-4 md:px-0">
      <div className="max-w-3xl mx-auto bg-[#eaddcf] text-stone-900 p-8 md:p-16 rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.5)] min-h-[80vh]">
        {/* Book Header */}
        <div className="text-center mb-12">
          <h3 className="text-stone-500 uppercase tracking-[0.3em] text-xs mb-2">
            A Dirge to the Falseblood
          </h3>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-black mb-4">
            Chapter {chapter}
          </h2>
          <div className="flex justify-center items-center gap-4 text-stone-400">
            <span className="h-px w-12 bg-stone-400"></span>
            <span className="font-serif italic text-stone-600">
              The Red Dawn
            </span>
            <span className="h-px w-12 bg-stone-400"></span>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-stone prose-lg mx-auto font-serif leading-loose text-stone-800">
          <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-red-900 first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px]">
            The moon hung heavy in the sky, a bloated tick gorged on the blood
            of stars. Kaelen wiped the sweat from his brow, though the air in
            the crypt was freezing. The silence was absolute, save for the
            rhythmic dripping of something viscous onto the stone floor.
          </p>
          <p>
            "They aren't coming," Mara whispered, clutching her staff so tightly
            her knuckles were white. "The messenger said dawn. It's past dawn."
          </p>
          <p>
            Kaelen looked up at the slit of a window high above. The light
            filtering through wasn't the golden promise of morning, but a
            bruised purple. "Dawn is different here," he muttered, checking the
            edge of his blade. "In the Severed Realms, the sun doesn't rise. It
            bleeds."
          </p>
          <p>
            A scrape of metal against stone echoed from the corridor. They both
            froze. The sound came again—rhythmic, heavy. The sound of plate mail
            dragging a dead leg.
          </p>
          <p>
            "Prepare yourself," Kaelen said, his voice steady despite the fear
            coiling in his gut. "The Falseblood are here."
          </p>
        </div>

        {/* Footer Navigation */}
        <div className="mt-20 pt-8 border-t border-stone-400 flex justify-between items-center text-stone-600 font-serif">
          <button
            disabled={chapter === 1}
            onClick={() => setChapter((c) => Math.max(1, c - 1))}
            className={`flex items-center gap-2 hover:text-black transition-colors ${
              chapter === 1 ? "opacity-30 cursor-not-allowed" : ""
            }`}
          >
            ← Previous
          </button>
          <span className="text-sm italic">Page {chapter}</span>
          <button
            onClick={() => setChapter((c) => c + 1)}
            className="flex items-center gap-2 hover:text-black transition-colors"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

const App = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  return (
    <div className="bg-black min-h-screen text-stone-200 font-sans selection:bg-red-900 selection:text-white">
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <main>
        {activeTab === "home" && <Hero setActiveTab={setActiveTab} />}
        {activeTab === "lore" && <Lore />}
        {activeTab === "sessions" && <Sessions />}
        {activeTab === "novel" && <Novel />}
      </main>

      {/* Footer */}
      {activeTab !== "home" && (
        <footer className="bg-stone-950 border-t border-stone-900 py-12 text-center">
          <div className="flex justify-center items-center gap-2 mb-4 opacity-50">
            <Sword size={16} />
            <span className="font-serif tracking-widest text-sm">
              SEVERED REALMS
            </span>
          </div>
          <p className="text-stone-600 text-sm">
            © 2025 A Dirge to the Falseblood Campaign. All rights reserved.
          </p>
        </footer>
      )}
    </div>
  );
};

export default App;
