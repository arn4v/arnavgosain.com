// const { allPosts } = require(".contentlayer/generated");
// const fs = require("fs");
// const path = require("path");
// const playwright = require("playwright-aws-lambda");
// const React = require("react");
// const { renderToStaticMarkup } = require("react-dom/server");
// const { PostOGImage } = require("../components/PostOGImage");
import { allPosts } from ".contentlayer/generated";
import fs from "fs";
import path from "path";
import * as playwright from "playwright-aws-lambda";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { PostOGImage } from "~/components/PostOGImage";

const html = String.raw;
const css = String.raw;

const height = 630,
  width = 1200;

const baseCSS = css`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

  * {
    box-sizing: border-box;
    font-family: Inter, -apple-system, BlinkMacSystemFont, avenir next, avenir,
      segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto,
      arial, sans-serif;
  }

  body {
    margin: 0;
    font-family: system-ui, sans-serif;
  }
`;

const getHtmlData = (body: string) => {
  const htmlString = html`<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          ${baseCSS}
        </style>
      </head>
      <body style="display:inline-block">
        ${body}
      </body>
    </html>`;

  return htmlString;
};

export const generateOgImages = async () => {
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

  for (const post of allPosts) {
    const el = React.createElement(PostOGImage, { title: post.title });

    const htmlString = getHtmlData(renderToStaticMarkup(el));

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

    await fs.promises.writeFile(
      path.resolve(process.cwd(), `public/static/og-images/${post.slug}.jpg`),
      data,
      "binary"
    );

    await page.close();
  }

  await browser.close();
};
