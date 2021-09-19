import { ThemeProvider } from "next-themes";
import Head from "next/head";
import Script from "next/script";
import "prism-themes/themes/prism-gruvbox-dark.css";
import Analytics from "~/components/AnalyticsProvider";
import Seo from "~/components/Seo";
import { isProd } from "~/config";
import "../styles/index.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      {isProd ? (
        <>
          <Script async src="https://unpkg.com/thesemetrics@latest"></Script>
          <Analytics trackerId={process.env.NEXT_PUBLIC_GA_TRACKING_ID} />
        </>
      ) : null}
      <style data-href="https://fonts.googleapis.com/css2?family=Inter" />
      <style data-href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap" />
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Seo />
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
