import React from 'react';

const FolderCard = ({ title, type, count, icon: Icon, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="tome-card w-full text-left relative overflow-hidden group focus:outline-none"
  >
    <div className="absolute top-0 right-0 p-4 opacity-[0.08] group-hover:opacity-[0.14] transition-opacity text-stone-200">
      <Icon size={84} />
    </div>
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-4 gap-4">
        <span className="tome-pill tome-pill--muted">
          {type}
        </span>
        {count ? (
          <span className="text-stone-600 text-xs font-title tracking-[0.22em] uppercase">
            {count} Entries
          </span>
        ) : null}
      </div>
      <h3 className="text-3xl font-title text-stone-200 mb-2 group-hover:text-stone-100 transition-colors">
        {title}
      </h3>
      <div className="h-px w-14 bg-stone-800/80 group-hover:bg-stone-700 transition-colors mt-5"></div>
    </div>
  </button>
);

export default FolderCard;
