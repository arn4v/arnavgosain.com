import "~/styles/tailwind.css";
import "~/styles/index.scss";
import "~/styles/tailwind-utils.css";

import { DefaultSeo } from "next-seo";
import NextHead from "next/head";
import SEO from "next-seo.config";
import ThemeProvider from "~/contexts/ThemeContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
