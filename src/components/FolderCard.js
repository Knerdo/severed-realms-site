import React from 'react';

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

export default FolderCard;