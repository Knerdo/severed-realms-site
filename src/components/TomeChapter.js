import React, { useEffect, useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { chapters } from '../data';
import useMotionPreferences from './common/useMotionPreferences';
import { TomeDivider, TomeScaffold, TomeSection } from './common/TomePrimitives';

const stripLeadingMarkdownHeading = (markdown = '') => {
  const lines = String(markdown).split('\n');
  if (lines.length === 0) return '';
  if (lines[0].startsWith('# ')) {
    const rest = lines.slice(1);
    if (rest[0]?.trim() === '') rest.shift();
    return rest.join('\n');
  }
  return markdown;
};

const countWords = (text = '') => {
  const s = String(text).trim();
  if (!s) return 0;
  return s.split(/\s+/).filter(Boolean).length;
};

const formatReadingTime = (words) => {
  if (!words) return null;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min read`;
};

const TomeChapter = () => {
  const { chapterSlug } = useParams();
  const { prefersReducedMotion } = useMotionPreferences();

  const chapterIndex = useMemo(() => {
    const m = String(chapterSlug || '').match(/^chapter-(\d+)$/);
    if (!m) return -1;
    const num = Number(m[1]);
    if (!Number.isFinite(num) || num < 1) return -1;
    return num - 1;
  }, [chapterSlug]);

  const chapter = chapters?.[chapterIndex];
  const total = chapters?.length ?? 0;
  const num = chapterIndex + 1;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }, [chapterSlug, prefersReducedMotion]);

  const markdownComponents = useMemo(
    () => ({
      h1: ({ node, ...props }) => (
        <h3
          {...props}
          className="font-title text-2xl md:text-3xl text-stone-100 mt-12 mb-6 tracking-wide"
        />
      ),
      h2: ({ node, ...props }) => (
        <h4
          {...props}
          className="font-title text-xl md:text-2xl text-stone-100 mt-10 mb-5 tracking-wide"
        />
      ),
      h3: ({ node, ...props }) => (
        <h5
          {...props}
          className="font-title text-lg md:text-xl text-stone-100 mt-8 mb-4 tracking-wide"
        />
      ),
      p: ({ node, ...props }) => (
        <p
          {...props}
          className="my-6 leading-relaxed text-[1.05rem] md:text-lg text-stone-200/95"
        />
      ),
      a: ({ node, ...props }) => (
        <a
          {...props}
          className="text-stone-200 underline underline-offset-4 decoration-stone-700 hover:decoration-stone-400"
        />
      ),
      ul: ({ node, ...props }) => (
        <ul
          {...props}
          className="my-6 list-disc pl-6 space-y-2 text-[1.05rem] md:text-lg text-stone-200/95"
        />
      ),
      ol: ({ node, ...props }) => (
        <ol
          {...props}
          className="my-6 list-decimal pl-6 space-y-2 text-[1.05rem] md:text-lg text-stone-200/95"
        />
      ),
      li: ({ node, ...props }) => <li {...props} className="leading-relaxed" />,
      blockquote: ({ node, ...props }) => (
        <blockquote
          {...props}
          className="my-8 border-l border-stone-700/70 pl-6 text-stone-200/90 italic"
        />
      ),
      hr: () => <TomeDivider />,
      code: ({ node, inline, ...props }) =>
        inline ? (
          <code
            {...props}
            className="px-1.5 py-0.5 rounded bg-stone-900/60 text-stone-100"
          />
        ) : (
          <code {...props} className="block p-4 rounded bg-stone-950 text-stone-100" />
        ),
    }),
    []
  );

  if (chapterIndex < 0 || !chapter) {
    return <Navigate to="/tome" replace />;
  }

  const words = countWords(chapter?.content);
  const readingTime = formatReadingTime(words);
  const isComingSoon = (chapter?.status || 'published') === 'coming-soon' || !chapter?.content;

  const prevSlug = chapterIndex > 0 ? `chapter-${chapterIndex}` : null;
  const nextSlug = chapterIndex + 1 < total ? `chapter-${chapterIndex + 2}` : null;

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
            <div className="font-title text-[11px] tracking-[0.28em] uppercase text-stone-600">
              {readingTime ? readingTime : `${words} words`}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
            <div className="font-title text-xs tracking-[0.28em] uppercase text-stone-500">
              Chapter {num}
            </div>
            <span
              className={`tome-pill ${isComingSoon ? 'tome-pill--muted' : 'tome-pill--active'}`}
            >
              {isComingSoon ? 'Content Upload Pending' : 'Available'}
            </span>
          </div>

          <h1 className="mt-6 font-title text-4xl md:text-5xl text-stone-100 tracking-wide">
            {chapter?.title}
          </h1>

          {chapter?.teaser ? (
            <p className="mt-4 max-w-3xl font-serif-text text-stone-300/90 leading-relaxed">
              {chapter.teaser}
            </p>
          ) : null}
        </div>
      </header>

      <TomeSection>
        <div className="max-w-4xl mx-auto mt-12 font-serif-text">
          {isComingSoon ? (
            <div className="glass-panel p-7 md:p-10">
              <h2 className="font-title text-2xl md:text-3xl text-stone-100 tracking-wide">
                Content coming soon
              </h2>
              <p className="mt-4 text-stone-300/90 font-body leading-relaxed">
                This chapter page is live and linkable, but the manuscript hasn’t been uploaded
                yet. The layout, metadata, and navigation are in place so it will drop in
                cleanly when ready.
              </p>
            </div>
          ) : (
            <ReactMarkdown rehypePlugins={[rehypeRaw]} components={markdownComponents}>
              {stripLeadingMarkdownHeading(chapter?.content)}
            </ReactMarkdown>
          )}

          <TomeDivider />

          <nav aria-label="Chapter navigation" className="flex items-center justify-between gap-4">
            {prevSlug ? (
              <Link
                to={`/tome/${prevSlug}`}
                className="tome-navlink"
              >
                ← Previous
              </Link>
            ) : (
              <span className="text-stone-800 font-title text-xs tracking-[0.28em] uppercase">
                ← Previous
              </span>
            )}

            {nextSlug ? (
              <Link
                to={`/tome/${nextSlug}`}
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

