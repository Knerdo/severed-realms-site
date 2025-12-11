# Project Context - Severed Realms Campaign Site

> **Last Updated**: December 11, 2025
> **Project Type**: React Single Page Application
> **Purpose**: D&D Campaign Website for "A Dirge to the Falseblood"

---

## 1. Project Overview

### Description
A dark fantasy campaign website built with React and Tailwind CSS. The site serves as a digital companion for the "Severed Realms" tabletop RPG campaign, featuring:
- **Novel Reader**: Multi-chapter story reader with navigation
- **Grimoire (Lore)**: Categorized lore database (Factions, Pantheon, World, Bestiary)
- **Chronicles (Sessions)**: Campaign session logs
- **Hero Landing Page**: Cinematic introduction with animations

### Visual Theme
- Dark gothic aesthetic with stone/orange color palette
- Glass morphism panels with blur effects
- Custom fog animations and subtle glows
- Cinzel (titles), Playfair Display (body serif), Inter (body sans) fonts

---

## 2. Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| **Framework** | React | 19.0.0 |
| **Styling** | Tailwind CSS | CDN (runtime) |
| **Icons** | lucide-react | 0.556.0 |
| **Routing** | react-router-dom | 7.10.1 (installed but unused) |
| **Build Tool** | react-scripts | 5.0.0 |
| **Type Checking** | TypeScript | 4.9.5 (dev, partial) |

---

## 3. File Structure

```
severed-realms-site/
├── public/
│   ├── index.html          # Entry HTML with Tailwind CDN
│   ├── title-page.png      # Hero background image
│   └── mira-page.png       # Bestiary creature image
├── src/
│   ├── App.js              # Main application component (499 lines)
│   ├── index.js            # React DOM entry point
│   ├── styles.css          # Minimal base styles
│   ├── components/
│   │   ├── Navigation.js   # Duplicate navigation (unused)
│   │   ├── Novel.js        # Chapter reader (1628 lines)
│   │   └── Sessions.js     # Session log viewer
│   └── data/
│       ├── loreData.js     # Lore database with JSX content
│       └── sessionData.js  # Session records with JSX content
├── build/                  # Production build output
├── memory-bank/            # Project documentation (this folder)
├── package.json
├── .eslintrc.json
└── .gitignore
```

---

## 4. Application Architecture

### Component Hierarchy
```
App (src/App.js)
├── GlobalStyles (inline)
├── Navigation (inline, not imported)
├── Hero (inline)
├── Lore (inline)
│   ├── FolderCard (inline)
│   └── LoreEntry (inline)
├── Sessions (imported from components/)
│   ├── SessionCard (inline to Sessions.js)
│   └── SessionDetail (inline to Sessions.js)
└── Novel (imported from components/)
    └── Divider (inline to Novel.js)
```

### State Management
- **Local useState**: All state is component-local
- **Navigation State**: `activeTab`, `isMenuOpen`, `resetKey` in App.js
- **Content State**: Category/entry selection in Lore, chapter index in Novel

---

## 5. Key Dependencies Graph

```
App.js
├── react (useState, useEffect - useEffect unused)
├── lucide-react (12 icons)
├── ./components/Sessions
├── ./components/Novel
└── ./data/loreData

Sessions.js
├── react (useState)
├── lucide-react (ArrowLeft, ChevronRight)
└── ../data/sessionData

Novel.js
└── react (useState)

loreData.js
├── react
└── lucide-react (Shield, Eye, Globe, Skull, Sword)

sessionData.js
├── react
└── lucide-react (Scroll, Skull, Swords - Swords unused)
```

---

## 6. Current Routes/Views

| Tab ID | Label | Component | Location |
|--------|-------|-----------|----------|
| `home` | Overview | Hero | App.js (inline) |
| `lore` | Grimoire | Lore | App.js (inline) |
| `sessions` | Chronicles | Sessions | components/Sessions.js |
| `novel` | The Tome | Novel | components/Novel.js |

---

## 7. Data Models

### Lore Entry Structure
```javascript
{
  id: string,
  title: string,
  subtitle: string,
  content: JSX.Element
}
```

### Session Entry Structure
```javascript
{
  id: number,
  num: number,
  title: string,
  date: string,
  summary: string,
  content: JSX.Element
}
```

### Chapter Structure
```javascript
{
  title: string,
  content: JSX.Element
}
```

---

## 8. Known Technical Debt

| Issue | Location | Priority |
|-------|----------|----------|
| Unused `useEffect` import | App.js:4 | Low |
| Duplicate Navigation component | components/Navigation.js | Medium |
| Unused icons imported | sessionData.js (Swords) | Low |
| react-router-dom installed but unused | package.json | Medium |
| TypeScript configured but JS used | .eslintrc.json, package.json | Low |
| Tailwind via CDN (not compiled) | public/index.html | Medium |

---

## 9. Active Development Server

- **Command**: `npm start`
- **Default Port**: 3000
- **Status**: Running (as of session start)
