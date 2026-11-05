'use client';

import { useEffect } from 'react';

// Letters that must be held together, in any order. Matched on both the
// physical key (`code`, layout independent) and the typed character (`key`).
const letters = ['s', 't', 'a'];
// How long the chord must be held before the screen goes black.
const holdMs = 2000;
const videoSrc = encodeURI('/not easter egg.mp4');

// Nothing is rendered or downloaded until the chord is pressed: the overlay and
// video are created from JS at that moment and fully destroyed on release.
export default function StaEasterEgg() {
  useEffect(() => {
    const held = new Set<string>();
    let timer: number | undefined;
    let overlay: HTMLDivElement | undefined;
    let video: HTMLVideoElement | undefined;

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

    // Runs inside the keydown that completes the chord (a real user gesture,
    // like MiguelEasterEgg's audio.play()), so the browser allows playback.
    // The video starts muted inside a hidden overlay while the hold runs.
    const load = () => {
      overlay = document.createElement('div');
      overlay.className = 'sta-egg';
      overlay.setAttribute('aria-hidden', 'true');
      video = document.createElement('video');
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.src = videoSrc;
      overlay.append(video);
      document.body.append(overlay);
      video.play().catch(() => {});
    };

    const show = () => {
      if (!overlay || !video) return;
      overlay.classList.add('is-active');
      video.currentTime = 0;
      video.muted = false;
      video.volume = 1;
      if (video.paused) video.play().catch(() => {});
    };

    // Stop playback, abort the download and remove the element entirely.
    const unload = () => {
      window.clearTimeout(timer);
      timer = undefined;
      if (video) {
        video.pause();
        video.removeAttribute('src');
        video.load();
      }
      overlay?.remove();
      overlay = undefined;
      video = undefined;
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey || isTyping(event))
        return;
      const letter = letterOf(event);
      if (!letter) return;
      held.add(letter);
      if (video || !letters.every((l) => held.has(l))) return;
      load();
      timer = window.setTimeout(() => {
        timer = undefined;
        if (letters.every((l) => held.has(l))) show();
      }, holdMs);
    };

    const onKeyUp = (event: KeyboardEvent) => {
      const letter = letterOf(event);
      if (letter) held.delete(letter);
      if (!letters.every((l) => held.has(l))) unload();
    };

    const reset = () => {
      held.clear();
      unload();
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

  return null;
}
