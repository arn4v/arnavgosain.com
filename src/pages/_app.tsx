import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import "@fontsource/ibm-plex-mono/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { GoogleAnalytics, usePagesViews } from "nextjs-google-analytics";
import "prism-themes/themes/prism-gruvbox-dark.css";
import Seo from "~/components/Seo";
import { isProd } from "~/constants";
import "../styles/index.css";

const App = ({ Component, pageProps }: AppProps) => {
  usePagesViews();

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
