'use client';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

// Safe bounds include all three heads, hands, shoes and both balls, not scenery.
const scenes = {
  wide: {
    src: '/images/arena-collective-color.webp',
    width: 1536,
    height: 768,
    bounds: [0.3, 0.05, 1, 0.9],
  },
  tall: {
    src: '/images/arena-collective-tall-color.webp',
    width: 1024,
    height: 1536,
    bounds: [0.08, 0.29, 0.98, 0.715],
  },
};
type Framing = { scene: keyof typeof scenes; style: CSSProperties };

export function HeroAthletes() {
  const ref = useRef<HTMLImageElement>(null);
  const [framing, setFraming] = useState<Framing>({ scene: 'tall', style: {} });
  useEffect(() => {
    const image = ref.current,
      frame = image?.parentElement;
    if (!image || !frame) return;
    const caption = frame.querySelector('.image-caption');
    function fit() {
      if (!frame) return;
      const w = frame.clientWidth,
        h = frame.clientHeight;
      if (!w || !h) return;
      const key = w / h >= 1.15 ? 'wide' : 'tall',
        s = scenes[key];
      const [left, top, right, bottom] = s.bounds;
      const side = Math.min(16, w * 0.04),
        header = 62;
      // Leave the restored overlay caption clear of players' feet.
      const footer = (caption?.getBoundingClientRect().height || 62) + 62;
      const availableHeight = Math.max(80, h - header - footer);
      const scale = Math.min(
        (w - side * 2) / ((right - left) * s.width),
        availableHeight / ((bottom - top) * s.height),
      );
      const iw = s.width * scale,
        ih = s.height * scale;
      const centeredLeft = w / 2 - ((left + right) / 2) * iw;
      const fillLeft = Math.max(w - iw, Math.min(0, centeredLeft));
      const safeLeft = Math.max(
        side - left * iw,
        Math.min(w - side - right * iw, fillLeft),
      );
      setFraming({
        scene: key,
        style: {
          width: iw,
          height: ih,
          left: safeLeft,
          top: header + availableHeight / 2 - ((top + bottom) / 2) * ih,
        },
      });
    }
    const observer = new ResizeObserver(fit);
    observer.observe(frame);
    if (caption) observer.observe(caption);
    fit();
    return () => observer.disconnect();
  }, []);
  const scene = scenes[framing.scene];
  return (
    <img
      ref={ref}
      className="athlete-image hero-athletes"
      data-athlete-color="selective"
      data-scene={framing.scene}
      src={scene.src}
      width={scene.width}
      height={scene.height}
      fetchPriority="high"
      alt="Trois sportifs en pied : une coureuse, un footballeur et une basketteuse, avec leurs ballons."
      style={framing.style}
    />
  );
}
