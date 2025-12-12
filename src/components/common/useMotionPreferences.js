import { useEffect, useMemo, useState } from 'react';

/**
 * Centralized motion/perf preferences:
 * - prefers-reduced-motion
 * - low-power heuristics (Save-Data / slow connection / low device memory)
 */
export default function useMotionPreferences() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => setPrefersReducedMotion(Boolean(mq.matches));
    update();

    // Safari < 14
    if (mq.addEventListener) mq.addEventListener('change', update);
    else mq.addListener(update);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', update);
      else mq.removeListener(update);
    };
  }, []);

  const lowPower = useMemo(() => {
    if (typeof navigator === 'undefined') return false;

    // Heuristics only; graceful fallback if unsupported.
    const dm = Number(navigator.deviceMemory || 0);
    const deviceMemoryLow = dm > 0 && dm <= 2;

    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const saveData = Boolean(conn?.saveData);
    const effectiveType = String(conn?.effectiveType || '').toLowerCase();
    const slowNetwork = effectiveType === '2g' || effectiveType === 'slow-2g';

    return deviceMemoryLow || saveData || slowNetwork;
  }, []);

  return {
    prefersReducedMotion,
    lowPower,
  };
}

