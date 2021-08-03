import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import "prism-themes/themes/prism-gruvbox-dark.css";
import defaultSeoProps from "~/next-seo.config";
import "../styles/index.css";
import NextNProgress from "nextjs-progressbar";
import Head from "next/head";
import { isProd } from "~/config";
import Script from "next/script";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      {isProd ? (
        <Script async src="https://unpkg.com/thesemetrics@latest"></Script>
      ) : null}
      <style data-href="https://fonts.googleapis.com/css2?family=Inter" />
      <style data-href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap" />
      <DefaultSeo {...defaultSeoProps} />
      <NextNProgress color="#a5f3fc" />
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="arnavgosain.com RSS Feed"
          href="rss.xml"
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title="arnavgosain.com Atom feed"
          href="atom.xml"
        />
        <link
          rel="alternate"
          type="application/feed+json"
          title="arnavgosain.com Json feed"
          href="feed.json"
        />
      </Head>
      <ThemeProvider
        attribute="class"
        themes={["light", "dark"]}
        enableSystem={false}
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
