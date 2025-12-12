# Scaling Roadmap - Severed Realms Site

Updated: December 12, 2025

This roadmap is written for the current architecture where metadata lives in small JavaScript data files under `src/data` and long-form prose lives as Markdown under `public` and is fetched at runtime.

## Core Scaling Rule

Scaling must not reintroduce monolithic JavaScript text blobs or JSX content blobs for chapters and session logs. Prose stays in Markdown files. Code stays in `src`. Metadata stays minimal.

## Folder Strategy That Matches Reality

The current separation of concerns is already strong and should be preserved.

`public/` is where story content lives because Create React App serves it verbatim and it is available by URL at runtime.

`src/data/` is where lists and small lookups live. These files should remain lightweight and should reference markdown paths rather than embedding prose.

`src/components/` is where rendering and UX live, including the shared markdown engine.

## Performance and Caching

The shared markdown engine already maintains an in-memory cache, which is a good start. The next scaling step is to make caching explicit and layered.

At the browser layer, ensure the server sends cache-friendly headers for Markdown files in `public`. In most deployments this can be done through the static host configuration. This reduces repeat downloads across visits.

At the application layer, consider optional prefetching. When a reader route loads a chapter or session, prefetch the next and previous markdown URLs in the background. This keeps navigation snappy without bundling content into JavaScript.

For very large chapters or logs, consider progressive rendering by splitting the markdown into sections on the client after fetch. The UI can show the header and the first section immediately, then append the rest. This keeps the fetch model but improves perceived performance.

## Offline Support Without Changing the Content Model

Create React App supports a service worker pattern through the existing toolchain. A safe evolution is to cache Markdown files for offline reading.

The service worker can cache `public/chapters/*.md` and `public/sessions/*.md` on demand when the user visits them. This preserves the separation of metadata and prose because the source of truth remains the Markdown file in `public`.

## Search and Indexing Without Reintroducing Blobs

Search should be driven by a lightweight index that is generated at build time and stored as JSON in `public`, while keeping the full content in Markdown.

A practical approach is to add a small build script that reads `src/data/novelData.js` and `src/data/sessionsData.js`, fetches or reads the referenced Markdown files during the build pipeline, and generates a compact JSON index containing only IDs, titles, file paths, and short excerpts. The excerpt can be the first paragraph or a fixed character window. This makes global search feasible while keeping prose in Markdown.

If deeper search is needed, generate a token index per file, store it in `public/indexes`, and load it on demand. This can be done with a simple inverted index format and still avoids shipping raw prose inside JavaScript bundles.

## Content Validation and Safety

As the number of chapters and sessions grows, the highest risk becomes broken links and missing files. Add a validation pipeline that runs before builds.

Validation should check that every `path` in the metadata arrays exists in `public`, that all `id` values are unique, and that Markdown files are readable. It should also scan for lore tooltip links in Markdown and ensure referenced keys exist in `src/data/loreData.js`.

This validation can be implemented as a Node script invoked by an npm script and run in CI. It keeps the authoring workflow safe without changing runtime behavior.

## Authoring Workflow Improvements

The cleanest authoring flow is to treat Markdown as the canonical writing format and metadata as a small routing index.

Introduce a chapter and session template file that authors can copy into `public/chapters` and `public/sessions`. The template should encourage a first heading that matches the title, followed by consistent section headings. The shared reader can continue stripping the first heading to avoid double titles.

For editorial workflows, add an optional draft convention such as placing unfinished files under `public/chapters/drafts` and leaving them out of the metadata arrays. This keeps drafts out of navigation while still allowing preview by direct URL.

## Evolving Toward Optional Generated Manifests

The current system uses manually curated metadata arrays, which is simple and effective. If authoring volume increases, the next safe step is to generate these arrays from the filesystem at build time.

A generated manifest should remain metadata-only and should never inline Markdown content. It can be emitted as a JavaScript file under `src/data` or as a JSON file under `public` that the app fetches. Either approach preserves the core split between metadata and prose.

## Observability and UX Reliability

As content grows, error handling becomes more important. Expand the markdown reader error states to include actionable diagnostics for missing files and network failures, and consider emitting a lightweight client-side log event so broken content can be detected in production.

This is especially valuable if multiple people are adding content files and metadata entries.
