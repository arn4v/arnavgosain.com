import { baseUrl } from "./config";

/**
 * @type {string}
 */
const title = "Arnav Gosain - Developer, photographer, maker.";

/**
 * @type {string}
 */
const description = "Developer, photographer, maker of things.";

/**
 * @constant
 * @type {import("next-seo").DefaultSeoProps}
 */
const SEO = {
  title,
  description,
  canonical: baseUrl,
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: baseUrl,
    title,
    description,
    images: [
      {
        url: `${baseUrl}/og-banner.img`,
        alt: title,
        width: 1200,
        height: 627,
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
