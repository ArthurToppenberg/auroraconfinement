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

    // Called inside the keydown that completes the chord (a real user gesture,
    // like MiguelEasterEgg's audio.play()), so the browser always allows it.
    // It plays muted and hidden while the hold runs, then show() unmutes it.
    const prime = () => {
      video.muted = true;
      video.volume = 1;
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    const show = () => {
      active = true;
      overlay.classList.add('is-active');
      video.currentTime = 0;
      video.muted = false;
      video.volume = 1;
      if (video.paused) video.play().catch(() => {});
    };

    const hide = () => {
      const pending = timer !== undefined;
      window.clearTimeout(timer);
      timer = undefined;
      if (!active && !pending) return;
      active = false;
      video.pause();
      video.currentTime = 0;
      video.muted = true;
      overlay.classList.remove('is-active');
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey || isTyping(event))
        return;
      const letter = letterOf(event);
      if (!letter) return;
      held.add(letter);
      if (timer !== undefined || active || !letters.every((l) => held.has(l)))
        return;
      prime();
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
      <video ref={videoRef} src={videoSrc} preload="auto" playsInline loop />
    </div>
  );
}
