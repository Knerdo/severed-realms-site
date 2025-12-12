# Memory Bank - Severed Realms Site

This folder is a persistent knowledge base for AI-assisted development of the Severed Realms campaign website.

The single most important architectural fact to keep in mind is the metadata versus content split. Metadata stays in small JavaScript data files under `src/data`. Long-form prose lives as Markdown files under `public/` and is fetched at runtime.

## What to Read First

Read `PROJECT_CONTEXT.md` to understand how the project is currently built, how routing works, and how Markdown content is loaded.

Read `SCALING_ROADMAP.md` to understand how to grow the system without reintroducing large in-repo text blobs.

Read `ARCHITECTURE_AUDIT.md` when planning structural refactors.

Read `MARKDOWN_CHAPTERS_BASELINE.md` for the historical background of the Tome markdown approach and how it evolved.

## Current Reality Snapshot

The Tome chapter list comes from `src/data/novelData.js` and each chapter points to a file under `public/chapters`.

The Chronicles session list comes from `src/data/sessionsData.js` and each session points to a file under `public/sessions`.

Both readers render through the shared markdown engine in `src/components/MarkdownReader.jsx`.

Tooltip-scale lore lives in `src/data/loreData.js` and is rendered via `src/components/LoreTooltip.jsx`.

The Grimoire page content is currently separate from tooltip lore data.

## Update Policy

This memory bank should be updated whenever content pipeline decisions change, whenever files are moved or renamed, and whenever routing changes. When updating a document, keep it consistent with the current repository and remove references to deleted legacy files.
