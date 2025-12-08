import background from './background.png';
import Lore from './components/Lore';
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
  Shield,
  Eye,
  Globe,
} from "lucide-react";

// --- 1. GLOBAL STYLES & BOOK FORMATTING ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300&display=swap');
    
    .font-title { font-family: 'Cinzel', serif; }
    .font-serif-text { font-family: 'Playfair Display', serif; }
    .font-body { font-family: 'Inter', sans-serif; }
    .font-book { font-family: 'Merriweather', serif; }

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
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes pulse-slow {
      0%, 100% { opacity: 1; filter: brightness(1.3); }
      50% { opacity: 0.6; filter: brightness(1); }
    }
    
    .animate-fog { animation: fog-flow 60s linear infinite; }
    .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
    
    .glass-panel {
      background: rgba(67, 20, 7, 0.4);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(124, 45, 18, 0.4);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
    }

    .hover-glow:hover {
        box-shadow: 0 0 15px rgba(234, 88, 12, 0.3);
        border-color: rgba(234, 88, 12, 0.6);
    }

    /* --- REAL NOVEL TYPESETTING ENGINE --- */
    .chapter-text {
      font-family: 'Merriweather', serif;
      font-size: 1.125rem; /* 18px */
      line-height: 1.8;
      color: #d6d3d1; /* stone-300 */
      text-align: justify;
      max-width: 65ch; /* Optimal reading width */
      margin: 0 auto;
    }

    /* Indent every paragraph EXCEPT the very first one of the container */
    .chapter-text p {
      margin-bottom: 0;
      margin-top: 0;
      text-indent: 2em;
    }
    
    .chapter-text p:first-of-type {
      text-indent: 0;
    }

    /* Drop Cap Styling */
    .drop-cap {
      float: left;
      font-family: 'Cinzel', serif;
      font-size: 4rem;
      line-height: 0.75;
      margin-right: 0.15em;
      margin-top: 0.15em;
      margin-bottom: -0.15em;
      color: #ea580c; /* orange-600 */
      font-weight: 700;
    }
  `}</style>
);

// --- 2. REUSABLE UI COMPONENTS ---

const Divider = () => (
  <div className="flex items-center justify-center py-8 opacity-50">
    <div className="h-px bg-gradient-to-r from-transparent via-orange-900 to-transparent w-full max-w-xs"></div>
    <div className="mx-4 text-orange-800"><Skull size={12} /></div>
    <div className="h-px bg-gradient-to-r from-transparent via-orange-900 to-transparent w-full max-w-xs"></div>
  </div>
);

const Navigation = ({ activeTab, onNavClick, isMenuOpen, setIsMenuOpen }) => {
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
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => onNavClick("home")}>
            <div className="relative">
              <div className="absolute inset-0 bg-orange-800 blur-md opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <Sword size={28} className="text-stone-200 relative z-10" />
            </div>
            <div className="flex flex-col">
              <span className="font-title text-xl tracking-[0.2em] text-stone-200 leading-none group-hover:text-orange-600 transition-colors">SEVERED</span>
              <span className="font-title text-[0.6rem] tracking-[0.4em] text-orange-800 uppercase">Realms</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavClick(item.id)}
                className={`flex items-center gap-2 text-sm font-title tracking-widest uppercase transition-all duration-300 relative group py-2 ${
                  activeTab === item.id ? "text-orange-600" : "text-stone-500 hover:text-stone-300"
                }`}
              >
                {activeTab === item.id && <span className="absolute -bottom-1 left-0 w-full h-px bg-orange-600 shadow-[0_0_10px_#ea580c]"></span>}
                <span className="group-hover:text-orange-600 transition-colors">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-stone-400 hover:text-white">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden absolute top-24 left-0 w-full bg-stone-950 border-b border-orange-900/50 p-4">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { onNavClick(item.id); setIsMenuOpen(false); }}
                className={`flex items-center gap-4 p-3 rounded-lg border border-transparent ${
                  activeTab === item.id ? "bg-orange-950/50 border-orange-900 text-orange-600" : "text-stone-400 hover:bg-stone-900"
                }`}
              >
                {item.icon} <span className="font-title tracking-wider">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = ({ setActiveTab }) => (
  <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
    <div className="absolute inset-0 pointer-events-none">
      
      {/* UPDATED IMAGE TAG */}
      <img 
        src={background} 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover" 
        onError={(e) => {
          // Keep the fallback just in case, but you likely won't need it now!
          e.target.onerror = null; 
          e.target.src="https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?q=80&w=2544&auto=format&fit=crop";
        }}
      />
      
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-800/60 to-transparent opacity-30 z-10"></div>
      <div className="absolute -inset-[50%] bg-[radial-gradient(circle,rgba(220,220,220,0.15)_0%,transparent_60%)] animate-fog opacity-20 z-20"></div>
    </div>

    <div className="relative z-30 text-center px-4 max-w-6xl mx-auto mt-16">
      <div className="flex items-center justify-center gap-4 mb-6 opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
        <div className="animate-pulse-slow flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-orange-500 shadow-[0_0_8px_#f97316]"></div>
          <span className="text-orange-400 font-title tracking-[0.4em] text-xs md:text-sm uppercase drop-shadow-[0_0_5px_rgba(249,115,22,0.8)]">A Severed Realms Campaign</span>
          <div className="h-px w-12 bg-orange-500 shadow-[0_0_8px_#f97316]"></div>
        </div>
      </div>

      <h1 className="text-5xl md:text-7xl lg:text-8xl font-title font-black text-transparent bg-clip-text bg-gradient-to-b drop-shadow-2xl mb-8 tracking-tighter leading-[0.9] opacity-0 animate-[slideUp_1s_ease-out_0.5s_forwards]"
          style={{ backgroundImage: "linear-gradient(to bottom, #f5f5f4 0%, #c2410c 25%, #c2410c 75%, #000000 100%)" }}>
        A DIRGE TO<br />THE FALSEBLOOD
      </h1>

      <p className="text-stone-400 max-w-2xl mx-auto text-lg md:text-2xl font-serif-text italic mb-12 leading-relaxed opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
        "A severed existence is a wound that festers."
      </p>

      <div className="flex flex-col md:flex-row gap-6 justify-center items-center opacity-0 animate-[fadeIn_1s_ease-out_1.5s_forwards]">
        <button onClick={() => setActiveTab("novel")} className="group relative px-8 py-4 bg-orange-950/50 hover:bg-orange-900/60 text-orange-100 border border-orange-800/60 overflow-hidden transition-all duration-300">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-orange-600/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <span className="relative font-title tracking-[0.2em] uppercase text-sm font-bold flex items-center gap-2">
            <Book size={16} /> Read the Tome
          </span>
        </button>
        <button onClick={() => setActiveTab("lore")} className="px-8 py-4 text-stone-500 hover:text-orange-600 font-title tracking-[0.2em] uppercase text-sm border-b border-transparent hover:border-orange-800 transition-all">
          Enter the Archives
        </button>
      </div>
    </div>
  </div>
);

// --- 4. DATA STRUCTURES (FULL CONTENT RESTORED) ---

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
  const [selectedChapter, setSelectedChapter] = useState(null);

  // Scroll to top when opening a chapter
  useEffect(() => {
    if (selectedChapter !== null) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedChapter]);

  const chapters = [
    {
      title: "A Shadow's Prey",
      summary: "Erevan tracks a disturbance in the decaying woods, finding art made of agony.",
      content: (
        <div className="chapter-text">
          <p>
            <span className="drop-cap">L</span>
            aughter fills the chamber of a dimly lit tavern; you can barely hear
            the boots stick to the wooden floor as the waitress scurries to fill
            drink orders. Ale spilt by drunks trying to forget the mess dealt to
            them in this hell they call home. The aroma of broth, boiled
            vegetables and seared meat relieves the stench of sour breath and
            half rotted teeth. Erevan, eyes peeled on each patron from a corner
            table, sharpens the broadheads on his finely fletched arrows with a
            wet stone nearly smooth. Maintenance, a discipline hammered
            repeatedly into his skull by a mentor he hasn’t seen in ages. A sly
            smirk from the corner of his mouth forms as he hears the raspy voice
            in his head “Discipline is control, control is precision, precision
            is power”. The smirk quickly fades and his lips curl in disdain as
            his next thoughts are the about the failure of the last guided hunt
            and the nobles who’d hired him—soft-handed, coward lords who’d vomit
            while he field dressed the beast he all but shot for them. They hang
            their trophies in their marble halls like conquests they themselves
            made, strutting beneath marvelous beasts sipping from crystal word
            more the the poor servings girls they would beat bloody after
            forcing themselves on them unable to perform with cocks as limp as
            their wills. The same silk-sheathed worms that destroyed his
            reputation after watching their hunting companion disemboweled,
            testicles to throat by the beast they’d paid him to take them to.
            “Should have let it take all of them” he whispers, testing the
            broadhead against his thumb until the blood wells up and pushes out
            through the flayed skin.
          </p>
          <p>
            Erevan’s sense sharpen and snap into the present as the sound of
            glass shatters from a quarrel fueled by liquid courage. The footwork
            of the men circling each other display a dire lack of skill. Both
            men towering just over five and a half foot. “A clash of the
            titans!” Erevan sarcastically says to himself as he continues to
            sharpen his broadheads.
          </p>
          <p>
            He notices the waitress headed his way, carrying a steaming bowl of
            stew and a fresh pint of ale. His stomach aches and rumbles with
            hunger. A beautiful Half-Elf with dirty-blonde hair that falls just
            below her shoulders, dark brown eyes the shine with a hint of gold
            when the candle light hits just right. A soft smile perks up on her
            face as she notices Erevan looking at her.
          </p>
          <p>
            “It’s a rowdy crowd tonight” she says playfully as she set the bowl
            and tankard down.
          </p>
          <p>
            “As long as it stay rowdy over there I shouldn’t need you to protect
            me” Erevan says with sarcastic smirk.
          </p>
          <p>
            The sound of tankard clashing in cheers rings out as the two titans
            finish their quarrel with a hug. “Ah, and I was worried over
            nothing” Erevan says again sarcastically. A smile beams across the
            waitress’s face. She chuckles as she asks “What brings you to our
            peaceful town?” matching Erevan’s sarcasm.
          </p>
          <p>
            “I am a cobbler, I make shoes for the elite back in Caer Dusk, I
            need exotic supplies that I can only find on the border of Eldrathor
            in Cresgate” Erevan says with a stoic expression. His cautious
            demeanor peers through the sarcastic banter. It’s his business, and
            he doesn’t like others knowing his business.
          </p>
          <p>
            The waitress, confused by his appearance glances back and forth, a
            double take on his clothing and gear. She doesn’t know how to
            receive his story, but she thinks to herself “I know for sure he
            isn’t a damn cobbler”. “Oh, good luck finding what you need!” she
            says, understanding the pleasantries are no longer welcomed. He has
            a slight feeling of guilt. “She was just being nice” he says in his
            head. He isn’t quiet sure what to make of this place. Hired to track
            down missing villagers, just outside of town, it’s better to not let
            on to that. Anyone of these people in here could be a sick cunt,
            snatching unsuspecting people going about there business to take
            them somewhere and carve their sins into the reality of their
            victims. He’s seen it before unfortunately.
          </p>
          <p>
            “I’ll be damned, at least I will have one last fine meal” as he
            shovels the stew into his mouth. “That old fuckers lessons always
            linger” Everan laughs to himself as he covers his tracks, that would
            lead wrong doers on a wild goose chase of winding, twisting, foot
            prints that circle the town.
          </p>
          <p>
            Setting out before day break to get a jump on the mess he signed up
            for. Erevan pushes through the trees and into a clearing. In a brief
            pause, he wonders if his eyes deceive him. The valley before him
            doesn't blandly rot; it writhes in agony, vomiting forth a blight
            that covers the land. Blood-gorged parasites burrow through soil
            beneath him, black as a hanged man's tongue, each wriggling, body
            stuffed with liquefied human remains, each getting their fill on
            near by corpses. Their feculence spreads a plague of disease and
            pestilence that covers the land. As the rain begins to fall, the air
            turns thick, a layer stench that can only be described as sulfur
            hits his nostrils.
          </p>
          <p>“Fuck me, even the rain is rotting in this land”</p>
          <p>
            He continues forward, crossing streams clotted with a congealed
            thickness that resembles curdled milk. Ducking the bare limbs from
            trees that are blanched, dead from the acidic rain it would seem.
            The ground squelches and swells like a boil, a festering abscess
            that splits open under the pressure, spewing bile and methane into
            the atmosphere. Old men in Caer Dusk, with faces pinched and
            uptight, muttered over pints about the curse in the blood of the
            Eldrathor Kings. They said it was a punishment for pride, or
            perversion, or something that should remain unnamed. Erevan
            dismissed it as the foggy logic of the drunk and terrified. But now,
            seeing it for himself he understands why peasants would blame a
            princess born under a blood moon, especially after her birth claimed
            the life of the Queen. It is undeniable, Eldrathor is bleeding, hell
            Eldrathor is fucking dead.
          </p>
          <p>
            The storms here haven’t let up in weeks. Erevan’s boots sink to the
            top of the kiltie in a spongy red and black surface, the color
            somewhere between dried blood and charred meat. The ground exhales a
            putrid stink like wound turned septic. His muscles contract and the
            blood expresses from within the stringy tethers of meat as he
            strains to wrench them free the clutching mud, glancing around for
            anything to help stabilize hit footing. Roots, collapsed trees,
            limbs, nothing around can offer support or stability; it’s as if
            they all slither across the surface on their bellies, tangled and
            bare like the forest has given up hope. Overhead, the canopy should
            be a cathedral of lush greens, shading the ground from the summer
            sun, but what remain hang limp, the last desperate fiber holding to
            what once provided sustenance, their edges gnawed by some invisible
            blight. Branches slick with fungus, bark sloughing off in greasy
            strips, and every tree bore a crust of lichen that glowed faintly in
            the overcast light, like a rash spreading from trunk to trunk.
          </p>
          <p>
            Silence, the only noise is the inconsistent drip of the acidic rain
            that gathers on Erevan’s leather armor and the ringing pulse of his
            heart beat covered slighter by his exhales, pausing intervals to
            listen for any sign of motion. The warblers, the thrushes, the crows
            a whole orchestra of the usual woodland chorus are mute. If anything
            were to move here, it would be out of starvation or fear. The land
            itself seems to recoil.
          </p>
          <p>
            A cool, uneasy breeze hit his face, the rain subsides after coating
            whatever remains. The aroma hits first, familiar, unmistakable. It
            takes but a moment for his eyes to locate the source. A missing
            villager, the first he’s found, half-submerged in the congealed
            waters of the still creek bed. Wool garments green with mold, flesh
            liquefying and pooling beneath the corpse. Skin, hanging from the
            bone like wax melting away from the flame of a candle. The sharp
            tang of what belongs buried underground now festers in open air.
            “Poor soul has been here for weeks” Erevan, softly says under his
            breath.
          </p>
          <p>
            Erevan crouches, holding an arrow like a maestro wielding a baton.
            With the tip he moves the tattered remnants of cloth away from the
            villager’s face. Maggots writhe free with a faint squelching sound
            as they pour out in wet clumps from the sockets beneath eyes,
            yellowed, bulging, and glazed over in terror. The lips curled back
            in a rictus, a receding tongue twisted and contorting behind the
            newly exposed clenched teeth. His femurs, shattered and twisted at
            impossible angles, as the bones rip from skin, fractured and jagged.
            Below the ribs sat a single puncture, stark and surgical, as if
            something long and narrow had been driven through to maim and left
            to savor the agony. This display resembles something only a butcher
            would enjoy. Feeding on screams, engrossed with pleasure as he
            tortures his victim, manically laughing to a series of sickening
            pops, and wet squelches of tendons tearing from broken bones as
            limbs are drawn apart beyond its limits.
          </p>
          <p>
            Beading on his brow, sweat gathers and runs down tracing the curves
            of his face. The trees groan, cackling under their own weight.
            Erevan’s senses heighten, his breath stills, as his heart slows to
            an unnatural slow rhythm. Something is watching, patient and
            analytical, like a spider savoring its prey caught in a web. He
            doesn’t flinch. After a moment the feeling subsides, he looks back
            at the mutilated corpse in front of him, Erevan has watched life
            fade from eye that he closed forever. But this butchery makes his
            stomach churn. This art, horrifically painted with blood and agony,
            this poor sap didn’t realize he was the canvas. After studying this
            artist’s handiwork Erevan knows his magnum opus of horror is yet to
            come.
          </p>
          <p>
            With heightened senses, taut to the point of pain, he presses
            onward. The path narrows a cacophony dread, every step demanding a
            calculated decision: risk the sucking mud that bubbles beneath his
            feet, or brave the nettle-thick walls of briar and fungus that
            glisten with unnatural moisture. Erevan spots a tattered green
            cloak.
          </p>
          <p>
            “Another one” he says to himself as if he’s already pictured the
            scene he is about to witness. A once forest-colored but now mottled
            with black-brown stains, drapes the shredded and disfigured corpse.
            The garment matches the description of a farm boy—Terrin, they'd
            called him—who vanished from the same village three weeks prior. The
            body lies face down, split open from nape to tailbone, vertebrae
            gleaming like yellowed pearls in the dim light. His legs are twisted
            and pointing straight up toward the weeping sky, hips dislocated
            with surgical precision, torquing the femurs until they spiral
            behind him warping the leg around at impossible angles while stringy
            meat and translucent skin are the only tethers keeping the
            dismantled limbs attached to the torso. The head, cocked off to the
            side at a puppet-like angle, reveals eye sockets hollowed clean,
            replaced with smooth river rocks arranged with the meticulous care
            of a jeweler. On the exposed ribs, scrubbed white as winter bone, a
            spiral pattern scored with the point of a blade, shallow but
            unmistakable, perfect whorls tightening toward a center that rested
            on a thorny crown. Aligned precisely with where the heart would have
            been. A pulse of dread works its way up. The same pattern appears in
            a repeated dream throughout his life. An inevitable apocalypse, a
            prophecy of his own mutilation, with a feeling of immense failure
            swells over, know he did everything in his power to stop it. Erevan
            closes the boys’ gapping jaws with an empathetic gentleness, then
            stood and scanned the woods.
          </p>
          <p>
            Another hour passes as he moves in silence, following the line of
            the creek through a series of pools and slick-banked bends. With
            every hundred paces, the land grew more exhausted, the air so heavy
            with spores that the rag over his mouth clogs as he tries to avoid
            inhaling them. He listens for any sign of pursuit but hears nothing.
            This land is hollowed out, and he is its lone witness.
          </p>
          <p>
            It’s midday as he reaches a clearing, the light so diffuse and gray
            that time itself seems to hesitate. At the center stands a stone
            well, ancient and lidless, its rim crusted with moss and human
            skulls. Someone arranged the skulls in a ring around the mouth,
            their jaws agape in a useless cry. On the stones below, a series of
            tracks barefoot, splayed, inhuman like circled the well, then
            trailed off into the deeper woods. Fresh indents, sharp and clean,
            but filled already with a film of water. He glances into the well.
            The darkness inside was absolute. Peering throughout the ruins he
            finds a piece of cloth snagged on a bramble—a strip of sackcloth,
            stained with something dark and greasy, the scent familiar.
            Something in the fat, in the way it clings to the fibers, reminds
            him of tallow candles and ritual unguents from his childhood in the
            north.
          </p>
          <p>
            He pockets the scrap and moves on. The prints led him toward a stand
            of dead birches, the bark peeled away in sheets, revealing pale wood
            beneath. There, at the edge of the dying wood, he caught the glint
            of metal: a child's toy, a small tin soldier, its head twisted off
            and its chest pierced by a thin wooden stake. The implication was
            too obvious to ignore. Erevan, getting a sense of the cold logic,
            sets the scene as it settles into his bones. This isn’t the work of
            a creature gone mad. It is a hunt, and he is invited to witness its
            progress.
          </p>
          <p>
            The tracks plunged deeper, serpentine through a stranglehold of
            thorns into a hollow where trees huddled like conspirators. Daylight
            bled away as the air chilled against his skin. Erevan measured each
            breath—an old mercenary's trick to mask fear beneath control. Around
            a bend in the path, he discovered another victim: an elderly woman
            suspended from a branch, her skin peeled away with methodical
            precision, her own intestines fashioned into the noose that held her
            aloft. Where eyes should have been, smooth river stones stared back
            at him. The display needed no translation: I want you to see what
            I've collected.
          </p>
          <p>
            Dragging itself on the belly of the once beautiful forest the path
            is an ulcer of churned mud and blackened leaves that led inexorably
            toward the source of all this death. Erevan followed it with the
            grim focus of a man tracing a death sentence, eyes peeled for traps
            or the ghostly afterimage of whatever intellect had arranged the
            carnage behind him. For a while, the only sign of disturbance was
            the sickly-sweet odor thickening on the air, a cloying stench that
            reminded him uncomfortably of the paupers’ wards in distant city
            mortuaries. But in time, even that was overwhelmed by a new
            presence: the prickle of heat, the metallic tang of fresh blood.
            Beneath it, the crackle of voices chanting in a tongue, older than
            the trees themselves. Terminating at the base of a crumbling
            escarpment, the ground yawned open into an uneven maw. The cave
            mouth was rimmed with a crust of old fat and something that might
            once have been hair, caked together by years of smoke and splatter.
            At its threshold, a pair of wooden dolls, their expressions
            depicting rapture and agony. Erevan, never superstitious, felt a
            momentary urge to leave an offering or mutter a prayer, but only
            spat to clear his throat and pressed onward.
          </p>
          <p>
            Inside, the temperature drops with every step, light collapsing into
            a darkness so thick it drips from the ceiling. Air, thick with the
            scent of blood and burning flesh fills his nostrils. A syncopated
            chorus of guttural syllables, murmurs hanging in the air in
            anticipation echo down the narrow passage. Wicks burning short
            inside a slumping candle project shadows against weeping stalagmites
            and harden clay walls. A congregation of figures, each one hunched
            over like a bird of prey. Smoke gathers at the ceiling as embers
            radiate from within charred flesh, still crackling like seared meat.
            In the circle lay three smoldering bodies, aesthetically arranged in
            perfect symmetry. It takes but a glance at the prone bodies to
            reiterate what Erevan already knew.
          </p>
          <p>
            “The missing children, all three of them” He thinks to himself in
            disgust. He sighs quietly. “A moment too late”
          </p>
          <p>
            He slips through the shadows with an unbreakable focus. The need for
            parley or barter for the safe return no longer an option, the
            clarity of his purpose is absolute. The chamber throbs with dying
            chants that reverberate through his bones. Twelve silent steps bring
            him into their midst, a ghost unnoticed. Guttering yellow candles
            illuminate five skeletal figures kneeling in ritual. Thorned crowns
            rise from spirals carved with surgical precision into flesh.
            Protruding ribs press against chalk white skin, nearly tearing with
            each sway. Blackened flakes of clotted blood and sticky wet chunks
            of tissue cling to the jagged edges of hollowed sockets, as if each
            cultist had torn out their own sight in ecstatic frenzy. Tendons,
            unmistakably human, seal their mouth with precise stitches,
            insinuating the work of a deranged artist. Their spines undulate
            back and forth in a hypnotic rhythm, being manipulated by invisible
            strings hanging from above.
          </p>
          <p>
            Without a breath of sound, Erevan nocks an arrow. His fingers find
            the bowstring's worn groove, testament to his dedication to his
            craft. The goose feathered fletching softly brushes his cheek as he
            breathes deep and readies his shot, a familiar ritual that calms the
            storm in his chest. His eyes close, the breath leaves with a quiet
            sigh, eyes opening with an intense focus. A sharp snap echoes as he
            lets loose the bowstring.
          </p>
          <p>
            He strikes with a predator’s precision. A sharp snap echoes as he
            lets loose the bowstring. The arrow shrieks through the half-light,
            burying itself at the base of a woman’s neck. A thwap rings out as
            the arrow punches through her neck bones, severs her brainstem and
            pushes through the soft layers of her esophagus before coming to a
            stop. Her arms flail, palms slapping the air and rocks beneath her
            as she reels from the shock, grasping for support to ease her pain.
            As her body slows you can hear the faintest as her lungs deflate
            around the finely crafted arrow still lodged in her punctured
            throat.
          </p>
          <p>
            The fanatic to her left whirls around to square up with his
            predator, but it’s too late for the unsuspecting prey. Erevan’s
            left-hand clamps over the jaw, blood sprays from the once perfectly
            sewn lips now split open by a forceful twist. The fanatics jaw
            relents as a wet pop rings out from the joint bursting and rips free
            from the socket leaving his jaw hanging contorted, crooked and
            useless. With unbridled rage Erevan continues twisting, feeling
            every vertebra in the man’s neck give way from the force. Twisting
            any further would remove head from mangled neck, no longer a threat
            Erevan’s drops the limp body.
          </p>
          <p>
            Another cultist lunges forward with muffled screams that give away
            his movements. Arms stretched out in a desperate attempt to locate
            their attacker. Erevan slips left, drawing steel from his hip in a
            single fluid motion. His blade arcs upward in a tight rising sweep
            the cleave frees the arms just below the elbow. Bone caps split,
            tendons retreating into the biceps like a whipped cord. In
            excruciating pain, the man’s cries start from a muffle murmur to a
            blood curdling scream as the pain overwhelms him to the point he
            rips through the stitching in his lips in search of any relief.
            Erevan completes the pivot letting his momentum carry him in a tight
            pirouette that returns the strike scythed across the throat. Steel
            opening everything from the first layer of skin through the trachea
            before a sudden stop.
          </p>
          <p>
            The only thing keeping the fanatic upright is Erevan’s blade. A hard
            thud and a wet swish cut through the moment as Erevan drives a boot
            into the man’s chest and yanks back on the pommel, wrenching the
            steel free from the half-split vertebra. The body drops instantly,
            collapsing into a heap of ragged flesh. The nearly severed head
            lolls and bobs, unable to settle on the ruined neck that can no
            longer hold it.
          </p>
          <p>
            A split second later comes a sickening crunch as Erevan’s heel slams
            into the fanatic’s kneecap, ligaments snapping like mooring lines in
            a storm. The man buckles, and before he can even hit the dirt,
            Erevan’s blade is already there to meet him. A dark red geyser
            erupts as the steel punches through the side of his neck, rupturing
            the carotid in a single, well-placed strike
          </p>
          <p>
            Only one remains. Erevan slows his pace, letting the last fanatic’s
            panic set in fully. It stumbles forward, the fanatic frantically
            flailing, fighting the feeling of fleeing. With a single, inexorable
            lunge, he drives his blade deep into her belly. Blood pours from her
            hands as she grasps the empaling blade. She begins to spasm
            uncontrollably. A deliberate twist of his wrist as he pulls back on
            the hilt, her ribs part, entrails spill out opening her viscera. Her
            breath quickens as she expects a fatal blow any second. It doesn’t
            come. Erevan leaves her, crumpled and disfigured laying in her own
            feculent. Ensuring she suffers for as long as possible. If it were
            up to him, he would hire a healer to keep her alive long enough for
            the infection to set in and turn gangrenous. No, she doesn’t get a
            sweet release. None of them should have.
          </p>
          <p>
            His pulse roars in his ears. He wipes his stained hands on a length
            of coarse linen, blotting at the iron-scented smear until the cloth
            ran dark. Torches flickered in the stillness as he moves toward the
            chamber’s center where the children lay in a circle, burnt
            motionless children. In the center of them stand a heavy copper
            bowl, its surface mottled with a thin rendered fat from the removed
            organs of the children.
          </p>
          <p>
            The eldest girl of maybe twelve, described to have golden hair that
            fanned like a halo, now just charred remains, unable to recognize
            which one is which. The wound on her chest appears so careful, so
            deliberate, it reads in the same language as the rest, an artist's
            stroke. A single, clean incision, edges that didn't pucker or tear,
            a blade wielded by hands steadier than any of the twitching,
            emaciated cultists whose bodies now cooled on the stone floor. None
            of these fanatics carried the skill for these wounds, or the
            meticulous displays he had encountered in the forest—those grisly
            tableaux of peeled skin and positioned limbs spoke of patience and a
            disturbing aesthetic sensibility.
          </p>
          <p>
            A chill comes over him. His spine stiffens as a cold weight settles
            between his shoulders. A subtle warm breath glides across his nape
            like a whisper. His knuckles crack as his grip tightens across the
            hilt of his blade. A creeping weight settles on his chest. Cold dead
            eyes pierce the back of his skull. Frustration is let loose as grief
            and rage clash in his chest.
          </p>
          <p>
            “Reveal yourself!” he yells. “Let only one of us leave this tomb and
            the other burn with the rest, a fitting end” he continued.
          </p>
          <p>
            His blood cools. Looking down at the charred remains. “You all
            deserved better”
          </p>
          <p>
            He let the grief weigh for a moment before he buries it deep.
            Exhales forcefully and gets back to his duty, to end suffering, not
            memorialize it as he releases the smallest child’s cold hand. After
            stacking the bodies and memorizing the flesh carve sigils of the
            spiral and thorned crown, Erevan douses the bodies with oil from a
            nearby lamp. Flames from the torch whip and snap as he gives it one
            last look over. Erevan drops the torch and heads back out of the
            cave.
          </p>
          <p>
            Still no color to be had in this grey land of decay, he walks until
            he loses sight of the cave. When all a sudden he is dropped to his
            knees, knuckles digging into the mud. The world tilts with ringing
            in his ears, and then, behind it, a sound. Chains rattle, gagged
            whimpers, bells ringing. With clarity that borders on hallucination,
            he sees a courtyard of red stained cobblestones. The same sounds
            echoing in the background, whimpers that seem to fade in wind. At
            the center was a platform, and atop it, a man kneeling, head bowed,
            arms bound behind his back, waiting for his life to be snuffed out.
            He blinks, and the vision shatters. The memory of that courtyard,
            the cave, the smell of burning flesh, the chains rattling and the
            muffled whimper sent a thrumming pain to the base of his skull.
          </p>
          <p>
            Rising to his feet, Erevan steadies his breathing until the world
            stops tilting beneath him. A cold certainly settles in his bones
            like winter frost: these were not random cruelties. An architect had
            drawn the blueprint for both the ritual and his presence here. The
            spiral pulling him along, its curve inevitable as a noose
            tightening, he knows only death waits for him at the center.
          </p>
        </div>
      ),
    },
    {
      title: "A Mask for the Gutterborne",
      summary: "Maldan plays the game of faces in the Gilded Ledger, but finds a player who knows his true name.",
      content: (
        <div className="chapter-text">
          <p>
            <span className="drop-cap">A</span>
            chime from a flipped coin rang out, the bright, brief note swallowed
            by the thick velvet of the crowded chamber. Maldan Breen watched the
            coin tumble, glittering faintly in the light filled with smoke,
            before snatching it from the air, a gesture so practiced it may as
            well be a tic. He repeated the motion, letting the rhythm of metal
            and flesh steady his pulse as he studied his mark inside the tavern.
          </p>
          <p>
            Braymon March, a senior treasurer of the Gilded Ledger, sat at the
            far end among a retinue of lesser merchants and decorative cousins.
            March was a man who announced his appetites in his every contour—his
            belly pressed against the table’s edge, his cheeks pink and shiny as
            waxed apples, his thinning hair lacquered to his scalp in a futile
            campaign against the onslaught of age. He had the self-satisfaction
            of a man whose every failure was someone else’s fault, and whose
            every indulgence was a just reward rather than a vice. Maldan could
            already see, in the way March fondled his painted snuff box and
            rolled his tongue over his teeth after every sweet, the precise
            pressure points that would shatter him.
          </p>
          <p>
            But this was no ordinary game, no mere fleecing of some soft-palmed
            noble too foolish to know the stakes. The air in the room pulled
            with more than just the promise of gold. The other patrons at the
            table eyed one another with wary, appraising glances of predators
            forced to share a watering hole. A pair of city guardsmen, likely on
            March’s retainer—leaned against the far wall, arms folded, faces
            impassive. The wine steward circled with a nervous energy that
            suggested he’d never served so many high-ranking gluttons in one
            evening. Even the chandelier seemed to tremble in anticipation,
            casting a thousand nervous shadows over the brocade and marble.
          </p>
          <p>
            Once, Maldan would have drunk in these details with the
            hypervigilance of the hunted—listening for the shuffle of boots in
            the alley, memorizing the exits, tracing the pattern of the guards’
            patrols in his mind’s eye. But tonight, he was the wolf in silk, and
            every wary eye was bent on someone else. He flicked the coin again,
            a little harder this time, and caught it on the back of his hand
            without looking. An old mentor had taught him the trick the winter
            he’d been conscribed as a lookout for the Kremont Brotherhood. “When
            you’re scared, boy, let the coin do the talking. Sometimes you
            gotta’ make your own luck” His luck sent him straight to the bottom
            of an unmarked grave, his body never found.
          </p>
          <p>
            Maldan’s gaze drifted from March to the crowd beyond—hawks and
            jackals dressed in velvet, their laughter competing with the music
            for volume. He’d spent years learning the dialect of the powerful,
            the precise ratio of self-deprecation and flattery needed to crack
            the shell of those who’d never known hunger. The memory of his first
            masquerade in these hallowed halls was never far: how the mask cut
            into his cheekbones, how the wine stung his empty stomach, how he’d
            mimicked their careless indolence until it grew into something like
            truth. He watched the way March laughed at the joke of a minor
            viscount, the way his eyes flicked to the door even as he clutched
            his waistline, a subtlety as bright as day to someone like Maldan.
          </p>
          <p>
            The elites of Caer Dusk are lazy, overfed pride of peacocks blinded
            by luxury. Their hubris would never allow them to consider a
            predator prowled among them. Maldan Breen had survived decades in
            the streets by making them believe he belonged—practicing in the
            stifling warrens made of black bread and coal smoke—and by flipping
            a tarnished coin in his palm to steel his nerve. Every time he
            slipped into a candlelit salon with gilded wainscoting or breathed
            perfumed air through a noble’s parlor, he ran through the old
            routines: mirror the drawl, slope the wrist, wear detachment like
            varnish. Never so perfectly they’d suspect, always a half-step shy
            of conviction. Laugh at yourself first, let them supply the
            punchline, and they’ll trust you twice as fast with half as many
            questions.
          </p>
          <p>
            Maldan’s skillset allowed him to become whoever he wanted, whenever
            it was convenient for him. A skillset that will get you far in this
            town. Tonight, was special. A persona set in motion months in
            advance. Tonight, he was Marnet Cuirloch.
          </p>
          <p>
            Marnet Cuirloch— now conveniently expired under a sewer
            flagstone—serving as Maldan’s mask for the past seven nights among
            the Gilded Ledger’s elite. The real Cuirloch had been Uvraine’s
            envoy. Uvrainers were known for their lack of subtlety. Maldan
            honored this reputation by downing aquavit that burned his throat
            raw, chewing loudly on salt-crusted delicacies while twirling the
            ends of his singed mustache theatrically. His hair untamed, flowing,
            and dark, something he would have to get used to. His presence
            claiming space as he prowled the carpets as if he owned every inch,
            bellowing preposterous tales, playing the part like a seasoned
            actor. Maldan flipped his coin—a tarnished silver blessed by
            Maskaros, its edges worn thin by years of deceit. There was never a
            situation that he didn’t touch with a bit of risk. He wove danger
            into the game like a thread, a game within a game.
          </p>
          <p>
            Heads, and he'd spin a lie so outrageous even the gods would
            blush—like claiming to have bedded the Hollow Queen herself. Tails,
            and he'd offer a calculated vulnerability, some morsel of truth to
            make his marks lean closer, thinking they glimpsed the man behind
            the mask. The coin never truly decided his fate; it merely provided
            the thrill of surrender. Maldan needed that edge of chaos, that
            whisper of risk. Without it, the game grew stale, predictable. A
            master lockpick needs resistance in the tumblers. "Everyone lies,"
            he'd whisper to himself in quiet moments, fingers caressing the worn
            silver, "mortals, gods... I just happen to be honest about it."
          </p>
          <p>
            Tonight, after spending the week infiltrating its ranks, The Gilded
            Ledger would become his opus. As he walks in the corner table sits
            the prize: Braymon March, a triple-chinned architect of ugly ducal
            bloodlines, drowning in gin while his Royal Audient hovered behind,
            gloved hands clasped, ears harvesting every whisper in the room. As
            Maldan enters his eyes dart around, sizing up every face, finding
            every exit, calculating angles. The rehearsed smile cutting through
            the crowd, you don't spend seventeen years perfecting the art of
            deception without learning that a properly timed smile can separate
            a man from more than his coin.
          </p>
          <p>
            The day's work had been meticulous fingers dancing across twenty
            different household ledgers in the market quarter's back rooms,
            planting false deficits like seeds that would sprout blame by
            morning. Each falsified balance, each doctored entry positioned
            March's companions as the perfect scapegoats. Now came the
            culmination: the vault key that dangled from Braymon's belt chain,
            waiting to be liberated. A rehearsed act, the imperceptible transfer
            from belt to palm to sleeve. Heads meant charm, tails meant stealth,
            but either way, the key would change hands before the night was
            through.
          </p>
          <p>
            Braymon’s voice cracked through the smoky tavern, a booming, roguish
            laugh that skittered over tables and hearth light. He fixed Maldan
            with a grin wide as a canyon, from a table of empty dinner plates
            and tankards alike. Craving friendship and camaraderie with Maldan
            so fiercely his voice trembled. But Maldan’s gaze was a dark jewel,
            held in calculated repose, reflecting only the faintest spark of
            warmth. Braymon thundered, “Marnet! Come here, you bastard!” and
            Maldan merely inclined his head, an actor stepping onto a stage he
            alone had written.
          </p>
          <p>
            Braymon lunged into questions, his tone gallant with concern. “I
            never thought we’d see you tonight—what of your negotiations, the
            morning’s work?” His eyes glittered, unknowing of the razor
            concealed beneath the manufactured comradery. Maldan’s lips curved
            in rehearsed ease. “Work can rot and fade into lasting memories! One
            last night of revelry, yes?” He raised his cup, every syllable a
            silken lie. The chant of pipe and lute swelled as Braymon waved him
            to the nearest bench, dismissing the company he was keeping. With
            each cup Braymon drained, Maldan’s single goblet remained untouched,
            its surface like a black mirror.
          </p>
          <p>
            Under flickering torchlight, Braymon’s cheeks deepened to bruised
            red, his speech mellowing to honeyed staves. Maldan watched every
            falter of his new friend’s tongue, every glass poured by eager
            servers, as pieces sliding into place. A slow, deliberate shift
            forward, and Maldan produced his coin: an heirloom, cold, but
            comforting. It danced from thumb to forefinger—an omen of risk to
            come. He savored the metallic clink upon the oaken table, eyes
            sharpening. Then, out of the corner of his vision, he sees her: a
            figure draped in shadow, her pupils glinting with dreadful
            certainty, a sigil on her forehead meticulously carved, like an
            artist sculpting a monument. A perfectly symmetrical spiral, with a
            tarnished crown wrapped in thorns sits atop. Her lips curved in that
            mocking, knowing smile— “You’re found, thief. Your gambit ends
            here.”
          </p>
          <p>
            Maldan’s breath hitched. The coin escaped him, spinning, and his
            stomach knotted; he hadn’t dropped it in twenty winters. He lunged,
            seized it, but when he glanced back the stranger had melted into the
            smoke. Panic flayed his mind: who was she? What doom awaited him?
            Braymon’s drunken roar thundered past his dread: “Always flipping
            that damn coin! But never losing your nerve, eh?” The moment cracked
            like ice. Maldan lurches to his feet, eyes raking the shadows for
            the cloaked figure. "Excuse me," he mutters, already shoving past
            bodies that blur into obstacles. The smoke-choked chamber swallows
            his breath as he plunges through the kitchens where grease sizzles
            and curses fly. A dark shape darts through the back door—there! He
            lunges, muscles coiling, then explodes into a sprint. A serving girl
            screams as he knocks her tray skyward, amber liquid raining down as
            he crashes outside.
          </p>
          <p>
            The alley stretches empty in both directions, torch flames guttering
            like dying souls. His heart hammers against his ribs, sweat slicking
            his palms as he whirls, searching for any betraying movement.
            Nothing. Just the mocking silence of the night.
          </p>
          <p>
            "Where the FUCK are you going?!" Braymon's voice slurs behind him,
            thick with drink and suspicion. The man sways like a tree in high
            wind, spittle gleaming on his chin, veins bulging in his neck from
            the effort of standing. 'Pathetic worm,' Maldan thinks, bile rising
            in his throat. 'To be rid of you will be the best part of this
            night.'
          </p>
          <p>
            "Nowhere important," Maldan purrs, mask sliding back into place.
            "Thought I saw someone I once bedded."
          </p>
          <p>
            "OHHH!" Braymon's face splits into a leering grin, eyes
            fever-bright. "Marnet, you rutting BEAST!" His laughter erupts,
            spraying flecks of saliva.
          </p>
          <p>
            Maldan forces a chuckle as his fingers dig into Braymon's shoulder
            like talons. His other hand strikes like a viper, slithering to
            Braymon's waist, fingertips scraping against metal, closing around
            the vault key with a thief's caress, seizing opportunity, half
            focused while his eyes dart around in suspicion of the shadows
            around him.
          </p>
          <p>
            A scream rips through the air as kitchen staff surge forward.
            Maldan's vision tunnels when Braymon's body crashes into the
            cobblestones with a wet thud that vibrates through his boots. The
            cooled metal of the vault key burns his fist while Braymon writhes
            at his feet, hands clawing frantically at his throat, a gaping maw
            of separated flesh. Blood erupts in violent, rhythmic pulse,
            painting Maldan's face and clothes in hot, metallic spray. Each
            desperate gasp sends scarlet bubbles frothing between Braymon's
            fingers, as he tries to force the flesh of his severed throat back
            together to the sound of desperation. His eyes, rife with terror,
            lock onto Maldan's with betrayal. The gurgling from his ruined
            throat grows fainter as his life drains. Then his eyes glaze, pupils
            dilating into black wells as the last tremors rack his body, leaving
            nothing but a shell leaking warmth into the stones taking with it
            every hollow ambition, and regrets from a loveless life.
          </p>
          <p>
            His cover shattered; every blade now pointed at him. Maldan stumbles
            back in shock, heart pounding like war drums. “I… Wait…I” Maldan
            stammers before the voice in his head hits. “Run you fool, there’s
            no redemption from this”
          </p>
          <p>
            The alley beyond stinks of rotting waste, decomposing carcasses from
            the night’s dinner left out for the strays and the desperate. He
            darts down a narrow channel, flipping into shadows and cutting over
            blind stairwells. Behind him, the echo of boots: Reavers, no doubt,
            certain of the murder he didn’t commit. As he whispered to Maskaros
            the world blurred, footsteps rattled off the walls behind him, and
            false echoes spilled into the street. He slipped through a stone
            arch, darkness swallowing him, carrying only the memory of a
            Braymon’s gargled pleas and the sigil on the forehead of the
            stranger whos blade disrupted the perfect game.
          </p>
          <p>
            There is no sound now, no commotion or scuttle. Just the silence
            falling over a now foggy night. The streets are emptied, no doubt
            the Reavers doing. Clearing them out checking anyone who they deemed
            suspicious. Maldan takes a step forward, out of the darkness that
            protected him. He places his feet with intent, every step
            deliberate, not making a sound as he works his way to an abandoned
            house in the lower ward. A place he knows all too well, the only
            place he knows will be truly safe for the night.
          </p>
          <p>
            Huddled in the corner he fights the oncoming sleep. Replaying the
            nights events repeatedly in his head. The blood still smeared across
            his face and the clothes borrowed from the Uvraine who no longer
            needed them. ‘A gift for the part’ he thought.
          </p>
          <p>
            Pain lances through Maldan's skull as exhaustion finally claims him.
            His eyes snap open to blood-stained cobblestones stretching beneath
            his feet, a permanent witness to a horrific slaughter. Cathedral
            bells toll, disorienting him despite years of navigating unfamiliar
            cities. The clanking of chains reverberates inside his skull,
            followed by muffled whimpering that hooks into his conscience.
            Before him, a condemned man kneels at a block darkened by countless
            executions, tears carving clean tracks down his filthy cheeks. A
            cleric's proclamation booms across the courtyard, words indistinct
            yet somehow final. The executioner raises his axe. It falls. The
            crowd exhales as one.
          </p>
          <p>
            Maldan jolts awake on the floor, gulping air like a drowning man.
            Braymon's dried blood still crusts his hands, the vault key cold
            between his fingers. "The vault will be watched," he whispers, "no
            matter when I go." The dream pulses behind his eyes, but one detail
            burns clearest—the executioner's axe pommel bearing a spiral sigil
            crowned with thorns. "Fuck me, Halvar's Grace?" He mutters in
            disbelief.
          </p>
          <p>
            Darkness remains over the streets as he retrieves an emergency pack
            that he placed. An old habit, taught to him by a mentor lost to
            time. "Someone destroyed me, I need to know who." Before dawn
            breaks, Maldan slips from Caer Dusk, likely forever, bound for a
            city where tricksters like him face the headsman's blade. Somehow,
            it's the only path forward.
          </p>
        </div>
      ),
    },
    {
      title: "Ancestral Bonds",
      summary: "Titus Granitefist wrestles with a silent god and a horrifying abomination in the frozen north.",
      content: (
        <div className="chapter-text">
          <p>
            <span className="drop-cap">W</span>
            ord of The Cleansing—a raw slaughter of impossible violence—always
            arrived late in these borderlands, carried over mud and slush by
            wayfarers with frostbitten faces and cudgels for arms. But for Titus
            Granitefist, last of his line, whose veins ran thick with the same
            ambrosial fire that once burned in the marrow of Titan Granitefist,
            the news struck deep within him, rattling his very core and awakens
            his Ancestral Spirit. His wounds from the eastern pass—festering and
            stitched, but never quite healed—seethed as if in answer, a phantom
            ache to remind him that pain was the only true inheritance.
          </p>
          <p>
            Hunched over a jug of foul cider in a nameless tavern just beyond
            the Thaldrenne border, cursing the absent gods, the King, and the
            empty air in equal measure. His skin, hard and prismatic as diamond,
            shimmered in candlelight. It was a thing to admire, but Titus
            understood it for what it was: an oath, a monument to a forebear’s
            martyrdom that he carries, a mark forever loyal to Lathander, the
            Morninglord. The barkeep, a jaundiced woman with more kindness than
            the world deserved, served him as he nursed the wound covered in
            blackened bandages on his thigh and tracing the latticed scars that
            ran from the base of his neck to his hip.
          </p>
          <p>
            Bitter silence became his only comfort—a choking quiet punctured by
            brawls and screams from the alley. Yet the gaunt, stooped folk of
            Thaldrenne possessed that peculiar instinct of the desperate: they
            recognized in his diamond-hard skin and inhuman features a ward
            against encroaching shadows. They gathered around him, offering
            their burdens like unwanted gifts. His days, filled with mending
            broken fences, splinting fractured bones, dragging bewitched cattle
            from frost-rimmed crevasses, anything he could do to help the people
            across Thaldrenne. After a long day when darkness fell, his voice
            would rise, spinning tales of Titan Granitefist—how his forefather
            had stared into oblivion's maw and emerged transformed, ascending
            beyond mortality. Ancient legends passed through bloodlines like
            heirlooms, now rendered fantastical in a world where gods no longer
            walked.
          </p>
          <p>
            Titus told himself that aiding the suffering folk of Thaldrenne was
            purpose enough. One diamond-skinned man against the King's Penitent
            Legions would accomplish nothing but his own death. Yet rage
            festered in him like an abscess that would not drain. Each time
            those crimson banners appeared on the horizon, winding through
            mist-heavy fields, his fists clenched until his knuckles ached. The
            suffering here was deliberate—a calculated system of misery
            engineered by men with hearts as cold as the northern wastes.
          </p>
          <p>He was just one man. This truth he accepted. And still.</p>
          <p>
            After his night of drinking having left his mouth tasting of salt
            and sourness, carrion birds circled overhead as he fumbled through
            prayers he'd learned as a child—forbidden invocations to Lathander,
            the Morninglord who once promised dawn after every darkness. Falling
            to his knees the ancient words spilled from him in broken rhythms,
            each syllable falling into the silence without echo or answer.
          </p>
          <p>
            "Deaf gods or dead gods—what's the difference?" he spat, pushing
            himself upright.
          </p>
          <p>
            He limped back to his rented room, a space so cramped his shield
            leaned against the foot of his bed. Fresh blood seeped through the
            bandages on his thigh, collecting in crimson pools on the
            floorboards. Gritting his teeth against a pain that cut through his
            drunken haze, he tore open his pack for supplies. His fingers worked
            methodically, cleaning and binding the wound while his mind drifted
            toward blessed emptiness.
          </p>
          <p>
            That night, the dreams came—sharper than memory, more insistent than
            the clamor of his waking life. He was standing in the center of a
            vast, sunless courtyard, its stones slick with something that
            glistened like pitch but reeked of rot. The air was thick, choked
            with the stench of burned hair and unwashed bodies. Above him, the
            sky spun in a slow, unnatural spiral, as if the dome of the heavens
            had been yanked askew by a child’s tantrum.
          </p>
          <p>
            Around the edges of the courtyard, faceless figures in bloodstained
            tabards dragged the broken, the sick, the old, and the mad into neat
            rows. There was no efficiency—just a rote, mechanical cruelty, the
            kind that was sanctioned by a king or god. In the center, a raised
            platform. On it, a single man, naked but for a hood of sodden cloth,
            knelt before a block of black stone. Behind him a figured in a black
            hooded cloak, his axe raised high in the air.
          </p>
          <p>
            Titus recognized the sigil on the executioner’s pommel: the sunburst
            of Lathander, corrupted into a spiral, tightly woven with a tarnish
            crown covered in golden metal thorns. The blade came down, and as it
            did, the air filled with a sound Titus had never heard before.
            Gagged whimpers drown out by rattling chains in a rhythmic
            suffering.
          </p>
          <p>
            He woke with a start, the echo of the chains and cries reverberating
            through the cramped, smoke-choked upper room of the tavern. He had
            bitten through his own tongue in the night; the taste of blood was
            real, as was the dull throbbing in his chest. He spent the morning
            staring at the fire and refusing all entreaties from the townsfolk.
            When, at last, he dragged himself from next to the fire and
            staggered outside, he found the world unchanged: cold, gray, and
            indifferent. He had expected something more—a sign, perhaps—but
            instead, he was met by the same field of frostbitten mud, the same
            distant banners, the same hollowed-out faces.
          </p>
          <p>
            Perhaps, he reasoned, the dream had been nothing more than a
            grotesque burlesque conjured by his fevered mind. Perhaps he was
            finally losing himself to the rot.
          </p>
          <p>
            It was two days before he heard the first reports. A ragged merchant
            crashed through the tavern door, collapsing to his knees. His eyes
            bulged white with terror, blood vessels burst across the whites.
            "FRADINE!" he screamed, spittle flying. His pack hit the floor with
            a thud that silenced the room. "Something tore through the sky above
            us—" His words choked off as he retched bile onto the floorboards.
            "Not star. Not bird. A MAN WITH NO FLESH!" His body convulsed.
            "Wings like—like death stripped naked. BONE WINGS SCRAPING THE
            CLOUDS!" He clawed at his own face until crimson streaks appeared,
            then crumpled into a sobbing heap.
          </p>
          <p>
            Titus's blood ignited. The ancestral fire that had slaughtered
            legions of demons centuries ago roared through his diamond-hard
            veins. He seized his Warhammer, the oilcloth wrapping tearing as he
            yanked it free—and slung his battle-scarred shield across his back
            with such force the leather straps groaned. Without a word to
            anyone, he stormed into the freezing sleet, each footfall cracking
            the frozen earth beneath.
          </p>
          <p>
            The path to Fradine was a gallery of nightmares. Blackened husks of
            homes still smoldered despite the sleet. A child's doll lay
            face-down in a puddle of frozen blood. The few living children,
            thinning, bones protruding beneath stretched skin, with eyes like
            empty wells—stared at him from shadows, too ravaged by hunger to
            flee from his towering form. In the center of one razed hamlet,
            Titus halted before a woman's severed head impaled on a splintered
            fencepost. Her skull had been repeatedly smashed until brain matter
            oozed down the wood like obscene candle wax.
          </p>
          <p>
            "FUCKING TITHE REAPERS!" Titus roared, his diamond skin fracturing
            the air around him as his rage exploded. “I'LL BUTCHER EVERY LAST
            ONE OF YOU, CUNT BASTARDS!" He shouts, slamming his fist against the
            post.
          </p>
          <p>
            It was nearing dusk on the third day when he reached the outskirts
            of Fradine. The village was less a settlement than a scar—a ring of
            mud hovels and slumped barns, girdled by a ditch half-filled with
            old snow and, in places, older blood. The people here stared from
            behind shuttered windows, not even venturing outside to gawk at the
            newcomer.
          </p>
          <p>
            Titus knew this silence. It was the same suffocating quiet that had
            preceded every massacre he'd witnessed—the held breath before the
            scream. His boots squelched through the half-frozen muck as he moved
            deeper into the village, shield shifting against his back with each
            step. The stench hit him first: not the usual reek of poverty and
            livestock, but something else underneath. Sweet rot. The kind that
            crawled up your nostrils and nested there.
          </p>
          <p>
            The market square stretched before him, abandoned save for
            overturned carts and scattered grain that had begun to sprout in the
            mud, fed by something darker than rainwater. At the center, the
            well's bucket hung askew, its rope severed clean through. Dark
            stains splattered the stones around it in patterns that made his
            stomach clench—not random violence, but deliberate, made from
            suffering.
          </p>
          <p>
            His diamond skin prickled, that ancient warning singing through his
            blood. The air grew thick, pressing against his lungs like wet wool.
            Above, the clouds churned in that same unnatural spiral from his
            dream, tightening, darkening, until the dying light took on the
            quality of old brass.
          </p>
          <p>
            Then he heard it—wet breathing from behind the granary. Not human.
            Too deep, too many lungs working at once. His hand found the
            hammer's grip, leather worn smooth by generations of Granitefist
            warriors. The weight of it steadied him as he rounded the corner.
          </p>
          <p>
            The thing that had once been celestial hung suspended three feet
            above the ground, its body a blasphemy against creation itself. The
            air around it didn't just move—it convulsed violently, reality
            spasming in revulsion. Titus's arm hair ripped upward so sharply he
            felt follicles tear. Where wings should have spread in glory, bone
            frameworks jutted like broken torture implements, draped with
            membrane that wept putrid fluids with each violent spasm. A symbol
            carved into is mutilated figure, a winding spiral, beneath a crown
            covered in thorns. The temperature plummets so savagely that his
            breath crystallized mid-exhale, the moisture in his eyes beginning
            to freeze. Its flesh wasn't just decayed—it was actively decomposing
            before him, splitting open at the joints revealing absolute darkness
            within, devouring any illumination around it.
          </p>
          <p>
            It snapped toward him with a sound that shattered sanity: ten
            thousand voices obliterate simultaneously, each fragment scraping
            against bone. Its neck wrenched with such violence that vertebrae
            exploded through skin in a spray of black ichor that sizzled where
            it struck the ground. When it spoke, voices erupted from its gaping
            maw, overlapping, fighting each other for dominance—shrieks that
            made his eardrums bulge and bass tones that rattled his bowels
            inside him.
          </p>
          <p>
            “Another heir of the false light,” it shrieked. Its jaw unhinged
            with a wet, fibrous crack—tendon snapping, bone grinding—until the
            maw gaped far wider than anything living should manage. Each
            syllable spat out ropes of black corruption that clung between its
            splintered jaw and its pulsing chest, quivering like severed worms
            searching for meat, its empty sockets leaking threads of
            putrefaction down the contours of its skull.
          </p>
          <p>
            “Your ancestor’s god is severed,” it hissed. “Your prayers are
            nothing—just the lonely masturbation of a dead and meaningless
            faith.”
          </p>
          <p>
            Titus roared in defiance, swinging his hammer in a wide arc, aiming
            to crush the creature where it stood. But it seemed to shift through
            space, reappearing beside him in an instant. Its putrid hand clamped
            onto Titus's shoulder, sending waves of numbing cold racing through
            his body. Cold bled through his armor before the thing even touched
            him. When its hand finally closed on his shoulder, the pain was
            blinding: a spike of frost that plunged into bone and sent his
            muscles seizing in revolt. His vision blurred at the edges. The
            echoing voices of memories not of his own whispered nonsense in the
            back of his skull.
          </p>
          <p>
            Titus tore himself free with a snarling rage, swinging his Warhammer
            in a brutal, survival driven arc, puncturing the creature’s ribcage,
            folding its torso inward with a series of cracking pops, yet it
            didn’t recoil. It simply bent around the blow before snapping back
            into shape, its chest still caving inward in places, bones writhing
            beneath the skin like trapped serpents.
          </p>
          <p>
            It lurched toward him, its face inches from his. "When Velka
            returns," it rasped, voices tangling like discordant strings, "your
            bloodline will wither and die. Your ancestors will scream in the
            void for eternity."
          </p>
          <p>
            The proclamation drilled into Titus's mind, each syllable resonating
            through his skull. His fingers tightened around the hammer's haft
            until the leather grip creaked. "Is that so?" he growled through
            clenched teeth, "Well then, lets not keep them waiting".
          </p>
          <p>
            He unleashed another strike, the hammer's head tearing through the
            frigid air with all his fury behind it. Metal met corrupted bone
            with a hollow crack, splitting the abomination into fragmented
            shadows that immediately coalesced behind him, its decaying fingers
            tracing his nape with horrific purpose, piercing his skull. Bleeding
            poison into his thoughts. Reality fractured around Titus as his mind
            bends, the boundary between waking world and nightmare splintering
            like jagged seams of shattered glass, revealing glimpses of the Grey
            Lament seeping through Terevas's weakening barriers. The celestial’s
            teeth clicked inches from his ear. “Let me show you what your
            ancestors begged to forget.”
          </p>
          <p>
            “Show me then, you repugnant fiend!” Titus roared in defiance,
            driving his hammer backward with the entirety of his might, feeling
            the creatures bones relenting under the impact, squelching ichor
            gushing from the creatures ragged jaws. A deafening crash of thunder
            erupts from the blow, the impact sends out shockwaves of exploding
            in a radiant light around them. A sudden warmth of divine light
            covers Titus, like a mothers embrace.
          </p>
          <p>
            The creature emits a blood curdling screech as its body contorts and
            collapses on itself. The scream fading as the abomination falls to
            the ground. Divine warmth clung to Titus's skin like a summers
            sunlight. He tilts his face skyward, throat tightening. "I... I can
            feel you," he whispered into the veil where his ancestors watched.
            The sensation floods through him—a celestial tether reconnecting him
            to his Ancestral Titan and, through it, to Lathander himself. Like
            phantom nerves firing in a limb long severed, then miraculously
            restored. A single tear carved a path down his battle-worn cheek. "I
            believed you fallen with the other gods."
          </p>
          <p>
            No voice answered from the heavens, yet certainty filled him like
            wine poured into an empty chalice. His lips curved into a smile. "So
            be it then. I understand what must follow." A few glances around,
            gathering his baring’s he sets off for Halvar’s Grace for an
            inevitable confrontation.
          </p>
        </div>
      ),
    },
    {
      title: "A Melody of Blood",
      summary: "Dazrian's song of rebellion in the Iron Tusk turns into a bloody duel with the 5th Penitent Legion.",
      content: (
        <div className="chapter-text">
          <p>
            <span className="drop-cap">N</span>
            o one would suspect, stepping through the black oak doors of The
            Iron Tusk, that the warm lamplight and the din of mug-thumping
            camaraderie cloaked a mortal hazard. The entire place thrummed with
            a practiced illusion of safety, comforting to the uninitiated: the
            fire was fed regularly with cedar, infusing the taproom with a
            sweet-smoke haze; the coin-heavy regulars, in rumpled doublets and
            stained jerkins, offered a blunt, collective hum, punctuated by the
            shrieks of laughter from the barmaids whose faces were as familiar
            as the creases on a favored dice. Yet the air itself was an ambush,
            laying in wait the instant you relaxed your guard, a place where
            even the act of pissing in the shadowed water-closet carried the
            implied threat of steel wire cinching your throat until your last
            desperate blink.
          </p>
          <p>
            The Iron Tusk’s proprietor, a former pit-fighter called Juna, kept
            the surface order with the rhythm and brutality of a gladiator’s
            match, but even she could not scrub the criminal gravity from the
            air. The walls, if you looked closely enough, bristled with the
            subdermal tension of the city’s most predatory: the oyster-eyed
            cardsharps, the sandpaper-knuckled bruisers, and those who wore
            their daggers like wedding bands, never out of arm’s reach. They
            converged nightly, drawn by the promise of coin and secrets, and
            eyed each newcomer with the consideration a butcher gives a well-fed
            lamb.
          </p>
          <p>
            Amidst the clatter and the spilled ale, Dazrian Edgecorde felt the
            undercurrent instantly. He threaded through the crowd with the
            showman’s ease, playing his part—bemused, harmless,
            unthreatening—but every step was measured, every smile modulated,
            lest he invite scrutiny. He knew well that in The Iron Tusk, the
            biggest danger came not from the reckless fists or the brandished
            blades, but from the invisible web of alliances and vendettas, the
            promises made in whispers and paid in blood. The locals had a
            favorite saying: the taproom floor drank more than the customers.
          </p>
          <p>
            Tonight the tide ran especially high. Rumors skittered about the
            border, tales of a cult swelling, a black ulcer on the edge of
            Kvast, and every would-be informant with a functional tongue tried
            to barter their scraps of hearsay for a night’s credit. Dazrian
            listened, as he always listened, filtering the truth from the
            theatre. He noted the subtle shuffles, the meaningful glances, the
            sudden, nervous hush that dropped like a curtain whenever the
            conversation strayed too close to the spiral-shrouded symbol, an
            investigation Dazrian was still piecing together.
          </p>
          <p>
            The noise and smoke peeled away as Dazrian skirted the perimeter,
            eyes fixed on the rickety platform at the far end of the taproom—a
            stage only in the technical sense, cobbled together from scavenged
            planks and mismatched crates. Nails protruded at odd angles,
            remnants of a half-dozen failed repairs, and the surface bore the
            scars of too many clumsy swings from the craftsman’s hammer. It was
            a hazard, a joke, and a sacred altar to every liar or legend
            desperate enough to earn their supper in the Iron Tusk. Dazrian’s
            boots clacked across the warped boards, sending up tiny puffs of
            dust, and he stifled a grin at the incongruity. Once, in his
            father’s court, he’d performed to velvet drapes and polished marble,
            but here…here the curtain was the haze of pipeweed and the expectant
            hush of predators.
          </p>
          <p>
            There was comfort in the low expectations. No one demanded artistry
            from a tavern act, only the illusion of it—a distraction sharp
            enough to hold the room’s attention, if only long enough for someone
            else to pick a pocket or slip a poison vial into an unattended mug.
            Dazrian scanned the faces nearest the battered stage: a knot of
            sailors with tattooed knuckles, a lean man in priestly black whose
            eyes never quite focused, a sullen trio crowded around a single,
            battered bottle of whiskey. All of them looked up as he mounted the
            platform, their appetites shifting from ale to whatever bloodsport
            or spectacle he might offer.
          </p>
          <p>
            He ran a finger absently over the hilt of his father’s rapier—hidden
            beneath his cloak in defiance of local custom. It was luminous,
            forged to catch the eye as much as any blade could, but Dazrian kept
            it out of sight. This performance required a different set of
            weapons. A flick of his wrist produced a lute from the burlap sack
            at his hip, the instrument’s back patched with leather and the frets
            stained with a century of sweat and spilled spirits. He angled it
            under the lamplight, tuning pegs creaking in protest, and let the
            anticipation build as he adjusted the battered stool and surveyed
            his audience one last time.
          </p>
          <p>
            They were restless tonight. He could feel it in the way the barmaids
            lingered near the hearth, in the silence that built at the edge of
            each joke, and in the way the regulars clutched their tankards with
            knuckles gone pale. Something was coming, and it wasn’t just the
            rumors. Dazrian set his boot atop the lowest rung of the stool,
            twisted the lute’s body against his chest, and let his voice drop
            into the hush like the first pebble into a well. He knew every eye
            was on him, some hoping for a tune worth humming, others for a
            mistake they could use as leverage or blackmail. Either way, he was
            the center of the world—and for the next few minutes, that would be
            enough.
          </p>
          <p>
            The Iron Tusk punished hesitation. Dazrian's fingers found the
            strings, his voice rising above the clamor: "Gather 'round, you
            scarred-knuckle rovers, You shadow-eyed hunters of coin— Lift your
            cups and still your tongues, For this ballad bears a burden."
          </p>
          <p>
            The tavern's rumble faded as Dazrian began to sing. "From Hollowfen
            came a soldier once, His soul a battlefield after war, Eyes cold as
            northern stone, Heart sewn shut from trauma shone." "He loved a
            maiden by the rushing ford, Her hair like embers caught in wind, Who
            promised through storm and slaughter To await his mud-caked boots'
            return."
          </p>
          <p>
            The melody silenced even the flies buzzing above spilled ale. The
            barkeep's rag circled the same tankard endlessly; his eyes fixed on
            nothing while emotions stirred somewhere beneath his ribs. "But fate
            cuts deeper than any soldier's blade; When he limped home from
            death's abrade, His river-maiden gone from the world, Leaving
            bloodshot eyes and a heart as dark as coal." “The lass all alone,
            Shadows came in the night, For the soldier sent off, the Kings war
            to fight.” "No headstone guards her memory, No marker bears her
            name, Just reeds that bend in evening wind, A world forever crooked,
            a heart forever drained."
          </p>
          <p>
            "So, he tracked the shadows that took her breath, Hunted them beyond
            map's edge and reason's reach, Through forests weeping sap and
            broken halls of stone, Each kill paid a debt, each death a promise
            kept." "Yet when the last shadow fell, The hollow did remain For the
            two souls were braided together, the memory of love, now with the
            slain” "He wanders still, chest empty as a beggar's purse, Flesh a
            shroud for what once lived, Humming softly her water-song that once
            called him home." "So listen close, you battered hearts, You men of
            fractured bone— Love's a war where victory can’t be won." "To
            Hollowfen! To the lass of rivers-light! To every calloused hand that
            reaches for ghosts with all their might!" "Remember this when the
            day is done. Grief is but a melody… Waiting to be sung”
          </p>
          <p>
            The final note lingered like smoke, suspended in the tavern's thick
            air. For three heartbeats, not a mug clinked, not a boot scraped the
            floor. Then the Iron Tusk shuddered with thunder—fists pounding
            tables, voices rising in hoarse appreciation. Dazrian watched
            weathered faces transform, saw scarred hands wiping at eyes when
            they thought no one was looking. His melody had found cracks in
            their armor, seeping into places these hardened souls had walled off
            long ago.
          </p>
          <p>
            For a fraction of a heartbeat, the Iron Tusk felt timeless—everyone,
            from the gray-bearded regular who hadn't left his stool in five
            winters to the trembling courier clutching his first mug, bound by a
            shared ache. It was a rare thing in Kvast: a roomful of strangers,
            mourning lost lovers and dead friends in unison, swept together by
            the song's gentle violence. Even the barmaids paused, tankards
            suspended mid-pour, as the final chord hung in the thick haze of
            lamp smoke and pipeweed. Only the fire dared speak, popping and
            settling, as if it too grieved something it could not name.
          </p>
          <p>
            Then, as if the universe resented the calm, the doors of the Iron
            Tusk were flung open with a violence that snapped the spell in two.
            The frigid wind roared in first, scattering loose coins and candle
            stubs across the floor, and a second later came the messenger: a
            boy, no more than fourteen, white-eyed and blood-streaked, his voice
            already hoarse from screaming. “Reapers! Reapers are here!” The
            shriek was ragged, not the melodramatic wail of drunks stirring
            trouble but animal panic, the sound of a thing cornered by something
            it had only ever heard about in warning tales. For a half-second, no
            one moved—then the name rippled through the taproom like a thrown
            dagger, and the stillness burst into chaos.
          </p>
          <p>
            The Tithe Reapers. Their mere mention made mothers clutch their
            children closer and hardened veterans flee. These
            crimson-and-white-cloaked executioners of the 5th Penitent Legion
            served as the Crown's merciless scalpel, cutting away what
            Saint-King Halvar deemed impure. Eighteen years had passed since The
            Cleansing, when entire villages vanished overnight, leaving only
            blood-painted spirals on thresholds as testament. The tales still
            circulated in hushed tones—of priests hanging inverted from
            makeshift crosses, their theological crimes purged drop by bloody
            drop; of families dragged screaming from homes for harboring
            forbidden icons; of Halvarism's bloody ascension as Thaldrenne's
            sole permissible faith. Women were deemed vessels of impurity under
            Halvar's doctrine, though anyone with eyes could see the doctrine
            stemmed from the King's own inadequacies. The royal proclamations
            never mentioned his rumored impotence, of course—but the viciousness
            with which the Reapers enforced the laws against women spoke volumes
            about what truly haunted the throne. Unable to produce an heir, the
            whole land prayed to live long enough to see the Halvar bloodline
            fade.
          </p>
          <p>
            Kvast had clung to the notion that border towns might be spared,
            that the Crown’s terrible justice would halt at the fringe of
            civilization. Most of the Iron Tusk’s current patrons were living
            proof of that gamble—runaways, defectors, thieves who thought an
            extra day’s ride west would blunt the edge of royal retribution. Now
            the last of their illusions evaporated, replaced by the animal logic
            of self-preservation.
          </p>
          <p>
            The tavern became a hive of panic: chairs overturned, tables upended
            for makeshift barricades, tankards and knives snatched up without
            thought. Some of the more practiced criminals melted into the
            shadows, using the confusion to slip through back corridors or up
            the narrow servant’s stair that led to the rats’ nest of crawlspaces
            above the main floor. Others, frozen by dread or too drunk to
            function, simply dropped to their knees and began to pray—some to
            the sanctioned gods, some to whatever happened to be listening.
            Dazrian stood perfectly still on his stage dissecting the terror
            around him for what it was: an old, reliable script. Calculating his
            next move he knew, the ones who ran would be ran down and trampled,
            their blood feeding the grim reputation of the Reapers. The ones who
            hid would be found, dragged into the street for public demonstration
            along with whoever else they deemed unclean. Those who tried to
            resist would die quickly, if they were lucky. The rest would watch,
            remember, and never forget the lesson.
          </p>
          <p>
            He scanned the crowd, calibrating his next move. The rough mercenary
            in the back had gone white as a candle, clutching the table as if it
            might keep him afloat. The knot of sailors bared their teeth,
            already drawing blades, but the panic in their eyes betrayed their
            bravado. Juna, the barkeep, calmly fetched the ironwood club from
            beneath her counter—a weapon hefted as a warning, not a plan.
            Dazrian admired her composure, even as the odds of surviving the
            next hour thinned with every breath.
          </p>
          <p>
            Outside, the shrieking had sharpened, a rising pitch that meant
            blood already coated the ground. The shattered voice of the
            boy-messenger was gone, as if devoured by the snow and night,
            leaving only a handprint on the threshold and a memory of terror
            smeared across the tavern's planked floor. He lingered at the door
            for a heartbeat, listening. Beyond the wailing, there was the savage
            percussion of axe meeting wood, the howl of a woman who was being
            drug into the street for repentance, the flat report of bodies
            hitting the ground. Even the hard-faced mercenaries inside the Tusk
            fell silent, their bravado dissolving at the certainty of what
            waited outside.
          </p>
          <p>
            Dazrian’s hand went by reflex to his rapier, the muscles remembering
            every lesson drilled into him by the old man since he could walk. He
            thought of the stories: how the great Fauran Edgecorde had once held
            a bridge against a hundred men, how he had laughed as he bled, how
            he had died without ever conceding a step. Dazrian wondered whether
            any of the tales were true, or if they were just another kind of
            performance—something to be admired, even as you cursed the cost.
            Now, standing in the dusk-swallowed vestibule with the world
            collapsing outside, he knew only this: if he was to die here, it
            would be with style, with a flourish, with his name on the lips of
            at least one survivor.
          </p>
          <p>
            The Iron Tusk's door was heavy, built for sieges. Tonight it was
            pointless as a prayer. He kicked it open—no sense in sneaking
            now—and was met by a chaos more honest than any audience’s applause.
            The town center was a butcher’s stage: armored men sundered the
            crowd with pikes and swords, corralling survivors into neat,
            writhing knots. Some targets were dispatched with clinical
            efficiency; others were held just long enough for friends and family
            to watch, a lesson in futility and the price of dissent. He ducked
            low, moving through the haze—smoke from burning banners, steam
            rising from spilled guts—and picked his mark. The commander. It was
            always the commander. Find the head, cut it, and hope the body
            remembered how to run.
          </p>
          <p>
            His gaze locked onto the veteran captain at the street's center, Ser
            Draven Thane. Barely twenty, his face was an unsettlingly perfect
            mask of noble arrogance, untouched by the brutal realities that
            surrounded him. His armor gleamed in the light, a mockery of purity
            amidst the chaos. Thane stood as an island of calm in the storm,
            every command issued with pitiless precision, each gesture both a
            blessing and a curse. Dazrian felt the old resentment gnaw at his
            core—some men inherited power like sacred relics, while others had
            to tear it from the world's bleeding heart.
          </p>
          <p>
            Dazrian lunged forward through a hellscape where severed limbs that
            curled like pale worms in puddles of viscera. The first Reaper who
            blocked him had a face split by an old wound—lips permanently peeled
            back to reveal yellowed teeth in a half-skull grin. The man's
            knuckles bulged white around his pike. Dazrian feinted, and as the
            veteran lurched past, his rapier found the femoral artery. The blade
            parted flesh with a wet sucking sound, the wound gaped obscenely,
            muscle tissue gleaming pink beneath the torn breeches that released
            thick, rhythmic gouts of blood that pooled on the ground beneath
            Dazrians feet.
          </p>
          <p>
            A second Reaper charged, eyes dulled and hazy like boiled eggs in a
            face twisted with bloodlust. His spear thrust for Dazrian's sternum,
            but Dazrian dropped, feeling his palms shred on gravel and broken
            teeth scattered across the ground. Rolling up behind the man, he
            slashed through the hamstrings—the tendons separating with the sound
            of wet rope snapping. The Reaper's legs buckled backward at
            unnatural angles, with bone no longer able to support his weight
            jutted through skin as he collapsed shrieking, hands clawing
            frantically at the mud now turning to a slurry of blood and shit
            beneath him. Through it all, Dazrian's gaze remained fixed on Thane,
            even as arterial spray speckled his vision red.
          </p>
          <p>
            Each movement brought new carnage—a throat opened to reveal the
            glistening cartilage of the trachea, a single slice erupting the
            belly spilling bowels that writhed like eels on the ground. His
            sword no longer felt like metal but like a living thing extension
            thriving on the bloodlust it created. The muffled prayers of the
            dying bubbled through punctured lungs around him, frothy pink
            spittle on blue lips as they drowned in their own fluids. Guilt
            couldn't touch him here—not with the copper taste of other men's
            blood in his mouth and the wet, meaty sounds of his blade finding
            home in human flesh.
          </p>
          <p>
            Thane's eyes widened, a mix of fear and admiration coloring his
            alabaster face. Dazrian allowed more of Thane's Reapers to converge,
            relishing the metallic undertone of blood beneath the cool air. The
            first, a hulking brute, swung an axe with a murderous arc, its edge
            slicing through air and earth. Dazrian moved with elegant grace,
            slipping inside the swing, his rapier’s crossguard finding the
            tender underside of the man’s chin. Bone gave way with a sickening
            crunch, yellow teeth scattering like shattered porcelain into the
            mud. As the brute's eyes glazed over, The rapier's resistance gave
            way with a sickening glide, steel scraping bone before punching
            through the orbital cavity, like puncturing an overripe plum's skin
            before meeting the sudden hardness of its pit.
          </p>
          <p>
            The second opponent—barely sixteen, with acne craters pocking his
            cheeks—shook so violently his sword point traced figure-eights in
            the air. His first strike came wide; Dazrian sidestepped it with
            contemptuous ease. The boy lunged again, overextending. Dazrian's
            rapier flicked upward with surgical precision, the tip puncturing
            soft flesh beneath the jaw, driving through the tongue, palate, and
            into the brain pan. Blood erupted skyward with force. The boy's eyes
            rolled back to whites as his body convulsed once, twice, then
            collapsed into the mud, twitching in death throes while piss soaked
            through his breeches.
          </p>
          <p>
            Thane stepped forward, confidence mingling with a begrudging
            respect. Dazrian exhaled, embracing the tempest he'd become. In the
            square's center, they clashed, encircled by those paralyzed by fear.
            Steel met steel with the sharp, clean break of glass. Thane fought
            with disciplined fury, his heavy sword a study in efficient
            brutality. But Dazrian danced around him, his rapier a scalpel
            probing for weakness, his mind free from fear's shackles. Thane's
            greatsword whistled downward, steel keening as it missed Dazrian's
            shoulder by the width of a breath before burying itself in the mud.
            Dazrian pirouetted, his rapier's tip tracing a silver arc that
            stopped a finger's breadth from the captain's jugular, drawing a
            primal roar from the captain. Sweat stung Dazrian's eyes as he
            ducked another killing arc, feeling the wind of it part his hair.
            Thane's face contorted into something barely human—nostrils flared,
            teeth bared in a rictus of hatred, spittle flying with each
            thunderous swing that found only empty space where Dazrian had been
            heartbeats before.
          </p>
          <p>
            Finally, Thane managed to land a glancing blow, the edge of his
            blade slicing through Dazrian's breeches to open a shallow cut that
            burned like liquid fire across his outer thigh. Yet Dazrian's
            counterattack found the soft promise of flesh where Thane's greaves
            creased at the hip, the rapier's tip puncturing chainmail with a
            sound like coins falling into a well. The pristine white surcoat
            bloomed with a spreading rose of blood that darkened to burgundy at
            its edges. Desperation contorted Thane's aristocratic features into
            a feral snarl, driving him harder, his breath coming in ragged gasps
            that fogged the night air. But Dazrian anticipated each misstep,
            each wild swing revealing the gap in Thane's discipline, each
            desperate thrust an invitation to counter.
          </p>
          <p>
            Their blades collided with a metallic scream, sparks showering down
            like stars falling to earth. Dazrian felt fire in every muscle as he
            spun inside Thane's guard, grabbing the captains wrist. He felt
            bones shift and snap beneath the skin as they relented from being
            wrenched skyward. Thane opened his mouth to cry out, but no sound
            emerged as Dazrian's rapier sought and found the gap between armor
            plates. The blade sank through with elegant precision, parting
            chainmail, then flesh, then deeper still, penetrating a soft hollow
            interior. Warm blood flooded over Dazrian's knuckles in steady
            waves, each surge growing weaker than the last as Thane's life ebbed
            away beneath his hand.
          </p>
          <p>
            As Thane's eyes widened in disbelief, and confusion, Dazrian leaned
            close enough to feel the captain's final breaths warm against his
            cheek. "Hold your questions, Ser Daven, the dead receive no
            answers," he whispered, twisting his blade with deliberate slowness
            before extracting it from flesh. The captain's body slacking against
            him, before cascading to the ground.
          </p>
          <p>
            The square drowned in silence. The Reapers, recognizing their
            leader's fall, surged forward as one. Outnumbered, Dazrian spotted
            his escape a frantic, riderless horse, tethered but restless, its
            mouth frothing with panic. Vaulting onto it, he urged the beast into
            motion, casting a final glance at the lost town. Fires consumed the
            thatched rooftops, bodies lay as offerings to despair, and beyond
            the conflagration, a silhouette fought on, ironwood club in hand.
          </p>
          <p>
            Dazrian guided his mare through the dense Sivandier woods, following
            half-forgotten logger trails until her flanks heaved beneath him. He
            eased her to a trot. Her heart hammered against his calves—any
            harder and the beast might collapse. The Legion would need weeks to
            track him this far into the wilderness. With practiced hands, he
            obscured their trail using methods his father had taught him long
            ago—memories that ached he held on to in moments like these. Both
            rider and mount needed rest. Without the comfort of a fire, he
            settled against a gnarled oak, his elven ears straining against the
            forest's whispers as he slipped into his meditative trance.
          </p>
          <p>
            Cold seized him—not the night's chill, but something ancient. Chains
            rattled somewhere beyond sight. Muffled whimpers escaped from within
            restrained throats. The vision crystallized: a courtyard, its
            cobblestones permanently stained a deep rose with generations of
            spilled blood. A man knelt before him, face streaked with tears. As
            the chains grew louder the executioner raised his axe. A detail
            catches his eye. Carved into the chopping block, a blood-drawn
            sigil—a perfect spiral a crown adorned with thorns—identical to the
            marks Legion priests painted on village thresholds after their
            "cleansings."
          </p>
          <p>
            Despite the danger of returning to Thaldrenne after the bloodshed
            he'd left behind, Dazrian recognized the summons for what it was.
            Something ancient had found him, recognized his bloodline, sense his
            capabilities. Dazrian knew where he had to go. “There’s only one
            place I know that has bloodstained cobble stones like that” Anxiety
            runs through him like an arrow. “Halvar’s Grace” He says as he
            shakes his head, letting out a sighed breath followed by a chuckle
            "If they don't execute me on sight," he muttered, already plotting
            his course back.
          </p>
        </div>
      ),
    },
  ];

  // --- View: Table of Contents (TOC) ---
  if (selectedChapter === null) {
    return (
      <div className="min-h-screen bg-[#0c0a09] pt-28 pb-20 px-4 animate-[fadeIn_0.5s_ease-out]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-title font-black text-stone-200 mb-6 tracking-tighter">
              The Tome
            </h2>
            <p className="text-stone-500 font-serif-text italic text-xl max-w-2xl mx-auto">
              "The history of the Severed Realms is written in blood, ink, and
              regret. Select a chapter to witness the fall."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {chapters.map((chapter, index) => (
              <div
                key={index}
                onClick={() => setSelectedChapter(index)}
                className="group cursor-pointer relative bg-[#0f172a] border border-orange-900/30 hover:border-orange-600/50 p-8 hover:-translate-y-2 transition-all duration-300 shadow-2xl"
              >
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-orange-900/20 group-hover:border-orange-500/40 transition-colors"></div>

                <span className="block font-title text-orange-800 text-sm tracking-[0.3em] uppercase mb-4 group-hover:text-orange-600 transition-colors">
                  Chapter {index + 1}
                </span>
                <h3 className="text-2xl font-title text-stone-200 mb-4 leading-tight group-hover:text-white transition-colors">
                  {chapter.title}
                </h3>
                <p className="text-stone-500 font-serif-text text-sm leading-relaxed mb-6 border-l-2 border-stone-800 pl-4 group-hover:border-orange-900 transition-colors">
                  {chapter.summary}
                </p>
                <div className="flex items-center gap-2 text-stone-600 font-title text-xs uppercase tracking-widest group-hover:text-orange-500 transition-colors">
                  <Book size={14} /> Read Entry
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- View: Chapter Reader ---
  const chapterData = chapters[selectedChapter];

  return (
    <div className="min-h-screen bg-[#0c0a09] pt-28 pb-20 px-4 md:px-0 animate-[fadeIn_0.5s_ease-out]">
      <div className="max-w-3xl mx-auto">
        {/* Navigation Header */}
        <button
          onClick={() => setSelectedChapter(null)}
          className="flex items-center gap-2 text-stone-500 hover:text-orange-500 transition-colors mb-8 font-title tracking-widest text-sm uppercase group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to The Tome
        </button>

        {/* Reader Interface */}
        <div className="bg-[#0f172a] border border-orange-900/50 shadow-2xl relative">
          <div className="h-1 bg-orange-900 w-full"></div>
          <div className="p-8 md:p-16">
            <div className="flex justify-between items-center mb-12 text-stone-500 font-title text-xs tracking-widest uppercase">
              <span>A Dirge to the Falseblood</span>
              <span>Chapter {selectedChapter + 1}</span>
            </div>

            <h2 className="font-title text-4xl md:text-5xl text-stone-200 mb-8 text-center leading-tight">
              {chapterData.title}
            </h2>

            <Divider />

            {/* Book Layout: Justified Text, Serif Font, Relaxed Leading */}
            {chapterData.content}

            <Divider />

            {/* Footer Navigation */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-stone-800">
              <button
                onClick={() =>
                  setSelectedChapter((c) => Math.max(0, c - 1))
                }
                disabled={selectedChapter === 0}
                className={`flex items-center gap-2 text-stone-400 hover:text-white font-title text-sm tracking-widest uppercase transition-colors ${
                  selectedChapter === 0 && "opacity-20 cursor-not-allowed"
                }`}
              >
                <ArrowLeft size={14} /> Previous
              </button>
              
              <button
                onClick={() => setSelectedChapter(null)}
                className="text-orange-800 hover:text-orange-500 font-title text-xs tracking-[0.2em] uppercase transition-colors"
              >
                Index
              </button>

              <button
                onClick={() =>
                  setSelectedChapter((c) =>
                    Math.min(chapters.length - 1, c + 1)
                  )
                }
                disabled={selectedChapter === chapters.length - 1}
                className={`flex items-center gap-2 text-stone-400 hover:text-orange-500 font-title text-sm tracking-widest uppercase transition-colors ${
                  selectedChapter === chapters.length - 1 &&
                  "opacity-20 cursor-not-allowed"
                }`}
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
const App = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Hero setActiveTab={setActiveTab} />;
      case "lore":
        return <Lore />;
      case "sessions":
        return <Sessions />;
      case "novel":
        return <Novel />;
      default:
        return <Hero setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="bg-[#0c0a09] min-h-screen text-stone-200 font-body selection:bg-orange-900 selection:text-white">
      <GlobalStyles />
      
      <Navigation 
        activeTab={activeTab} 
        onNavClick={setActiveTab} 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {renderContent()}
    </div>
  );
};

// testing branch protection


export default App;