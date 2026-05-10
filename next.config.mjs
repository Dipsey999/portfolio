/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
  experimental: {
    // Wraps client-side route changes in document.startViewTransition()
    // so we get a free fade between pages, plus shared-element transitions
    // for any element with a `view-transition-name` CSS property.
    viewTransition: true,
  },
};

export default nextConfig;
