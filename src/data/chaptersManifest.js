// Chapter metadata manifest.
//
// IMPORTANT:
// - This file contains *metadata only* (slug/title/teaser/status + the public markdown path).
// - Chapter *content* is loaded at runtime from `public/chapters/*.md` via fetch.
// - Keep `slug` stable because it is part of the URL: `/tome/:chapterSlug`.

const chapters = [
  {
    id: 1,
    num: 1,
    // Primary route identifier. This is used by `/tome/:chapterSlug`.
    // We use numeric slugs so `/tome/1`, `/tome/2`, ... work as requested.
    slug: '1',
    // Back-compat aliases (if any old links exist).
    legacySlugs: ['chapter-1'],
    title: "A Shadow's Prey",
    teaser:
      'Erevan stalks a land that no longer lives—acid rain, ritual wounds, and a spiral-crowned omen pulling him toward a doomed masterpiece.',
    status: 'published',
    // Public URL path (served from `public/`)
    markdownPath: '/chapters/chapter1.md',
  },
  {
    id: 2,
    num: 2,
    slug: '2',
    legacySlugs: ['chapter-2'],
    title: 'A Mask for the Gutterborne',
    teaser:
      'Maldan Breen plays wolf-in-silk among Caer Dusk’s elite—until a stranger’s spiral sigil fractures the game and forces a flight into the night.',
    status: 'published',
    markdownPath: '/chapters/chapter2.md',
  },
  {
    id: 3,
    num: 3,
    slug: '3',
    legacySlugs: ['chapter-3'],
    title: 'Ancestral Bonds',
    teaser:
      'Titus Granitefist carries a legacy of diamond-hard faith into a borderland of slaughter—where corrupted visions and a bone-winged blasphemy await.',
    status: 'published',
    markdownPath: '/chapters/chapter3.md',
  },
  {
    id: 4,
    num: 4,
    slug: '4',
    legacySlugs: ['chapter-4'],
    title: 'A Melody of Blood',
    teaser:
      'A new movement in the dirge—unreleased. This chapter page is live and will be uploaded once the manuscript is ready.',
    status: 'published',
    markdownPath: '/chapters/chapter4.md',
  },
];

export default chapters;

