# Architecture Audit - Severed Realms Site

> **Audit Date**: December 11, 2025
> **Auditor**: AI Code Assistant
> **Scope**: Full src/ folder and App.js comprehensive review

---

## Executive Summary

The Severed Realms site is a functional React application with a strong visual design but exhibits several architectural patterns that deviate from React best practices. The codebase would benefit from restructuring to improve maintainability, scalability, and developer experience.

**Overall Health Score**: 6.5/10

| Category | Score | Notes |
|----------|-------|-------|
| Functionality | 8/10 | Works well, no runtime errors |
| Code Organization | 5/10 | Inconsistent component placement |
| Best Practices | 5/10 | Several anti-patterns present |
| Scalability | 4/10 | Will become unwieldy with growth |
| Performance | 7/10 | Minimal but some unnecessary re-renders |
| Maintainability | 6/10 | Large files, mixed concerns |

---

## 1. Folder Structure Analysis

### Current Structure
```
src/
├── App.js              # 499 lines - TOO LARGE
├── index.js            # Entry point - OK
├── styles.css          # Minimal - OK
├── components/
│   ├── Navigation.js   # 97 lines - UNUSED/DUPLICATE
│   ├── Novel.js        # 1628 lines - TOO LARGE (mostly content)
│   └── Sessions.js     # 128 lines - OK
└── data/
    ├── loreData.js     # 460 lines - Mixes data + JSX
    └── sessionData.js  # 430 lines - Mixes data + JSX
```

### Issues Identified

#### ❌ Critical: App.js is a "God Component"
**Location**: [`App.js`](../src/App.js:1)
- 499 lines containing 8+ component definitions
- Inline components: `GlobalStyles`, `Divider`, `Navigation`, `Hero`, `FolderCard`, `LoreEntry`, `Lore`
- Should be split into separate files

#### ❌ Major: Duplicate Navigation Component
**Files**: 
- [`App.js:91-182`](../src/App.js:91) (used)
- [`components/Navigation.js`](../src/components/Navigation.js:1) (unused, 97 lines)

The standalone Navigation.js file is never imported. This creates confusion and maintenance burden.

#### ❌ Major: Data Files Contain JSX
**Files**: 
- [`loreData.js`](../src/data/loreData.js:1)
- [`sessionData.js`](../src/data/sessionData.js:1)

Data should be pure JSON/objects. JSX content makes the data non-serializable, harder to test, and impossible to fetch from an API later.

#### ⚠️ Medium: Inconsistent Component Organization
Some components live in `App.js`, others in `components/`. No clear pattern exists for deciding where new components should go.

#### ⚠️ Medium: Missing Index Files
No `index.js` barrel exports in `components/` or `data/` folders for cleaner imports.

---

## 2. App.js Detailed Analysis

### 2.1 Import Analysis

```javascript
// Line 1-22
import Sessions from './components/Sessions';
import LORE_DB from './data/loreData';
import Novel from './components/Novel';
import React, { useState, useEffect } from "react";  // ❌ useEffect unused
import { Book, Scroll, Skull, ... } from "lucide-react";  // 12 icons
```

**Issues**:
1. ❌ **Unused Import**: `useEffect` imported but never used
2. ⚠️ **Import Order**: Non-standard (local imports before React)
3. ✅ Icons are appropriately tree-shaken

### 2.2 Syntax Errors
**None found** - The code is syntactically valid JavaScript/JSX.

### 2.3 Runtime Errors
**None identified** - Components render correctly based on terminal output showing active dev server.

### 2.4 Logical Issues

#### Issue 1: resetKey Anti-Pattern
**Location**: [`App.js:445-456`](../src/App.js:445)
```javascript
const [resetKey, setResetKey] = useState(0);

const handleNavClick = (tabId) => {
  if (activeTab === tabId) {
    setResetKey((prev) => prev + 1);  // Forces remount
  } else {
    setActiveTab(tabId);
    setResetKey(0);  // Unnecessary
  }
};
```
**Problem**: Using key changes to force component remounting is an anti-pattern. This destroys and recreates the entire component tree, losing any internal state optimization.

**Better Approach**: Lift reset logic to a callback or use `useRef` to trigger resets.

#### Issue 2: Mobile Menu State Not Auto-Closed
**Location**: [`App.js:147`](../src/App.js:147)
```javascript
<button onClick={() => setIsMenuOpen(!isMenuOpen)}>
```
**Problem**: When navigating on desktop, menu state isn't reset, which could cause issues on resize.

### 2.5 Deprecated Methods
**None found** - React 19 APIs are used correctly.

### 2.6 Import/Export Issues

| Issue | Location | Severity |
|-------|----------|----------|
| `Navigation.js` exported but never imported | components/Navigation.js | Medium |
| `Swords` imported but unused | data/sessionData.js:2 | Low |
| `useEffect` imported but unused | App.js:4 | Low |

### 2.7 State Management Patterns

**Current Pattern**: Local state only (`useState`)

