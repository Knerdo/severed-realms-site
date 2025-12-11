import React from 'react';
import { ArrowLeft } from 'lucide-react';

const LoreEntry = ({ data, onBack, category }) => {
  // Check if this is a bestiary entry
  const isBestiary = category === 'bestiary';

  return (
    <div className="animate-[fadeIn_0.5s_ease-out]">
      <div className={isBestiary ? "max-w-6xl mx-auto" : "max-w-4xl mx-auto"}>
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

        {isBestiary ? (
          // Bestiary-specific layout: no box, full width content
          <div className="prose prose-invert prose-stone max-w-none font-serif-text leading-loose text-lg text-stone-300">
            {data.content}
          </div>
        ) : (
          // Default lore entry layout with blue box
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
        )}
      </div>
    </div>
  );
};

export default LoreEntry;