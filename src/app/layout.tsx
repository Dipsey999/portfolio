import type { Metadata, Viewport } from 'next';
import {
  Bricolage_Grotesque,
  DM_Sans,
  Geist,
  Geist_Mono,
  Inter,
  Inter_Tight,
  Pixelify_Sans,
  Space_Mono,
  VT323,
} from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Footer } from '@/components/footer';
import { siteConfig } from '@/config/site';

// AI era — primary
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
});
const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' });

// Era fonts
const pixelify = Pixelify_Sans({ subsets: ['latin'], variable: '--font-pixel', display: 'swap', weight: ['400', '700'] });
const vt323 = VT323({ subsets: ['latin'], variable: '--font-crt', display: 'swap', weight: '400' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const interTight = Inter_Tight({ subsets: ['latin'], variable: '--font-flat', display: 'swap', weight: ['200', '300', '400'] });
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-glass', display: 'swap' });
const spaceMono = Space_Mono({ subsets: ['latin'], variable: '--font-brutalist', display: 'swap', weight: ['400', '700'] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Mohammed Jizan K — A Designer Through Time',
    template: `%s · ${siteConfig.shortName}`,
  },
  description:
    'A scrollable history of digital design — and the AI-era designer who built it. Mohammed Jizan, Lead Product Designer based in Bengaluru, India.',
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: 'Mohammed Jizan K — A Designer Through Time',
    description: 'A scrollable history of digital design. Travel from 1984 to 2026.',
    siteName: siteConfig.name,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: siteConfig.title }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohammed Jizan K — A Designer Through Time',
    description: 'A scrollable history of digital design. Travel from 1984 to 2026.',
    creator: '@jizansanu',
    images: ['/og.png'],
  },
  alternates: { canonical: siteConfig.url },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.ico', apple: '/webclip.png' },
};

export const viewport: Viewport = {
  themeColor: '#0A0908',
  width: 'device-width',
  initialScale: 1,
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Mohammed Jizan K',
  jobTitle: 'Product Design Lead',
  url: siteConfig.url,
  image: `${siteConfig.url}/og.png`,
  sameAs: siteConfig.socials.map((s) => s.url),
  worksFor: { '@type': 'Organization', name: 'Recotap', url: 'https://www.recotap.com/' },
  address: { '@type': 'PostalAddress', addressLocality: 'Bengaluru', addressCountry: 'IN' },
};

const fontVars = [
  bricolage.variable,
  geist.variable,
  geistMono.variable,
  pixelify.variable,
  vt323.variable,
  inter.variable,
  interTight.variable,
  dmSans.variable,
  spaceMono.variable,
].join(' ');

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVars} suppressHydrationWarning>
      <head>
        <Script
          id="person-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
