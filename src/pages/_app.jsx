import "~/styles/tailwind.css";
import "~/styles/index.scss";
import "~/styles/tailwind-utils.css";

import { DefaultSeo } from "next-seo";
import NextHead from "next/head";
import SEO from "~/next-seo.config";
import { ThemeProvider } from "next-themes";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider attribute="class">
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
