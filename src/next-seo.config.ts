import { DefaultSeoProps } from "next-seo";
import { OpenGraph } from "next-seo/lib/types";
import { baseUrl } from "./config";

/**
 * @type {string}
 */
const title = "Arnav Gosain - Developer, photographer, maker.";

/**
 * @type {string}
 */
const description = "Developer, photographer, maker of things.";

const defaultSeoProps: DefaultSeoProps = {
  defaultTitle: title,
  description,
  canonical: baseUrl,
  openGraph: {
    type: "website",
    locale: "en_IE",
    site_name: "Arnav Gosain",
    profile: {
      firstName: "Arnav",
      lastName: "Gosain",
    },
  },
  twitter: {
    handle: "@arn4v",
    site: "@arn4v",
    cardType: "summary_large_image",
  },
};

export const defaultOpenGraph: OpenGraph = {
  type: "website",
  locale: "en_IE",
  url: baseUrl,
  title,
  description,
  images: [
    {
      url: `${baseUrl}/static/og-banner.png`,
      alt: title,
      width: 1200,
      height: 627,
    },
  ],
};

export default defaultSeoProps;
