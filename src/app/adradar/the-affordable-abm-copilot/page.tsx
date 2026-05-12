import type { Metadata } from 'next';
import CaseClient from './case-client';

export const metadata: Metadata = {
  title: 'AdRadar — the affordable, agentic-AI sibling of Recotap',
  description:
    'Case study by Mohammed Jizan K — designing AdRadar, a seven-agent LinkedIn Ads copilot for small B2B teams who couldn’t afford Recotap. Strategy, persona, the agentic UX, and the funnel back to the flagship.',
  openGraph: {
    title: 'AdRadar — the affordable, agentic-AI sibling of Recotap · Jizan',
    description:
      'How a Tuesday evening room full of marketers became the feature list for an ABM product priced for the teams that need ABM most.',
    type: 'article',
    url: 'https://jizan.in/adradar/the-affordable-abm-copilot/',
  },
  alternates: { canonical: 'https://jizan.in/adradar/the-affordable-abm-copilot/' },
};

export default function Page() {
  return <CaseClient />;
}
