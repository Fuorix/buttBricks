export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  active: boolean;
}

export const timelineEvents: TimelineEvent[] = [
  {
    year: '1979',
    title: 'FOUNDATION',
    description: 'Muhammad Yaqoob Butt establishes the first kiln, prioritizing material purity.',
    active: true
  },
  {
    year: '1995',
    title: 'DUAL KILN SCALE',
    description: 'Expansion to two high-capacity kilns to meet industrial demand.',
    active: false
  },
  {
    year: '2008',
    title: 'GLOBAL REACH',
    description: 'Initiation of international exports, bringing Punjab’s earth to global architecture.',
    active: false
  },
  {
    year: '2024',
    title: 'LEGACY PROJECTS',
    description: 'Primary partner for LUMS, Aitchison College, and national infrastructure icons.',
    active: false
  }
];