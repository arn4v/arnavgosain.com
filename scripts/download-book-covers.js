const https = require("https");
const path = require("path");
const fs = require("fs");
const { books } = require("../src/data/bookshelf");
const ImageDataURI = require("image-data-uri");

// https://www.bannerbear.com/blog/ways-to-speed-up-puppeteer-screenshots/
const minimal_args = [
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
];

const config = {
  IMAGES_DIR: path.resolve(process.cwd(), "public/images/books"),
};
const isLocal = typeof process.env.VERCEL === "undefined";
const executablePath =
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";

(async () => {
  const browser = isLocal
    ? await require("playwright-core").chromium.launch({
        args: minimal_args,
        headless: true,
        executablePath,
      })
    : await require("playwright-aws-lambda").launchChromium({});

  if (!fs.existsSync(config.IMAGES_DIR)) fs.mkdirSync(config.IMAGES_DIR);
  for (const [key, value] of Object.entries(books)) {
    for (const item of value) {
      if (
        !fs.existsSync(
          path.resolve(path.join(config.IMAGES_DIR, `${item.id}.jpg`))
        ) &&
        item.url.length > 0
      ) {
        const filePath = path.resolve(
          path.join(
            config.IMAGES_DIR,
            `${item.title.replace(/ /g, "-").toLowerCase()}.jpg`
          )
        );
        try {
          const page = await browser.newPage();
          page.setDefaultNavigationTimeout(0);
          await page.goto(item.url, { waitUntil: "load", timeout: 0 });
          const img = await page.evaluate(() => {
            let src = Array.from(
              document.querySelectorAll("div#img-canvas > img"),
              (i) => i.src
            )[0];
            if (!src) {
              src = Array.from(
                document.querySelectorAll("div#ebooks-img-canvas > img"),
                (i) => i.src
              )[0];
            }
            return src;
          });
          if (img.includes("data:image")) {
            ImageDataURI.outputFile(img, filePath);
          } else {
            const file = fs.createWriteStream(filePath);
            https.get(img, (res) => {
              res.pipe(file);
              file.on("finish", () => {
                file.close();
              });
            });
          }
          await page.close();
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
  await browser.close();
})().catch((err) => console.log(err.toString()));
