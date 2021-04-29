import "../styles/index.css";
import "react-notion-x/src/styles.css";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import SEO from "~/next-seo.config";
import "@fontsource/inter";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <ThemeProvider
        defaultTheme="dark"
        themes={["light", "dark"]}
        attribute="class"
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
