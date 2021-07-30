const fs = require("fs");
const glob = require("glob");
const prettier = require("prettier");
const path = require("path");

(async () => {
  const pages = glob
    .sync(path.join(process.cwd(), "src/pages/**/*.{js,jsx,ts,tsx}"))
    .filter((page) => !page.match(/(_app|index|_document)/))
    .map((page) => page.replace(/src\/pages\//, "").replace(/\.(.+)/, ""));

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                return `
                        <url>
                            <loc>${`https://arnavgosain.com/${page}`}</loc>
                        </url>
                    `;
              })
              .join("\n")}
        </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    endOfLine: "lf",
    tabWidth: 4,
    parser: "html",
  });

  fs.writeFileSync("public/sitemap.xml", formatted);
})();
