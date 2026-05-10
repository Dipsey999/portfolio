import type { CaseStudy } from './types';

const study: CaseStudy = {
  slug: 'hiresense',
  company: 'HireSense AI',
  title: 'Crafting talent intelligence for visionaries',
  intro:
    'An end-to-end AI hiring product that helps founders evaluate candidates with structured signals — from intake to interview intelligence.',
  year: '2024',
  role: 'Lead Product Designer',
  team: 'Design lead × 1 PM × 5 engineers',
  duration: '6 months 0→1',
  scope: ['0→1 product', 'AI UX', 'Design System', 'Brand'],
  accent: '#0090FF',
  context:
    'Early-stage founders are drowning in resumes. They’re asked to be experts at evaluating talent across roles they’ve never hired for, in a market where every candidate sounds great on paper. HireSense AI was built to give founders a calmer, more accountable way to read candidates — one that makes AI’s reasoning legible.',
  problem:
    'Most AI hiring tools treat the model as a black box: type a query, get a list. Founders end up trusting the score without understanding what it measured. The product needed to surface AI’s thinking, not hide it — while staying fast enough for a 30-minute review.',
  approach: [
    {
      title: 'Designed for legibility',
      body:
        'Every AI signal in the interface is paired with the evidence it came from. Hover a score, see the resume span. Click a tag, see the question that produced it. The model is always defendable.',
    },
    {
      title: 'A scorecard, not a leaderboard',
      body:
        'We resisted the urge to rank. Instead, we surfaced calibrated dimensions (depth, breadth, fit) so the founder makes the call. The AI sets the table; the human picks.',
    },
    {
      title: 'Conversational interview intelligence',
      body:
        'Real-time transcript with speaker tags, automatic highlights, and post-interview synthesis. Designers, recruiters, and founders all consume the same artefact.',
    },
    {
      title: 'A design system born for AI',
      body:
        'Built a token system with explicit conventions for AI-generated content, confidence states, and citation patterns — so the next 50 features feel like one product.',
    },
  ],
  outcomes: [
    { metric: 'Time-to-shortlist', change: '−62%', detail: 'From hours to under 20 minutes per role.' },
    { metric: 'Recruiter trust', change: '+40%', detail: 'Citation-backed scores measurably reduced override rates.' },
    { metric: 'Shipped 0→1', change: '6 mo', detail: 'Foundation, brand, marketing, and v1 product live.' },
  ],
  reflection:
    'AI products live or die on legibility. The moment users can’t see why the model said something, trust collapses. Designing the AI’s reasoning is now the thing I obsess about most.',
};

export default study;
