#!/usr/bin/env node
/**
 * Reads each legacy Webflow HTML page, extracts the <body>...</body> content,
 * rewrites URLs to absolute paths and clean Next.js routes, and writes a
 * Next.js page.tsx that injects the body content via dangerouslySetInnerHTML.
 *
 * The legacy CSS + Webflow IX runtime are loaded from layout.tsx, so the
 * pages just contain the per-page DOM that Webflow's IX engine will animate.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const ROOT = dirname(dirname(__filename));
const LEGACY = join(ROOT, '_legacy');

/**
 * [legacy file, next route, asset roots config]
 * assetRoots tells us where 'images/', 'css/', 'js/' resolved to in the
 * original site, and what we should rewrite them to in public/.
 */
const PAGES = [
  ['index.html',                    '/',                       { images: '/images/', css: '/webflow/css/', js: '/webflow/js/', up: '/' }],
  ['about-me.html',                 '/about-me',              { images: '/images/', css: '/webflow/css/', js: '/webflow/js/', up: '/' }],
  ['all-projects.html',             '/all-projects',          { images: '/images/', css: '/webflow/css/', js: '/webflow/js/', up: '/' }],
  ['recotap.html',                  '/recotap',               { images: '/images/', css: '/webflow/css/', js: '/webflow/js/', up: '/' }],
  ['ziroh.html',                    '/ziroh',                 { images: '/images/', css: '/webflow/css/', js: '/webflow/js/', up: '/' }],
  // Case studies live one level deep — relative '../images/' meant /images/.
  ['case-study/zunu-drive.html',    '/case-study/zunu-drive', { images: '/images/', css: '/webflow/css/', js: '/webflow/js/', up: '/' }],
  ['case-study/zunu-mail.html',     '/case-study/zunu-mail',  { images: '/images/', css: '/webflow/css/', js: '/webflow/js/', up: '/' }],
  // /more/* has its own asset roots in _legacy/more/.
  ['more/password.html',            '/more/password',         { images: '/more-images/', css: '/more-css/', js: '/webflow/js/', up: '/' }],
  ['more/zunu/index.html',          '/more/zunu',             { images: '/zunu-images/', css: '/more-zunu-css/', js: '/webflow/js/', up: '/', upImages: '/more-images/' }],
  ['401.html',                      '/401',                   { images: '/images/', css: '/webflow/css/', js: '/webflow/js/', up: '/' }],
];

const LINK_MAP = new Map([
  ['index.html', '/'],
  ['./index.html', '/'],
  ['../index.html', '/'],
  ['../../index.html', '/'],
  ['about-me.html', '/about-me/'],
  ['./about-me.html', '/about-me/'],
  ['../about-me.html', '/about-me/'],
  ['all-projects.html', '/all-projects/'],
  ['./all-projects.html', '/all-projects/'],
  ['../all-projects.html', '/all-projects/'],
  ['recotap.html', '/recotap/'],
  ['./recotap.html', '/recotap/'],
  ['../recotap.html', '/recotap/'],
  ['ziroh.html', '/ziroh/'],
  ['./ziroh.html', '/ziroh/'],
  ['../ziroh.html', '/ziroh/'],
  ['case-study/zunu-drive.html', '/case-study/zunu-drive/'],
  ['case-study/zunu-mail.html', '/case-study/zunu-mail/'],
  ['../case-study/zunu-drive.html', '/case-study/zunu-drive/'],
  ['../case-study/zunu-mail.html', '/case-study/zunu-mail/'],
  ['more/password.html', '/more/password/'],
  ['./more/password.html', '/more/password/'],
  ['../more/password.html', '/more/password/'],
  ['more/zunu/index.html', '/more/zunu/'],
  ['../more/zunu/index.html', '/more/zunu/'],
  ['../../more/zunu/index.html', '/more/zunu/'],
  ['more/404.html', '/404/'],
  ['../more/404.html', '/404/'],
  ['401.html', '/401/'],
  ['404.html', '/404/'],
]);

