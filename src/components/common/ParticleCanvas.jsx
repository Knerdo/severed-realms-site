import React, { useEffect, useMemo, useRef } from 'react';
import useMotionPreferences from './useMotionPreferences';

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

/**
 * Subtle dust/ember particles rendered via Canvas.
 * - Designed to be lightweight (single canvas, rAF)
 * - Adjustable via props
 * - Honors prefers-reduced-motion and low-power heuristics
 */
const ParticleCanvas = ({
  className = '',
  density = 0.9,
  colors = ['rgba(255, 182, 72, 0.32)', 'rgba(255, 255, 255, 0.12)'],
  blendMode = 'screen',
  motionScale = 1,
}) => {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);
  const particlesRef = useRef([]);
  const lastTRef = useRef(0);
  const { prefersReducedMotion, lowPower } = useMotionPreferences();

  const settings = useMemo(() => {
    // density: particles per 10k px^2, clamped to sane bounds.
    const d = clamp(Number(density) || 0, 0, 2.5);
    return {
      density: d,
      colors: Array.isArray(colors) && colors.length ? colors : ['rgba(255,255,255,0.12)'],
      blendMode: blendMode || 'screen',
      motionScale: clamp(Number(motionScale) || 0, 0, 2),
    };
  }, [density, colors, blendMode, motionScale]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    const reduce = prefersReducedMotion;
    const powerSave = lowPower;

    const state = {
      w: 0,
      h: 0,
      dpr: 1,
      // 30fps on low-power devices, 60fps otherwise
      minFrameMs: powerSave ? 33 : 16,
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();

      state.w = Math.max(1, Math.floor(rect.width));
      state.h = Math.max(1, Math.floor(rect.height));
      state.dpr = clamp(window.devicePixelRatio || 1, 1, 2);

      canvas.width = Math.floor(state.w * state.dpr);
      canvas.height = Math.floor(state.h * state.dpr);
      canvas.style.width = `${state.w}px`;
      canvas.style.height = `${state.h}px`;

      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
      rebuildParticles();
    };

    const rand = (min, max) => min + Math.random() * (max - min);
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const rebuildParticles = () => {
      const area = state.w * state.h;
      const baseCount = Math.round((area / 10000) * settings.density * 12);
      const count = clamp(baseCount, 0, powerSave ? 110 : 220);

      particlesRef.current = Array.from({ length: count }, () => {
        const emberBias = Math.random();
        return {
          x: rand(0, state.w),
          y: rand(0, state.h),
          r: rand(0.6, emberBias > 0.85 ? 2.2 : 1.4),
          a: rand(0.08, emberBias > 0.85 ? 0.35 : 0.22),
          vx: rand(-0.08, 0.08),
          vy: rand(-0.22, -0.06),
          tw: rand(0.6, 1.3),
          c: pick(settings.colors),
        };
      });
    };

    const renderFrame = (t, motion) => {
      const lastT = lastTRef.current || t;
      const dt = t - lastT;
      if (dt < state.minFrameMs) return false;
      lastTRef.current = t;

      ctx.clearRect(0, 0, state.w, state.h);
      ctx.globalCompositeOperation = settings.blendMode;

      const ps = particlesRef.current;
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];

        // update
        if (motion > 0) {
          const drift = 0.2 * motion;
          p.x += (p.vx + Math.sin((t / 1000) * p.tw + i) * 0.02) * (dt / 16) * drift;
          p.y += p.vy * (dt / 16) * drift;

          // wrap
          if (p.y < -10) p.y = state.h + 10;
          if (p.x < -10) p.x = state.w + 10;
          if (p.x > state.w + 10) p.x = -10;
        }

        // render
        ctx.fillStyle = p.c;
        ctx.globalAlpha = p.a;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      return true;
    };

    const draw = (t) => {
      frameRef.current = window.requestAnimationFrame(draw);
      const motion = reduce ? 0 : settings.motionScale;
      renderFrame(t, motion);
    };

    // Init
    resize();

    // Reduced-motion mode: render once (static particles), avoid continuous animation.
    if (reduce || settings.motionScale === 0) {
      renderFrame(performance.now(), 0);
      let ro;
      let onWinResize;
      if (typeof ResizeObserver !== 'undefined') {
        ro = new ResizeObserver(() => {
          resize();
          renderFrame(performance.now(), 0);
        });
        if (canvas.parentElement) ro.observe(canvas.parentElement);
      } else {
        onWinResize = () => {
          resize();
          renderFrame(performance.now(), 0);
        };
        window.addEventListener('resize', onWinResize);
      }

      return () => {
        if (ro) ro.disconnect();
        if (onWinResize) window.removeEventListener('resize', onWinResize);
      };
    }

    frameRef.current = window.requestAnimationFrame(draw);

    let ro;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => resize());
      if (canvas.parentElement) ro.observe(canvas.parentElement);
    } else {
      window.addEventListener('resize', resize);
    }

    return () => {
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
      if (ro) ro.disconnect();
      if (!ro) window.removeEventListener('resize', resize);
    };
  }, [settings, prefersReducedMotion, lowPower]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{ mixBlendMode: blendMode, pointerEvents: 'none' }}
    />
  );
};

export default ParticleCanvas;

