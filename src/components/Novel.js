import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { chapters } from '../data';
import { TomePageHeader, TomeScaffold, TomeSection } from './common/TomePrimitives';

const countWords = (text = '') => {
  const s = String(text).trim();
  if (!s) return 0;
  return s.split(/\s+/).filter(Boolean).length;
};

const formatReadingTime = (words) => {
  if (!words) return null;
  // Very rough estimate.
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min read`;
};

const Novel = () => {
  const chapterCards = useMemo(() => {
    return (chapters ?? []).map((ch, idx) => {
      const num = idx + 1;
      const slug = `chapter-${num}`;
      const words = countWords(ch?.content);
      return {
        id: ch?.id ?? idx,
        num,
        slug,
        title: ch?.title ?? `Chapter ${num}`,
        teaser: ch?.teaser ?? '',
        status: ch?.status ?? 'published',
        readingTime: formatReadingTime(words),
      };
    });
  }, [chapters]);

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
              <li key={c.slug} className="min-w-0">
                <Link to={`/tome/${c.slug}`} className="tome-card group focus:outline-none">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="font-title text-[11px] tracking-[0.22em] uppercase text-stone-500 group-hover:text-stone-400">
                        Chapter {c.num}
                      </div>
                      <div className="mt-1 font-serif-text text-stone-200 truncate">
                        {c.title}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`tome-pill ${
                          c.status === 'coming-soon' ? 'tome-pill--muted' : 'tome-pill--active'
                        }`}
                      >
                        {c.status === 'coming-soon' ? 'Coming Soon' : 'Available'}
                      </span>
                      {c.readingTime && (
                        <span className="text-[10px] font-body text-stone-600">
                          {c.readingTime}
                        </span>
                      )}
                    </div>
                  </div>

                  {c.teaser ? (
                    <p className="mt-3 text-sm text-stone-400 font-body leading-relaxed line-clamp-3">
                      {c.teaser}
                    </p>
                  ) : null}
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

