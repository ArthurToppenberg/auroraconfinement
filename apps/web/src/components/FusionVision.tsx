import AnimatedNumbers from './AnimatedNumbers';
import type { ComponentType } from 'react';
import VisionPowerCable from '@/components/VisionPowerCable';
import VisionBenefitIcon, {
  type VisionBenefitKind,
} from '@/components/VisionBenefitIcon';

// A symmetric illustrative torus; highlights travel clockwise around it.
function torusLoop(rx: number, ry: number) {
  return (
    Array.from({ length: 160 }, (_, index) => {
      const angle = -Math.PI / 2 + (index * Math.PI * 2) / 160;
      const x = 143 + rx * Math.cos(angle);
      const y = 113 + ry * Math.sin(angle);
      return `${index ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)}`;
    }).join(' ') + 'Z'
  );
}

// Symbolic helical strands around the torus; no engineering field geometry.
function helicalStrand(phase: number) {
  return (
    Array.from({ length: 240 }, (_, index) => {
      const angle = -Math.PI / 2 + (index * Math.PI * 2) / 240;
      const twist = 5 * angle + phase;
      const x = 143 + (46 + 11 * Math.cos(twist)) * Math.cos(angle);
      const y =
        113 +
        (21 + 5 * Math.cos(twist)) * Math.sin(angle) +
        5 * Math.sin(twist);
      return `${index ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)}`;
    }).join(' ') + 'Z'
  );
}

function coilOutline(angle: number) {
  return (
    Array.from({ length: 48 }, (_, index) => {
      const turn = (index * Math.PI * 2) / 48;
      const x = 143 + (46 + 20 * Math.cos(turn)) * Math.cos(angle);
      const y =
        113 + (21 + 9 * Math.cos(turn)) * Math.sin(angle) + 10 * Math.sin(turn);
      return `${index ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)}`;
    }).join(' ') + 'Z'
  );
}

// Illustrative future scenes, not existing Aurora facilities or products.
function FusionFacility() {
  return (
    <svg
      viewBox="0 0 320 190"
      width="320"
      height="190"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M25 170V47h270v123 M25 47V30h270v17 M25 64h270 M42 78v92h236V78 M16 170h288" />
      <defs>
        <clipPath id="vision-plasma-aperture">
          <path
            clipRule="evenodd"
            d={`${torusLoop(61, 31)} ${torusLoop(30, 12)}`}
          />
        </clipPath>
      </defs>
      <g className="vision-coil-outline">
        {Array.from({ length: 12 }, (_, index) => (
          <path key={index} d={coilOutline((index * Math.PI) / 6)} />
        ))}
      </g>
      <path
        className="vision-plasma"
        fillRule="evenodd"
        d={`${torusLoop(61, 31)} ${torusLoop(30, 12)}`}
      />
      <g clipPath="url(#vision-plasma-aperture)">
        {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((phase) => (
          <g key={phase}>
            <path className="vision-plasma-thread" d={helicalStrand(phase)} />
            <path
              className="vision-plasma-flow"
              d={helicalStrand(phase)}
              pathLength="100"
            />
          </g>
        ))}
      </g>
      <path
        className="vision-vessel-rim"
        d={`${torusLoop(64, 34)} ${torusLoop(28, 10)}`}
      />
      <path d="M104 153h78 M114 153v17 M172 153v17" />
      <path d="M235 115h26v55 M242 125h12 M242 137h12" />
      <circle
        data-cable-port="plant"
        cx="261"
        cy="170"
        r="0.1"
        className="vision-cable-port"
      />
    </svg>
  );
}

function ElectricityNetwork() {
  return (
    <svg
      viewBox="0 0 320 190"
      width="320"
      height="190"
      aria-hidden="true"
      focusable="false"
    >
      <path d="m35 170 29-147 29 147 M45 123h38 M50 96h28 M40 52h48 M31 72h66 M42 170l41-47 M86 170l-41-47 M48 52v10 M80 52v10 M38 72v10 M90 72v10" />
      <circle
        data-cable-port="mast-out"
        cx="89"
        cy="62"
        r="0.1"
        className="vision-cable-port"
      />
      <circle
        data-cable-port="transformer-in"
        cx="231"
        cy="105"
        r="0.1"
        className="vision-cable-port"
      />
      <circle
        data-cable-port="tower"
        cx="48"
        cy="62"
        r="0.1"
        className="vision-cable-port"
      />
      <circle
        data-cable-port="transformer"
        cx="271"
        cy="164"
        r="0.1"
        className="vision-cable-port"
      />
      <path d="M149 164v-59h122v59Z M159 117v34 M173 117v34 M187 117v34 M201 117v34 M215 117v34 M229 117v34 M245 117v34 M143 164h134 M158 164v6 M262 164v6 M171 105V91 M195 105V91 M165 91h12 M189 91h12 M165 85h12 M189 85h12 M25 170h267" />
    </svg>
  );
}

