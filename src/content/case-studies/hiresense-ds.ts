import type { CaseStudy } from './types';

const study: CaseStudy = {
  slug: 'hiresense-ds',
  company: 'HireSense AI',
  title: 'A custom design system for HireSense',
  intro:
    'Foundations, components, and motion principles for HireSense — designed to keep an AI product feeling calm, accountable, and human.',
  year: '2024',
  role: 'Design System Lead',
  team: 'Solo design × 4 engineers',
  duration: '3 months to v1',
  scope: ['Tokens', 'AI patterns', 'Motion', 'Documentation'],
  accent: '#F3D768',
  context:
    'HireSense was being built from scratch alongside the product. Without a deliberate system, AI features would have shipped as one-off treatments, eroding trust over time.',
  problem:
    'AI products need new patterns: confidence states, citation links, generated-content provenance, streaming text. None of those exist in standard libraries.',
  approach: [
    {
      title: 'New primitives for AI',
      body:
        '“Generated” chips, citation links, confidence indicators, streaming-text states, and revision flows — all defined as first-class primitives, not retrofits.',
    },
    {
      title: 'Motion as a trust signal',
      body:
        'Slow, deliberate easing for AI generation; fast, snappy easing for human input. The product feels calm because the motion language tells you what kind of action just happened.',
    },
    {
      title: 'One scale, many surfaces',
      body:
        'Single type and space scale used across product, marketing site, and the eventual API docs. No drift, no surprises.',
    },
  ],
  outcomes: [
    { metric: 'AI patterns documented', change: '14', detail: 'New primitives shipped with v1.' },
    { metric: 'Brand consistency', change: '100%', detail: 'Product and marketing site share tokens.' },
    { metric: 'New-feature lead time', change: '−3 days avg', detail: 'On AI surfaces.' },
  ],
  reflection:
    'AI design systems aren’t a copy of regular ones with a sparkle icon. They need their own grammar — and the earlier you write that grammar, the cheaper every future feature becomes.',
};

export default study;
