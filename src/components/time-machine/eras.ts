export type EraId =
  | 'era-1984'
  | 'era-2007'
  | 'era-2013'
  | 'era-2018'
  | 'era-2022'
  | 'era-2026';

export type Era = {
  id: EraId;
  index: number;
  year: string;
  label: string;
  tag: string;
  caption: string;
};

export const ERAS: Era[] = [
  {
    id: 'era-1984',
    index: 0,
    year: '1984',
    label: 'Bitmap',
    tag: 'Macintosh · 9-inch CRT · 1-bit',
    caption: 'When the screen was nine inches and the future fit in a folder.',
  },
  {
    id: 'era-2007',
    index: 1,
    year: '2007',
    label: 'Skeuomorphism',
    tag: 'iPhone · capacitive touch',
    caption: 'Steve Jobs taught us that interfaces could feel like things.',
  },
  {
    id: 'era-2013',
    index: 2,
    year: '2013',
    label: 'Flat',
    tag: 'iOS 7 · Material',
    caption: 'We threw away the textures and learned to draw with color.',
  },
  {
    id: 'era-2018',
    index: 3,
    year: '2018',
    label: 'Glass',
    tag: 'Neumorphism · Glassmorphism',
    caption: 'Depth came back. But subtler.',
  },
  {
    id: 'era-2022',
    index: 4,
    year: '2022',
    label: 'Brutalism',
    tag: 'Anti-design · raw mono',
    caption: 'Designers got tired of being polite.',
  },
  {
    id: 'era-2026',
    index: 5,
    year: '2026',
    label: 'AI Native',
    tag: 'Generative · spatial · kinetic',
    caption: 'And now the interface designs itself — until you make it inevitable.',
  },
];
