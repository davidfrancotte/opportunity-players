'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import type { PhoneRenderer } from '@/lib/phone-renderer';

export function Phone3D({
  label,
  screenSrc,
  children,
}: {
  label: string;
  screenSrc?: string;
  children: ReactNode;
}) {
  const phoneRef = useRef<HTMLElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const phone = phoneRef.current,
      host = canvasHostRef.current;
    const stage = phone?.closest<HTMLElement>('.app-phone-stage');
    if (!phone || !host || !stage) return;
    let renderer: PhoneRenderer | undefined;
    let cancelled = false,
      starting = false;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const direction = phone.closest('.app-phone-secondary') ? -1 : 1;
    const pose = (immediate = false) => {
      const x = reduced.matches
        ? 0
        : parseFloat(stage.style.getPropertyValue('--phone-turn-x')) || 0;
      const y = reduced.matches
        ? 0
        : parseFloat(stage.style.getPropertyValue('--phone-turn-y')) || 0;
      renderer?.setPose(x, y * direction, immediate || reduced.matches);
    };
    const fail = () => {
      delete phone.dataset.deviceReady;
      renderer?.dispose();
      renderer = undefined;
    };
    const start = async () => {
      if (starting || cancelled) return;
      starting = true;
      try {
        const { mountPhoneRenderer } = await import('@/lib/phone-renderer');
        if (cancelled) return;
        renderer = mountPhoneRenderer(host, label, screenSrc, fail);
        pose(true);
        phone.dataset.deviceReady = 'true';
      } catch {
        // The original raster remains a usable fallback without WebGL support.
        fail();
      }
    };
    const observer =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                void start();
                observer?.disconnect();
              }
            },
            { rootMargin: '150px' },
          )
        : null;
    if (observer) observer.observe(phone);
    else void start();
    const resizeObserver = new ResizeObserver(() => renderer?.resize());
    resizeObserver.observe(phone);
    const update = () => pose();
    const preferenceChanged = () => pose(true);
    stage.addEventListener('arena:phone-pose', update);
    reduced.addEventListener('change', preferenceChanged);
    return () => {
      cancelled = true;
      observer?.disconnect();
      resizeObserver.disconnect();
      stage.removeEventListener('arena:phone-pose', update);
      reduced.removeEventListener('change', preferenceChanged);
      renderer?.dispose();
    };
  }, [label, screenSrc]);
  return (
    <figure
      ref={phoneRef}
      className="app-phone"
      data-phone-model="solid"
      aria-label={`Smartphone 3D avec châssis métallique et boutons latéraux. ${label} : ${screenSrc ? 'capture de l’application' : 'écran provisoire, capture à venir'}.`}
    >
      <div className="app-phone-fallback" aria-hidden="true">
        {children}
      </div>
      <div
        ref={canvasHostRef}
        className="app-phone-canvas-host"
        aria-hidden="true"
      />
    </figure>
  );
}
