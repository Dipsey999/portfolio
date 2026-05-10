import Script from 'next/script';

/**
 * Sub-layout for the Webflow-ported pages.
 *
 * Only the routes inside the (webflow) group load the legacy Webflow CSS
 * (normalize → webflow → site) and the IX2 / Spline runtime (jQuery +
 * webflow.js + WebFont.js for Montserrat). Next.js 15 hoists these
 * <link> and <Script> tags into <head>/<body> as appropriate.
 *
 * The home page lives at the app root, OUTSIDE this group, so it gets
 * none of the above and runs cleanly with its own dark Three.js stack.
 */
export default function WebflowLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* eslint-disable @next/next/no-css-tags */}
      <link rel="stylesheet" href="/webflow/css/normalize.css" />
      <link rel="stylesheet" href="/webflow/css/webflow.css" />
      <link rel="stylesheet" href="/webflow/css/jizans-portfolio.webflow.css" />
      {/* eslint-enable @next/next/no-css-tags */}
      <Script
        id="wf-mode-detect"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html:
            '!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);',
        }}
      />
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
      {children}
      <Script
        src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=652680d753e9ac5aa0dbd69b"
        strategy="afterInteractive"
        integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
        crossOrigin="anonymous"
      />
      <Script src="/webflow/js/webflow.js" strategy="afterInteractive" />
    </>
  );
}
