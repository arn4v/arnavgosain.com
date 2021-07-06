import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import defaultSeoProps from "~/next-seo.config";
import "../styles/index.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <style data-href="https://fonts.googleapis.com/css2?family=Inter"></style>
      <DefaultSeo {...defaultSeoProps} />
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
