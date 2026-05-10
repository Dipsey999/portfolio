import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { SmoothScroll } from '@/components/smooth-scroll';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { Cursor } from '@/components/cursor';
import { CommandPalette } from '@/components/command-palette';
import { ThemeScript } from '@/components/theme-script';
import { siteConfig } from '@/config/site';

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: [
    'product designer',
    'design lead',
    'AI product design',
    'gaming product design',
    'design systems',
    'Bengaluru',
    'Mohammed Jizan',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: siteConfig.title }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
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
  sameAs: [
    'https://www.linkedin.com/in/jizan/',
    'https://medium.com/@jizansanu',
    'https://dribbble.com/jizansanu',
    'https://www.behance.net/jizan',
    'https://github.com/jizansanu/',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Recotap',
    url: 'https://www.recotap.com/',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bengaluru',
    addressCountry: 'IN',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
        <Script
          id="person-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="grain vignette">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <Cursor />
        <CommandPalette />
        <SmoothScroll>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
