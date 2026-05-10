export const siteConfig = {
  name: 'Mohammed Jizan K',
  shortName: 'Jizan',
  title: 'Mohammed Jizan K — Product Designer',
  description:
    'Product Designer based in Bengaluru, India. Currently leading design at Recotap across product, marketing, and brand. Previously Ziroh Labs and UnQ Technologies.',
  url: 'https://jizan.in',
  email: 'jizan.ux@gmail.com',
  location: 'Bengaluru, India',
  currentRole: {
    company: 'Recotap',
    url: 'https://www.recotap.com/',
    title: 'Product Designer',
    description: 'Leading the design system and entire design process across products, marketing, and brand.',
  },
  socials: [
    { name: 'LinkedIn', handle: '@jizan', url: 'https://www.linkedin.com/in/jizan/' },
    { name: 'Medium', handle: '@jizansanu', url: 'https://medium.com/@jizansanu' },
    { name: 'Dribbble', handle: '@jizansanu', url: 'https://dribbble.com/jizansanu' },
    { name: 'Behance', handle: '@jizan', url: 'https://www.behance.net/jizan' },
    { name: 'GitHub', handle: '@jizansanu', url: 'https://github.com/jizansanu/' },
  ],
  nav: [
    { label: 'Index', href: '/' },
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/about' },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