function FamilyFuture() {
  return (
    <svg
      viewBox="0 0 320 190"
      width="320"
      height="190"
      aria-hidden="true"
      focusable="false"
    >
      <g className="vision-foliage">
        <path d="M166 164V71 M166 105l-11-13 M166 84l13-12 M166 65c-20 1-30-21-16-35-3-17 22-28 32-13 22 0 29 28 12 39-4 17-21 20-28 9 M262 166v-65 M262 121l11-11 M262 95c-17 1-25-16-15-27-2-15 17-24 28-13 19 0 24 25 9 32-3 14-17 18-22 8" />
        <path d="M270 170q2-13 12-11 8-13 18-3 11 0 12 14" />
      </g>
      <path
        className="vision-home-fill"
        d="m43 89 59-43 59 43-11-8v89H54V81Z"
      />
      <path d="m43 89 59-43 59 43 M54 81v89h96V81 M73 170v-40h24v40 M112 112h22v23h-22Z M66 101h23v17H66Z M17 170h289" />
      <path
        className="vision-foliage"
        d="M22 170V89 M22 101l-9-9 M22 86c-17 2-22-17-12-26-5-14 13-25 23-15 16-1 24 20 11 30 1 10-13 18-22 11 M285 170V96 M285 125l-10-10 M285 110l11-12 M285 93c-20 3-28-21-14-33-4-17 20-28 31-14 19 4 21 30 5 38-2 13-17 18-22 9"
      />
      <circle
        data-cable-port="house"
        cx="54"
        cy="155"
        r="0.1"
        className="vision-cable-port"
      />
      <circle cx="203" cy="109" r="9" />
      <path d="M193 126q10-7 20 0l9 25 M193 126l-7 24 M197 143l-5 27 M209 143l6 27" />
      <circle cx="241" cy="132" r="6" />
      <path d="M234 145h14 M235 146l-4 24 M245 146l5 24 M234 148l-17-13 M248 148l10 8" />
    </svg>
  );
}

interface MotivationCard {
  Drawing: ComponentType;
  title: string;
  bullets: readonly { icon: VisionBenefitKind; lead: string; text: string }[];
  sources: readonly { label: string; href: string }[];
  details?: {
    summary: string;
    paragraphs: readonly string[];
    sources: readonly { label: string; href: string }[];
  };
}

