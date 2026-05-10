import type { CaseStudy } from './types';

const study: CaseStudy = {
  slug: 'recotap-abm',
  company: 'Recotap',
  title: 'Improving Recotap into an advanced ABM platform',
  intro:
    'A unified design system, simplified workflows, and a refreshed brand — pulling product and marketing into one coherent voice.',
  year: '2024 — Now',
  role: 'Lead Product Designer',
  team: 'Design lead × 2 PMs × 8 engineers',
  duration: '12+ months, ongoing',
  scope: ['Product UX', 'Design System', 'Brand & marketing site', 'Motion'],
  accent: '#FF5A1F',
  context:
    'Recotap is a B2B account-based marketing platform serving demand-gen teams who run campaigns across paid channels, intent data, and outbound. When I joined, the product had grown surface-by-surface for several years — every module spoke a slightly different visual language, and the marketing site told a story disconnected from what users actually saw inside the app.',
  problem:
    'Three years of feature shipping had created a brand-product gap and an inconsistent UI. Marketers were getting onboarded into a product that felt heavier than the website promised. Internally, every new feature took weeks of design debate because there was no source of truth.',
  approach: [
    {
      title: 'Audit before redesign',
      body:
        'I mapped every screen, component, color, and pattern across 4 product surfaces. The audit surfaced 80+ unique button styles, 11 typography scales, and an unmaintained Figma library. I shared it as a single Figma board the whole team could read in 5 minutes.',
    },
    {
      title: 'Tokens first, components second',
      body:
        'Built a tokenised foundation (colour, type, space, radius, shadow, motion) with light/dark and density modes. Components were rebuilt on top so engineers could ship a single Tailwind config and Figma library that always agreed.',
    },
    {
      title: 'Workflow re-architecture',
      body:
        'Re-designed the campaign builder, account list, and ad creation flow around a consistent IA — one navigation, one inspector, one filter pattern. We removed 30% of clicks from the most-used path.',
    },
    {
      title: 'Brand pulled forward',
      body:
        'Refreshed the marketing site to inherit the same type system, motion language, and a single warm accent. The product and the homepage now feel like the same company.',
    },
  ],
  outcomes: [
    {
      metric: 'Design throughput',
      change: '+2.4×',
      detail: 'Time from spec to shipped UI cut by more than half thanks to the tokenised system.',
    },
    {
      metric: 'Onboarding completion',
      change: '+18%',
      detail: 'Simpler campaign builder reduced drop-off in the first session.',
    },
    {
      metric: 'Visual consistency',
      change: '11 → 1',
      detail: 'Type scales collapsed to a single, responsive scale across product + marketing.',
    },
  ],
  reflection:
    'The biggest unlock wasn’t any single screen — it was making one source of truth that PMs, designers, and engineers all referenced. Once that existed, decisions stopped being arguments and started being commits.',
};

export default study;
