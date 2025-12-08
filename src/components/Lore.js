import React, { useState } from "react";
import { 
  Shield, 
  Eye, 
  Globe, 
  Skull, 
  ArrowLeft, 
  ChevronRight 
} from "lucide-react";
import { LORE_DB } from "../data/loreData"; // Make sure you created this file in Step 2!

// ------------------------------------------------------------
// 1. Helper Component: FolderCard
// (You need to move this here because Lore uses it!)
// ------------------------------------------------------------

const FolderCard = ({ title, type, count, icon: Icon, onClick }) => (
  <div
    onClick={onClick}
    className="glass-panel p-8 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500 cursor-pointer hover-glow"
  >
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-orange-700">
      <Icon size={80} />
    </div>
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-4">
        <span className="inline-block px-3 py-1 text-[10px] font-title tracking-[0.2em] uppercase text-orange-600 border border-orange-900/40 bg-orange-950/30">
          {type}
        </span>
        {count && (
          <span className="text-stone-600 text-xs font-title">
            {count} Entries
          </span>
        )}
      </div>
      <h3 className="text-3xl font-title text-stone-200 mb-2 group-hover:text-orange-500 transition-colors">
        {title}
      </h3>
      <div className="h-1 w-12 bg-stone-800 group-hover:bg-orange-800 transition-colors mt-4"></div>
    </div>
  </div>
);

const LoreEntry = ({ data, onBack }) => (
  <div className="animate-[fadeIn_0.5s_ease-out]">
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-stone-500 hover:text-orange-500 transition-colors mb-8 font-title tracking-widest text-sm uppercase group"
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Return to List
      </button>

      <div className="bg-[#0f172a] border border-orange-900/50 shadow-2xl relative p-8 md:p-16">
        <div className="absolute top-0 left-0 h-1 bg-orange-900 w-full"></div>
        <div className="mb-8 border-b border-stone-800 pb-6">
          <h2 className="font-title text-4xl md:text-6xl text-stone-200 mb-2">
            {data.title}
          </h2>
          <span className="font-title tracking-widest text-orange-700 uppercase">
            {data.subtitle}
          </span>
        </div>
        <div className="prose prose-invert prose-stone max-w-none font-serif-text leading-loose text-lg text-stone-300">
          {data.content}
        </div>
      </div>
    </div>
  </div>
);

const Lore = () => {
  const [currentCategory, setCurrentCategory] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);

  // If we are at the root
  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-[#0c0a09] pt-32 pb-20 px-4 animate-[fadeIn_0.5s_ease-out]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-title text-stone-200 mb-6">
              The Grimoire
            </h2>
            <p className="text-stone-500 font-body max-w-2xl mx-auto">
              Knowledge is the only shield against the encroaching dark. Choose
              a path to explore the archives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FolderCard
              title="Factions"
              type="Politics & Power"
              icon={Shield}
              count={LORE_DB.factions.items.length}
              onClick={() => setCurrentCategory("factions")}
            />
            <FolderCard
              title="Pantheon"
              type="Gods & Religion"
              icon={Eye}
              count={LORE_DB.pantheon.items.length}
              onClick={() => setCurrentCategory("pantheon")}
            />
            <FolderCard
              title="World"
              type="Geography"
              icon={Globe}
              count={LORE_DB.world.items.length}
              onClick={() => setCurrentCategory("world")}
            />
            <FolderCard
              title="Bestiary"
              type="Creatures"
              icon={Skull}
              count={LORE_DB.bestiary.items.length}
              onClick={() => setCurrentCategory("bestiary")}
            />
          </div>
        </div>
      </div>
    );
  }

  // If we have selected a category but not an entry (List View)
  if (currentCategory && !selectedEntry) {
    const categoryData = LORE_DB[currentCategory];
    return (
      <div className="min-h-screen bg-[#0c0a09] pt-32 pb-20 px-4 animate-[fadeIn_0.5s_ease-out]">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => setCurrentCategory(null)}
            className="flex items-center gap-2 text-stone-500 hover:text-orange-500 transition-colors mb-8 font-title tracking-widest text-sm uppercase group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Archives
          </button>

          <div className="flex items-center gap-4 mb-12 border-b border-stone-800 pb-8">
            <div className="text-orange-700 opacity-80">
              <categoryData.icon size={48} />
            </div>
            <h2 className="text-4xl md:text-5xl font-title text-stone-200">
              {categoryData.title}
            </h2>
          </div>

          <div className="grid gap-4">
            {categoryData.items.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedEntry(item)}
                className="bg-stone-900/40 border border-stone-800 hover:bg-stone-900/80 hover:border-orange-900 p-6 flex justify-between items-center group cursor-pointer transition-all"
              >
                <div>
                  <h3 className="text-xl font-title text-stone-200 group-hover:text-orange-500 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-stone-500 text-sm mt-1 font-serif-text italic">
                    {item.subtitle}
                  </p>
                </div>
                <ChevronRight className="text-stone-600 group-hover:text-orange-500 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // If we have an entry selected (Detail View)
  return (
    <div className="min-h-screen bg-[#0c0a09] pt-32 pb-20 px-4">
      <LoreEntry data={selectedEntry} onBack={() => setSelectedEntry(null)} />
    </div>
  );
};
export default Lore;