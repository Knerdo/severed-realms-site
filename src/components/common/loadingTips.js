import { GRIMOIRE_DB, sessionsData, novelData } from '../../data';

const curatedTips = [
  'Tip: Direct links are stable—bookmark pages in the Grimoire, Chronicles, and Tome.',
  'Tip: Use the navigation bar to jump between The Tome, the Grimoire, and the Chronicles.',
  'Tip: Keyboard focus is supported—use Tab/Shift+Tab to navigate UI.',
];

const safeText = (v) => (v == null ? '' : String(v)).trim();

export const buildLoreTips = () => {
  const tips = [];

  try {
    const db = GRIMOIRE_DB;
    for (const key of Object.keys(db || {})) {
      const cat = db[key];
      const catTitle = safeText(cat?.title);
      for (const item of cat?.items || []) {
        const t = safeText(item?.title);
        const s = safeText(item?.subtitle);
        if (!t) continue;
        tips.push(`${catTitle ? `${catTitle}: ` : ''}${t}${s ? ` — ${s}` : ''}`);
      }
    }
  } catch (_) {
    // ignore; fall back to curatedTips
  }

  try {
    for (const s of sessionsData || []) {
      if (!s?.title) continue;
      tips.push(`Chronicle: Session ${s.id} — ${s.title}`);
    }
  } catch (_) {
    // ignore
  }

  try {
    for (const ch of novelData || []) {
      const n = Number(ch?.id);
      const title = safeText(ch?.title) || (Number.isFinite(n) ? `Chapter ${n}` : 'Chapter');
      tips.push(`The Tome: Chapter ${Number.isFinite(n) ? n : ''} — ${title}`.trim());
    }
  } catch (_) {
    // ignore
  }

  const merged = [...curatedTips, ...tips].filter(Boolean);
  // Keep the list reasonably small.
  return merged.slice(0, 80);
};

