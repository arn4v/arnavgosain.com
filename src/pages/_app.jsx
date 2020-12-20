import "~/styles/tailwind.css";
import "~/styles/index.scss";
import "~/styles/tailwind-utils.css";

import { DefaultSeo } from "next-seo";
import NextHead from "next/head";
import SEO from "~/next-seo.config";
import { ThemeProvider } from "next-themes";
import GoogleFonts from "next-google-fonts";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
      <ThemeProvider attribute="class">
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
