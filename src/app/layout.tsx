import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://jizan.in'),
  title: {
    default: "Jizan's Portfolio",
    template: '%s · Jizan',
  },
  description:
    'Mohammed Jizan K — Product Designer based in Bengaluru, India. Currently leading design at Recotap. Previously Ziroh Labs and UnQ Technologies.',
  authors: [{ name: 'Mohammed Jizan K', url: 'https://jizan.in' }],
  creator: 'Mohammed Jizan K',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jizan.in',
    siteName: "Jizan's Portfolio",
    title: "Jizan's Portfolio",
    description:
      'Product Designer based in Bengaluru, India. Currently leading design at Recotap.',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Jizan's Portfolio",
    description:
      'Product Designer based in Bengaluru, India. Currently leading design at Recotap.',
    creator: '@jizansanu',
  },
  alternates: { canonical: 'https://jizan.in' },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.ico', apple: '/webclip.png' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0908',
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Mohammed Jizan K',
  jobTitle: 'Product Designer',
  url: 'https://jizan.in',
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
      data-wf-page="652680d753e9ac5aa0dbd6a2"
      data-wf-site="652680d753e9ac5aa0dbd69b"
      className={`${geist.variable} ${geistMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
