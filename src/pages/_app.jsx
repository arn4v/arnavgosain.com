import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import "prism-themes/themes/prism-gruvbox-dark.css";
import defaultSeoProps from "~/next-seo.config";
import "../styles/index.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <style data-href="https://fonts.googleapis.com/css2?family=Inter" />
      <style data-href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&display=swap" />
      <DefaultSeo {...defaultSeoProps} />
      <ThemeProvider
        attribute="class"
        themes={["light", "dark"]}
        enableColorScheme={false}
        enableSystem={false}
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
