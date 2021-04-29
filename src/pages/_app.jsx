import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import "~/styles/tailwind.css";
import "~/styles/index.css";
import "~/styles/tailwind-utils.css";
import SEO from "~/next-seo.config";
import "@fontsource/inter";
import "react-notion-x/src/styles.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <ThemeProvider defaultTheme="dark" attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
