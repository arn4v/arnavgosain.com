import "~/styles/index.scss";

import { DefaultSeo } from "next-seo";
import SEO from "next-seo.config";
import ThemeProvider from "~/contexts/ThemeContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />;
    </ThemeProvider>
  );
}
