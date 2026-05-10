import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';

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
    >
      <head>
        {/* Webflow's mode-detection inline (sets w-mod-js / w-mod-touch on <html>) */}
        <Script
          id="wf-mode-detect"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html:
              '!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);',
          }}
        />
        {/* Webflow CSS — order matters: normalize → webflow → site */}
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link href="/webflow/css/normalize.css" rel="stylesheet" type="text/css" />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link href="/webflow/css/webflow.css" rel="stylesheet" type="text/css" />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link
          href="/webflow/css/jizans-portfolio.webflow.css"
          rel="stylesheet"
          type="text/css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <Script
          src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
          strategy="beforeInteractive"
        />
        <Script
          id="wf-fonts"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html:
              'WebFont.load({google:{families:["Montserrat:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic"]}});',
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>
        {children}
        {/* jQuery + Webflow IX runtime, loaded after the body so they can scan the DOM. */}
        <Script
          src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=652680d753e9ac5aa0dbd69b"
          strategy="afterInteractive"
          integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
          crossOrigin="anonymous"
        />
        <Script src="/webflow/js/webflow.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
