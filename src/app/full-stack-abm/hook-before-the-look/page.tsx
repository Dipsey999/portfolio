import type { Metadata } from 'next';
import CaseClient from './case-client';

export const metadata: Metadata = {
  title: 'Full-Stack ABM Services — hook before the look',
  description:
    'Case study by Mohammed Jizan K — how Full-Stack ABM Services brought Recotap 40+ clients in 90 days. The five emotional triggers behind winning B2B ads, the deck-before-pixels rule, and the brand-as-scaffold approach. Solo design execution.',
  openGraph: {
    title: 'Full-Stack ABM Services — hook before the look · Jizan',
    description:
      'How a five-trigger framework for B2B ad creative turned “impressions but no clicks” into 40+ new Recotap clients in 90 days.',
    type: 'article',
    url: 'https://jizan.in/full-stack-abm/hook-before-the-look/',
  },
  alternates: { canonical: 'https://jizan.in/full-stack-abm/hook-before-the-look/' },
};

export default function Page() {
  return <CaseClient />;
}
