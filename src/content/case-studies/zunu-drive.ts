import type { CaseStudy } from './types';

const study: CaseStudy = {
  slug: 'zunu-drive',
  company: 'Ziroh Labs',
  title: 'Designing the future of secure storage',
  intro:
    'Zunu Drive reimagines encrypted file storage for everyday users — making cryptography invisible while keeping the user always in control.',
  year: '2023',
  role: 'Product Designer',
  team: '1 designer × 2 PMs × 12 engineers',
  duration: '8 months to v1',
  scope: ['Cross-platform UX', 'Onboarding', 'Visual design'],
  accent: '#7CFFCB',
  context:
    'Privacy-preserving storage is usually built for engineers and sold to enterprises. Zunu Drive was the bet that an end-to-end encrypted drive could feel as friendly as Dropbox — across desktop, mobile, and web.',
  problem:
    'Encryption tools force users to think about keys, recovery phrases, and trust models. We wanted those concerns to recede into the background — visible when needed, invisible otherwise.',
  approach: [
    {
      title: 'Onboarding without the lecture',
      body:
        'Account setup creates the keys silently. The recovery phrase is only surfaced when the user is about to do something irreversible — backed up by clear, calm copy.',
    },
    {
      title: 'Cross-cloud, cross-device parity',
      body:
        'Designed a single visual system that ports across Windows, macOS, iOS, Android, and web — same iconography, same gestures, same mental model.',
    },
    {
      title: 'Trust through small details',
      body:
        'Encrypted state shown subtly in every file row; sync status as a single-glance indicator; mistakes are recoverable through a reversible trash, not a dialog.',
    },
  ],
  outcomes: [
    { metric: 'Activation', change: '+34%', detail: 'Signup-to-first-upload completion.' },
    { metric: 'Cross-platform parity', change: '5 OS', detail: 'Single design language across desktop, mobile, and web.' },
    { metric: 'Support volume on encryption Qs', change: '−71%', detail: 'After onboarding revisions.' },
  ],
  reflection:
    'Privacy products win when users stop noticing the privacy. Make the protection structural, then let the product feel like any other tool they love.',
};

export default study;
