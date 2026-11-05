type RoadmapTrack = 'exhibition' | 'research';
type RoadmapPhase = 1 | 2 | 3 | 4;

function TabletopModel() {
  return (
    <g>
      <ellipse cx="55" cy="52" rx="29" ry="15" />
      <ellipse cx="55" cy="52" rx="16" ry="7" />
      <path d="M29 47q-7 6 0 12 M81 47q7 6 0 12 M38 39l4 8 M68 39l-4 8 M39 63v10 M71 63v10 M25 74h60 M31 74v6 M79 74v6" />
    </g>
  );
}

export default function RoadmapScene({
  track,
  phase,
}: {
  track: RoadmapTrack;
  phase: RoadmapPhase;
}) {
  return (
    <svg
      className={`roadmap-scene roadmap-scene-${phase}`}
      viewBox="0 0 160 100"
      width="120"
      height="75"
      aria-hidden="true"
      focusable="false"
    >
      {track === 'exhibition' && phase === 1 && (
        <>
          <TabletopModel />
          <path d="M98 20h42v62H98Z M105 29h27 M105 35h16 M105 71h26" />
          <path
            className="roadmap-stroke-reveal roadmap-scene-accent"
            pathLength="1"
            d="M104 54c6-20 13 20 20 0s10-5 10 0 M106 62c6-20 13 20 20 0"
          />
        </>
      )}
      {track === 'research' && phase === 1 && (
        <>
          <path d="M19 42v32 M79 42v32 M19 74q30 17 60 0 M28 84v7 M70 84v7 M14 91h71" />
          <ellipse cx="49" cy="42" rx="30" ry="14" />
          <ellipse cx="49" cy="42" rx="16" ry="6" />
          <path d="M25 32q-11 12 0 24 M39 29q-9 13 0 26 M61 29q9 13 0 26 M73 32q11 12 0 24 M96 18h47v48H96Z M111 66v9 M104 76h28" />
          <path
            className="roadmap-stroke-reveal roadmap-scene-accent"
            pathLength="1"
            d="M102 48q7-29 15-6t19-7 M101 57h35"
          />
        </>
      )}
      {track === 'exhibition' && phase === 2 && (
        <>
          <g className="roadmap-assembly">
            <TabletopModel />
          </g>
          <g className="roadmap-assembly roadmap-assembly-later">
            <path d="M101 20h29v22h-29Z M107 27h17 M107 34h8 M130 31h13v36h-13 M103 72v-8h23v16h-23Z" />
            <circle cx="114" cy="69" r="2" />
          </g>
          <path d="M84 52h11v20h8 M92 41V15H18v66h76 M17 82h128" />
        </>
      )}
      {track === 'research' && phase === 2 && (
        <>
          <g className="roadmap-assembly">
            <ellipse cx="65" cy="40" rx="29" ry="13" />
            <path d="M36 40v27q29 18 58 0V40 M45 29q-12 13 0 25 M62 27q-10 14 0 27 M81 29q12 13 0 25 M46 76v10 M84 76v10" />
          </g>
          <g className="roadmap-assembly roadmap-assembly-later">
            <path d="M13 65h16v19H13Z M94 55h18v-23h33v53h-33 M119 43h19 M119 52h19 M120 65v10 M129 65v10 M138 65v10" />
            <circle cx="21" cy="74" r="4" />
          </g>
          <path
            className="roadmap-scene-accent"
            d="M29 72h7 M59 78v12h42V74h11"
          />
          <path d="M8 90h141" />
        </>
      )}
      {track === 'exhibition' && phase === 3 && (
        <>
          <TabletopModel />
          <path d="M101 29h42v41h-42Z M109 70v10 M135 70v10 M95 81h53 M84 57h17" />
          <path
            className="roadmap-stroke-reveal roadmap-scene-accent"
            pathLength="1"
            d="M107 54h8l4-13 7 21 5-10h6"
          />
        </>
      )}
      {track === 'research' && phase === 3 && (
        <>
          <ellipse cx="49" cy="59" rx="26" ry="17" />
          <ellipse cx="49" cy="59" rx="15" ry="9" />
          <path d="M29 49q-8 10 0 19 M69 49q8 10 0 19 M32 74v10 M66 74v10 M16 85h68 M99 17h43v34H99Z M107 51v7 M135 51v7 M93 59h55" />
          <g className="roadmap-probe">
            <path d="M10 32h23v16 M29 48h8" />
          </g>
          <path
            className="roadmap-stroke-reveal roadmap-scene-accent"
            pathLength="1"
            d="M105 39h6l4-12 7 19 6-11h8"
          />
          <circle cx="119" cy="76" r="11" />
          <path d="m119 76 5-6 M119 87v4 M111 91h16 M76 65h20v11h12" />
        </>
      )}
      {track === 'exhibition' && phase === 4 && (
        <>
          <g transform="translate(34 4) scale(.8)">
            <TabletopModel />
          </g>
          <path d="M25 29a7 7 0 1 0 0-14 7 7 0 0 0 0 14 M15 62l2-20q8-13 16 0l4 17 M20 44v27h11V44 M21 71l-3 16 M30 71l3 16 M35 46l12 7 9-6 M133 36a7 7 0 1 0 0-14 7 7 0 0 0 0 14 M122 64l2-18q9-12 18 0l3 18 M128 50v22h11V50 M129 72l-2 15 M138 72l3 15 M48 69h61v5H48 M53 74v13 M104 74v13 M8 88h143" />
        </>
      )}
      {track === 'research' && phase === 4 && (
        <>
          <path d="M18 27h119v58H18Z M18 36h119 M30 80V43 M125 80V43 M13 86h130 M46 72v8 M100 72v8 M39 80h69" />
          <path
            className="roadmap-plasma-ring"
            fillRule="evenodd"
            d="M108 55a35 16 0 1 1-70 0 35 16 0 1 1 70 0ZM90 55a17 6 0 1 0-34 0 17 6 0 1 0 34 0Z"
          />
          <path d="M42 44q-10 11 0 22 M104 44q10 11 0 22 M56 39l4 7 M90 39l-4 7 M56 71l4-7 M90 71l-4-7 M142 49h10v30h-10 M146 56h2 M146 63h2" />
        </>
      )}
    </svg>
  );
}
