import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import LoreTooltip from './LoreTooltip';
import { TomeDivider } from './common/TomePrimitives';

const inMemoryCache = new Map();

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

const fetchMarkdownText = async (publicPath) => {
  const url = String(publicPath || '').trim();
  if (!url) throw new Error('Missing markdown path');

  if (inMemoryCache.has(url)) return inMemoryCache.get(url);

  const res = await fetch(url, { headers: { Accept: 'text/markdown,*/*' } });
  if (!res.ok) {
    const err = new Error(`Failed to fetch markdown: ${url} (${res.status})`);
    err.status = res.status;
    throw err;
  }

  const text = await res.text();
  inMemoryCache.set(url, text);
  return text;
};

const MarkdownReader = ({
  path,
  enableLoreTooltips = false,
  stripFirstHeading = true,
  className = '',
}) => {
  const [markdown, setMarkdown] = useState('');
  const [loadError, setLoadError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setLoadError(null);
      setMarkdown('');

      const url = String(path || '').trim();
      if (!url) return;

      setIsLoading(true);
      try {
        const md = await fetchMarkdownText(url);
        if (!cancelled) setMarkdown(md);
      } catch (err) {
        if (!cancelled) setLoadError(err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [path]);

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
      a: ({ node, href, children, ...props }) => {
        const raw = String(href || '');
        const isLore = enableLoreTooltips && raw.startsWith('lore:');
        if (isLore) {
          const loreKey = raw.slice('lore:'.length).trim();
          return (
            <LoreTooltip loreKey={loreKey}>
              <span className="text-stone-200 underline underline-offset-4 decoration-stone-700 hover:decoration-stone-400">
                {children}
              </span>
            </LoreTooltip>
          );
        }

        return (
          <a
            {...props}
            href={href}
            className="text-stone-200 underline underline-offset-4 decoration-stone-700 hover:decoration-stone-400"
          >
            {children}
          </a>
        );
      },
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
    [enableLoreTooltips]
  );

  if (!path) return null;

  if (isLoading && !markdown) {
    return (
      <div className={className}>
        <div className="glass-panel p-7 md:p-10">
          <h2 className="font-title text-2xl md:text-3xl text-stone-100 tracking-wide">
            Loading…
          </h2>
          <p className="mt-4 text-stone-300/90 font-body leading-relaxed">
            Fetching content from the public markdown files.
          </p>
        </div>
      </div>
    );
  }

  if (loadError && !markdown) {
    return (
      <div className={className}>
        <div className="glass-panel p-7 md:p-10">
          <h2 className="font-title text-2xl md:text-3xl text-stone-100 tracking-wide">
            Content unavailable
          </h2>
          <p className="mt-4 text-stone-300/90 font-body leading-relaxed">
            This entry exists in the index, but its markdown file could not be loaded from the public directory.
          </p>
          <pre className="mt-4 text-xs text-stone-500 whitespace-pre-wrap">
            {String(loadError?.message || loadError)}
          </pre>
        </div>
      </div>
    );
  }

  const body = stripFirstHeading ? stripLeadingMarkdownHeading(markdown) : markdown;

  return (
    <div className={className}>
      <ReactMarkdown rehypePlugins={[rehypeRaw]} components={markdownComponents}>
        {body}
      </ReactMarkdown>
    </div>
  );
};

MarkdownReader.propTypes = {
  path: PropTypes.string.isRequired,
  enableLoreTooltips: PropTypes.bool,
  stripFirstHeading: PropTypes.bool,
  className: PropTypes.string,
};

export default MarkdownReader;

