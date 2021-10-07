import { withTRPC } from "@trpc/next";
import superjson from "superjson";
import { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import "prism-themes/themes/prism-gruvbox-dark.css";
import Analytics from "~/components/AnalyticsProvider";
import Seo from "~/components/Seo";
import { isProd } from "~/config";
import { AppRouter } from "~/trpc/router";
import "../styles/index.css";

const App = ({ Component, pageProps }: AppProps) => {
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
      <Component {...pageProps} />
    </>
  );
};

export default withTRPC<AppRouter>({
  config() {
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";

    return {
      url,
      transformer: superjson,
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: Infinity,
          },
        },
      },
    };
  },
})(App);
