import React from 'react';
import { Shield, Eye, Globe, Skull, Sword } from 'lucide-react';

// NOTE: This is the full Grimoire (page) database.
// Tooltip (inline) lore is kept separate in `src/data/loreData.js`.
const GRIMOIRE_DB = {
  factions: {
    title: 'Factions',
    icon: Shield,
    items: [
      {
        id: 'umbral_reavers',
        title: 'The Umbral Reavers',
        subtitle: 'Hunters of the Grey Lament',
        content: (
          <>
            <p>
              In the shadows of the Severed Realms, where the boundaries between the
              material world and the Grey Lament grow thin, stand the{' '}
              <strong className="text-orange-500">Umbral Reavers</strong>. They are not
              knights in shining armor, but executioners in stained leather and dull iron.
            </p>
            <h3 className="text-xl font-title text-stone-200 mt-6">The Creed of Silence</h3>
            <p>
              To join the Reavers is to forfeit one's past. Members are often recruited
              from those who have touched the void and survived—orphans of massacres,
              survivors of the Falseblood curse, or disgraced soldiers seeking redemption.
              Their creed is simple: <em>"Silence the scream before it wakes the world."</em>
            </p>
            <h3 className="text-xl font-title text-stone-200 mt-6">Methods &amp; Sigils</h3>
            <p>
              Reavers utilize specialized weaponry forged with <strong>Null-Iron</strong>,
              a metal that disrupts magical frequencies. They are known to carry heavy iron
              sigils that serve as both identification and magical dampeners.
            </p>
            <blockquote className="border-l-2 border-orange-800 pl-4 italic text-stone-500 my-4">
              "We do not save souls. We stop the things that eat them." — Reaver Captain Vane
            </blockquote>
          </>
        ),
      },
      {
        id: 'sanguine_court',
        title: 'The Sanguine Court',
        subtitle: 'Aristocracy of the Night',
        content: (
          <p>
            A cabal of vampire aristocrats who believe the Falseblood curse is a divine gift.
            They rule the lower districts with velvet gloves hiding iron claws.
          </p>
        ),
      },
    ],
  },
  pantheon: {
    title: 'Pantheon',
    icon: Eye,
    items: [
      {
        id: 'gods_overview',
        title: 'The Silent Gods',
        subtitle: 'Divinity in the Severed Realms',
        content: (
          <>
            <p>
              The gods of Dungeons &amp; Dragons exist here, but they are distant, their voices
              muffled by the metaphysical shroud that covers the realm. Clerics pray, but receive
              only whispers.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-stone-900/50 p-4 border border-stone-800">
                <strong className="text-orange-500 block text-lg font-title">The Raven Queen</strong>
                <span className="text-sm text-stone-500">Matron of Death</span>
                <p className="text-sm mt-2">
                  The most active deity in the Severed Realms. She views the Falseblood curse as an
                  abomination of undeath.
                </p>
              </div>
              <div className="bg-stone-900/50 p-4 border border-stone-800">
                <strong className="text-stone-300 block text-lg font-title">Pelor</strong>
                <span className="text-sm text-stone-500">The Dawn Father</span>
                <p className="text-sm mt-2">His light is dim here. Worshipped by farmers hoping for a harvest that isn't grey ash.</p>
              </div>
              <div className="bg-stone-900/50 p-4 border border-stone-800">
                <strong className="text-red-700 block text-lg font-title">Asmodeus</strong>
                <span className="text-sm text-stone-500">Lord of the Nine</span>
                <p className="text-sm mt-2">His influence grows as desperation rises. House Thane is rumored to traffic with his devils.</p>
              </div>
              <div className="bg-stone-900/50 p-4 border border-stone-800">
                <strong className="text-stone-300 block text-lg font-title">Bahamut</strong>
                <span className="text-sm text-stone-500">The Platinum Dragon</span>
                <p className="text-sm mt-2">A symbol of justice, though his temples are crumbling. Paladins of Bahamut are rare and hunted.</p>
              </div>
              <div className="bg-stone-900/50 p-4 border border-stone-800">
                <strong className="text-emerald-700 block text-lg font-title">Melora</strong>
                <span className="text-sm text-stone-500">The Wild Mother</span>
                <p className="text-sm mt-2">She weeps for the corrupted forests. The beast-folk of the Southern Wastes still hear her cry.</p>
              </div>
              <div className="bg-stone-900/50 p-4 border border-stone-800">
                <strong className="text-purple-700 block text-lg font-title">The Chained God (Tharizdun)</strong>
                <span className="text-sm text-stone-500">Entropy Incarnate</span>
                <p className="text-sm mt-2">Some say the Severing was his doing. Cults dedicated to him are purged on sight.</p>
              </div>
            </div>
          </>
        ),
      },
    ],
  },
  world: {
    title: 'World',
    icon: Globe,
    items: [
      {
        id: 'eldrathor',
        title: 'Eldrathor',
        subtitle: 'The Gilded Cage',
        content: (
          <p>
            The capital kingdom, seat of the High King. It is a place of golden spires and rotting
            foundations, where the nobility feasts while the poor turn to dust.
          </p>
        ),
      },
      {
        id: 'thaldrenne',
        title: 'The Kingdom of Thaldrenne',
        subtitle: 'Industry. Penitence. Order.',
        content: (
          <>
            <blockquote className="border-l-2 border-orange-800 pl-4 italic text-stone-500 my-4 text-xl font-serif-text">
              "We suffer, that the world may spin. We bleed, that the sun may rise. We prevent the rot."
            </blockquote>
            <p className="mb-4">
              Thaldrenne is not merely a kingdom; it is a fortress of ideology constructed upon the
              smoking ruins left by the Severance. When the gods were forced to withdraw their voices
              from the world, chaos threatened to consume the mortal realm.
            </p>
            <p className="mb-4">
              Now, Thaldrenne stands as a theocratic police state, a grim monument to{' '}
              <span className="text-stone-300">Industry and Penitence</span>.
            </p>
            <h3 className="text-xl font-title text-orange-700 mt-8 mb-4 border-l-2 border-orange-900 pl-4">
              I. The Iron Rain &amp; The Grey Lament
            </h3>
            <p className="mb-4">
              <strong className="text-stone-300">The Iron Rain:</strong> When it rains in Thaldrenne, the
              precipitation slicks the blood strained cobblestones in a greasy sheen that smells of wet iron
              and old blood.
            </p>
            <p className="mb-4">
              <strong className="text-stone-300">The Grey Lament:</strong> A fragile, shimmering barrier holds back
              the raw, unraveling force of the Void.
            </p>
            <h3 className="text-xl font-title text-orange-700 mt-8 mb-4 border-l-2 border-orange-900 pl-4">
              II. The Saint-King and the Edicts
            </h3>
            <p className="mb-4">
              Upon the <span className="text-stone-300">Alabaster Throne</span> sits{' '}
              <strong className="text-orange-500">Saint-King Ludo Halvar IV</strong>.
            </p>
            <div className="bg-stone-900/50 p-6 border border-stone-800 my-6 rounded-sm">
              <p className="mb-4">
                <strong className="text-orange-600 font-title uppercase tracking-wider">The Living Bridge:</strong> Halvar is viewed as the tether
                between the mortal earth and the silent heavens.
              </p>
              <p>
                <strong className="text-orange-600 font-title uppercase tracking-wider">The Edicts of Purity:</strong> These laws dictate that "unclean" citizens
                are stripped of all rights.
              </p>
            </div>
            <h3 className="text-xl font-title text-orange-700 mt-8 mb-4 border-l-2 border-orange-900 pl-4">
              III. The Cleansing (18 Years Ago)
            </h3>
            <p className="mb-4">Eighteen years ago, the streets of Thaldrenne ran red in an event now whispered of as The Cleansing.</p>
            <ul className="space-y-4 mb-4 text-stone-400 mt-4">
              <li className="flex gap-4">
                <span className="text-red-800 mt-1">
                  <Skull size={16} />
                </span>
                <div>
                  <strong className="text-stone-200 block mb-1">The Blood March</strong>
                  For three days, state-sanctioned slaughter was law.
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-red-800 mt-1">
                  <Skull size={16} />
                </span>
                <div>
                  <strong className="text-stone-200 block mb-1">The Rose Sands</strong>
                  The tide of blood drained into the bay, turning beaches crimson.
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-red-800 mt-1">
                  <Skull size={16} />
                </span>
                <div>
                  <strong className="text-stone-200 block mb-1">The Fall of Women &amp; House Druseth</strong>
                  Women were legally declared "impure vessels" and stripped of rights.
                </div>
              </li>
            </ul>
            <h3 className="text-xl font-title text-orange-700 mt-8 mb-4 border-l-2 border-orange-900 pl-4">
              IV. The Enforcers of the State
            </h3>
            <p className="mb-6">Thaldrenne's unity is maintained through a stranglehold of fear.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-stone-900/40 p-4 border border-stone-800 hover:border-red-900 transition-colors">
                <h4 className="text-lg font-title text-stone-200 mb-2 flex items-center gap-2">
                  <Sword size={16} className="text-red-600" /> The Tithe Reapers
                </h4>
                <p className="text-sm mb-2 text-stone-500 uppercase tracking-widest">5th Penitent Legion</p>
                <p className="text-sm mb-4">Clad in pristine white plate armor draped with crimson-trimmed cloaks.</p>
              </div>
              <div className="bg-stone-900/40 p-4 border border-stone-800 hover:border-red-900 transition-colors">
                <h4 className="text-lg font-title text-stone-200 mb-2 flex items-center gap-2">
                  <Shield size={16} className="text-red-600" /> House Thane
                </h4>
                <p className="text-sm mb-2 text-stone-500 uppercase tracking-widest">The Wardens</p>
                <p className="text-sm mb-4">They oversee the high roads, the fortification walls, and the trade routes.</p>
              </div>
            </div>
          </>
        ),
      },
      {
        id: 'aldahan',
        title: 'Aldahan',
        subtitle: 'The Spire of Whispers',
        content: (
          <p>
            A city-state ruled by magi. Magic here is volatile, often costing the caster a piece of their sanity.
            The libraries of Aldahan are forbidden to outsiders.
          </p>
        ),
      },
      {
        id: 'sivandier',
        title: 'Sivandier',
        subtitle: 'The Weeping Woods',
        content: (
          <p>
            Once the home of the Elves, now a twisted labyrinth of fungal growths and carnivorous flora.
            The trees remember the old wars, and they hold grudges.
          </p>
        ),
      },
      {
        id: 'mystfell',
        title: 'Mystfell',
        subtitle: 'The Shadow Port',
        content: (
          <p>
            A coastal region shrouded in perpetual fog. Ships arrive here from nowhere, carrying cargo that shouldn't exist.
          </p>
        ),
      },
      {
        id: 'southern_wastes',
        title: 'The Southern Wastes',
        subtitle: 'Graveyard of Empires',
        content: (
          <p>
            A vast desert of grey ash. Ruins of a civilization that predates the gods jut from the dunes like broken teeth.
          </p>
        ),
      },
    ],
  },
  bestiary: {
    title: 'Bestiary',
    icon: Skull,
    items: [
      {
        id: 'mira',
        title: 'Mira, The Weeping Reaver',
        subtitle: 'Mutated Humanoid / Monstrosity',
        content: (
          <>
            <div className="relative mb-10 flex justify-center">
              <div className="relative w-full max-w-5xl">
                <img
                  src="/mira-page.png"
                  alt="Mira, The Weeping Reaver"
                  className="w-full h-auto object-contain rounded-sm"
                />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0c0a09]/80 via-[#0c0a09]/30 to-transparent pointer-events-none" />
              </div>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="flex gap-2 mb-6">
                <span className="bg-red-900/30 text-red-500 px-3 py-1 text-xs font-bold uppercase border border-red-900">
                  Deceased
                </span>
                <span className="bg-stone-900/30 text-stone-500 px-3 py-1 text-xs font-bold uppercase border border-stone-800">
                  Challenge Rating: 3
                </span>
              </div>

              <p className="mb-6">
                Once a partner to Vane and a member of the Umbral Reavers,{' '}
                <strong className="text-orange-500">Mira</strong> fell victim to a Riven transformation triggered by the cultist Arathus.
              </p>

              <h3 className="text-xl font-title text-stone-200 mt-8 mb-4">Physiology</h3>
              <p className="mb-6">
                The transformation elongated her limbs, snapping bone and reforming it into jagged spears.
                Her skin became translucent and weeping, constantly shedding a corrosive ichor.
              </p>

              <h3 className="text-xl font-title text-stone-200 mt-8 mb-4">Encounter Log</h3>
              <p className="mb-6">Slain by the party in the woods near the Voss Farm. Her head was taken as proof of the deed.</p>
            </div>
          </>
        ),
      },
    ],
  },
};

export default GRIMOIRE_DB;

