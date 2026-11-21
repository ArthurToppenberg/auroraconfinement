const scenes = {
  engineers: (
    <>
      <circle cx="16" cy="24" r="9" />
      <circle cx="43" cy="19" r="11" />
      <circle cx="70" cy="24" r="9" />
      <path d="M3 49v-2a13 13 0 0 1 22-9 M26 49v-2a17 17 0 0 1 34 0v2 M61 38a13 13 0 0 1 22 9v2" />
      <path d="M13 23h.1 M19 23h.1 M39 17h.1 M47 17h.1 M67 23h.1 M73 23h.1" />
      <path
        className="home-evidence-icon-accent"
        d="M13 27q3 3 6 0 M39 22q4 5 8 0 M67 27q3 3 6 0"
      />
    </>
  ),
  awareness: (
    <>
      <circle cx="24" cy="21" r="15" />
      <path d="M3 49q4-13 21-13t21 13" />
      <path
        className="home-evidence-icon-accent"
        d="M19 17a5 5 0 1 1 8 4q-3 2-3 4 M24 29h.1"
      />
    </>
  ),
  laboratories: (
    <>
      <path d="M3 20 25 7l22 13H3Z M8 20v25 M19 20v25 M31 20v25 M42 20v25 M5 45h40v4H5Z" />
      <ellipse
        className="home-evidence-icon-accent"
        cx="72"
        cy="30"
        rx="15"
        ry="8"
      />
      <ellipse
        className="home-evidence-icon-accent"
        cx="72"
        cy="30"
        rx="7"
        ry="3"
      />
      <path d="M62 37v4 M82 37v4 M56 41h32v4H56Z M60 45v4 M84 45v4" />
    </>
  ),
};

export default function HomeEvidenceIcon({
  scene,
}: {
  scene: keyof typeof scenes;
}) {
  return (
    <svg
      className="home-evidence-icon"
      viewBox="0 0 96 54"
      width="96"
      height="54"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {scenes[scene]}
    </svg>
  );
}
