import { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { GoogleAnalytics, usePageViews } from "nextjs-google-analytics";
import "prism-themes/themes/prism-gruvbox-dark.css";
import Seo from "~/components/Seo";
import { isProd } from "~/constants";
import * as React from "react";
import "../styles/index.css";

const App = ({ Component, pageProps }: AppProps) => {
  usePageViews();

  return (
    <>
      {isProd ? (
        <>
          <Script async src="https://unpkg.com/thesemetrics@latest"></Script>
          <GoogleAnalytics />
        </>
      ) : null}
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Seo />
      <Component {...pageProps} />
    </>
  );
};

export default App;
