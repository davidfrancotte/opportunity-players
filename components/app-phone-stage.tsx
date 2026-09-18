'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { phoneScrollPose } from '@/lib/phone-motion';

/** Only this small visual wrapper is client-side; page copy stays server-rendered.
 * Both hardware and screen turn together, with no scroll hijacking or React
 * render per frame. Off-screen devices do no animation work.
 */
export function AppPhoneStage({
  children,
  duo,
}: {
  children: ReactNode;
  duo: boolean;
}) {
  const stageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!visible || reducedMotion.matches) return;
      const rect = stage.getBoundingClientRect();
      const pose = phoneScrollPose(rect.top, rect.height, window.innerHeight);
      stage.style.setProperty(
        '--phone-turn-y',
        `${pose.rotateY.toFixed(3)}deg`,
      );
      stage.style.setProperty(
        '--phone-turn-x',
        `${pose.rotateX.toFixed(3)}deg`,
      );
      stage.dispatchEvent(new Event('arena:phone-pose'));
    };
    const schedule = () => {
      if (visible && !reducedMotion.matches && !frame)
        frame = window.requestAnimationFrame(update);
    };
    const stop = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      delete stage.dataset.motionActive;
    };
    const preferenceChanged = () => {
      if (reducedMotion.matches) {
        stop();
        stage.style.removeProperty('--phone-turn-y');
        stage.style.removeProperty('--phone-turn-x');
        stage.dispatchEvent(new Event('arena:phone-pose'));
      } else if (visible) {
        stage.dataset.motionActive = 'true';
        schedule();
      }
    };
    const observer =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible) preferenceChanged();
            else stop();
          })
        : null;

    if (observer) observer.observe(stage);
    else {
      visible = true;
      preferenceChanged();
    }
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    reducedMotion.addEventListener('change', preferenceChanged);
    return () => {
      stop();
      observer?.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      reducedMotion.removeEventListener('change', preferenceChanged);
    };
  }, []);

  return (
    <figure
      ref={stageRef}
      data-phone-scroll="3d"
      className={`app-phone-stage ${duo ? 'app-phone-stage--duo' : ''}`}
    >
      {children}
    </figure>
  );
}