const cards: readonly MotivationCard[] = [
  {
    Drawing: FusionFacility,
    title: 'Power progress. Protect the climate.',
    bullets: [
      {
        icon: 'smoke',
        lead: 'No direct CO₂',
        text: 'emissions during power generation.',
      },
      {
        icon: 'fuel' as const,
        lead: 'Small fuel quantities.',
        text: 'Deuterium from seawater; tritium bred from lithium.',
      },
      {
        icon: 'reuse' as const,
        lead: 'A different waste legacy.',
        text: 'Fission waste includes substances that persist for thousands of years. Suitable activated fusion materials could become recyclable within about 100 years.',
      },
    ],
    details: {
      summary: 'How is fusion different from fission?',
      paragraphs: [
        'Fusion combines light nuclei; fission splits heavy nuclei. Proposed deuterium–tritium fusion plants do not require uranium or plutonium fuel and do not produce spent fission fuel.',
        'Spent fission fuel contains many radioactive substances with different half-lives. Some decay relatively quickly; others persist for thousands of years or longer.',
        'Deuterium–tritium fusion produces activated plant components rather than spent fission fuel. ITER anticipates that suitable materials could become recyclable or reusable within about 100 years, depending on material selection.',
        'This is a potential recycling timescale, not a universal half-life or a guarantee that all fusion waste becomes harmless after 100 years. Activated components and radioactive tritium still require controlled management.',
        'Deuterium can be extracted from seawater. Tritium would need to be bred from lithium; reliable breeding remains an engineering challenge.',
      ],
      sources: [
        {
          label: 'Fusion materials — ITER',
          href: 'https://www.iter.org/fusion-energy/advantages-fusion',
        },
        {
          label: 'Radioactive waste — NRC',
          href: 'https://www.nrc.gov/regulations-legislation/fact-sheets-brochures/backgrounder-on-radioactive-waste',
        },
      ],
    },
    sources: [
      {
        label: 'Fusion materials — ITER',
        href: 'https://www.iter.org/fusion-energy/advantages-fusion',
      },
    ],
  },
  {
    Drawing: ElectricityNetwork,
    title: 'Clean power beyond the weather.',
    bullets: [
      {
        icon: 'steady' as const,
        lead: 'Beyond the weather.',
        text: 'Potential to generate without relying on sunshine or wind.',
      },
      {
        icon: 'pylon' as const,
        lead: 'Alongside renewables.',
        text: 'Reliable power for homes and industry.',
      },
      {
        icon: 'generator' as const,
        lead: '400 MW target.',
        text: 'Planned electrical output of CFS’s ARC fusion plant.',
      },
    ],
    sources: [
      {
        label: 'On-demand energy potential — US DOE',
        href: 'https://www.energy.gov/fusion/doe-fusion-energy-strategy-2024-executive-summary',
      },
      {
        label: 'ARC development target — CFS',
        href: 'https://www.cfs.energy/chesterfield/info/',
      },
    ],
  },
  {
    Drawing: FamilyFuture,
    title: 'The future is a shared responsibility.',
    bullets: [
      {
        icon: 'family' as const,
        lead: 'Build for those who follow.',
        text: 'Take responsibility for what we leave behind.',
      },
      {
        icon: 'shield' as const,
        lead: 'No runaway chain reaction.',
        text: 'Fusion stops when the required conditions are lost.',
      },
      {
        icon: 'warning' as const,
        lead: 'No uranium or plutonium fuel required.',
        text: 'A different proliferation profile, with tritium still requiring controls.',
      },
    ],
    details: {
      summary: 'Safety by design. Responsible fuel handling.',
      paragraphs: [
        'Fusion requires precisely controlled conditions. If those conditions are lost, the reaction stops, preventing a runaway chain reaction or fission-style core meltdown.',
        'Deuterium–tritium fusion requires neither uranium enrichment nor plutonium fuel. Responsible development includes secure tritium handling, material accounting and engineered safeguards for radioactive materials and other plant hazards.',
      ],
      sources: [
        {
          label: 'Fusion safety — IAEA',
          href: 'https://www.iaea.org/newscenter/news/what-is-nuclear-fusion',
        },
        {
          label: 'Tritium and weapons relevance — US DOE',
          href: 'https://www.energy.gov/sites/default/files/EIS-0288-FEIS-1999_0.pdf',
        },
      ],
    },
    sources: [
      {
        label: 'Fusion safety — IAEA',
        href: 'https://www.iaea.org/newscenter/news/what-is-nuclear-fusion',
      },
    ],
  },
];

const condensedBullets: readonly MotivationCard['bullets'][] = [
  [
    {
      icon: 'smoke',
      lead: 'No direct CO₂',
      text: 'emissions during power generation.',
    },
    { icon: 'fuel', lead: 'Small fuel quantities.', text: '' },
    { icon: 'reuse', lead: 'A different waste legacy.', text: '' },
  ],
  [
    { icon: 'steady', lead: 'Power beyond sunshine and wind.', text: '' },
    {
      icon: 'pylon',
      lead: 'Reliable electricity alongside renewables.',
      text: '',
    },
    {
      icon: 'generator',
      lead: '400 MW target',
      text: 'for CFS’s planned ARC plant.',
    },
  ],
  [
    { icon: 'family', lead: 'Responsibility to future generations.', text: '' },
    {
      icon: 'shield',
      lead: 'No runaway chain reaction',
      text: 'or fission-style core meltdown.',
    },
    {
      icon: 'warning',
      lead: 'No uranium enrichment or plutonium fuel required',
      text: 'for deuterium–tritium fusion.',
    },
  ],
];

