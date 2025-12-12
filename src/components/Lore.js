import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, Shield, Eye, Globe, Skull } from 'lucide-react';
import { LORE_DB } from '../data';
import FolderCard from './FolderCard';
import LoreEntry from './LoreEntry';

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
      <LoreEntry
        data={selectedEntry}
        onBack={() => setSelectedEntry(null)}
        category={currentCategory}
      />
    </div>
  );
};

export default Lore;