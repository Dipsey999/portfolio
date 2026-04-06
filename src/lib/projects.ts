export interface Project {
  slug: string;
  title: string;
  description: string;
  year: string;
  category: "case-study" | "website" | "branding";
  tags?: string[];
  role?: string;
  timeline?: string;
  tools?: string;
  summary?: string;
}

export const projects: Project[] = [
  // Case Studies
  {
    slug: "recotap",
    title: "Recotap",
    description: "Account-based marketing platform for B2B teams",
    year: "2023",
    category: "case-study",
    tags: ["Product Design", "Design System"],
    role: "Lead Product Designer",
    timeline: "2022 — Present",
    tools: "Figma, FigJam, Maze, Hotjar",
    summary:
      "Led the end-to-end redesign of Recotap's ABM platform — from research through to a scalable design system serving multiple product teams.",
  },
  {
    slug: "hiresense",
    title: "HireSense",
    description: "AI-powered talent intelligence and recruitment platform",
    year: "2023",
    category: "case-study",
    tags: ["Product Design", "UX Research"],
    role: "Product Designer",
    timeline: "2023",
    tools: "Figma, Miro, UserTesting",
    summary:
      "Designed the core workflows for an AI-driven hiring platform — helping recruiters move from data overload to actionable talent insights.",
  },
  {
    slug: "zunu-drive",
    title: "Zunu Drive",
    description: "Zero-knowledge encrypted cloud storage",
    year: "2022",
    category: "case-study",
    tags: ["Product Design", "Mobile"],
    role: "Product Designer",
    timeline: "2021 — 2022",
    tools: "Figma, Principle, Zeplin",
    summary:
      "Designed a privacy-first cloud storage experience that makes end-to-end encryption feel effortless for everyday users.",
  },

  // Websites
  {
    slug: "zunu-suite",
    title: "Zunu Suite",
    description: "Marketing website for a privacy-focused productivity suite",
    year: "2022",
    category: "website",
    tags: ["Web Design"],
  },
  {
    slug: "kamelia-groups",
    title: "Kamelia Groups",
    description: "Corporate website for a diversified business group",
    year: "2021",
    category: "website",
    tags: ["Web Design"],
  },
  {
    slug: "nine-homes",
    title: "Nine Homes",
    description: "Website for a premium real estate developer",
    year: "2021",
    category: "website",
    tags: ["Web Design"],
  },
  {
    slug: "foxpatch",
    title: "Foxpatch",
    description: "E-commerce website for handcrafted lifestyle products",
    year: "2020",
    category: "website",
    tags: ["Web Design", "Branding"],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: Project["category"]): Project[] {
  return projects.filter((p) => p.category === category);
}