export default function FusionVision({
  compact = false,
}: {
  compact?: boolean;
}) {
  const displayCards = compact
    ? cards.map((card, index) => ({
        ...card,
        bullets: condensedBullets[index] ?? card.bullets,
      }))
    : cards;
  const renewablesIllustration = (
    <svg
      className="fusion-vision-renewables"
      viewBox="0 0 200 134"
      width="200"
      height="134"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="55" cy="45" r="4" />
      <g className="vision-windmill-blades">
        <path d="M53 41 51 10q1-6 4-1l4 32" />
        <path d="M53 41 51 10q1-6 4-1l4 32" transform="rotate(120 55 45)" />
        <path d="M53 41 51 10q1-6 4-1l4 32" transform="rotate(240 55 45)" />
      </g>
      <path d="m52 50-4 83h14l-4-83 M103 118v15 M155 118v15 M8 133h184" />
      <g className="fusion-vision-renewable-panel">
        <path d="M102 82h82l-16 36H86Z M97 94h82 M91 106h82 M122 82l-16 36 M142 82l-16 36 M162 82l-16 36" />
      </g>
    </svg>
  );
  const supportingEvidence = (
    <div className="home-fusion-support-evidence">
      <details>
        <summary>Sources and context</summary>
        <h4>Fusion</h4>
        <p>
          A 2001 conceptual study estimated approximately 300 m² per MW of plant
          capacity. Converting that estimate gives approximately 3,300 MW/km².
          This is a historical design estimate, not measured commercial
          performance.
        </p>
        <a href="https://www.sciencedirect.com/science/article/pii/S0920379601005531">
          Fusion land-requirement study — 2001
        </a>
        <h4>Solar and wind</h4>
        <p>
          A 2018 NREL technical-potential methodology uses approximately 30–36
          MW/km² for solar and 3 MW/km² for wind. These represent rated capacity
          per area, not average electricity delivered.
        </p>
        <a href="https://www.nrel.gov/docs/fy18osti/71532.pdf">
          NREL technical-potential methodology — 2018
        </a>
        <h4>Comparison limits</h4>
        <p>
          The studies use different dates, assumptions and land boundaries.
          Wind-farm spacing can remain available for farming and other
          activities; rooftop solar uses existing surfaces. Actual fusion sites
          must include supporting infrastructure. These figures do not establish
          a validated land-saving ratio.
        </p>
        <h4>Dependable generation</h4>
        <p>
          The US Department of Energy identifies on-demand generation as a
          potential benefit of fusion. This does not mean uninterrupted
          operation or eliminate the need for storage and grid investment.
        </p>
        <a href="https://www.energy.gov/fusion/doe-fusion-energy-strategy-2024-executive-summary">
          US DOE — on-demand generation potential
        </a>
        <h4>Plant scale</h4>
        <p>
          Max Planck IPP describes future plants producing 1–1.5 GW of
          electricity, with buildings comparable in size to existing large power
          stations. This is a prospective design scale, not demonstrated
          performance or Aurora’s capability.
        </p>
        <a href="https://www.ipp.mpg.de/2767777/faq4">
          Max Planck IPP — future plant scale
        </a>
        <h4>District heating</h4>
        <p>
          Fusion researchers have examined combined electricity and
          district-heat production. Viability depends on plant design,
          heat-network temperatures, nearby demand and economics. Extracting
          useful heat can reduce electrical output.
        </p>
        <a href="https://www.osti.gov/servlets/purl/1861030">
          Fusion research — electricity and district heat
        </a>
        <h4>Combined heat and power</h4>
        <p>
          Cogeneration recovers heat for homes, businesses or industry alongside
          electricity generation.
        </p>
        <a href="https://energy.ec.europa.eu/topics/energy-efficiency/cogeneration-heat-and-power_en">
          European Commission — cogeneration
        </a>
        <h4>Local considerations</h4>
        <p>
          Noise, landscape changes, shadow flicker and warning lights can affect
          acceptance of wind projects. Fusion plants will also require
          environmental assessment, infrastructure and community engagement.
        </p>
        <a href="https://www.trafikstyrelsen.dk/publikationsliste/luftfart-publikationer/2025/apr/rapport-om-mulighederne-for-behovsstyring-til-deaktivering-af-hindringslys-paa-vindmoeller-igangvaerende-omskrivning">
          Denmark’s Transport Authority — wind-project acceptance
        </a>
        <h4>Local acceptance in Denmark</h4>
        <p>
          In a 2023 IDA survey, 21% said living near wind turbines would bother
          them to a high or very high degree. This measured stated expectations,
          not actual neighbour experiences. The survey also found greater
          acceptance of wind and solar than of motorways and airports.
        </p>
        <a href="https://ida.dk/om-ida/nyt-fra-ida/danskerne-foretraekker-naboskab-til-vindmoeller-frem-for-motorveje">
          IDA — 2023 survey of expected neighbour impacts
        </a>
        <h4>Important context</h4>
        <p>
          These sources do not establish proven comparative land savings, fewer
          local disturbances or greater public acceptance for fusion. Commercial
          fusion costs, availability, operating lifetimes and maintenance
          requirements remain to be demonstrated.
        </p>
      </details>
    </div>
  );
  return (
    <div className="fusion-vision">
      <ol className="fusion-vision-sequence">
        {displayCards.map(({ Drawing, title, bullets, sources, details }) => (
          <li className="fusion-vision-card" key={title}>
            <Drawing />
            <h3>{title}</h3>
            <ul className="fusion-vision-benefits">
              {bullets.map((bullet) => (
                <li key={bullet.lead}>
                  <VisionBenefitIcon kind={bullet.icon} />
                  <span>
                    <strong>
                      <AnimatedNumbers text={bullet.lead} />
                    </strong>{' '}
                    {bullet.text}
                  </span>
                </li>
              ))}
            </ul>
            <div className="fusion-vision-sources">
              {sources.map((source) => (
                <a
                  className="fusion-vision-source"
                  href={source.href}
                  key={source.href}
                >
                  {source.label}
                </a>
              ))}
              {details && (
                <details className="fusion-vision-details">
                  <summary>{details.summary}</summary>
                  {details.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  <div className="fusion-vision-detail-sources">
                    {details.sources.map((source) => (
                      <a href={source.href} key={source.href}>
                        {source.label}
                      </a>
                    ))}
                  </div>
                </details>
              )}
            </div>
          </li>
        ))}
      </ol>
      <VisionPowerCable />
      <div
        className={compact ? 'home-fusion-support' : 'fusion-vision-context'}
      >
        <div
          className={
            compact ? 'home-fusion-support-copy' : 'fusion-vision-context-copy'
          }
        >
          {compact ? (
            <>
              <h3>Why pursue fusion if we have wind and solar?</h3>
              <p>
                Wind and solar output changes with the weather and time of day.
                Fusion could add controllable low-carbon generation, helping
                balance supply when renewable output is low.
              </p>
              <ul className="home-fusion-support-benefits">
                {[
                  {
                    title: 'Concentrated generation',
                    text: 'Substantial output at individual power-station sites, offering another option where land use, landscapes and local impacts constrain expansion.',
                    path: 'M3 20V7h18v13M2 20h20M3 11h18M7 20v-5h10v5M7 7V4h10v3',
                  },
                  {
                    title: 'Power our cities. Heat our homes.',
                    text: 'Future fusion plants could produce electricity and supply district heating, making more use of the energy they generate.',
                    path: 'm3 11 9-8 9 8M5 10v11h14V10M9 21v-7h6v7M8 9V6m8 3V6',
                  },
                ].map((benefit) => (
                  <li key={benefit.title}>
                    <svg
                      viewBox="0 0 24 24"
                      width="22"
                      height="22"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d={benefit.path} />
                    </svg>
                    <div>
                      <h4>{benefit.title}</h4>
                      <p>{benefit.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="home-fusion-comparison">
                <h4>The potential of concentrated generation:</h4>
                <dl>
                  {[
                    {
                      label: 'Fusion',
                      number: '≈3,300',
                      note: 'Conceptual estimate',
                    },
                    {
                      label: 'Utility-scale solar',
                      number: '30–36',
                      note: 'Planning assumption',
                    },
                    {
                      label: 'Onshore wind',
                      number: '≈3',
                      note: 'Including turbine spacing',
                    },
                  ].map((item) => (
                    <div key={item.label}>
                      <dt>{item.label}</dt>
                      <dd className="home-fusion-comparison-number">
                        {item.number}
                      </dd>
                      <dd>MW/km²</dd>
                      <dd>{item.note}</dd>
                    </div>
                  ))}
                </dl>
                <p>
                  Illustrative rated-capacity estimates from different studies,
                  not average output or a like-for-like land-use comparison.
                </p>
              </div>
            </>
          ) : (
            <>
              <h3>Why keep pursuing fusion?</h3>
              <p className="fusion-vision-context-lead">
                Because a cleaner world will still need dependable power.
              </p>
              <p>
                Fusion could deliver large amounts of electricity from
                concentrated power stations, day and night, alongside wind and
                solar. Its promise is reliable low-carbon energy for growing
                cities, industry and computing, even when renewable output is
                low.
              </p>
              <div className="fusion-vision-context-sources">
                <a href="https://www.energy.gov/fusion/doe-fusion-energy-strategy-2024-executive-summary">
                  On-demand power potential — US DOE
                </a>
                <a href="https://www.cfs.energy/chesterfield/info/">
                  Planned 400 MW ARC plant — CFS
                </a>
              </div>
            </>
          )}
        </div>
        {compact ? (
          <div className="home-fusion-support-visual">
            {renewablesIllustration}
          </div>
        ) : (
          renewablesIllustration
        )}
        {compact && supportingEvidence}
        {!compact && (
          <p className="fusion-vision-note">
            A long-term vision. Commercial fusion still requires substantial
            development; our work today starts with plasma education and
            prototypes.
          </p>
        )}
      </div>
    </div>
  );
}
