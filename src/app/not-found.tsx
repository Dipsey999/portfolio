import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Not found',
};

const html = `<div class="utility-page-wrap">
    <div class="utility-page-content"><img src="https://d3e54v103j8qbb.cloudfront.net/static/page-not-found.211a85e40c.svg" alt="">
      <h2>Page Not Found</h2>
      <div>The page you are looking for doesn&#x27;t exist or has been moved</div>
    </div>
  </div>`;

export default function NotFound() {
  return (
    <div className="" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
