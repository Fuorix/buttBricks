export interface Leader {
  id: string;
  name: string;
  isLate?: boolean;
  role: string;
  description: string;
  image: string;
}

export const leadershipData: Leader[] = [
  {
    id: '1',
    name: 'Haji M. Yaqoob Butt',
    isLate: true,
    role: 'Founder',
    description: 'Founded Butt Bricks in 1979, creating a legacy of quality and trust.',
    image: '/leader01.jpg',
  },
  {
    id: '2',
    name: 'Haji Muhammad Nawaz',
    role: 'Co-Founder',
    description: 'Partnered from day one, bringing industry insights and dedication.',
    image: '/leader02.jpg',
  },
  {
    id: '3',
    name: 'Muhammad Manzoor Butt',
    role: 'Managing Partner',
    description: 'Drives innovation and operational excellence across our facilities.',
    image: '/leader03.jpg',
  },
  {
    id: '4',
    name: 'Eid Muhammad Butt',
    role: 'Partner',
    description: 'Leads marketing and client relations to grow our brand.',
    image: '/leader04.jpg',
  },
  {
    id: '5',
    name: 'Abdul Rehman Butt',
    role: 'Director',
    description: 'Oversees strategic growth initiatives and international partnerships.',
    image: '/leader04.jpg',
  },
];
