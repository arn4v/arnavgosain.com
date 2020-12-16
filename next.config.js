module.exports = {
  images: { domains: ["images.unsplash.com", "mosaic.scdn.co"] },
  webpack: (config, { dev, isServer }) => {
    if (isServer) {
      require("./generate-sitemap");
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
