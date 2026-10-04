'use client';

import { useEffect } from 'react';

// Letters that must be held together, in any order. Matched on both the
// physical key (`code`, layout independent) and the typed character (`key`).
const letters = ['m', 'g', 'i'];

export default function MiguelEasterEgg() {
  useEffect(() => {
    const held = new Set<string>();
    let audio: HTMLAudioElement | undefined;
    let fired = false;

    const letterOf = (event: KeyboardEvent) => {
      const fromCode = /^Key([A-Z])$/.exec(event.code)?.[1]?.toLowerCase();
      const fromKey = event.key.length === 1 ? event.key.toLowerCase() : '';
      return letters.find((l) => l === fromCode || l === fromKey);
    };

    const play = () => {
      audio ??= new Audio('/miguel.mp3');
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const letter = letterOf(event);
      if (!letter) return;
      held.add(letter);
      if (fired || !letters.every((l) => held.has(l))) return;
      fired = true;
      play();
    };
    const onKeyUp = (event: KeyboardEvent) => {
      const letter = letterOf(event);
      if (letter) held.delete(letter);
      if (!letters.every((l) => held.has(l))) fired = false;
    };
    const reset = () => {
      held.clear();
      fired = false;
    };

    // Preload so playback starts immediately when the chord is completed.
    audio = new Audio('/miguel.mp3');
    audio.preload = 'auto';

    window.addEventListener('keydown', onKeyDown, true);
    window.addEventListener('keyup', onKeyUp, true);
    window.addEventListener('blur', reset);
    document.addEventListener('visibilitychange', reset);
    return () => {
      window.removeEventListener('keydown', onKeyDown, true);
      window.removeEventListener('keyup', onKeyUp, true);
      window.removeEventListener('blur', reset);
      document.removeEventListener('visibilitychange', reset);
    };
  }, []);

  return null;
}
