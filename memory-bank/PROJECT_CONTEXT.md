# Project Context - Severed Realms Campaign Site

Last Updated: December 12, 2025

Project Type: React Single Page Application built with Create React App

Purpose: D&D campaign website for A Dirge to the Falseblood

## Project Overview

Severed Realms is a dark fantasy campaign site built in React with Tailwind CSS styling. It contains a Tome for long-form novel chapters, a Chronicles section for session logs, and a Grimoire for lore browsing.

The current architectural direction is strict separation between metadata and prose. Metadata lives in small JavaScript arrays inside `src/data`. Prose lives as Markdown files inside `public/` and is fetched at runtime. This replaces older approaches that embedded large JSX or text blobs directly in source files.

## Technology Stack

The UI is React 19 with `react-scripts` as the build system. Routing is handled by `react-router-dom` and is actively used. Markdown rendering uses `react-markdown` with `rehype-raw`. Icons are provided by `lucide-react`. Styling is Tailwind CSS.

## Repository Layout

The main project lives under `severed-realms-site/`.

`public/` contains static assets that are copied into the build output unchanged. This includes Markdown content such as chapter and session files.

`src/` contains application code. Components read lightweight metadata from `src/data` and then fetch Markdown from `public` for rendering.

This is a representative structure of the current content pipeline.

```
severed-realms-site/
├── public/
│   ├── chapters/
│   │   ├── chapter1.md
│   │   ├── chapter2.md
│   │   ├── chapter3.md
│   │   └── chapter4.md
│   ├── sessions/
│   │   ├── session-1.md
│   │   └── session-2.md
│   └── index.html
├── src/
│   ├── App.js
│   ├── components/
│   │   ├── MarkdownReader.jsx
│   │   ├── TomeChapter.js
│   │   ├── Novel.js
│   │   ├── Sessions.js
│   │   ├── Lore.js
│   │   └── LoreTooltip.jsx
│   └── data/
│       ├── novelData.js
│       ├── sessionsData.js
│       ├── loreData.js
│       ├── grimoireData.js
│       └── index.js
└── memory-bank/
```

## Routes and Views

Routing is configured in `src/App.js`.

The landing page uses `/`.

The Grimoire uses `/grimoire`.

The Chronicles index uses `/chronicles` and the session reader uses `/chronicles/:sessionId`.

The Tome index uses `/tome` and the chapter reader uses `/tome/:chapterId`.

## Data Layer

The project uses a metadata-only schema for both the Tome and the Chronicles.

`src/data/novelData.js` exports an array of objects with `id`, `title`, and `path`. The `path` points to a Markdown file under `public/chapters`.

`src/data/sessionsData.js` exports the same shape, with `path` pointing to a Markdown file under `public/sessions`.

`src/data/loreData.js` is intentionally dictionary-like and tooltip-scale. It is keyed lookup data for short inline lore tooltips. Long-form lore is not intended to live in this file.

`src/data/grimoireData.js` contains the current Grimoire page content.

Many components import data via the barrel export in `src/data/index.js`, typically using relative imports like `../data`.

## Content Loading Flow

The Tome and Chronicles are driven by the same pattern.

First, a page renders a list using the relevant metadata array from `src/data`.

Then, when the user navigates to a specific chapter or session route, the reader component finds the matching metadata entry and passes its `path` into the shared Markdown reader component.

`src/components/MarkdownReader.jsx` fetches the Markdown from the public path, caches it in memory, and renders it using `react-markdown`. The Tome uses the reader with lore tooltips disabled. The Chronicles can enable lore tooltips.

## Migration Notes

The following legacy files were removed during the refactor because they either embedded prose directly in code or represented redundant loading pipelines.

`src/data/sessionData.js` was removed after migrating session prose to `public/sessions/*.md`.

`src/data/chaptersManifest.js` and `src/data/chaptersRuntime.js` were removed in favor of the unified metadata files and the shared Markdown reader.
