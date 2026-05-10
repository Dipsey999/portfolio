import type { CaseStudy } from './types';

const study: CaseStudy = {
  slug: 'hiretap',
  company: 'Recotap',
  title: 'Designing a smarter way to hire the right talent',
  intro:
    'A focused recruiter cockpit that pairs structured scorecards with calibrated AI suggestions, reducing time-to-shortlist for early-stage teams.',
  year: '2025',
  role: 'Lead Product Designer',
  team: '1 designer × 1 PM × 4 engineers',
  duration: '4 months',
  scope: ['Product UX', 'AI UX', 'Recruiter workflow'],
  accent: '#0090FF',
  context:
    'HireTap targets seed-to-Series-B founders who are running their own hiring loop. They don’t have ATS muscle memory; they have a Notion doc and a Calendly link. The product had to slot into that reality.',
  problem:
    'Founders were drowning in inbound, missing strong candidates, and forgetting where they left a conversation. They needed a single place that remembered, ranked, and reminded — without becoming an ATS.',
  approach: [
    {
      title: 'Cockpit, not a CRM',
      body:
        'Designed a single-screen workspace: pipeline on the left, candidate detail in the centre, AI-generated context on the right. Everything is one click away.',
    },
    {
      title: 'AI as a co-pilot, not the pilot',
      body:
        'AI surfaces signals (rare skill match, momentum, pace of response) but the founder always makes the call. Every AI assertion is cited with the resume span or message it came from.',
    },
    {
      title: 'Always-on recall',
      body:
        'Conversation history, scorecard, and AI summary are stitched together so picking up a thread takes seconds, not minutes.',
    },
  ],
  outcomes: [
    { metric: 'Time-to-shortlist', change: '−58%', detail: 'Faster from inbound to first interview.' },
    { metric: 'Candidate response rate', change: '+22%', detail: 'Personalised AI drafts kept tone authentic.' },
    { metric: 'NPS at 30 days', change: '62', detail: 'Strong early signal among founder users.' },
  ],
  reflection:
    'Hiring tools fail when they assume the user is a recruiter. Designing for a founder means assuming they’ll quit if the product asks for ten clicks.',
};

export default study;
