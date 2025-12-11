# Memory Bank - Severed Realms Site

> **Purpose**: Persistent knowledge base for AI-assisted development
> **Scope**: React campaign website for "A Dirge to the Falseblood"

---

## 📁 Documentation Index

| Document | Description | When to Use |
|----------|-------------|-------------|
| [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md) | Project overview, tech stack, file structure | Starting any new session |
| [ARCHITECTURE_AUDIT.md](./ARCHITECTURE_AUDIT.md) | Detailed code analysis, issues found | Before major refactoring |
| [SCALING_ROADMAP.md](./SCALING_ROADMAP.md) | How to add features, folder patterns | Adding new functionality |
| [QUICK_FIXES.md](./QUICK_FIXES.md) | Immediate actionable improvements | Quick improvement sprints |

---

## 🎯 Key Insights at a Glance

### Project Health: 6.5/10
- ✅ Functional, visually polished
- ⚠️ Architectural debt building
- ❌ Some anti-patterns present

### Critical Issues
1. **App.js is 499 lines** - Contains 8 inline components that should be extracted
2. **Duplicate Navigation.js** - Exists in components/ but unused (App.js has inline version)
3. **JSX in data files** - Prevents future API integration
4. **Unused imports** - `useEffect` in App.js, `Swords` in sessionData.js

### Top 3 Recommended Actions
1. Extract inline components from App.js to separate files
2. Move GlobalStyles to CSS file (performance improvement)
3. Add Error Boundaries around content components

---

## 🗂️ Current File Quick Reference

```
severed-realms-site/src/
├── App.js              # Main app (needs splitting)
├── index.js            # Entry point
├── styles.css          # Base styles (expand this)
├── components/
│   ├── Navigation.js   # ⚠️ DELETE - unused duplicate
│   ├── Novel.js        # Chapter reader (1628 lines)
│   └── Sessions.js     # Session logs
└── data/
    ├── loreData.js     # Lore database
    └── sessionData.js  # Session records
```

---

## 📊 Session Continuity Data

### Active Development State
- **Server**: Running on `npm start` (port 3000)
- **Current Tab**: `home` (default)
- **Last Modified**: App.js, loreData.js open in editor

### Completed Work (This Session)
- [x] Full codebase audit completed
- [x] Memory bank initialized with 4 documents
- [x] All issues catalogued with priorities
- [x] Scaling patterns documented

### Pending Work
- [ ] Apply quick fixes from QUICK_FIXES.md
- [ ] Extract inline components from App.js
- [ ] Integrate or remove duplicate Navigation.js
- [ ] Convert JSX content to markdown + renderer

---

## 💡 Usage Guide for AI Assistants

### Starting a New Session
1. Read `PROJECT_CONTEXT.md` first
2. Check the "Pending Work" section above
3. Review `ARCHITECTURE_AUDIT.md` if making structural changes

### Common Tasks

**"Add a new page"**
→ See [SCALING_ROADMAP.md § Adding New Pages](./SCALING_ROADMAP.md#3-adding-new-pagesviews)

**"Fix an issue"**
→ Check [QUICK_FIXES.md](./QUICK_FIXES.md) for immediate actions
→ Check [ARCHITECTURE_AUDIT.md](./ARCHITECTURE_AUDIT.md) for deeper issues

**"Add a new component"**
→ See [SCALING_ROADMAP.md § Adding Components](./SCALING_ROADMAP.md#2-adding-new-components)

**"Understand the codebase"**
→ See [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md)

---

## 🔄 Update Log

| Date | Update |
|------|--------|
| 2025-12-11 | Initial memory bank creation |
| | Full audit of App.js and src/ folder |
| | Created 4 documentation files |
| | Identified 15+ issues with priorities |

---

## ⚙️ Maintaining This Memory Bank

### When to Update
- After major refactoring
- When adding new features
- When dependencies change
- When architectural decisions are made

### How to Update
1. Edit the relevant .md file
2. Update the date in PROJECT_CONTEXT.md
3. Add entry to Update Log above
4. Keep "Pending Work" section current

---

*This memory bank ensures continuity across development sessions and provides a single source of truth for project knowledge.*
