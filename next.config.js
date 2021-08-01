const isProd = process.env.NODE_ENV === "production";

if (!isProd) {
  require("./scripts/download-book-covers");
  require("./scripts/generate-sitemap");
}

/**
 * @type {import("next/dist/next-server/server/config-shared").NextConfig}
 */
let config = {
  images: { domains: ["images.unsplash.com", "mosaic.scdn.co"] },
  webpack: (config, options) => {
    const { isServer, dev } = options;

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      module: false,
    };

    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/rss",
        destination: "/rss.xml",
        permanent: true,
      },
      {
        source: "/feed",
        destination: "/rss.xml",
        permanent: true,
      },
      {
        source: "/bookshelf",
        destination: "/library",
        permanent: false,
      },
    ];
  },
};

// https://securityheaders.com
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.youtube.com *.twitter.com cdn.usefathom.com;
  child-src *.youtube.com *.google.com *.twitter.com;
  style-src 'self' 'unsafe-inline' *.googleapis.com;
  img-src * blob: data:;
  media-src 'none';
  connect-src *;
  font-src 'self';
`;

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\n/g, ""),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  // Opt-out of Google FLoC: https://amifloced.org/
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

config = require("next-mdx-builder")({
  mdxOptions: {
    remarkPlugins: [
      require("remark-slug"),
      require("remark-autolink-headings"),
      require("remark-code-titles"),
      require("remark-gfm"),
    ],
    rehypePlugins: [require("mdx-prism")],
  },
})(config);

module.exports = config;