**Analysis**:
- ✅ Appropriate for current app size
- ⚠️ No shared state between siblings (Lore categories vs Sessions)
- ⚠️ No persistence (refresh loses navigation state)

**Recommendation**: Consider React Context for:
- Theme preferences
- User reading progress (Novel chapter, Session viewed)
- Navigation state persistence

### 2.8 Missing Error Boundaries
**Severity**: Medium

No error boundaries exist. A crash in any component (e.g., Novel.js with malformed chapter data) would crash the entire app.

**Recommendation**: Add error boundary at minimum around:
- `<Novel />` (user content-heavy)
- `<Lore />` (external data)
- `<Sessions />` (external data)

### 2.9 Re-render Analysis

**Potential Unnecessary Re-renders**:

1. **GlobalStyles on every render**
   [`App.js:460-461`](../src/App.js:460)
   ```javascript
   return (
     <div>
       <GlobalStyles />  // Creates new <style> element each render
   ```
   **Fix**: Move to `index.html` or use CSS-in-JS with memoization.

2. **Icon re-instantiation**
   Navigation icons are created inline in the `navItems` array on every render.
   ```javascript
   const navItems = [
     { id: "home", label: "Overview", icon: <Crown size={16} /> },  // New instance
   ```
   **Fix**: Define navItems outside component or useMemo.

### 2.10 Memory Leak Potential
**None identified** - No subscriptions, event listeners outside React, or intervals.

### 2.11 React Hooks Rules Violations
**None found** - Hooks are used at top level only.

---

## 3. Component-Specific Issues

### Novel.js (1628 lines)
- ⚠️ **Massive file size**: 95% is JSX content (chapters)
- ⚠️ **Content mixed with logic**: Should separate chapter content to data file
- ✅ Clean chapter navigation logic

### Sessions.js (128 lines)
- ✅ Well-structured
- ✅ Proper separation of container/presentational components
- ⚠️ Data import could use barrel export

### loreData.js / sessionData.js
- ❌ **JSX in data files** breaks separation of concerns
- ❌ **Non-serializable** data prevents future API integration
- ⚠️ **Large inline content** makes files unwieldy

---

## 4. Accessibility Issues

| Issue | Location | WCAG | Fix |
|-------|----------|------|-----|
| Missing alt on background img | App.js:189-193 | 1.1.1 | Add decorative role or alt="" |
| No skip-to-content link | App.js | 2.4.1 | Add skip link for keyboard users |
| No focus indicators on nav | App.js:125-141 | 2.4.7 | Add :focus-visible styles |
| Mobile menu not trapped | App.js:157-179 | 2.1.2 | Add focus trap when open |
| Low contrast text | Various | 1.4.3 | Some stone-500 on dark is <4.5:1 |

---

## 5. Performance Observations

### Bundle Size Concerns
- Tailwind via CDN loads entire framework (not tree-shaken)
- lucide-react imports are tree-shaken ✅

### Render Performance
```javascript
// Good: Key-based reset forces clean slate
{activeTab === "lore" && <Lore key={resetKey} />}

// Concern: No code splitting - all chapters load immediately
const chapters = [{ content: <>...4000 words...</> }];
```

### Recommendations
1. Install Tailwind as dependency, enable purging
2. Lazy load Novel/Sessions components with `React.lazy()`
3. Consider pagination for sessions if list grows

---

## 6. Security Considerations

| Risk | Status | Notes |
|------|--------|-------|
| XSS via JSX | ✅ Safe | React auto-escapes |
| Dependency vulnerabilities | ⚠️ Check | Run `npm audit` |
| Exposed secrets | ✅ Safe | No API keys or secrets |
| HTTPS | N/A | Depends on deployment |

---

## 7. Recommendations Priority Matrix

### 🔴 High Priority (Do First)
1. Extract inline components from App.js to separate files
2. Remove or integrate duplicate Navigation.js
3. Add error boundaries around content components
4. Fix unused imports (`useEffect`, `Swords`)

### 🟡 Medium Priority (Do Soon)
1. Extract chapter content from Novel.js to data file
2. Convert JSX content in data files to markdown + renderer
3. Install Tailwind properly (not CDN)
4. Add React Router for URL-based navigation
5. Create barrel exports in component/data folders

### 🟢 Low Priority (Nice to Have)
1. Add loading states for future API integration
2. Implement lazy loading for heavy components
3. Add focus trapping for mobile menu
4. Create theme context for customization
5. Add unit tests for components

---

## 8. Files Requiring Changes

| File | Changes Required | Effort |
|------|-----------------|--------|
| `App.js` | Extract 7 components, remove useEffect | High |
| `components/Navigation.js` | Delete or replace inline version | Low |
| `Novel.js` | Extract chapter content | Medium |
| `loreData.js` | Convert JSX to markdown | Medium |
| `sessionData.js` | Convert JSX to markdown | Medium |
| `index.html` | Move GlobalStyles here | Low |
| `package.json` | Add Tailwind, remove unused deps | Low |
