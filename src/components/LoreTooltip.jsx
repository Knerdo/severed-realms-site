import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import loreData from '../data/loreData';

const LoreTooltip = ({ loreKey, children }) => {
  const entry = useMemo(() => {
    const key = String(loreKey || '').trim();
    return key ? loreData?.[key] : null;
  }, [loreKey]);

  const [open, setOpen] = useState(false);

  if (!entry) return <>{children}</>;

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <button
        type="button"
        className="inline-flex items-baseline"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        {children}
      </button>

      {open ? (
        <span
          role="dialog"
          aria-label={`Lore: ${entry.title}`}
          className="absolute z-50 left-0 top-[calc(100%+10px)] w-[min(320px,80vw)]"
        >
          <span className="block glass-panel p-4 border border-stone-800">
            <span className="block font-title text-xs tracking-[0.28em] uppercase text-stone-500">
              Lore
            </span>
            <span className="mt-2 block font-title text-lg text-stone-100 tracking-wide">
              {entry.title}
            </span>
            <span className="mt-2 block text-sm text-stone-300 font-body leading-relaxed">
              {entry.body}
            </span>
          </span>
        </span>
      ) : null}
    </span>
  );
};

LoreTooltip.propTypes = {
  loreKey: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default LoreTooltip;

