'use client';

import { useEffect, useRef } from 'react';

// Letters that must be held together, in any order. Matched on both the
// physical key (`code`, layout independent) and the typed character (`key`).
const letters = ['s', 't', 'a'];
// How long the chord must be held before the screen goes black.
const holdMs = 2000;
const videoSrc = encodeURI('/not easter egg.mp4');

export default function StaEasterEgg() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const video = videoRef.current;
    if (!overlay || !video) return;

    const held = new Set<string>();
    let timer: number | undefined;
    let active = false;

    const letterOf = (event: KeyboardEvent) => {
      const fromCode = /^Key([A-Z])$/.exec(event.code)?.[1]?.toLowerCase();
      const fromKey = event.key.length === 1 ? event.key.toLowerCase() : '';
      return letters.find((l) => l === fromCode || l === fromKey);
    };

    const isTyping = (event: KeyboardEvent) => {
      const target = event.target;
      return (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))
      );
    };

    const show = () => {
      active = true;
      overlay.classList.add('is-active');
      video.muted = false;
      video.volume = 1;
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    const hide = () => {
      window.clearTimeout(timer);
      timer = undefined;
      if (!active) return;
      active = false;
      video.pause();
      video.currentTime = 0;
      overlay.classList.remove('is-active');
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey || isTyping(event))
        return;
      const letter = letterOf(event);
      if (!letter) return;
      // Start fetching the (5 MB) video as soon as the chord is begun, so it is
      // ready by the time the hold completes. Visitors who never press S/T/A
      // never download it.
      if (video.preload !== 'auto') {
        video.preload = 'auto';
        video.load();
      }
      held.add(letter);
      if (timer !== undefined || active || !letters.every((l) => held.has(l)))
        return;
      timer = window.setTimeout(() => {
        timer = undefined;
        if (letters.every((l) => held.has(l))) show();
      }, holdMs);
    };

    const onKeyUp = (event: KeyboardEvent) => {
      const letter = letterOf(event);
      if (letter) held.delete(letter);
      if (!letters.every((l) => held.has(l))) hide();
    };

    const reset = () => {
      held.clear();
      hide();
    };

    window.addEventListener('keydown', onKeyDown, true);
    window.addEventListener('keyup', onKeyUp, true);
    window.addEventListener('blur', reset);
    document.addEventListener('visibilitychange', reset);
    return () => {
      window.removeEventListener('keydown', onKeyDown, true);
      window.removeEventListener('keyup', onKeyUp, true);
      window.removeEventListener('blur', reset);
      document.removeEventListener('visibilitychange', reset);
      reset();
    };
  }, []);

  return (
    <div ref={overlayRef} className="sta-egg" aria-hidden="true">
      <video ref={videoRef} src={videoSrc} preload="none" playsInline loop />
    </div>
  );
}
