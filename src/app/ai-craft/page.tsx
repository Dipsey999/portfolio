import type { Metadata } from 'next';
import NotesClient from './notes-client';

export const metadata: Metadata = {
  title: 'AI-craft notes — designing AI products that ship',
  description:
    'Six opinionated notes on designing AI products — the trust contract, slots over chats, the approval ritual, fear as a mid-funnel-only trigger, what happens when the model is wrong, and why the model is plumbing. By Mohammed Jizan K.',
  openGraph: {
    title: 'AI-craft notes · Jizan',
    description:
      'Six opinionated notes from shipping three AI products. The trust contract, slots over chats, the approval ritual, and the failure surface.',
    type: 'article',
    url: 'https://jizan.in/ai-craft/',
  },
  alternates: { canonical: 'https://jizan.in/ai-craft/' },
};

export default function Page() {
  return <NotesClient />;
}
