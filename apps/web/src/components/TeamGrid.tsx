import { teamMembers } from '@/content/team';

interface TeamGridProps {
  label: string;
  showRoles?: boolean;
}

const widths = [320, 640] as const;

export default function TeamGrid({ label, showRoles = true }: TeamGridProps) {
  return (
    <ul className="team-grid" aria-label={label}>
      {teamMembers.map((member) => (
        <li className="team-card" key={member.slug}>
          <img
            src={`/images/team/${member.slug}-640.webp`}
            srcSet={widths
              .map((w) => `/images/team/${member.slug}-${w}.webp ${w}w`)
              .join(', ')}
            sizes="(min-width: 76rem) 23vw, (min-width: 52rem) 30vw, (min-width: 40rem) 45vw, 100vw"
            alt={`Portrait of ${member.name}`}
            width="640"
            height="800"
            loading="lazy"
            decoding="async"
          />
          <div className="team-card-copy">
            <h3>{member.name}</h3>
            <p className="team-discipline">{member.discipline}</p>
            {showRoles && member.focus && member.focus.length > 0 && (
              <ul className="team-focus">
                {member.focus.slice(0, 3).map((focus) => (
                  <li key={focus}>{focus}</li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
