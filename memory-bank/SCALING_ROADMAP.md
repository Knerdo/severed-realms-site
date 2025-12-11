# Scaling Roadmap - Severed Realms Site

> **Created**: December 11, 2025
> **Purpose**: Guide for systematically adding new features while maintaining architectural integrity

---

## Table of Contents
1. [Recommended Folder Structure](#1-recommended-folder-structure)
2. [Adding New Components](#2-adding-new-components)
3. [Adding New Pages/Views](#3-adding-new-pagesviews)
4. [Adding New Data Types](#4-adding-new-data-types)
5. [State Management Strategy](#5-state-management-strategy)
6. [Styling Guidelines](#6-styling-guidelines)
7. [Performance Patterns](#7-performance-patterns)
8. [Testing Strategy](#8-testing-strategy)
9. [Future Feature Ideas](#9-future-feature-ideas)

---

## 1. Recommended Folder Structure

### Current → Target Structure

```
src/
├── App.js                          # Slim: routing only
├── index.js                        # Entry point
├── index.css                       # Global styles + Tailwind
│
├── components/                     # Reusable UI components
│   ├── common/                     # Shared across features
│   │   ├── index.js               # Barrel export
│   │   ├── Divider.jsx
│   │   ├── GlassPanel.jsx
│   │   ├── BackButton.jsx
│   │   └── ErrorBoundary.jsx
│   │
│   ├── layout/                     # Page structure components
│   │   ├── index.js
│   │   ├── Navigation.jsx
│   │   ├── Footer.jsx
│   │   └── PageContainer.jsx
│   │
│   └── ui/                         # Primitive UI elements
│       ├── index.js
│       ├── Button.jsx
│       ├── Card.jsx
│       └── Icon.jsx
│
├── features/                       # Feature-specific modules
│   ├── home/
│   │   ├── index.js
│   │   ├── Hero.jsx
│   │   └── HomeStats.jsx
│   │
│   ├── lore/
│   │   ├── index.js
│   │   ├── Lore.jsx
│   │   ├── FolderCard.jsx
│   │   ├── LoreEntry.jsx
│   │   └── LoreList.jsx
│   │
│   ├── sessions/
│   │   ├── index.js
│   │   ├── Sessions.jsx
│   │   ├── SessionCard.jsx
│   │   └── SessionDetail.jsx
│   │
│   └── novel/
│       ├── index.js
│       ├── Novel.jsx
│       ├── ChapterNav.jsx
│       └── ChapterContent.jsx
│
├── data/                           # Static data (move to API later)
│   ├── index.js
│   ├── lore/
│   │   ├── factions.json
│   │   ├── pantheon.json
│   │   ├── world.json
│   │   └── bestiary.json
│   ├── sessions/
│   │   └── sessions.json
│   └── novel/
│       └── chapters.json
│
├── content/                        # Markdown content files
│   ├── lore/
│   │   ├── umbral-reavers.md
│   │   └── thaldrenne.md
│   ├── sessions/
│   │   ├── session-1.md
│   │   └── session-2.md
│   └── novel/
│       ├── chapter-1.md
│       └── chapter-2.md
│
├── hooks/                          # Custom React hooks
│   ├── index.js
│   ├── useNavigation.js
│   └── useLocalStorage.js
│
├── context/                        # React Context providers
│   ├── index.js
│   ├── ThemeContext.jsx
│   └── NavigationContext.jsx
│
├── utils/                          # Helper functions
│   ├── index.js
│   ├── formatDate.js
│   └── slugify.js
│
├── styles/                         # Style utilities
│   ├── GlobalStyles.jsx
│   └── theme.js
│
└── config/                         # App configuration
    └── navigation.js
```

---

## 2. Adding New Components

### Component Template

```jsx
// src/components/common/NewComponent.jsx

import React from 'react';
import PropTypes from 'prop-types';

/**
 * NewComponent - Brief description
 * @param {Object} props
 * @param {string} props.title - The title to display
 * @param {function} props.onClick - Click handler
 */
const NewComponent = ({ title, onClick, children }) => {
  return (
    <div 
      className="glass-panel p-4 hover-glow transition-all"
      onClick={onClick}
    >
      <h3 className="font-title text-stone-200">{title}</h3>
      {children}
    </div>
  );
};

NewComponent.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

NewComponent.defaultProps = {
  onClick: () => {},
  children: null,
};

export default NewComponent;
```

### Component Checklist
- [ ] Create file in appropriate folder
- [ ] Add PropTypes for all props
- [ ] Add JSDoc comment describing purpose
- [ ] Export from folder's index.js
- [ ] Add unit test if complex logic

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `SessionCard.jsx` |
| Hooks | camelCase with "use" prefix | `useNavigation.js` |
| Utilities | camelCase | `formatDate.js` |
| Data files | kebab-case | `session-data.json` |
| CSS classes | kebab-case | `glass-panel` |

---

## 3. Adding New Pages/Views

### Step-by-Step Process

1. **Create Feature Folder**
   ```
   src/features/characters/
   ├── index.js
   ├── Characters.jsx        # Main container
   ├── CharacterCard.jsx     # List item
   └── CharacterDetail.jsx   # Detail view
   ```

2. **Create Container Component**
   ```jsx
   // src/features/characters/Characters.jsx
   import React, { useState } from 'react';
   import CharacterCard from './CharacterCard';
   import CharacterDetail from './CharacterDetail';
   import { PageContainer } from '../../components/layout';
   import characterData from '../../data/characters.json';

   const Characters = () => {
     const [selectedId, setSelectedId] = useState(null);
     const selected = characterData.find(c => c.id === selectedId);

     if (selected) {
       return (
         <PageContainer>
           <CharacterDetail 
             character={selected} 
             onBack={() => setSelectedId(null)} 
           />
         </PageContainer>
       );
     }

     return (
       <PageContainer title="Characters">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {characterData.map(char => (
             <CharacterCard 
               key={char.id}
               {...char}
               onClick={() => setSelectedId(char.id)}
             />
           ))}
         </div>
       </PageContainer>
     );
   };

   export default Characters;
   ```

3. **Add Navigation Entry**
   ```javascript
   // src/config/navigation.js
   export const navItems = [
     { id: "home", label: "Overview", icon: "Crown" },
     { id: "lore", label: "Grimoire", icon: "Map" },
     { id: "characters", label: "Characters", icon: "Users" }, // NEW
     { id: "sessions", label: "Chronicles", icon: "Scroll" },
     { id: "novel", label: "The Tome", icon: "Book" },
   ];
   ```

4. **Update App.js Routing**
   ```jsx
   // In App.js
   import Characters from './features/characters';

   // In render:
   {activeTab === "characters" && <Characters key={resetKey} />}
   ```

### Using React Router (Recommended Future)

When ready to add proper routing:

```jsx
// src/App.jsx with React Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation, Footer } from './components/layout';
import Home from './features/home';
import Lore from './features/lore';
import Sessions from './features/sessions';
import Novel from './features/novel';
import Characters from './features/characters';

const App = () => (
  <BrowserRouter>
    <Navigation />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lore/*" element={<Lore />} />
        <Route path="/characters/*" element={<Characters />} />
        <Route path="/sessions/*" element={<Sessions />} />
        <Route path="/novel/*" element={<Novel />} />
      </Routes>
    </main>
    <Footer />
  </BrowserRouter>
);
```

---

## 4. Adding New Data Types

### JSON Data Structure Pattern

```json
// src/data/characters/characters.json
{
  "metadata": {
    "version": "1.0",
    "lastUpdated": "2025-12-11"
  },
  "items": [
    {
      "id": "erevan",
      "slug": "erevan-shadowstep",
      "name": "Erevan",
      "title": "The Shadow Hunter",
      "class": "Ranger",
      "race": "Elf",
      "contentFile": "erevan.md",
      "image": "/images/characters/erevan.png",
      "tags": ["party", "protagonist"],
      "meta": {
        "createdAt": "2025-11-13",
        "sessionIntroduced": 1
      }
    }
  ]
}
```

### Content Separation Pattern

Move JSX content to Markdown:

```markdown
<!-- src/content/lore/umbral-reavers.md -->
# The Umbral Reavers

In the shadows of the Severed Realms, where the boundaries between
the material world and the Grey Lament grow thin, stand the **Umbral Reavers**.

## The Creed of Silence

To join the Reavers is to forfeit one's past...

> "We do not save souls. We stop the things that eat them."
> — Reaver Captain Vane
```

Then render with a markdown parser:

```jsx
import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from 'react';

const LoreEntry = ({ contentFile }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(`/content/lore/${contentFile}`)
      .then(res => res.text())
      .then(setContent);
  }, [contentFile]);

  return (
    <div className="prose prose-invert">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};
```

---

## 5. State Management Strategy

### Tier 1: Local State (Current)
**Use for**: Single component state
```jsx
const [isOpen, setIsOpen] = useState(false);
```

### Tier 2: Lifted State
**Use for**: Parent-child shared state
```jsx
// Parent
const [selected, setSelected] = useState(null);
<Child onSelect={setSelected} />
```

### Tier 3: React Context
**Use for**: App-wide state (theme, user, navigation)

```jsx
// src/context/NavigationContext.jsx
import React, { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [history, setHistory] = useState([]);

  const navigate = (tabId) => {
    setHistory(prev => [...prev, activeTab]);
    setActiveTab(tabId);
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    const prev = history[history.length - 1];
    setHistory(h => h.slice(0, -1));
    setActiveTab(prev || 'home');
  };

  return (
    <NavigationContext.Provider value={{ activeTab, navigate, goBack }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);
```

### Tier 4: External State Manager
**Use for**: Complex async state, caching (future)
- Consider: TanStack Query for server state
- Consider: Zustand for client state if Context gets unwieldy

---

## 6. Styling Guidelines

### Tailwind Class Order
```jsx
className={`
  /* Layout */
  flex items-center justify-between
  /* Sizing */
  w-full max-w-4xl h-24
  /* Spacing */
  p-4 mx-auto mt-8
  /* Typography */
  font-title text-xl text-stone-200
  /* Visual */
  bg-stone-900 border border-orange-900 rounded-lg
  /* Effects */
  shadow-lg opacity-80
  /* Transitions */
  transition-all duration-300
  /* States */
  hover:bg-stone-800 hover:border-orange-700
  focus:outline-none focus:ring-2
`}
```

### Reusable Style Constants

```javascript
// src/styles/theme.js
export const theme = {
  colors: {
    background: '#0c0a09',
    surface: '#0f172a',
    primary: 'rgb(194, 65, 12)',      // orange-700
    primaryLight: 'rgb(234, 88, 12)', // orange-600
    text: {
      primary: 'rgb(231, 229, 228)',  // stone-200
      secondary: 'rgb(120, 113, 108)', // stone-500
      muted: 'rgb(87, 83, 78)',       // stone-600
    }
  },
  fonts: {
    title: "'Cinzel', serif",
    body: "'Playfair Display', serif",
    ui: "'Inter', sans-serif",
  }
};

// CSS variable version for Tailwind config
export const cssVariables = `
  :root {
    --color-bg: #0c0a09;
    --color-surface: #0f172a;
    --color-primary: rgb(194, 65, 12);
    --font-title: 'Cinzel', serif;
  }
`;
```

### Common Component Classes

```jsx
// src/styles/componentClasses.js
export const classes = {
  glassPanel: `
    bg-[rgba(67,20,7,0.4)]
    backdrop-blur-[12px]
    border border-[rgba(124,45,18,0.4)]
    shadow-[0_4px_30px_rgba(0,0,0,0.5)]
  `,
  hoverGlow: `
    hover:shadow-[0_0_15px_rgba(234,88,12,0.3)]
    hover:border-[rgba(234,88,12,0.6)]
    transition-all duration-300
  `,
  pageTitle: `
    text-4xl md:text-5xl
    font-title
    text-stone-200
    mb-6
  `,
};
```

---

## 7. Performance Patterns

### Lazy Loading Components

```jsx
// src/App.jsx
import React, { lazy, Suspense } from 'react';

const Novel = lazy(() => import('./features/novel'));
const Sessions = lazy(() => import('./features/sessions'));
const Lore = lazy(() => import('./features/lore'));

const LoadingFallback = () => (
  <div className="min-h-screen bg-[#0c0a09] flex items-center justify-center">
    <div className="animate-pulse text-orange-600 font-title">Loading...</div>
  </div>
);

// In render:
<Suspense fallback={<LoadingFallback />}>
  {activeTab === "novel" && <Novel />}
</Suspense>
```

### Memoization

```jsx
import React, { useMemo, useCallback, memo } from 'react';

// Memoize expensive computations
const filteredSessions = useMemo(() => 
  sessions.filter(s => s.tags.includes(filter)),
  [sessions, filter]
);

// Memoize callbacks passed to children
const handleSelect = useCallback((id) => {
  setSelectedId(id);
}, []);

// Memoize components that receive stable props
const MemoizedCard = memo(SessionCard);
```

### Image Optimization

```jsx
// Use loading="lazy" for below-fold images
<img 
  src="/mira-page.png" 
  alt="Mira creature"
  loading="lazy"
  decoding="async"
/>

// Consider using next/image equivalent for production:
// - WebP conversion
// - Responsive srcset
// - Blur placeholder
```

---

## 8. Testing Strategy

### Unit Test Template

```jsx
// src/features/sessions/__tests__/SessionCard.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import SessionCard from '../SessionCard';

describe('SessionCard', () => {
  const mockProps = {
    num: 1,
    title: 'Test Session',
    date: 'Dec 01, 2025',
    summary: 'A test summary',
    onClick: jest.fn(),
  };

  it('renders session information', () => {
    render(<SessionCard {...mockProps} />);
    
    expect(screen.getByText('Session 1')).toBeInTheDocument();
    expect(screen.getByText('Test Session')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    render(<SessionCard {...mockProps} />);
    
    fireEvent.click(screen.getByText('Test Session'));
    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });
});
```

### Testing Priorities
1. **Data transformations** in utils/
2. **User interactions** (navigation, selection)
3. **Complex conditional rendering**
4. **Error boundaries** catch errors correctly

---

## 9. Future Feature Ideas

### Short-Term (1-2 weeks)
- [ ] Character roster page
- [ ] Search functionality across lore
- [ ] Reading progress persistence (localStorage)
- [ ] Session timeline visualization
- [ ] Print-friendly session/lore views

### Medium-Term (1-2 months)
- [ ] User authentication (optional login)
- [ ] Campaign calendar with events
- [ ] Interactive world map
- [ ] NPC relationship tracker
- [ ] Quest tracker / to-do list

### Long-Term (3+ months)
- [ ] CMS integration (Strapi, Sanity, or Notion API)
- [ ] Player dashboard with character sheets
- [ ] Real-time session notes with collaboration
- [ ] Mobile app version (React Native)
- [ ] Audio integration (ambient sounds, session recordings)

---

## Quick Reference: Adding a New Feature

```bash
# 1. Create feature folder
mkdir -p src/features/maps

# 2. Create component files
touch src/features/maps/{index.js,Maps.jsx,MapView.jsx}

# 3. Create data file
touch src/data/maps.json

# 4. Add to navigation config
# Edit src/config/navigation.js

# 5. Add route in App.js
# Add import and conditional render

# 6. Export from feature index
echo "export { default } from './Maps';" > src/features/maps/index.js

# 7. Test locally
npm start
```

---

## Consistency Checklist

Before committing new code:
- [ ] Component has PropTypes or TypeScript types
- [ ] File is in correct folder per structure guide
- [ ] Exported from appropriate index.js
- [ ] Follows naming conventions
- [ ] Uses design system classes (glassPanel, etc.)
- [ ] Accessible (keyboard nav, aria labels if needed)
- [ ] No console.log statements
- [ ] No unused imports
- [ ] Responsive on mobile
