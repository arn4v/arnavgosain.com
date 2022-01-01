import { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import "prism-themes/themes/prism-gruvbox-dark.css";
import Seo from "~/components/Seo";
import { isProd } from "~/constants";
import "../styles/index.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      {isProd ? (
        <Script async src="https://unpkg.com/thesemetrics@latest"></Script>
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

export default App;
