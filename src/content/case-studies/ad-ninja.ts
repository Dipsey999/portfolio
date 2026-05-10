import type { CaseStudy } from './types';

const study: CaseStudy = {
  slug: 'ad-ninja',
  company: 'Recotap',
  title: 'Simplifying ad creation in the ABM workflow',
  intro:
    'Re-thought Recotap’s ad builder so marketers can ship a campaign in minutes, not days — templated, contextual, and forgiving.',
  year: '2025',
  role: 'Product Designer',
  team: '1 designer × 1 PM × 4 engineers',
  duration: '3 months',
  scope: ['Workflow UX', 'Component design', 'Templates'],
  accent: '#F3D768',
  context:
    'The previous ad builder was a multi-step wizard with no preview, no templates, and a brutal asset uploader. Marketers told us they would mock ads in Figma first, just to know what they’d get.',
  problem:
    'Speed and confidence. Users needed to see what the ad would look like as they built it, recover from mistakes, and start from a known-good template — none of which the wizard supported.',
  approach: [
    {
      title: 'Side-by-side editing',
      body:
        'Replaced the wizard with a single editor: form on the left, live preview on the right, channel toggles at the top. Every change is immediately visible.',
    },
    {
      title: 'Templates as first-class',
      body:
        'Curated a set of templates for each channel that pre-fill the right copy lengths, image ratios, and CTA placements — so users start ahead, not from zero.',
    },
    {
      title: 'Forgiving inputs',
      body:
        'Soft validation, autosave, and asset cropping in-place. No more “upload again” for a 1:1 image that should have been 4:5.',
    },
  ],
  outcomes: [
    { metric: 'Time to first ad', change: '−74%', detail: 'From ~22 minutes to under 6.' },
    { metric: 'Template adoption', change: '78%', detail: 'Of new ads start from a template.' },
    { metric: 'Support tickets', change: '−40%', detail: 'Asset/format issues dropped sharply.' },
  ],
  reflection:
    'The lesson: in builder workflows, the preview is the product. Everything else is just the controls.',
};

export default study;
