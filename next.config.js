module.exports = {
  images: { domains: ["images.unsplash.com", "mosaic.scdn.co"] },
  future: {
    webpack5: true,
  },
  webpack: (config, { dev, isServer }) => {
    if (isServer) {
      require("./scripts/download-book-covers");
      // require("./scripts/generate-sitemap");
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
