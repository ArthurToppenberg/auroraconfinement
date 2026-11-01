import type { Voice } from '@/content/voices';

interface VoiceFieldProps {
  voices: readonly Voice[];
  placeholder: boolean;
}

// Personal anecdotes as separate cards that drift around on their own paths
// (CSS only, no script). Every quote is always visible; with reduced motion
// the cards simply sit still.
export default function VoiceField({ voices, placeholder }: VoiceFieldProps) {
  return (
    <ul className="voice-field" aria-label="Personal anecdotes">
      {voices.map((voice, index) => (
        <li key={index} className="voice-float">
          <figure className="voice-card">
            {placeholder && <p className="voice-flag">Placeholder</p>}
            <blockquote>
              <p>{voice.quote}</p>
            </blockquote>
            <figcaption>
              <strong>{voice.name}</strong>
              <span>{voice.role}</span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
