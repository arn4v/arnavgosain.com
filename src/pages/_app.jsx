import ThemeProvider from "~/contexts/ThemeContext";
import "~/styles/index.scss";

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />;
    </ThemeProvider>
  );
}