function rewriteAssetUrls(html, roots) {
  let out = html;
  // Order matters: longest paths first so '../../' beats '../'.
  // Match inside ", ', or ( only.
  // 'upImages' lets the more/zunu page resolve '../images/' to /more-images/.
  if (roots.upImages) {
    out = out.replace(/(["'(])(\.\.\/)+images\//g, `$1${roots.upImages}`);
  } else {
    out = out.replace(/(["'(])(\.\.\/)+images\//g, `$1${roots.images}`);
  }
  out = out.replace(/(["'(])images\//g, `$1${roots.images}`);
  out = out.replace(/(["'(])(\.\.\/)+fonts\//g, '$1/fonts/');
  out = out.replace(/(["'(])(\.\.\/)+css\//g, `$1${roots.css}`);
  out = out.replace(/(["'(])css\//g, `$1${roots.css}`);
  out = out.replace(/(["'(])(\.\.\/)+js\//g, `$1${roots.js}`);
  out = out.replace(/(["'(])js\//g, `$1${roots.js}`);
  return out;
}

function rewriteLinks(html) {
  let out = html;
  const entries = [...LINK_MAP.entries()].sort(
    (a, b) => b[0].length - a[0].length,
  );
  for (const [from, to] of entries) {
    const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`(href=["'])${escaped}(["'])`, 'g');
    out = out.replace(re, `$1${to}$2`);
  }
  return out;
}

/**
 * Targeted bug fix: on all-projects.html the "Projects" nav link points
 * at about-me.html (typo) and the "About Me" link too. We restore these.
 * Specifically, the top-of-page header has the wrong hrefs in the legacy.
 */
function patchNav(html, route) {
  if (route === '/all-projects') {
    // The original markup contains:
    //   <a href="about-me.html" class="link-block ...">Projects</a>
    //   <a href="about-me.html" class="link-block-10 ...">About Me</a>
    // First one should be all-projects (current page); we make it
    // aria-current and href="/all-projects/".
    html = html.replace(
      /<a href="\/about-me\/" class="link-block w-inline-block">\s*<div class="label-small selected">Projects<\/div>/,
      '<a href="/all-projects/" aria-current="page" class="link-block w-inline-block w--current"><div class="label-small selected">Projects</div>',
    );
  }
  return html;
}

function extractBody(html) {
  const open = html.match(/<body\b([^>]*)>/i);
  if (!open) throw new Error('No <body> tag found');
  const attrs = open[1] || '';
  const classMatch = attrs.match(/class=["']([^"']+)["']/);
  const bodyClass = classMatch ? classMatch[1] : '';

  const close = html.lastIndexOf('</body>');
  if (close === -1) throw new Error('No </body> tag found');
  const inner = html.slice(open.index + open[0].length, close);

  let scrubbed = inner
    .replace(/<script\b[^>]*jquery[^>]*><\/script>/gi, '')
    .replace(/<script\b[^>]*\/(webflow|js\/webflow)\.js[^>]*><\/script>/gi, '')
    .replace(/<script[^>]*src=["'][^"']*webflow\.js[^"']*["'][^>]*><\/script>/gi, '');

  // Webflow's IX2 runtime (inside webflow.js) scans every element with a
  // `data-w-id` attribute, applies its *initial* animation state (which is
  // typically `opacity:0` + a translate3d/rotate transform), and is
  // supposed to animate it to the final state. The IX2 animation data is
  // bundled inside Webflow's own page hosting; outside that environment
  // the trigger never fires and the element stays invisible. The fix is
  // to delete `data-w-id` so IX2 ignores the element entirely. The
  // element then renders at its natural CSS state. Spline 3D scenes use a
  // separate `data-animation-type="spline"` attribute (read by webflow.js
  // independently of IX2), so we keep that and they still load.
  scrubbed = scrubbed
    .replace(/\s+data-w-id=("[^"]*"|'[^']*')/g, '')
    // Also drop any inline styles that were tied to the IX2 initial
    // state. Heuristic: the IX2 inline styles are very long and contain
    // `translate3d` plus webkit/moz/ms transform variants. Anything more
    // typical (like `style="color: #FFC182;"` on a span) is left alone.
    .replace(/\s+style=(?:"[^"]*translate3d[^"]*"|'[^']*translate3d[^']*')/g, '');

  return { bodyClass, inner: scrubbed.trim() };
}

function pageTemplate({ bodyClass, inner, title, description }) {
  const safeInner = inner
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');

  return `import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: ${JSON.stringify(title)},
  description: ${JSON.stringify(description)},
};

const html = \`${safeInner}\`;

export default function Page() {
  return (
    <div className=${JSON.stringify(bodyClass)} dangerouslySetInnerHTML={{ __html: html }} />
  );
}
`;
}

function extractTitle(html) {
  const m = html.match(/<title>([\s\S]*?)<\/title>/i);
  return m ? m[1].replace(/&#x27;/g, "'").trim() : "Jizan's Portfolio";
}

function extractDescription(html) {
  const m = html.match(/<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
  return m ? m[1] : 'Mohammed Jizan K — Product Designer based in Bengaluru, India.';
}

function writePage(routePath, src) {
  const target = routePath === '/'
    ? join(ROOT, 'src/app/page.tsx')
    : join(ROOT, 'src/app', routePath.replace(/^\//, ''), 'page.tsx');
  const dir = dirname(target);
  mkdirSync(dir, { recursive: true });
  writeFileSync(target, src, 'utf8');
  console.log('  →', target.replace(ROOT, ''));
}

function port(legacyRel, route, roots) {
  const legacyPath = join(LEGACY, legacyRel);
  if (!existsSync(legacyPath)) {
    console.warn('  ! missing', legacyRel);
    return;
  }
  const html = readFileSync(legacyPath, 'utf8');
  const title = extractTitle(html);
  const description = extractDescription(html);
  let rewritten = rewriteAssetUrls(html, roots);
  rewritten = rewriteLinks(rewritten);
  rewritten = patchNav(rewritten, route);
  const { bodyClass, inner } = extractBody(rewritten);
  const src = pageTemplate({ bodyClass, inner, title, description });
  writePage(route, src);
}

function notFound() {
  const legacyPath = join(LEGACY, '404.html');
  if (!existsSync(legacyPath)) return;
  const html = readFileSync(legacyPath, 'utf8');
  let rewritten = rewriteAssetUrls(html, { images: '/images/', css: '/webflow/css/', js: '/webflow/js/' });
  rewritten = rewriteLinks(rewritten);
  const { bodyClass, inner } = extractBody(rewritten);
  const safeInner = inner
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
  const src = `import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Not found',
};

const html = \`${safeInner}\`;

export default function NotFound() {
  return (
    <div className=${JSON.stringify(bodyClass)} dangerouslySetInnerHTML={{ __html: html }} />
  );
}
`;
  writeFileSync(join(ROOT, 'src/app/not-found.tsx'), src, 'utf8');
  console.log('  → /src/app/not-found.tsx');
}

console.log('Porting legacy HTML → Next.js pages');
for (const [legacyRel, route, roots] of PAGES) {
  console.log(legacyRel, '→', route);
  port(legacyRel, route, roots);
}
console.log('404 →');
notFound();
console.log('done.');
