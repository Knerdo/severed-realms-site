# Markdown Chapters Baseline (Tome)

## Project type

- CRA (Create React App) SPA using `react-scripts` + `react-router-dom` (not Next.js).
- Chapters are loaded at runtime via `fetch()` from files stored in `public/`.

## Routing

- Tome index: `/tome` renders chapter cards via [`Novel`](../src/components/Novel.js:19).
- Tome chapter reader: `/tome/:chapterSlug` renders a chapter via [`TomeChapter`](../src/components/TomeChapter.js:32).

## Chapter data flow

1. Chapter metadata lives in [`chaptersManifest`](../src/data/chaptersManifest.js:1).
   - Includes `slug`, `title`, `teaser`, `status`, and `markdownPath`.
   - The `slug` is the stable identifier used in URLs.

2. Chapter markdown content lives in `public/chapters/*.md` and is fetched at runtime.
   - Loader: [`fetchMarkdownText()`](../src/data/chaptersRuntime.js:11) fetches the `markdownPath` and caches it in-memory.

3. Rendering pipeline (must remain stable for styling parity):
   - Markdown renderer: `react-markdown` in [`TomeChapter`](../src/components/TomeChapter.js:1).
   - Raw HTML support: `rehype-raw` enabled in [`TomeChapter`](../src/components/TomeChapter.js:4) (required because some chapter markdown uses `<br/>`).
   - Typography/layout mapping is enforced via the `components` map in [`TomeChapter`](../src/components/TomeChapter.js:52).

## Styling rules

- Shared Tome primitives (divider/navlink/card/pills) live in [`styles.css`](../src/styles.css:19) under `@layer components`.
- Tome background and layout wrappers live in [`TomePrimitives`](../src/components/common/TomePrimitives.jsx:3).

## Constraints

- Because this is a browser SPA loading markdown from `/public`, there is no filesystem access at runtime.
- The ordered chapter list and metadata must be maintained in the JS manifest (`chaptersManifest`).
- For full SEO/static pre-rendering of markdown, the project would need to migrate to Next.js and move chapter loading to build/server-side.

