import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const STORAGE_KEY = 'sr_nav_sfx_enabled_v1';

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

export default function useTickSfx({
  volume = 0.035,
  minIntervalMs = 160,
} = {}) {
  const [enabled, setEnabled] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw === null) return true;
      return raw === '1';
    } catch {
      return true;
    }
  });

  const [armed, setArmed] = useState(false);
  const audioCtxRef = useRef(null);
  const lastPlayedRef = useRef(0);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, enabled ? '1' : '0');
    } catch {
      // ignore
    }
  }, [enabled]);

  // Gate WebAudio behind a real user interaction.
  useEffect(() => {
    const arm = async () => {
      setArmed(true);
      if (audioCtxRef.current) return;
      try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return;
        const ctx = new Ctx();
        audioCtxRef.current = ctx;
        if (ctx.state === 'suspended') {
          await ctx.resume();
        }
      } catch {
        // ignore
      }
    };

    window.addEventListener('pointerdown', arm, { once: true, passive: true });
    window.addEventListener('keydown', arm, { once: true });
    return () => {
      window.removeEventListener('pointerdown', arm);
      window.removeEventListener('keydown', arm);
    };
  }, []);

  const playTick = useCallback(() => {
    if (!enabled) return;
    if (!armed) return;

    const now = performance.now();
    if (now - lastPlayedRef.current < minIntervalMs) return;
    lastPlayedRef.current = now;

    const ctx = audioCtxRef.current;
    if (!ctx) return;

    try {
      const o = ctx.createOscillator();
      const g = ctx.createGain();

      // Slightly "mechanical/magical" tick: quick pitch drop.
      const t0 = ctx.currentTime;
      o.type = 'triangle';
      o.frequency.setValueAtTime(740, t0);
      o.frequency.exponentialRampToValueAtTime(420, t0 + 0.03);

      g.gain.setValueAtTime(0.00001, t0);
      g.gain.exponentialRampToValueAtTime(clamp(volume, 0.00001, 0.2), t0 + 0.004);
      g.gain.exponentialRampToValueAtTime(0.00001, t0 + 0.06);

      o.connect(g);
      g.connect(ctx.destination);
      o.start(t0);
      o.stop(t0 + 0.065);

      o.onended = () => {
        try {
          o.disconnect();
          g.disconnect();
        } catch {
          // ignore
        }
      };
    } catch {
      // ignore
    }
  }, [armed, enabled, minIntervalMs, volume]);

  const toggleEnabled = useCallback(() => setEnabled((v) => !v), []);

  return useMemo(
    () => ({
      enabled,
      toggleEnabled,
      playTick,
    }),
    [enabled, playTick, toggleEnabled]
  );
}

