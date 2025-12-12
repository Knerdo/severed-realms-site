import React, { useEffect, useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { novelData } from '../data';
import useMotionPreferences from './common/useMotionPreferences';
import { TomeDivider, TomeScaffold, TomeSection } from './common/TomePrimitives';
import MarkdownReader from './MarkdownReader';

const TomeChapter = () => {
  const { chapterId } = useParams();
  const { prefersReducedMotion } = useMotionPreferences();

  const chapterIndex = useMemo(() => {
    const raw = String(chapterId || '').trim();
    const id = Number(raw);
    if (!Number.isFinite(id)) return -1;
    return (novelData ?? []).findIndex((c) => Number(c?.id) === id);
  }, [chapterId]);

  const chapter = chapterIndex >= 0 ? novelData?.[chapterIndex] : null;
  const total = novelData?.length ?? 0;
  const num = chapter?.id ?? chapterIndex + 1;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }, [chapterId, prefersReducedMotion]);

  if (chapterIndex < 0 || !chapter) {
    return <Navigate to="/tome" replace />;
  }

  const prevId = chapterIndex > 0 ? novelData?.[chapterIndex - 1]?.id : null;
  const nextId = chapterIndex + 1 < total ? novelData?.[chapterIndex + 1]?.id : null;

  return (
    <TomeScaffold padY="pt-28 pb-24">
      <header className="relative w-full px-6 sm:px-10 lg:px-16">
        <div className="max-w-4xl mx-auto border-b border-stone-900/70 pb-10">
          <div className="flex items-center justify-between gap-6">
            <Link
              to="/tome"
              className="tome-navlink"
            >
              ← Back to Tome
            </Link>
            <div className="font-title text-[11px] tracking-[0.28em] uppercase text-stone-600">Reading</div>
          </div>

          <div className="mt-8 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
            <div className="font-title text-xs tracking-[0.28em] uppercase text-stone-500">
              Chapter {num}
            </div>
            <span className="tome-pill tome-pill--active">Available</span>
          </div>

          <h1 className="mt-6 font-title text-4xl md:text-5xl text-stone-100 tracking-wide">
            {chapter?.title}
          </h1>
        </div>
      </header>

      <TomeSection>
        <div className="max-w-4xl mx-auto mt-12 font-serif-text">
          <MarkdownReader
            path={chapter.path}
            enableLoreTooltips={false}
            stripFirstHeading
          />

          <TomeDivider />

          <nav aria-label="Chapter navigation" className="flex items-center justify-between gap-4">
            {prevId ? (
              <Link
                to={`/tome/${prevId}`}
                className="tome-navlink"
              >
                ← Previous
              </Link>
            ) : (
              <span className="text-stone-800 font-title text-xs tracking-[0.28em] uppercase">
                ← Previous
              </span>
            )}

            {nextId ? (
              <Link
                to={`/tome/${nextId}`}
                className="tome-navlink"
              >
                Next →
              </Link>
            ) : (
              <span className="text-stone-800 font-title text-xs tracking-[0.28em] uppercase">
                Next →
              </span>
            )}
          </nav>
        </div>
      </TomeSection>
    </TomeScaffold>
  );
};

export default TomeChapter;

