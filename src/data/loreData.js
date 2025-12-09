import { Shield, Eye, Globe, Skull, Sword } from "lucide-react";

export const LORE_DB = {
  factions: {
    title: "Factions",
    icon: Shield,
    items: [
      {
        id: "umbral_reavers",
        title: "The Umbral Reavers",
        subtitle: "Hunters of the Grey Lament",
        content: (
          <div className="space-y-12">
            {/* === AAA HERO HEADER === */}
            <div className="relative rounded-xl overflow-hidden border border-orange-900/30 bg-[#141210]">
              {/* Background gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-80 z-10"></div>
              
              <div className="relative z-20 flex flex-col md:flex-row items-center p-8 gap-8">
                {/* THE SIGIL */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-b from-orange-600 to-transparent rounded-full opacity-20 group-hover:opacity-40 blur transition duration-1000"></div>
                  <img 
                    // CHANGE THIS LINK IF YOUR VERCEL URL IS DIFFERENT
                    src="https://severed-realms-site.vercel.app/factions/reavers-sigil.png" 
                    alt="Umbral Reavers Sigil"
                    className="w-48 h-48 object-cover rounded-full border-2 border-stone-700 shadow-[0_0_30px_rgba(234,88,12,0.15)] relative z-10"
                  />
                </div>

                {/* THE MOTTO */}
                <div className="text-center md:text-left">
                  <h1 className="text-4xl md:text-5xl font-title text-stone-100 mb-2 tracking-wide">
                    The Umbral Reavers
                  </h1>
                  <div className="h-1 w-24 bg-orange-800 mx-auto md:mx-0 mb-4"></div>
                  <p className="font-serif-text italic text-orange-500/80 text-xl tracking-widest uppercase">
                    "We bleed in the grey."
                  </p>
                </div>
              </div>
            </div>

            {/* === THE LORE DOSSIER === */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Col: Main Text */}
              <div className="lg:col-span-2 space-y-6 text-lg text-stone-300 leading-relaxed font-serif-text">
                <p>
                  In the shadows of the Severed Realms, where the boundaries between
                  the material world and the Grey Lament grow thin, stand the{" "}
                  <strong className="text-orange-500">Umbral Reavers</strong>. They
                  are not knights in shining armor, but executioners in stained
                  leather and dull iron.
                </p>
                <p>
                  To join the Reavers is to forfeit one's past. Members are often
                  recruited from those who have touched the void and
                  survived—orphans of massacres, survivors of Riven encounters.
                </p>
                <div className="p-6 border-l-4 border-orange-900 bg-orange-950/10 italic text-stone-400">
                  "We do not save souls. We stop the things that eat them." 
                  <span className="block mt-2 text-sm font-title text-orange-700 not-italic">— Captain Vane</span>
                </div>
              </div>

              {/* Right Col: "Game Stats" Box */}
              <div className="bg-stone-900/40 border border-stone-800 p-6 rounded-lg h-fit">
                <h3 className="text-stone-500 text-xs font-title tracking-[0.2em] uppercase mb-4">
                  Faction Intel
                </h3>
                <ul className="space-y-4 text-sm">
                  <li className="flex justify-between border-b border-stone-800 pb-2">
                    <span className="text-stone-500">Base of Operations</span>
                    <span className="text-stone-200">Unknown</span>
                  </li>                               
                  <li className="flex justify-between border-b border-stone-800 pb-2">
                    <span className="text-stone-500">Allegiance</span>
                    <span className="text-stone-200">None</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* === HIERARCHY / MEMBERS GRID === */}
            <div>
              <h2 className="text-2xl font-title text-stone-200 mb-6 flex items-center gap-3">
                <Shield className="text-orange-700" size={24} /> Known Operatives
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* CARD 1: VANE */}
                <div className="group relative bg-[#1a1a1a] p-6 border border-stone-800 hover:border-red-900 transition-all overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Skull size={60} />
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-title text-stone-200">Captain Vane</h4>
                    <span className="px-2 py-1 bg-red-900/20 border border-red-900/50 text-red-500 text-[10px] uppercase tracking-wider font-bold">
                      Deceased
                    </span>
                  </div>
                  <p className="text-sm text-stone-500 mb-4">Unit Commander</p>
                  <p className="text-sm text-stone-400 leading-relaxed">
                    Sacrificed to the infernal engine by Arathus. His soul is likely lost..
                  </p>
                </div>

                {/* CARD 2: MIRA */}
                <div className="group relative bg-[#1a1a1a] p-6 border border-stone-800 hover:border-red-900 transition-all overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Skull size={60} />
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-title text-stone-200">Mira</h4>
                    <span className="px-2 py-1 bg-red-900/20 border border-red-900/50 text-red-500 text-[10px] uppercase tracking-wider font-bold">
                      Terminated
                    </span>
                  </div>
                  <p className="text-sm text-stone-500 mb-4">Scout / Vanguard</p>
                  <p className="text-sm text-stone-400 leading-relaxed">
                    Subjected to the Riven transformation. Put down by the party near Voss Farm.
                  </p>
                </div>

                {/* CARD 3: THALIA */}
                <div className="group relative bg-[#1a1a1a] p-6 border border-stone-800 hover:border-emerald-900 transition-all overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Shield size={60} />
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-title text-stone-200">Thalia Greycut</h4>
                    <span className="px-2 py-1 bg-emerald-900/20 border border-emerald-900/50 text-emerald-500 text-[10px] uppercase tracking-wider font-bold">
                      Active
                    </span>
                  </div>
                  <p className="text-sm text-stone-500 mb-4">Investigator</p>
                  <p className="text-sm text-stone-400 leading-relaxed">
                    Currently operating in Halvar's Grace. Seeking answers regarding Vane's disappearance.
                  </p>
                </div>

              </div>
            </div>
          </div>
        ),
      },
      {
        id: "sanguine_court",
        title: "The Sanguine Court",
        subtitle: "Aristocracy of the Night",
        content: (
          <p>
            A cabal of vampire aristocrats who believe the Falseblood curse is a
            divine gift. They rule the lower districts with velvet gloves hiding
            iron claws.
          </p>
        ),
      },
    ],
  },
  pantheon: {
    title: "Pantheon",
    icon: Eye,
    items: [
      {
        id: "gods_overview",
        title: "The Silent Gods",
        subtitle: "Divinity in the Severed Realms",
        content: (
          <>
            <p>
              The gods of Dungeons & Dragons exist here, but they are distant,
              their voices muffled by the metaphysical shroud that covers the
              realm. Clerics pray, but receive only whispers.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-stone-900/50 p-4 border border-stone-800">
                <strong className="text-orange-500 block text-lg font-title">
                  The Raven Queen
                </strong>
                <span className="text-sm text-stone-500">Matron of Death</span>
                <p className="text-sm mt-2">
                  The most active deity in the Severed Realms. She views the
                  Falseblood curse as an abomination of undeath.
                </p>
              </div>
              <div className="bg-stone-900/50 p-4 border border-stone-800">
                <strong className="text-stone-300 block text-lg font-title">
                  Pelor
                </strong>
                <span className="text-sm text-stone-500">The Dawn Father</span>
                <p className="text-sm mt-2">
                  His light is dim here. Worshipped by farmers hoping for a
                  harvest that isn't grey ash.
                </p>
              </div>
              <div className="bg-stone-900/50 p-4 border border-stone-800">
                <strong className="text-red-700 block text-lg font-title">
                  Asmodeus
                </strong>
                <span className="text-sm text-stone-500">Lord of the Nine</span>
                <p className="text-sm mt-2">
                  His influence grows as desperation rises. House Thane is
                  rumored to traffic with his devils.
                </p>
              </div>
              <div className="bg-stone-900/50 p-4 border border-stone-800">
                <strong className="text-stone-300 block text-lg font-title">
                  Bahamut
                </strong>
                <span className="text-sm text-stone-500">
                  The Platinum Dragon
                </span>
                <p className="text-sm mt-2">
                  A symbol of justice, though his temples are crumbling.
                  Paladins of Bahamut are rare and hunted.
                </p>
              </div>
              <div className="bg-stone-900/50 p-4 border border-stone-800">
                <strong className="text-emerald-700 block text-lg font-title">
                  Melora
                </strong>
                <span className="text-sm text-stone-500">The Wild Mother</span>
                <p className="text-sm mt-2">
                  She weeps for the corrupted forests. The beast-folk of the
                  Southern Wastes still hear her cry.
                </p>
              </div>
              <div className="bg-stone-900/50 p-4 border border-stone-800">
                <strong className="text-purple-700 block text-lg font-title">
                  The Chained God (Tharizdun)
                </strong>
                <span className="text-sm text-stone-500">
                  Entropy Incarnate
                </span>
                <p className="text-sm mt-2">
                  Some say the Severing was his doing. Cults dedicated to him
                  are purged on sight.
                </p>
              </div>
            </div>
          </>
        ),
      },
    ],
  },
  world: {
    title: "World",
    icon: Globe,
    items: [
      {
        id: "eldrathor",
        title: "Eldrathor",
        subtitle: "The Gold Standard",
        content: (
          <p className="mb-4">
            A prosperous kingdom untouched by the Severance. Its capital, Rathmere a bastion of culture and wealth.
            Their armies are said to be equipped with gold-forged weapons that can harm even the Gods themselves.
            Never experiencing defeat in battle, Eldrathor is often sought after as an ally by other realms.
            18 years ago, a blight began to spread through the kingdom, perpetualy turning the lands into a rotting wasteland.
            
          
            
          </p>
        ),
      },
      {
        id: "thaldrenne",
        title: "The Kingdom of Thaldrenne",
        subtitle: "Industry. Penitence. Order.",
        content: (
          <>
            <blockquote className="border-l-2 border-orange-800 pl-4 italic text-stone-500 my-4 text-xl font-serif-text">
              "We suffer, that the world may spin. We bleed, that the sun may
              rise. We prevent the rot."
            </blockquote>

            <p className="mb-4">
              Thaldrenne is not merely a kingdom; it is a fortress of ideology
              constructed upon the smoking ruins left by the Severance. When the
              gods were forced to withdraw their voices from the world, chaos
              threatened to consume the mortal realm. It was then that the{" "}
              <strong className="text-orange-500">Halvar line</strong> rose,
              seizing the vacuum of power to declare a harsh, terrifying
              revelation: <em>Chose your patron celestial or be discarded.</em>
            </p>
            <p className="mb-4">
              Now, Thaldrenne stands as a theocratic police state, a grim
              monument to{" "}
              <span className="text-stone-300">Industry and Penitence</span>. It
              is a society that believes its collective suffering is the only
              that the Saint-King does not truly age. Some claim to have seen him eighteen years prior, unchanged—same pallid skin, same burning eyes. Others swear he was ancient even before The Cleansing, a man who had already lived three lifetimes. The whispers grow louder in taverns where ale loosens tongues: perhaps Halvar made a pact with something older than the gods themselves. Perhaps the Severance was not a catastrophe he merely exploited, but one he orchestrated. And perhaps—this is the whisper that gets men disappeared—perhaps the King is not entirely human anymore. Perhaps he never was.
              fuel strong enough to keep the apocalypse at bay.
            </p>

            <h3 className="text-xl font-title text-orange-700 mt-8 mb-4 border-l-2 border-orange-900 pl-4">
              I. The Iron Rain & The Grey Lament
            </h3>
            <p className="mb-4">
              <strong className="text-stone-300">The Iron Rain:</strong> When it
              rains in Thaldrenne, the precipitation slicks the blood strained
              cobblestones in a greasy sheen that smells of wet iron and old
              blood.
            </p>
            <p className="mb-4">
              <strong className="text-stone-300">The Grey Lament:</strong> A
              fragile, shimmering barrier holds back the raw, unraveling force
              of the Void. Every citizen is taught from birth that dissent
              creates cracks in this barrier. To question the Crown is not just
              treason; it is an act of cosmic suicide.
            </p>

            <h3 className="text-xl font-title text-orange-700 mt-8 mb-4 border-l-2 border-orange-900 pl-4">
              II. The Saint-King and the Edicts
            </h3>
            <p className="mb-4">
              Upon the <span className="text-stone-300">Alabaster Throne</span>{" "}
              sits{" "}
              <strong className="text-orange-500">
                Saint-King Ludo Halvar IV
              </strong>
              . To look upon him is to see something unnervingly timeless.
              Possessed of an uncanny longevity, he has outlived generations of
              his own council, his skin pale as parchment, his eyes burning with
              a fervor that many claim is the lingering spark of the departed
              gods.
            </p>
            <div className="bg-stone-900/50 p-6 border border-stone-800 my-6 rounded-sm">
              <p className="mb-4">
                <strong className="text-orange-600 font-title uppercase tracking-wider">
                  The Living Bridge:
                </strong>{" "}
                Halvar is viewed not merely as a ruler, but as the tether
                between the mortal earth and the silent heavens. He governs
                through distance and draconian edicts, rarely speaking directly
                to the common folk, enhancing his mythic status.
              </p>

              <p>
                <strong className="text-orange-600 font-title uppercase tracking-wider">
                  The Edicts of Purity:
                </strong>{" "}
                These laws are the shackles of the populace. They dictate that
                "unclean" citizens—those who fail to meet quotas, those born of
                wrong lineage, or those who question the church—are stripped of
                all rights. Their suffering is canonized; their starvation is
                framed as a "sacred fasting" that strengthens the Grey Lament.
              </p>
            </div>

            <h3 className="text-xl font-title text-orange-700 mt-8 mb-4 border-l-2 border-orange-900 pl-4">
              III. The Cleansing (18 Years Ago)
            </h3>
            <p className="mb-4">
              Eighteen years ago, the streets of Thaldrenne ran red in an event
              now whispered of as The Cleansing. While official history records
              it as a holy purge of heretics and false worshippers, the
              survivors know it as the week the Crown solidified its absolute
              tyranny.
            </p>
            <ul className="space-y-4 mb-4 text-stone-400 mt-4">
              <li className="flex gap-4">
                <span className="text-red-800 mt-1">
                  <Skull size={16} />
                </span>
                <div>
                  <strong className="text-stone-200 block mb-1">
                    The Blood March
                  </strong>
                  For three days, state-sanctioned slaughter was law. The
                  cobblestones of the main thoroughfare were submerged in gore
                  so deep it rushed over the ankles of the executioners. To this
                  day, the stones of the "Blood March" bear a dark, rusty stain
                  that no amount of scrubbing can remove.
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-red-800 mt-1">
                  <Skull size={16} />
                </span>
                <div>
                  <strong className="text-stone-200 block mb-1">
                    The Rose Sands
                  </strong>
                  The tide of blood was so voluminous it drained into the bay,
                  turning the pristine white beaches into a horrifying,
                  permanent crimson. The "Rose Sands" serve as a grim reminder:
                  the ocean itself remembers the dead.
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-red-800 mt-1">
                  <Skull size={16} />
                </span>
                <div>
                  <strong className="text-stone-200 block mb-1">
                    The Fall of Women & House Druseth
                  </strong>
                  The Cleansing was also a distinct misogynistic coup. Women
                  were legally declared "impure vessels," stripped of land,
                  inheritance, and status, reducing them to second-class
                  subjects or chattel. Noble houses that resisted this radical
                  theology, most notably the ancient and proud{" "}
                  <span className="text-orange-500">House Druseth</span>, were
                  eradicated. Their estates were burned, their lineage struck
                  from the archives, and their heads spiked upon the walls of
                  Halvar’s Grace.
                </div>
              </li>
            </ul>

            <h3 className="text-xl font-title text-orange-700 mt-8 mb-4 border-l-2 border-orange-900 pl-4">
              IV. The Enforcers of the State
            </h3>
            <p className="mb-6">
              Thaldrenne’s unity is maintained through a stranglehold of fear,
              orchestrated by two key powers that rose from the ashes of The
              Cleansing.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-stone-900/40 p-4 border border-stone-800 hover:border-red-900 transition-colors">
                <h4 className="text-lg font-title text-stone-200 mb-2 flex items-center gap-2">
                  <Sword size={16} className="text-red-600" /> The Tithe Reapers
                </h4>
                <p className="text-sm mb-2 text-stone-500 uppercase tracking-widest">
                  5th Penitent Legion
                </p>
                <p className="text-sm mb-4">
                  Clad in pristine white plate armor draped with crimson-trimmed
                  cloaks. They do not act as guards; they act as hunters. Under
                  the command of the ruthless{" "}
                  <strong className="text-orange-500">Mox Kessig</strong>, they
                  "collect" tithes of flesh. Those taken are presumably fed into
                  the grinding machinery of the state’s secret prisons.
                </p>
              </div>

              <div className="bg-stone-900/40 p-4 border border-stone-800 hover:border-red-900 transition-colors">
                <h4 className="text-lg font-title text-stone-200 mb-2 flex items-center gap-2">
                  <Shield size={16} className="text-red-600" /> House Thane
                </h4>
                <p className="text-sm mb-2 text-stone-500 uppercase tracking-widest">
                  The Wardens
                </p>
                <p className="text-sm mb-4">
                  While House Druseth fell, House Thane ascended. As the
                  "favored stewards," they control the logistics of oppression.
                  They oversee the high roads, the fortification walls, and the
                  trade routes. While the King rules the soul of Thaldrenne,
                  House Thane owns its body.
                </p>
              </div>
            </div>
          </>
        ),
      },
      {
        id: "aldahan",
        title: "Aldahan",
        subtitle: "The Spire of Whispers",
        content: (
          <p>
            A city-state ruled by magi. Magic here is volatile, often costing
            the caster a piece of their sanity. The libraries of Aldahan are
            forbidden to outsiders.
          </p>
        ),
      },
      {
        id: "sivandier",
        title: "Sivandier",
        subtitle: "The Weeping Woods",
        content: (
          <p>
            Once the home of the Elves, now a twisted labyrinth of fungal
            growths and carnivorous flora. The trees remember the old wars, and
            they hold grudges.
          </p>
        ),
      },
      {
        id: "mystfell",
        title: "Mystfell",
        subtitle: "The Shadow Port",
        content: (
          <p>
            A coastal region shrouded in perpetual fog. Ships arrive here from
            nowhere, carrying cargo that shouldn't exist.
          </p>
        ),
      },
      {
        id: "southern_wastes",
        title: "The Southern Wastes",
        subtitle: "Graveyard of Empires",
        content: (
          <p>
            A vast desert of grey ash. Ruins of a civilization that predates the
            gods jut from the dunes like broken teeth.
          </p>
        ),
      },
    ],
  },
  bestiary: {
    title: "Bestiary",
    icon: Skull,
    items: [
      {
        id: "mira",
        title: "Mira, The Weeping Reaver",
        subtitle: "Mutated Humanoid / Monstrosity",
        content: (
          <>
            {/* 1. Metadata Tags */}
            <div className="flex gap-2 mb-6">
              <span className="bg-red-900/30 text-red-500 px-2 py-1 text-xs font-bold uppercase border border-red-900">
                Deceased
              </span>
              <span className="bg-stone-900/30 text-stone-500 px-2 py-1 text-xs font-bold uppercase border border-stone-800">
                Challenge Rating: 3
              </span>
            </div>

            {/* 2. The Digital Homebrewery Page (Frame Removed) */}
            <div className="flex justify-center mb-8">
              <img 
                src="/monsters/mira-page.png" 
                alt="Mira, The Weeping Reaver Stat Block" 
                // This shadow gives it the 'floating paper' look without the box border
                className="w-full max-w-[850px] h-auto rounded shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
              />
            </div>

            {/* 3. The Preserved Encounter Log */}
            <div className="border-t border-stone-800 pt-6">
              <h3 className="text-xl font-title text-orange-700 mb-4 flex items-center gap-2">
                <Skull size={20} /> Encounter Log
              </h3>
              <p className="text-stone-400 leading-relaxed">
                Slain by the party in the woods near the Voss Farm. Her head was
                taken as proof of the deed.
              </p>
            </div>
          </>
        ),
      },
      // === START CREATURE ENTRY ===
      {
        id: "unique_creature_id",  // MUST be unique (e.g., "blood_wolf")
        title: "Creature Name",
        subtitle: "Type (e.g. Undead) / Challenge Rating: X",
        content: (
          <>
            {/* TAGS ROW */}
            <div className="flex gap-2 mb-4">
              <span className="bg-red-900/30 text-red-500 px-2 py-1 text-xs font-bold uppercase border border-red-900">
                Hostile
              </span>
              <span className="bg-stone-900/30 text-stone-500 px-2 py-1 text-xs font-bold uppercase border border-stone-800">
                AC: 14
              </span>
              <span className="bg-stone-900/30 text-stone-500 px-2 py-1 text-xs font-bold uppercase border border-stone-800">
                HP: 45
              </span>
            </div>

            {/* MAIN DESCRIPTION */}
            <p>
              A evocative description of the creature. What does it look like? 
              Does it smell of rot? Do its eyes glow? 
              <em className="text-stone-500"> "Flavor text or quote can go here."</em>
            </p>

            {/* ABILITIES / TACTICS SECTION */}
            <h3 className="text-xl font-title text-stone-200 mt-6">
              Combat Tactics
            </h3>
            <p>
              <strong>Pack Tactics.</strong> The creature has advantage on an attack roll against a creature if at least one of the creature's allies is within 5 feet.
            </p>
            <p className="mt-2">
              <strong>Multiattack.</strong> The creature makes two attacks: one with its bite and one with its claws.
            </p>

            {/* LOOT SECTION */}
            <h3 className="text-xl font-title text-stone-200 mt-6">
              Harvest / Loot
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-stone-400">
              <li><strong className="text-stone-300">Pelt:</strong> Worth 15gp if undamaged.</li>
              <li><strong className="text-stone-300">Teeth:</strong> Used in occult rituals.</li>
            </ul>
          </>
        ),
      },
      // === END CREATURE ENTRY ===
    ],
  },
};
