import React from 'react';
import { Link } from 'react-router-dom';
import { novelData } from '../data';
import { TomePageHeader, TomeScaffold, TomeSection } from './common/TomePrimitives';

const Novel = () => {
  const chapterCards = novelData ?? [];

  return (
    <TomeScaffold>
      <TomePageHeader
        sectionLabel="The Tome"
        title="The Tome"
        description="A compact gateway into the novel—choose a chapter to enter the reader."
      />

      <TomeSection>
        <div className="max-w-7xl mx-auto mt-12">
          <div className="flex items-end justify-between gap-6 mb-8">
            <div>
              <h2 className="font-title text-2xl md:text-3xl text-stone-100 tracking-wide">
                Chapters
              </h2>
              <p className="mt-2 text-stone-500 font-body text-sm max-w-2xl">
                Direct links work for bookmarking and sharing.
              </p>
            </div>
          </div>

          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {chapterCards.map((c) => (
              <li key={c.id} className="min-w-0">
                <Link to={`/tome/${c.id}`} className="tome-card group focus:outline-none">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="font-title text-[11px] tracking-[0.22em] uppercase text-stone-500 group-hover:text-stone-400">
                        Chapter {c.id}
                      </div>
                      <div className="mt-1 font-serif-text text-stone-200 truncate">
                        {c.title}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className="tome-pill tome-pill--active">Available</span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </TomeSection>
    </TomeScaffold>
  );
};

export default Novel;

