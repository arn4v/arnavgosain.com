import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import GoogleFonts from "next-google-fonts";
import "~/styles/tailwind.css";
import "~/styles/index.scss";
import "~/styles/tailwind-utils.css";
import SEO from "~/next-seo.config";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
      <DefaultSeo {...SEO} />
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
