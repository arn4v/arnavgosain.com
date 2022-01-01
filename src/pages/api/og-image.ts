import * as playwright from "playwright-aws-lambda";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { PostOGImage } from "~/components/PostOGImage";
import { isProd } from "~/constants";
import { nc } from "~/lib/utils";

// Origin code from: https://github.com/dsumer/portfolio/blob/master/src/pages/api/og-image.ts

const html = String.raw;
const css = String.raw;

const height = 630,
  width = 1200;

const baseCSS = css`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

  * {
    box-sizing: border-box;
    font-family: "Inter", sans-serif;
  }

  h1 {
  }

  body {
    margin: 0;
    font-family: system-ui, sans-serif;
  }
`;

const getHtmlData = ({ body }: { body: string }) => {
  const htmlString = html`<!DOCTYPE html>
    <head>
    <meta charset="utf-8"><style>${baseCSS}</style>
    </head>
    <body style="display:inline-block">
    ${body}
    </body>
  </html>`;

  return htmlString;
};

export default nc().get(async (req, res) => {
  const { title } = req.query;

  const el = createElement(PostOGImage, { title });

  const htmlString = getHtmlData({ body: renderToStaticMarkup(el) });

  const browser = await playwright.launchChromium({
    headless: true,
    args: [
      "--autoplay-policy=user-gesture-required",
      "--disable-background-networking",
      "--disable-background-timer-throttling",
      "--disable-backgrounding-occluded-windows",
      "--disable-breakpad",
      "--disable-client-side-phishing-detection",
      "--disable-component-update",
      "--disable-default-apps",
      "--disable-dev-shm-usage",
      "--disable-domain-reliability",
      "--disable-extensions",
      "--disable-features=AudioServiceOutOfProcess",
      "--disable-hang-monitor",
      "--disable-ipc-flooding-protection",
      "--disable-notifications",
      "--disable-offer-store-unmasked-wallet-cards",
      "--disable-popup-blocking",
      "--disable-print-preview",
      "--disable-prompt-on-repost",
      "--disable-renderer-backgrounding",
      "--disable-setuid-sandbox",
      "--disable-speech-api",
      "--disable-sync",
      "--hide-scrollbars",
      "--ignore-gpu-blacklist",
      "--metrics-recording-only",
      "--mute-audio",
      "--no-default-browser-check",
      "--no-first-run",
      "--no-pings",
      "--no-sandbox",
      "--no-zygote",
      "--password-store=basic",
      "--use-gl=swiftshader",
      "--use-mock-keychain",
    ],
  });

  const page = await browser.newPage({
    viewport: {
      width,
      height,
    },
  });
  await page.setContent(htmlString);

  const data = await page.screenshot({
    type: "jpeg",
    clip: {
      x: 0,
      y: 0,
      width,
      height,
    },
    omitBackground: true,
  });

  await browser.close();

  // Set the s-maxage property which caches the images then on the Vercel edge
  if (isProd)
    res.setHeader("Cache-Control", "s-maxage=31536000, stale-while-revalidate");

  res.setHeader("Content-Type", "image/jpeg");

  // write the image to the response with the specified Content-Type
  res.end(data);
});
