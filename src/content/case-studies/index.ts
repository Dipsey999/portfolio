import type { CaseStudy } from './types';
import recotapAbm from './recotap-abm';
import hiresense from './hiresense';
import recotapDs from './recotap-ds';
import adNinja from './ad-ninja';
import hiretap from './hiretap';
import hiresenseDs from './hiresense-ds';
import zunuDrive from './zunu-drive';
import zunuMail from './zunu-mail';

export const caseStudies: CaseStudy[] = [
  recotapAbm,
  hiresense,
  recotapDs,
  adNinja,
  hiretap,
  hiresenseDs,
  zunuDrive,
  zunuMail,
];

export const caseStudyMap = Object.fromEntries(
  caseStudies.map((c) => [c.slug, c]),
) as Record<string, CaseStudy>;

export type { CaseStudy };
