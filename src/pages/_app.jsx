import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import "react-notion-x/src/styles.css";
import SEO from "~/next-seo.config";
import "../styles/index.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <style data-href="https://fonts.googleapis.com/css2?family=Inter"></style>
      <DefaultSeo {...SEO} />
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        themes={["light", "dark"]}
        enableColorScheme={false}
        enableSystem={false}
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
