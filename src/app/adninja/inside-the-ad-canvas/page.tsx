import type { Metadata } from 'next';
import CaseClient from './case-client';

export const metadata: Metadata = {
  title: 'AdNinja — inside the ad canvas',
  description:
    'Case study by Mohammed Jizan K — designing AdNinja, the in-workflow ad canvas with a four-slot RecoAI rail that lives inside Recotap. The two-mode editor, guided-freedom templates, variants with conscience, and the brand kit that includes voice.',
  openGraph: {
    title: 'AdNinja — inside the ad canvas · Jizan',
    description:
      'A co-pilot, not a Canva. How a four-slot RecoAI rail closed the gap between Recotap’s campaign targeting and the ads marketers actually shipped.',
    type: 'article',
    url: 'https://jizan.in/adninja/inside-the-ad-canvas/',
  },
  alternates: { canonical: 'https://jizan.in/adninja/inside-the-ad-canvas/' },
};

export default function Page() {
  return <CaseClient />;
}
