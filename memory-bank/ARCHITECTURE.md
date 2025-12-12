# Severed Realms Architecture

This document explains how the Severed Realms site is organized and how a chapter or session becomes a rendered page. It assumes no prior knowledge of React or web development.

## What This Project Is

This is a React single page application built with Create React App. A single HTML file loads the app, and then the app changes what you see based on the current URL.

The key idea is that the project keeps writing content and application code separate. Chapters and session logs are stored as Markdown files, while the React code focuses on layout, navigation, and rendering.

## The Two Important Folders

## The public Folder

The `public` folder holds files that are served as static assets. Anything inside `public` is available by URL at runtime.

Chapter prose lives under `public/chapters`. Session prose lives under `public/sessions`.

When the app wants to show a chapter or a session, it fetches the corresponding Markdown file from this folder.

## The src Folder

The `src` folder holds the React application code. This is where components, routing, and styling live.

The app does not directly import Markdown chapters into the JavaScript bundle. Instead it keeps only lightweight metadata in `src` and fetches the Markdown when needed.

## Where Data Lives Versus Where Content Lives

Metadata is small information that helps the app build menus and routes. Content is the long-form story text.

Metadata lives in `src/data`. Content lives in `public` as Markdown.

For example, `src/data/novelData.js` contains a list of chapters. Each chapter has an id, a title, and a path. The path is a URL like `/chapters/chapter1.md`.

The session log list works the same way through `src/data/sessionsData.js`.

## How Routing Works

Routing means choosing what screen to show based on the URL.

Routes are defined in `src/App.js`. The Tome uses `/tome` for the chapter list and `/tome/:chapterId` for a specific chapter. The Chronicles uses `/chronicles` for the session list and `/chronicles/:sessionId` for a specific session.

When you navigate to a URL, React Router reads it and renders the matching component.

## How a Chapter Page Is Rendered

When you go to a chapter URL like `/tome/1`, the chapter reader component loads.

That reader finds the matching metadata entry in `src/data/novelData.js` using the id from the URL.

The reader then passes the metadata path, such as `/chapters/chapter1.md`, into the shared markdown component.

The shared markdown component fetches that Markdown file from `public` and renders it into HTML using the markdown renderer.

## How a Session Page Is Rendered

When you go to a session URL like `/chronicles/2`, the session reader uses the same approach.

It looks up the session metadata in `src/data/sessionsData.js`, reads the `path` field, fetches the Markdown from `public/sessions`, and renders it.

The session reader can enable optional lore tooltips while the Tome keeps tooltips disabled for a clean reading mode.

## How Lore Tooltips Work

Tooltip lore is intended to be short and dictionary-like. These entries live in `src/data/loreData.js`.

When the markdown renderer sees a special link that represents lore, it can render a tooltip UI component that displays the lore entry.

This allows the Chronicles to provide extra context without polluting the Tome reading experience.

## Why This Split Matters

Keeping prose in Markdown files makes writing and editing easier and keeps the JavaScript code fast and maintainable. Keeping metadata small makes navigation stable and predictable. Fetching Markdown at runtime means new content files can be added without rebuilding large JavaScript bundles.
