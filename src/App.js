import React, { useState, useEffect } from "react";
import {
  Book,
  Scroll,
  Skull,
  Feather,
  Menu,
  X,
  ChevronRight,
  ArrowLeft,
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

    /* Custom Scrollbar */
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #0c0a09; }
    ::-webkit-scrollbar-thumb { background: #7c2d12; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #c2410c; }

    /* Animation Keyframes */
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

    @keyframes pulse-slow {
      0%, 100% { opacity: 1; filter: brightness(1.3); }
      50% { opacity: 0.6; filter: brightness(1); }
    }
    
    .animate-fog { animation: fog-flow 60s linear infinite; }
    .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
    
    .text-glow { text-shadow: 0 0 25px rgba(234, 88, 12, 0.8); }
    
    .glass-panel {
      background: rgba(67, 20, 7, 0.4);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(124, 45, 18, 0.4);
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
                onClick={() => setActiveTab(item.id)}
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
        <img
          src="https://cdn.discordapp.com/attachments/1438550799834939484/1446582489832226937/Background.png?ex=6934826d&is=693330ed&hm=32fdb47ced35d62bad71cca405153e3a457e6cf832e0f99e18e8dbb5a2167bc9&"
          alt="Campaign Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-800/60 to-transparent opacity-30 z-10"></div>
        <div className="absolute -inset-[50%] bg-[radial-gradient(circle,rgba(220,220,220,0.15)_0%,transparent_60%)] animate-fog opacity-20 z-20"></div>
      </div>

      <div className="relative z-30 text-center px-4 max-w-6xl mx-auto mt-16">
        <div className="flex items-center justify-center gap-4 mb-6 opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
          <div className="animate-pulse-slow flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-orange-500 shadow-[0_0_8px_#f97316]"></div>
            <span className="text-orange-400 font-title tracking-[0.4em] text-xs md:text-sm uppercase drop-shadow-[0_0_5px_rgba(249,115,22,0.8)]">
              A Severed Realms Campaign
            </span>
            <div className="h-px w-12 bg-orange-500 shadow-[0_0_8px_#f97316]"></div>
          </div>
        </div>

        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-title font-black text-transparent bg-clip-text bg-gradient-to-b drop-shadow-2xl mb-8 tracking-tighter leading-[0.9] opacity-0 animate-[slideUp_1s_ease-out_0.5s_forwards]"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, #f5f5f4 0%, #c2410c 25%, #c2410c 75%, #000000 100%)",
          }}
        >
          A DIRGE TO
          <br />
          THE FALSEBLOOD
        </h1>

        <p className="text-stone-400 max-w-2xl mx-auto text-lg md:text-2xl font-serif-text italic mb-12 leading-relaxed opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
          "A severed existence is a wound that festers."
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center opacity-0 animate-[fadeIn_1s_ease-out_1.5s_forwards]">
          <button
            onClick={() => setActiveTab("novel")}
            className="group relative px-8 py-4 bg-orange-950/50 hover:bg-orange-900/60 text-orange-100 border border-orange-800/60 overflow-hidden transition-all duration-300"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-orange-600/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <span className="relative font-title tracking-[0.2em] uppercase text-sm font-bold flex items-center gap-2">
              <Book size={16} /> Read the Tome
            </span>
          </button>

          <button
            onClick={() => setActiveTab("lore")}
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
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-orange-700">
      <Icon size={64} />
    </div>
    <div className="relative z-10">
      <span className="inline-block px-3 py-1 mb-4 text-[10px] font-title tracking-[0.2em] uppercase text-orange-600 border border-orange-900/40 bg-orange-950/30">
        {type}
      </span>
      <h3 className="text-2xl font-title text-stone-200 mb-3 group-hover:text-orange-500 transition-colors">
        {title}
      </h3>
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

// --- SESSION COMPONENTS ---

const SessionData = [
  {
    id: 2,
    num: 2,
    title: "A Riven Transformation",
    date: "Dec 04, 2025",
    summary:
      "Arathus is dead. The party uncovers a Riven transformation, allies with the Umbral Reavers, enters a pact with House Balor to steal a Black Ledger, and hunts a monstrosity at a local farm.",
    content: (
      <>
        <div className="bg-stone-900/50 p-4 border border-stone-800 rounded mb-6 text-sm font-body text-stone-400 flex flex-wrap justify-between gap-4">
          <div>
            <strong className="text-stone-300">Location:</strong>{" "}
            <span className="text-stone-200">Halvar's Grace</span>
          </div>
          <div>
            <strong className="text-stone-300">Time:</strong> Late Afternoon -
            Following Morning
          </div>
          <div>
            <strong className="text-stone-300">Status:</strong>{" "}
            <span className="text-orange-600">The Plot Thickens</span>
          </div>
        </div>

        <h3 className="text-xl font-title text-orange-700 mt-8 mb-4 border-l-2 border-orange-900 pl-4">
          I. The Ashes of Arathus
        </h3>
        <p className="mb-4">
          The cultist <strong className="text-orange-500">Arathus Kexor</strong>{" "}
          lay dead. Among his possessions, the party recovered{" "}
          <strong>212 gp</strong>, a jagged{" "}
          <span className="text-emerald-600 italic">Bone Key</span>, and a heavy
          iron sigil belonging to the{" "}
          <span className="text-red-400 font-bold">Umbral Reavers</span>.
        </p>

        <p className="mb-4">
          While the group consolidated their findings,{" "}
          <span className="text-orange-500 font-bold">Maldan Breen</span>{" "}
          discovered a series of glyphs scrawled on the wall. The symbols
          triggered a deep, personal recognition within him. Visibly shaken, he
          apologized to the party, stating he had to pursue this lead
          immediately at the city archives. He promised to rendezvous in two
          days and departed with haste.
        </p>

        <h4 className="text-lg font-title text-stone-200 mt-6 mb-2">
          The Witnesses
        </h4>
        <p className="mb-4">
          <span className="text-orange-500 font-bold">Erevan</span>, utilizing
          his bond with nature, spoke to the only witnesses left alive: two
          goats named <strong>Billy and Billy</strong>. Through their skittish
          bleating, a horrific truth was revealed.
        </p>

        <div className="text-stone-400 italic border-l-2 border-stone-700 pl-4 my-4">
          "The Master spoke the words. The man... he didn't change right.
          Arathus threw him away. But the female... her bones snapped and grew.
          Her fingers became knives. She clawed out her own eyes and peeled the
          skin from her ribs. Arathus told her "Go now child and await the
          Mother's call."
        </div>

        <p className="mb-4">
          To cover their tracks and cleanse the site, the party set the house
          ablaze, informing the gate guards of a "tragic fire" as they returned
          to the city.
        </p>

        <h3 className="text-xl font-title text-orange-700 mt-8 mb-4 border-l-2 border-orange-900 pl-4">
          II. Shadows in the Woeful Toad
        </h3>
        <p className="mb-4">
          The party returned to{" "}
          <span className="text-stone-300 font-semibold">The Woeful Toad</span>{" "}
          at dusk.{" "}
          <span className="text-orange-500 font-bold">Tilla Bramblebrew</span>{" "}
          welcomed them warmly, offering{" "}
          <span className="text-orange-500 font-bold">Dazrian Edgecorde</span> a
          drink and a surge of <strong>Inspiration</strong>. Dazrian took the
          stage, weaving illusions of a seductive demoness into his performance,
          holding the crowd in the palm of his hand.
        </p>

        <h4 className="text-lg font-title text-stone-200 mt-6 mb-2">
          The Reaver's Grief
        </h4>
        <p className="mb-4">
          Outside, <span className="text-orange-500 font-bold">Erevan</span> was
          approached by{" "}
          <span className="text-orange-500 font-bold">Thalia Greycut</span>. She
          warned him that his companions were too loud for a city ruled by
          silence. Recognizing the sigil on her belt, Erevan presented the
          bloodied amulet found on Arathus.
        </p>

        <p className="mb-4">
          Thalia was devastated. She confirmed the sigil belonged to{" "}
          <strong>Vane</strong>, a missing agent. Erevan explained Vane's
          fate—sacrificed to become a devil—and the mutation of his partner,{" "}
          <strong>Mira</strong>. Thalia revealed her true allegiance: she
          belonged to the{" "}
          <span className="text-red-400 font-bold">Umbral Reavers</span>, a
          shadow guild dedicated to hunting monstrosities that breached the
          realm from the <strong>Grey Lament</strong>. She begged the party: if
          they find Mira, end her suffering.
        </p>

        <h3 className="text-xl font-title text-orange-700 mt-8 mb-4 border-l-2 border-orange-900 pl-4">
          III. The Iron Dowager
        </h3>
        <p className="mb-4">
          Inside,{" "}
          <span className="text-orange-500 font-bold">Titus Granitefist</span>{" "}
          spotted a noblewoman and a younger man watching Dazrian with keen
          interest. Through a loud (and slightly awkward) introduction, the
          party was invited to their booth.
        </p>

        <p className="mb-4">
          The young man, <strong>Corwin Balor</strong>, was merely a mouthpiece.
          The true power was his wife,{" "}
          <span className="text-orange-500 font-bold">Lady Isilde Balor</span>.
          She revealed a wanted poster of{" "}
          <span className="text-orange-500 font-bold">Dazrian</span>, issued by{" "}
          <span className="text-red-400 font-bold">House Thane</span> for the
          murder of <strong>Ser Daven Thane</strong>. She knew Dazrian was the
          bard in question.
        </p>

        <div className="text-stone-400 italic border-l-2 border-stone-700 pl-4 my-4">
          "House Thane took everything from me. My husband, my brother, my
          lands. They are the King's jackals. I want them bled."
        </div>

        <p className="mb-4">
          <strong>The Heist:</strong> Lady Isilde offered the party protection
          at her estate. In exchange, she asked that they raid the{" "}
          <span className="text-stone-300 font-semibold">Thane Warehouse</span>{" "}
          to steal a <strong>Black Ledger</strong> containing proof of the
          House's illegal dealings. The party accepted, seeking refuge from the
          exposed tavern.
        </p>

        <h3 className="text-xl font-title text-orange-700 mt-8 mb-4 border-l-2 border-orange-900 pl-4">
          IV. The Horror at the Farm
        </h3>
        <p className="mb-4">
          After a night of rest at the Balor Estate (and a successful romantic
          conquest by <span className="text-orange-500 font-bold">Titus</span>{" "}
          involving Tilla), the party mobilized. Before attempting the heist,
          they decided to tie up the loose end at the farm, suspecting the
          creature eating livestock was the mutated Reaver,{" "}
          <strong>Mira</strong>.
        </p>

        <p className="mb-4">
          At the farm, they met the obstinate farmer{" "}
          <strong>Eddy Ric Voss</strong> and, surprisingly, the goats Billy and
          Billy, who had wandered there.{" "}
          <span className="text-orange-500 font-bold">Erevan</span> befriended a
          sheep that was sad for not being named, naming him{" "}
          <strong>Tav</strong>, the relieved sheep directed them toward the
          woods.
        </p>

        <h4 className="text-lg font-title text-stone-200 mt-6 mb-2">
          The Mercy Kill
        </h4>
        <p className="mb-4">
          Stalking through the rain-soaked forest, the party ambushed the
          creature. <strong>Mira</strong> was a nightmare of weeping flesh and
          elongated limbs—a being <strong>Riven</strong> by the Grey Lament. She
          flew at Erevan, grappling him in a desperate embrace, but the combined
          might of the party ended her misery quickly.{" "}
        </p>

        <p className="mb-4">
          They took the creature's head—proof for the farmer, and closure for
          the Reavers.
        </p>

        {/* LOOT SUMMARY */}
        <div className="bg-stone-900/50 p-6 border border-orange-900/30 rounded-lg mt-8">
          <h3 className="text-lg font-title text-orange-600 mb-4 flex items-center gap-2">
            💰 Session Assets
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-stone-400">
            <li>
              <strong className="text-stone-300">Gold:</strong> 212 gp
            </li>
            <li>
              <strong className="text-stone-300">Key Item:</strong>{" "}
              <span className="text-emerald-600 italic">The Bone Key</span>{" "}
              (Purpose Unknown)
            </li>
            <li>
              <strong className="text-stone-300">Key Item:</strong>{" "}
              <span className="text-emerald-600 italic">
                Umbral Reaver Sigil
              </span>
            </li>
            <li>
              <strong className="text-stone-300">Reward:</strong> Free Room &
              Board at The Woeful Toad (Courtesy of Titus's... performance).
            </li>
            <li>
              <strong className="text-stone-300">Status:</strong> Hiding at{" "}
              <span className="text-stone-300 font-semibold">
                House Balor Estate
              </span>
              .
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 1,
    num: 1,
    title: "Tithes for the Heir",
    date: "Nov 13, 2025",
    summary:
      "The party convened in Halvar's Grace at Execution Square. Following a shared lucid vision, they banded together to investigate the phantom chains beneath the city.",
    content: (
      <>
        <div className="bg-stone-900/50 p-4 border border-stone-800 rounded mb-6 text-sm font-body text-stone-400">
          <strong className="text-stone-300">Location:</strong>{" "}
          <span className="text-stone-200">Halvar's Grace</span>,{" "}
          <span className="text-stone-200">The Woeful Toad</span>,{" "}
          <span className="text-stone-200">Arathus’s Home</span>
        </div>

        <h3 className="text-xl font-title text-orange-700 mt-8 mb-4 border-l-2 border-orange-900 pl-4">
          1. The Meeting at Execution Square
        </h3>
        <p className="mb-4">
          The party convened in{" "}
          <span className="text-stone-300 font-semibold">Halvar's Grace</span>{" "}
          at Execution Square. Following a shared lucid vision where they saw
          one another amidst the blood and stone, they decided to band together.
          As they departed for{" "}
          <span className="text-stone-300 font-semibold">The Woeful Toad</span>,
          they noticed they were being tailed.
        </p>

        <h4 className="text-lg font-title text-stone-200 mt-6 mb-2">
          The Nervous Watcher
        </h4>
        <p className="mb-4">
          Upon confrontation, the stalker revealed himself to be{" "}
          <span className="text-orange-500 font-bold">Destrian Cornwallis</span>
          , a nervous corpse tender who despises his job but has no family left
          following "The Cleansing." He admitted to following the group because
          he noticed their visceral reaction in the square and knew they also
          heard the phantom chains.
        </p>

        <h4 className="text-lg font-title text-stone-200 mt-6 mb-2">
          The Chute
        </h4>
        <p className="mb-4">
          <span className="text-orange-500 font-bold">Destrian</span> led the
          partyto a refuse chute near the church. He nodded toward it before
          retreating to his duties, fearful of being seen with outsiders.
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4 text-stone-400">
          <li>
            <strong className="text-stone-300">Investigation:</strong>{" "}
            <span className="text-orange-500 font-bold">Titus Granitefist</span>{" "}
            cast a spell to detect celestials and confirmed a divine presence
            near the chute where bodies are dumped.
          </li>
          <li>
            <strong className="text-stone-300">The Drop:</strong> Upon opening
            the chute, the group heard audible chains and gagged whimpers.{" "}
            <span className="text-orange-500 font-bold">Maldan Breen</span> cast{" "}
            <em>Light</em> on a copper coin and dropped it. It fell
            approximately 200 feet before the chute curved out of sight beneath
            the church. Finding no other external clues, the group proceeded to
            the tavern.
          </li>
        </ul>

        <h3 className="text-xl font-title text-orange-700 mt-8 mb-4 border-l-2 border-orange-900 pl-4">
          2. The Woeful Toad
        </h3>
        <p className="mb-4">
          At the tavern, the party sought rest and information.{" "}
          <span className="text-orange-500 font-bold">Titus</span> spoke with
          the proprietor,{" "}
          <span className="text-orange-500 font-bold">Tilla Bramblebrew</span>.
        </p>

        <ul className="list-disc pl-5 space-y-2 mb-4 text-stone-400">
          <li>
            <strong className="text-stone-300">Social Encounter:</strong>{" "}
            <span className="text-orange-500 font-bold">Titus</span> used his
            persuasion skills effectively.{" "}
            <span className="text-orange-500 font-bold">Tilla</span> became
            quite fond of him and gifted him a bottle of "unsold" whiskey.{" "}
            <br />
            <span className="text-emerald-600 italic">
              Item Acquired: Old Whiskey (+4 Temporary HP).
            </span>
          </li>
          <li>
            <strong className="text-stone-300">Scouting:</strong> Meanwhile,{" "}
            <span className="text-orange-500 font-bold">Erevan</span>
            —maintaining his cautious ranger nature—scouted the perimeter. Once
            deemed safe, he joined the group inside.
          </li>
          <li>
            <strong className="text-stone-300">The Performance:</strong>{" "}
            <span className="text-orange-500 font-bold">Dazrian Edgecorde</span>{" "}
            decided to grace the crowd with a song. It impressed{" "}
            <span className="text-orange-500 font-bold">Tilla</span> so much
            that she asked him to come back and play that night as they were
            expecting a crowd, offering room and board in exchange.
          </li>
        </ul>

        <h3 className="text-xl font-title text-orange-700 mt-8 mb-4 border-l-2 border-orange-900 pl-4">
          3. Clues from Ruphus Kess
        </h3>
        <p className="mb-4">
          While <span className="text-orange-500 font-bold">Maldan Breen</span>{" "}
          settled in a corner with an ale, he noticed a patron,{" "}
          <span className="text-orange-500 font-bold">Ruphus Kess</span>,
          reacting viscerally to something Titus said at the bar.
        </p>

        <p className="mb-4">
          <span className="text-orange-500 font-bold">Maldan</span> approached{" "}
          <span className="text-orange-500 font-bold">Ruphus</span> and
          successfully cast <em>Charm Person</em>.
        </p>

        <p className="mb-4">
          <strong className="text-stone-300">Intel:</strong>{" "}
          <span className="text-orange-500 font-bold">Ruphus</span> opened up
          about his PTSD and past dealings. Once a commander of the 5th Penitent
          Legion, unable to commit atrocities he was forcefully removed from his
          position. Now, a shell of himself and a drunk he revealed that{" "}
          <span className="text-orange-500 font-bold">Arathus Kexor</span>, a
          priest at the church, once tried to coerce him into a tunnel beneath
          the church. <span className="text-orange-500 font-bold">Ruphus</span>{" "}
          had refused, as he wanted nothing to do with the strange priest.
        </p>

        <h3 className="text-xl font-title text-orange-700 mt-8 mb-4 border-l-2 border-orange-900 pl-4">
          4. The Investigation of Arathus
        </h3>
        <p className="mb-4">
          Armed with this new link, the party returned to the church to track
          down the priest.
        </p>
        <p className="mb-4">
          They met{" "}
          <span className="text-orange-500 font-bold">Brother Jareth</span>, who
          informed them that{" "}
          <span className="text-orange-500 font-bold">Arathus</span> has been
          missing for some time. Previous church investigations yielded nothing.{" "}
          <span className="text-orange-500 font-bold">Jareth</span> provided
          directions to{" "}
          <span className="text-orange-500 font-bold">Arathus's</span> dwelling:
          outside of town, up the low roads on the left.
        </p>

        <h3 className="text-xl font-title text-orange-700 mt-8 mb-4 border-l-2 border-orange-900 pl-4">
          5. Arathus's House & The Cult
        </h3>
        <p className="mb-4">
          The group located the house, which was in surprisingly good condition
          for belonging to a missing person.
        </p>

        <ul className="list-disc pl-5 space-y-2 mb-4 text-stone-400">
          <li>
            <strong className="text-stone-300">The Illusion:</strong> After
            knocking, the door creaked open. The group detected magic in the
            area, revealing an illusion covering the floor. Behind it, they
            found a stairway carved into the ground leading to a dark hallway.
          </li>
          <li>
            <strong className="text-stone-300">The Ambush:</strong>{" "}
            <span className="text-orange-500 font-bold">Erevan</span> sneaked
            down to investigate and heard murmurs and chanting.
          </li>
          <li>
            <strong className="text-stone-300">Combat:</strong> A noise
            triggered an attack.{" "}
            <span className="text-orange-500 font-bold">Arathus</span> summoned
            a <strong>Spined Devil</strong> from the body of one of the
            cultists, initiating a desperate fight.
          </li>
        </ul>

        <h3 className="text-xl font-title text-orange-700 mt-8 mb-4 border-l-2 border-orange-900 pl-4">
          6. Aftermath
        </h3>
        <p className="mb-4">
          The party successfully dismantled the cultist group and killed{" "}
          <span className="text-orange-500 font-bold">Arathus</span>.
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4 text-stone-400">
          <li>
            <strong className="text-stone-300">Final Words:</strong>{" "}
            <span className="text-orange-500 font-bold">Arathus's</span> dying
            words were:{" "}
            <em className="text-stone-200">"It's all for the heir."</em>
          </li>
          <li>
            <strong className="text-stone-300">Loot:</strong> The group received
            212gp, Sigil, and a mysterious{" "}
            <span className="text-emerald-600 italic">Bone Key</span>.
          </li>
        </ul>
      </>
    ),
  },
];

const SessionCard = ({ num, title, date, summary, onClick }) => (
  <div
    onClick={onClick}
    className="flex flex-col md:flex-row gap-8 items-start group cursor-pointer"
  >
    {/* Date Column */}
    <div className="md:w-32 flex-shrink-0 pt-2">
      <span className="block font-title text-orange-700 text-xl font-bold">
        Session {num}
      </span>
      <span className="block font-body text-xs text-stone-600 mt-1 uppercase tracking-wide">
        {date}
      </span>
    </div>

    {/* Content Column */}
    <div className="flex-grow glass-panel p-6 md:p-8 hover:bg-stone-900/80 transition-colors border-l-4 border-l-orange-900 group-hover:border-l-orange-600 group-hover:shadow-[0_0_20px_rgba(194,65,12,0.1)]">
      <h3 className="text-2xl font-title text-stone-200 mb-3 group-hover:text-orange-500 transition-colors">
        {title}
      </h3>
      <p className="text-stone-400 font-body leading-relaxed mb-6">{summary}</p>
      <button className="flex items-center gap-2 text-xs font-title tracking-widest text-stone-500 group-hover:text-orange-400 uppercase transition-colors">
        Read Log <ChevronRight size={12} />
      </button>
    </div>
  </div>
);

const SessionDetail = ({ session, onBack }) => (
  <div className="animate-[fadeIn_0.5s_ease-out]">
    <div className="max-w-4xl mx-auto">
      {/* Navigation Header */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-stone-500 hover:text-orange-500 transition-colors mb-8 font-title tracking-widest text-sm uppercase group"
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-1 transition-transform"
        />{" "}
        Back to Chronicles
      </button>

      {/* Content Container */}
      <div className="bg-[#0f172a] border border-orange-900/50 shadow-2xl relative p-8 md:p-16">
        {/* Decorative Top Bar */}
        <div className="absolute top-0 left-0 h-1 bg-orange-900 w-full"></div>

        <div className="flex justify-between items-end mb-8 border-b border-stone-800 pb-6">
          <div>
            <span className="font-title text-orange-700 text-lg block mb-2">
              Session {session.num}
            </span>
            <h2 className="font-title text-3xl md:text-5xl text-stone-200">
              {session.title}
            </h2>
          </div>
          <span className="font-body text-stone-500 text-sm hidden md:block">
            {session.date}
          </span>
        </div>

        <div className="prose prose-invert prose-stone max-w-none font-serif-text leading-loose text-lg text-stone-300">
          {session.content}
        </div>

        <Divider />

        <div className="text-center">
          <span className="font-title text-stone-600 text-xs tracking-[0.3em] uppercase">
            End of Session Log
          </span>
        </div>
      </div>
    </div>
  </div>
);

const Sessions = () => {
  const [selectedSessionId, setSelectedSessionId] = useState(null);

  // Filter existing data to only show the two requested sessions
  const activeSessions = SessionData;
  const selectedSession = activeSessions.find(
    (s) => s.id === selectedSessionId
  );

  return (
    <div className="min-h-screen bg-[#0c0a09] pt-32 pb-20 px-4">
      {selectedSession ? (
        <SessionDetail
          session={selectedSession}
          onBack={() => setSelectedSessionId(null)}
        />
      ) : (
        <div className="max-w-4xl mx-auto animate-[fadeIn_0.5s_ease-out]">
          <div className="flex items-end justify-between mb-16 border-b border-stone-800 pb-6">
            <h2 className="text-4xl font-title text-stone-200">Chronicles</h2>
            <span className="font-body text-stone-600 text-sm">
              Campaign Status: <span className="text-orange-700">Active</span>
            </span>
          </div>

          <div className="space-y-8">
            {activeSessions.map((s) => (
              <SessionCard
                key={s.id}
                {...s}
                onClick={() => setSelectedSessionId(s.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Novel = () => {
  const [chapter, setChapter] = useState(1);

  return (
    <div className="min-h-screen bg-[#0c0a09] pt-28 pb-20 px-4 md:px-0">
      <div className="max-w-3xl mx-auto">
        {/* Reader Interface */}
        <div className="bg-[#0f172a] border border-orange-900/50 shadow-2xl relative">
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
