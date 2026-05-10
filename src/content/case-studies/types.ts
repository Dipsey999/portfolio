export type CaseStudy = {
  slug: string;
  company: string;
  title: string;
  intro: string;
  year: string;
  role: string;
  team?: string;
  duration?: string;
  scope: string[];
  accent: string;
  context: string;
  problem: string;
  approach: { title: string; body: string }[];
  outcomes: { metric: string; change: string; detail: string }[];
  reflection: string;
};
