const isProd = process.env.NODE_ENV === "production";

/**
 * @type {import("next").NextConfig}
 */
let config = {
  images: { domains: ["images.unsplash.com", "mosaic.scdn.co"] },
  eslint: {
    ignoreDuringBuilds: true,
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
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
      {
        source: "/writing",
        destination: "/blog",
        permanent: false,
      },
      {
        source: "/resources",
        destination: "/blog",
        permanent: false,
      },
      {
        source: "/writing/:path*",
        destination: "/:path*",
        permanent: false,
      },
      {
        source: "/resources/handbooks",
        destination: "/companybuilding",
        permanent: true,
      },
      {
        source: "/resources/:path*",
        destination: "/:path*",
        permanent: false,
      },
    ];
  },
};

config = require("next-contentlayer").withContentlayer(config);

module.exports = config;
