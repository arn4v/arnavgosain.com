const isProd = process.env.NODE_ENV === "production";

/**
 * @type {import("next/dist/next-server/server/config-shared").NextConfig}
 */
let config = {
  images: { domains: ["images.unsplash.com", "mosaic.scdn.co"] },
  webpack: (config, options) => {
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
        source: "/writing/:path*",
        destination: "/blog/:path*",
        permanent: false,
      },
      {
        source: "/resources",
        destination: "/blog",
        permanent: false,
      },
      {
        source: "/resources/:path*",
        destination: "/resources/:path*",
        permanent: false,
      },
    ];
  },
};

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
