
# Markdown Chapters Baseline (Tome)

This document explains the Tome markdown approach as it exists today.

## Project Type

This project is a Create React App single page application using `react-scripts` and `react-router-dom`. Chapter content is not bundled into JavaScript. Chapter content is fetched at runtime from Markdown files stored in `public`.

## Routing

The Tome index route is `/tome` and is rendered by `src/components/Novel.js`.

The Tome chapter reader route is `/tome/:chapterId` and is rendered by `src/components/TomeChapter.js`.

## Chapter Data Flow

Chapter metadata lives in `src/data/novelData.js`. Each chapter entry contains an id, a title, and a path. The path is a public URL like `/chapters/chapter1.md`.

Chapter Markdown content lives in `public/chapters/*.md`.

The Tome chapter reader selects a chapter by id, then passes the chapter path to the shared markdown engine in `src/components/MarkdownReader.jsx`.

The markdown engine fetches the Markdown file, caches it in memory, and renders it with `react-markdown` and `rehype-raw`. The Tome uses a clean mode and does not enable lore tooltips.

## Styling

The Tome layout primitives such as the scaffold and divider live in `src/components/common/TomePrimitives.jsx`. Shared component styles live in `src/styles.css`.

## Constraints and Safe Evolutions

Because this is a browser single page app, there is no filesystem access at runtime. Content must be delivered as static assets under `public`.

If deeper SEO or server-side rendering is required, the project would need a framework change. Within the current stack, the safe scaling direction is to keep prose in Markdown files while improving indexes, caching, and validation.

