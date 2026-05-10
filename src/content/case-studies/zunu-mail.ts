import type { CaseStudy } from './types';

const study: CaseStudy = {
  slug: 'zunu-mail',
  company: 'Ziroh Labs',
  title: 'Bridging all your inboxes with seamless security',
  intro:
    'A unified, end-to-end encrypted mail client that brings every account into one private, threaded experience.',
  year: '2023',
  role: 'Product Designer',
  team: '1 designer × 1 PM × 6 engineers',
  duration: '5 months',
  scope: ['Mail UX', 'Cross-platform', 'Visual design'],
  accent: '#7CFFCB',
  context:
    'Most professionals run 3+ inboxes (work, personal, side project). Privacy-respecting clients have historically forced them to choose between security and convenience — Zunu Mail aimed to dissolve the trade-off.',
  problem:
    'A unified inbox is easy to imagine and hard to make trustworthy. Each connected account has its own auth, encryption profile, and quirks. The UI had to express provenance without overwhelming the user.',
  approach: [
    {
      title: 'Threaded, account-aware',
      body:
        'A single threaded list with subtle account indicators — a thin colour band, a small label — so the user always knows which inbox a message belongs to without staring at it.',
    },
    {
      title: 'Smart compose, dumb defaults',
      body:
        'Templates and snippets to speed up common replies, but the default behaviour is plain, predictable mail. We trust the user.',
    },
    {
      title: 'Encryption as a state, not a tab',
      body:
        'E2E encryption appears as a quiet badge on the compose surface — never a separate mode. Encrypting is the default whenever both sides support it.',
    },
  ],
  outcomes: [
    { metric: 'Inbox triage time', change: '−28%', detail: 'In usability testing vs. previous client.' },
    { metric: 'Encrypted send rate', change: '+62%', detail: 'When defaulted on for capable recipients.' },
    { metric: 'Cross-platform launch', change: '4 OS', detail: 'Single UX language across desktop and mobile.' },
  ],
  reflection:
    'Mail is the most stubborn UX in software. Anything you change has to feel inevitable on day one or users bounce by day three.',
};

export default study;
