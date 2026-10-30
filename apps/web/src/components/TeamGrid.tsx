import { teamMembers, type TeamGroup } from '@/content/team';

interface TeamGridProps {
  group: TeamGroup;
  label: string;
  showRoles?: boolean;
}

const widths = [320, 640] as const;

export default function TeamGrid({
  group,
  label,
  showRoles = true,
}: TeamGridProps) {
  const members = teamMembers.filter((member) => member.group === group);
  return (
    <ul className={`team-grid team-grid-${group}`} aria-label={label}>
      {members.map((member) => (
        <li className="team-card" key={member.slug}>
          <img
            src={`/images/team/${member.slug}-640.webp`}
            srcSet={widths
              .map((w) => `/images/team/${member.slug}-${w}.webp ${w}w`)
              .join(', ')}
            sizes="(min-width: 64rem) 16vw, (min-width: 40rem) 30vw, 46vw"
            alt={`Portrait of ${member.name}`}
            width="640"
            height="800"
            loading="lazy"
            decoding="async"
          />
          <h4>{member.name}</h4>
          <p className="team-discipline">{member.discipline}</p>
          {showRoles && member.role && (
            <p className="team-role">{member.role}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
