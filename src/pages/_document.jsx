import Document, { Head, Html, Main, NextScript } from "next/document";

export default class CustomDocument extends Document {
  render() {
    return (
      <>
        <Html lang="en">
          <Head>
            <link
              rel="alternate"
              type="application/rss+xml"
              title="RSS Feed for arnavgosain.com"
              href="/rss.xml"
            />
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      </>
    );
  }
}
