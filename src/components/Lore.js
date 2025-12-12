import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, Shield, Eye, Globe, Skull } from 'lucide-react';
import { LORE_DB } from '../data';
import FolderCard from './FolderCard';
import LoreEntry from './LoreEntry';
import { TomePageHeader, TomeScaffold, TomeSection } from './common/TomePrimitives';

const Lore = () => {
  const [currentCategory, setCurrentCategory] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);

  // If we are at the root
  if (!currentCategory) {
    return (
      <TomeScaffold>
        <TomePageHeader
          sectionLabel="The Grimoire"
          title="The Grimoire"
          description="Knowledge is the only shield against the encroaching dark. Choose a path to explore the archives."
        />

        <TomeSection>
          <div className="max-w-7xl mx-auto mt-12 animate-[fadeIn_0.5s_ease-out]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <FolderCard
                title="Factions"
                type="Politics & Power"
                icon={Shield}
                count={LORE_DB.factions.items.length}
                onClick={() => setCurrentCategory('factions')}
              />
              <FolderCard
                title="Pantheon"
                type="Gods & Religion"
                icon={Eye}
                count={LORE_DB.pantheon.items.length}
                onClick={() => setCurrentCategory('pantheon')}
              />
              <FolderCard
                title="World"
                type="Geography"
                icon={Globe}
                count={LORE_DB.world.items.length}
                onClick={() => setCurrentCategory('world')}
              />
              <FolderCard
                title="Bestiary"
                type="Creatures"
                icon={Skull}
                count={LORE_DB.bestiary.items.length}
                onClick={() => setCurrentCategory('bestiary')}
              />
            </div>
          </div>
        </TomeSection>
      </TomeScaffold>
    );
  }

  // If we have selected a category but not an entry (List View)
  if (currentCategory && !selectedEntry) {
    const categoryData = LORE_DB[currentCategory];
    return (
      <TomeScaffold padY="pt-28 pb-24">
        <header className="relative w-full px-6 sm:px-10 lg:px-16">
          <div className="max-w-5xl mx-auto border-b border-stone-900/70 pb-10">
            <div className="flex items-center justify-between gap-6">
              <button
                type="button"
                onClick={() => setCurrentCategory(null)}
                className="tome-navlink group inline-flex items-center gap-2"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Grimoire
              </button>
              <div className="font-title text-[11px] tracking-[0.28em] uppercase text-stone-600">
                {categoryData.items.length} entries
              </div>
            </div>

            <h1 className="mt-6 font-title text-4xl md:text-5xl text-stone-100 tracking-wide">
              {categoryData.title}
            </h1>
          </div>
        </header>

        <TomeSection>
          <div className="max-w-5xl mx-auto mt-12 animate-[fadeIn_0.5s_ease-out]">
            <ol className="grid gap-3">
              {categoryData.items.map((item) => (
                <li key={item.id} className="min-w-0">
                  <button
                    type="button"
                    onClick={() => setSelectedEntry(item)}
                    className="tome-card group w-full text-left focus:outline-none"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <div className="font-serif-text text-stone-200 truncate">
                          {item.title}
                        </div>
                        <div className="mt-1 text-sm text-stone-500 font-body truncate">
                          {item.subtitle}
                        </div>
                      </div>
                      <ChevronRight className="text-stone-700 group-hover:text-stone-500 transition-colors" />
                    </div>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </TomeSection>
      </TomeScaffold>
    );
  }

  // If we have an entry selected (Detail View)
  return (
    <TomeScaffold padY="pt-28 pb-24">
      <header className="relative w-full px-6 sm:px-10 lg:px-16">
        <div className="max-w-4xl mx-auto border-b border-stone-900/70 pb-10">
          <div className="flex items-center justify-between gap-6">
            <button
              type="button"
              onClick={() => setSelectedEntry(null)}
              className="tome-navlink group inline-flex items-center gap-2"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to {LORE_DB[currentCategory]?.title}
            </button>
            <span className="tome-pill tome-pill--muted">Grimoire</span>
          </div>

          <div className="mt-8 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
            <div className="font-title text-xs tracking-[0.28em] uppercase text-stone-500">
              {LORE_DB[currentCategory]?.title}
            </div>
            <div className="font-title text-[11px] tracking-[0.28em] uppercase text-stone-600">
              Entry
            </div>
          </div>

          <h1 className="mt-6 font-title text-4xl md:text-5xl text-stone-100 tracking-wide">
            {selectedEntry?.title}
          </h1>
          {selectedEntry?.subtitle ? (
            <p className="mt-4 max-w-3xl font-serif-text text-stone-300/90 leading-relaxed">
              {selectedEntry.subtitle}
            </p>
          ) : null}
        </div>
      </header>

      <TomeSection>
        <div className="max-w-6xl mx-auto mt-12">
          <LoreEntry data={selectedEntry} category={currentCategory} />
        </div>
      </TomeSection>
    </TomeScaffold>
  );
};

export default Lore;
