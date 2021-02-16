const chromium = require("chrome-aws-lambda");
const https = require("https");
const path = require("path");
const fs = require("fs");
const { books } = require("../src/data/bookshelf");
const ImageDataURI = require("image-data-uri");

let puppeteer;
const isLambda = process.env.AWS_LAMBDA_FUNCTION_VERSION;

if (isLambda) {
  // running on the Vercel platform.
  puppeteer = require("puppeteer-core");
} else {
  // running locally.
  puppeteer = require("puppeteer");
}

console.log(isLambda);

const config = {
  IMAGES_DIR: path.resolve(process.cwd(), "public/images/books"),
};

(async () => {
  let browser;
  if (isLambda) {
    browser = await puppeteer.launch({
      args: ["--hide-scrollbars", "--disable-web-security", "--no-sandbox"],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    });
  } else {
    browser = await puppeteer.launch({
      args: ["--no-sandbox"],
    });
  }
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
          path.join(config.IMAGES_DIR, `${item.id}.jpg`)
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
