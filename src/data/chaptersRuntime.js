// Runtime loader for chapter markdown stored in `public/chapters/*.md`.
//
// This project is currently a CRA + React Router SPA (see `react-scripts` in package.json),
// so "static generation" means:
// - markdown files live in `public/` and are copied into the build output
// - the app fetches them at runtime
//
// We intentionally keep rendering/styling in `TomeChapter` unchanged.

const inMemoryCache = new Map();

export const fetchMarkdownText = async (publicPath) => {
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

