import type { CaseStudy } from './types';

const study: CaseStudy = {
  slug: 'recotap-ds',
  company: 'Recotap',
  title: 'Building a design system for a growing ABM platform',
  intro:
    'A scalable, themed token system and component library that became the source of truth across 4 product surfaces and the marketing site.',
  year: '2024',
  role: 'Design System Lead',
  team: '1 designer × 3 engineers',
  duration: '4 months to v1, ongoing',
  scope: ['Tokens', 'Components', 'Documentation', 'Tooling'],
  accent: '#F3D768',
  context:
    'Recotap’s product had grown faster than its design language. Four product surfaces, three brand variants, and a marketing site were all drifting in subtly different directions — and every PM felt it.',
  problem:
    'There was no shared vocabulary. Designers debated colour, engineers reinvented buttons, marketing built its own components in Webflow. Cumulative drift was costing weeks.',
  approach: [
    {
      title: 'Tokens as contract',
      body:
        'Defined a token layer that maps directly to Tailwind config and Figma variables — colour, type, space, radius, shadow, motion. One source, two consumers, no debates.',
    },
    {
      title: 'Primitives → Components → Patterns',
      body:
        'Three layers, with strict APIs and visual examples for each. Made overrides predictable and composability cheap.',
    },
    {
      title: 'Theme + density modes',
      body:
        'Light/dark and comfortable/compact density built into the token layer, so a single component covers four variants without forks.',
    },
    {
      title: 'Living documentation',
      body:
        'Built a docs site that pulls from the same tokens — every example is a real component, not a screenshot. The docs can never lie.',
    },
  ],
  outcomes: [
    { metric: 'Component reuse', change: '+85%', detail: 'New screens use the system without forks.' },
    { metric: 'Spec-to-ship time', change: '−55%', detail: 'No more bespoke spec docs for primitives.' },
    { metric: 'Visual drift', change: '−92%', detail: 'Audited surfaces match tokens within tolerance.' },
  ],
  reflection:
    'A design system isn’t a Figma library — it’s a contract between three teams. Once everyone agreed on the contract, the system mostly maintained itself.',
};

export default study;
