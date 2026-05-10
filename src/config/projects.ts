export type ProjectStatus = 'case-study' | 'overview' | 'design-system' | 'external';

export type Project = {
  slug: string;
  company: string;
  title: string;
  summary: string;
  year: string;
  role: string;
  status: ProjectStatus;
  tags: string[];
  href: string;
  external?: boolean;
  image?: string;
  accent?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: 'recotap-abm',
    company: 'Recotap',
    title: 'Improving Recotap into an advanced ABM platform',
    summary:
      'Led the unification of Recotap’s account-based marketing platform — a single design system, simplified workflows, and a refreshed brand pulling product and marketing into one voice.',
    year: '2024 — Now',
    role: 'Lead Product Designer',
    status: 'case-study',
    tags: ['Product', 'Design System', 'B2B SaaS'],
    href: '/work/recotap-abm',
    accent: '#FF5A1F',
    featured: true,
  },
  {
    slug: 'hiresense',
    company: 'HireSense AI',
    title: 'Crafting talent intelligence for visionaries',
    summary:
      'Designed an end-to-end AI hiring product that helps founders evaluate candidates with structured signals — from intake to interview intelligence.',
    year: '2024',
    role: 'Lead Product Designer',
    status: 'case-study',
    tags: ['AI', '0→1', 'Product'],
    href: '/work/hiresense',
    accent: '#0090FF',
    featured: true,
  },
  {
    slug: 'recotap-ds',
    company: 'Recotap',
    title: 'Building a design system for a growing ABM platform',
    summary:
      'A scalable, themed token system and component library that became the source of truth across 4 product surfaces and the marketing site.',
    year: '2024',
    role: 'Design System Lead',
    status: 'design-system',
    tags: ['Design System', 'Tokens', 'Components'],
    href: '/work/recotap-ds',
    accent: '#F3D768',
  },
  {
    slug: 'ad-ninja',
    company: 'Recotap',
    title: 'Simplifying ad creation in the ABM workflow',
    summary:
      'Re-thought Recotap’s ad builder so marketers can ship a campaign in minutes, not days — templated, contextual, and forgiving.',
    year: '2025',
    role: 'Product Designer',
    status: 'overview',
    tags: ['Product', 'Workflow'],
    href: '/work/ad-ninja',
    accent: '#F3D768',
  },
  {
    slug: 'hiretap',
    company: 'Recotap',
    title: 'Designing a smarter way to hire the right talent',
    summary:
      'A focused recruiter cockpit that pairs structured scorecards with calibrated AI suggestions, reducing time-to-shortlist for early-stage teams.',
    year: '2025',
    role: 'Lead Product Designer',
    status: 'case-study',
    tags: ['AI', 'Product', 'B2B'],
    href: '/work/hiretap',
    accent: '#0090FF',
  },
  {
    slug: 'hiresense-ds',
    company: 'HireSense AI',
    title: 'A custom design system for HireSense',
    summary:
      'Foundations, components, and motion principles for HireSense — designed to keep an AI product feeling calm, accountable, and human.',
    year: '2024',
    role: 'Design System Lead',
    status: 'design-system',
    tags: ['Design System', 'AI'],
    href: '/work/hiresense-ds',
    accent: '#F3D768',
  },
  {
    slug: 'zunu-drive',
    company: 'Ziroh Labs',
    title: 'Designing the future of secure storage',
    summary:
      'Zunu Drive reimagines encrypted file storage for everyday users — making cryptography invisible while keeping the user always in control.',
    year: '2023',
    role: 'Product Designer',
    status: 'case-study',
    tags: ['Privacy', 'Product', 'Cross-platform'],
    href: '/work/zunu-drive',
    accent: '#7CFFCB',
  },
  {
    slug: 'zunu-mail',
    company: 'Ziroh Labs',
    title: 'Bridging all your inboxes with seamless security',
    summary:
      'A unified, end-to-end encrypted mail client that brings every account into one private, threaded experience.',
    year: '2023',
    role: 'Product Designer',
    status: 'overview',
    tags: ['Privacy', 'Mail', 'Cross-platform'],
    href: '/work/zunu-mail',
    accent: '#7CFFCB',
  },
  {
    slug: 'heartful-givers',
    company: 'Independent',
    title: 'Crafting an innovative charitable exchange platform',
    summary:
      'A platform that strengthens generosity through accessible, inclusive, and effective charitable giving.',
    year: '2022',
    role: 'Product Designer',
    status: 'external',
    tags: ['Social Impact', '0→1'],
    href: 'https://medium.com/@jizansanu/heartfullgivers-crafting-an-innovative-charitable-exchange-platform-ui-ux-case-study-be43be0ef800',
    external: true,
    accent: '#FF8FB1',
  },
];

export const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

export const websites = [
  {
    name: 'Zunu Suite',
    description: 'The most advanced privacy-preserving software for business.',
    url: 'https://zunuprivacy.com/',
    image: '/images/zunu-website.png',
  },
  {
    name: 'Kamelia Groups',
    description: 'A multi-vertical group brand site.',
    url: 'https://kameliagroup.com/',
    image: '/images/Kamelia.png',
  },
  {
    name: 'Nine Homes',
    description: 'Distinguished real-estate company with a global clientele.',
    url: 'https://www.nine9homes.com/',
    image: '/images/9-homes.png',
  },
  {
    name: 'Foxpatch',
    description: 'A quality design agency to grow your business.',
    url: 'https://foxpatch.in/',
    image: '/images/foxpatch-website.png',
  },
];

export const branding = [
  { name: 'Zunu', image: '/images/zunu-branding_1-p-500.png' },
  { name: 'Foxpatch', image: '/images/foxpatch.png' },
  { name: 'UnQ SCS', image: '/images/UnQ-SCS.png' },
  { name: 'Trafitizer', image: '/images/Trafitizer.png' },
  { name: 'Cofco', image: '/images/cofco.png' },
];
