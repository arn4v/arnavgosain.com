import "../styles/index.css";
import "react-notion-x/src/styles.css";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import SEO from "~/next-seo.config";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <style data-href="https://fonts.googleapis.com/css2?family=Inter"></style>
      <DefaultSeo {...SEO} />
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
