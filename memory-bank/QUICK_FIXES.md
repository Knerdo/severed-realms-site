# Quick Fixes - Immediate Improvements

> **Purpose**: Actionable fixes that can be applied immediately without major refactoring
> **Estimated Time**: 30-60 minutes total

---

## 1. Remove Unused Imports

### App.js - Line 4
**Current:**
```javascript
import React, { useState, useEffect } from "react";
```

**Fixed:**
```javascript
import React, { useState } from "react";
```

### sessionData.js - Line 2
**Current:**
```javascript
import { Scroll, Skull, Swords } from 'lucide-react';
```

**Fixed:**
```javascript
import { Scroll, Skull } from 'lucide-react';
```
Note: `Swords` is imported but never used in the file.

---

## 2. Delete Duplicate Navigation.js

The file `src/components/Navigation.js` is a duplicate of the inline Navigation component in App.js and is never imported anywhere.

**Action**: Delete `src/components/Navigation.js`

Or, if you prefer the separate file approach:
1. Delete inline Navigation from App.js (lines 91-182)
2. Add import: `import Navigation from './components/Navigation';`

---

## 3. Add Error Boundary

Create a simple error boundary component:

```jsx
// src/components/common/ErrorBoundary.jsx
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0c0a09] flex items-center justify-center p-8">
          <div className="glass-panel p-8 max-w-md text-center">
            <h2 className="font-title text-2xl text-orange-600 mb-4">
              Something went wrong
            </h2>
            <p className="text-stone-400 mb-6">
              The archives have encountered a disturbance.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-orange-900/50 text-orange-100 border border-orange-800 hover:bg-orange-900 transition-colors font-title tracking-wider"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

**Usage in App.js:**
```jsx
import ErrorBoundary from './components/common/ErrorBoundary';

// Wrap content components:
{activeTab === "novel" && (
  <ErrorBoundary>
    <Novel key={resetKey} />
  </ErrorBoundary>
)}
```

---

## 4. Fix Import Order in App.js

**Current (lines 1-22):**
```javascript
import Sessions from './components/Sessions';
import LORE_DB from './data/loreData';
import Novel from './components/Novel';
import React, { useState, useEffect } from "react";
import { ... } from "lucide-react";
```

**Recommended order:**
```javascript
// 1. React and React-related
import React, { useState } from "react";

// 2. Third-party libraries
import {
  Book,
  Scroll,
  Skull,
  Feather,
  Menu,
  X,
  ChevronRight,
  ArrowLeft,
  Map,
  Sword,
  Flame,
  Crown,
  Ghost,
  Shield,
  Eye,
  Globe,
} from "lucide-react";

// 3. Local components
import Sessions from './components/Sessions';
import Novel from './components/Novel';

// 4. Data/utils
import LORE_DB from './data/loreData';
```

---

## 5. Move GlobalStyles to CSS File

Instead of runtime CSS injection, move styles to a proper CSS file.

**Add to `src/styles.css`:**
```css
/* Fonts */
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700;900&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500&display=swap');

.font-title { font-family: 'Cinzel', serif; }
.font-serif-text { font-family: 'Playfair Display', serif; }
.font-body { font-family: 'Inter', sans-serif; }

/* Custom Scrollbar */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #0c0a09; }
::-webkit-scrollbar-thumb { background: #7c2d12; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #c2410c; }

/* Animation Keyframes */
@keyframes fog-flow {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 1; filter: brightness(1.3); }
  50% { opacity: 0.6; filter: brightness(1); }
}

.animate-fog { animation: fog-flow 60s linear infinite; }
.animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }

.text-glow { text-shadow: 0 0 25px rgba(234, 88, 12, 0.8); }

.glass-panel {
  background: rgba(67, 20, 7, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(124, 45, 18, 0.4);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
}

.hover-glow:hover {
  box-shadow: 0 0 15px rgba(234, 88, 12, 0.3);
  border-color: rgba(234, 88, 12, 0.6);
}
```

**Then remove GlobalStyles component from App.js** (lines 25-77) and its usage (line 462).

**Add import to index.js:**
```javascript
import './styles.css';
```

---

## 6. Add PropTypes to Components

### Example for Sessions.js SessionCard:

```javascript
import PropTypes from 'prop-types';

const SessionCard = ({ num, title, date, summary, onClick }) => (
  // ... existing JSX
);

SessionCard.propTypes = {
  num: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
```

**Install PropTypes:**
```bash
npm install prop-types
```

---

## 7. Add Accessibility Quick Wins

### Add skip link to App.js

```jsx
// At the start of the return in App component:
<a 
  href="#main-content" 
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-orange-900 focus:text-white focus:p-2 focus:z-[60]"
>
  Skip to content
</a>

// Add id to main:
<main id="main-content" className="animate-[fadeIn_0.5s_ease-out]">
```

### Add focus-visible styles to buttons

In `styles.css`:
```css
button:focus-visible,
a:focus-visible {
  outline: 2px solid rgb(234, 88, 12);
  outline-offset: 2px;
}
```

---

## 8. Clean Up Nav Items Definition

Move `navItems` outside component to prevent recreation:

**Current (inside Navigation component):**
```javascript
const Navigation = ({ ... }) => {
  const navItems = [ ... ];  // Recreated every render
```

**Fixed:**
```javascript
const navItems = [
  { id: "home", label: "Overview", icon: Crown },
  { id: "lore", label: "Grimoire", icon: Map },
  { id: "sessions", label: "Chronicles", icon: Scroll },
  { id: "novel", label: "The Tome", icon: Book },
];

const Navigation = ({ ... }) => {
  // Use navItems here, render icons: <item.icon size={16} />
```

---

## Summary Checklist

- [ ] Remove `useEffect` from App.js imports
- [ ] Remove `Swords` from sessionData.js imports
- [ ] Delete `src/components/Navigation.js` or integrate it
- [ ] Create ErrorBoundary component
- [ ] Reorder imports in App.js
- [ ] Move GlobalStyles to styles.css
- [ ] Add PropTypes to main components
- [ ] Add skip-to-content link
- [ ] Add focus-visible styles
- [ ] Move navItems outside Navigation component

---

## Files Changed After Quick Fixes

| File | Changes |
|------|---------|
| `src/App.js` | Remove useEffect, reorder imports, remove GlobalStyles, add skip link |
| `src/styles.css` | Add all GlobalStyles CSS |
| `src/index.js` | Add styles.css import |
| `src/data/sessionData.js` | Remove unused Swords import |
| `src/components/Navigation.js` | DELETE |
| `src/components/common/ErrorBoundary.jsx` | CREATE |
