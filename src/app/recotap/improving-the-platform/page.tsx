import type { Metadata } from 'next';
import CaseClient from './case-client';

export const metadata: Metadata = {
  title: 'Improving Recotap to an Advanced ABM Platform',
  description:
    'Case study by Mohammed Jizan K — rebuilding the design foundation, onboarding, targeting, data hub, content hub, and engagement layer of Recotap, a B2B Account-Based Marketing platform.',
  openGraph: {
    title: 'Improving Recotap to an Advanced ABM Platform · Jizan',
    description:
      'A long-form case study on the redesign of Recotap — from onboarding and targeting to the Data Hub, Content Hub, and Engage.',
    type: 'article',
    url: 'https://jizan.in/recotap/improving-the-platform/',
  },
  alternates: { canonical: 'https://jizan.in/recotap/improving-the-platform/' },
};

export default function Page() {
  return <CaseClient />;
}
