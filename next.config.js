let config = {
  future: {
    webpack5: true,
    strictPostcssConfiguration: true,
  },
  images: { domains: ["images.unsplash.com", "mosaic.scdn.co"] },
  webpack: (config, { dev, isServer }) => {
    if (isServer) {
      require("./scripts/download-book-covers");
      require("./scripts/generate-sitemap");
    }

    // Replace React with Preact only in client production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      });
    }

    return config;
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
    ];
  },
};

config = require("next-mdx-enhanced")({
  layoutPath: "src/layouts",
  defaultLayout: true,
  fileExtensions: ["mdx"],
  remarkPlugins: [
    require("remark-autolink-headings"),
    require("remark-slug"),
    require("remark-code-titles"),
  ],
  rehypePlugins: [require("mdx-prism")],
  usesSrc: false,
  extendFrontMatter: {
    process: (mdxContent, frontMatter) => {},
    phase: "prebuild|loader|both",
  },
  reExportDataFetching: false,
})(config);

module.exports = config;
