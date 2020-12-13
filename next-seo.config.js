const title = "Arnav Gosain - Photographer, Developer, Creator.";
const description = "Full-stack developer, photographer, creator of things.";

const SEO = {
  title,
  description,
  canonical: "https://arnavgosain.com",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://arnavgosain.com",
    title,
    description,
    images: [
      {
        url: "https://arnavgosain.com/static/images/banner.img",
        alt: title,
        width: 1280,
        height: 720,
      },
    ],
  },
  twitter: {
    handle: "@arn4v",
    site: "@arn4v",
    cardType: "summary_large_image",
  },
};

export default SEO;
