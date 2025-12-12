import React, { useEffect, useMemo, useState } from 'react';
import { buildLoreTips } from './loadingTips';

const pickRandom = (arr) => {
  if (!arr?.length) return null;
  return arr[Math.floor(Math.random() * arr.length)];
};

const Sigil = ({ className = '' }) => (
  <svg
    viewBox="0 0 64 64"
    aria-hidden="true"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="1.25" opacity="0.7" />
    <path
      d="M14 32c6.5-10.5 29.5-10.5 36 0-6.5 10.5-29.5 10.5-36 0Z"
      stroke="currentColor"
      strokeWidth="1.25"
      opacity="0.9"
    />
    <circle cx="32" cy="32" r="4.25" stroke="currentColor" strokeWidth="1.25" opacity="0.95" />
    <path
      d="M32 8v6M32 50v6M8 32h6M50 32h6"
      stroke="currentColor"
      strokeWidth="1.25"
      opacity="0.35"
      strokeLinecap="round"
    />
  </svg>
);

const useRotatingTip = ({ active, intervalMs = 3800 } = {}) => {
  const tips = useMemo(() => buildLoreTips(), []);
  const [tip, setTip] = useState(() => pickRandom(tips));

  useEffect(() => {
    if (!active) return;
    setTip((t) => t || pickRandom(tips));
    const id = window.setInterval(() => setTip(pickRandom(tips)), intervalMs);
    return () => window.clearInterval(id);
  }, [active, intervalMs, tips]);

  return tip;
};

const LoadingOverlay = ({ delayMs = 240 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setVisible(true), delayMs);
    return () => window.clearTimeout(id);
  }, [delayMs]);

  const tip = useRotatingTip({ active: visible });

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[80] pointer-events-none"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="absolute inset-0 bg-black/55 backdrop-blur-md" />
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="w-full max-w-lg text-center">
          <div className="mx-auto w-16 h-16 text-orange-200/70 animate-sigil-spin">
            <Sigil className="w-full h-full" />
          </div>
          <div className="mt-6 font-title text-xs tracking-[0.3em] uppercase text-stone-400">
            Turning the page…
          </div>
          {tip ? (
            <p className="mt-4 font-serif-text text-stone-200/90 leading-relaxed">
              {tip}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;

