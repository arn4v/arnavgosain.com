const fs = require("fs");
const globby = require("globby");
const prettier = require("prettier");
const RSS = require("rss");
const frontmatter = require("front-matter");

(async () => {
  const prettierConfig = await prettier.resolveConfig("./.prettierrc.js");
  const siteUrl = "https://arnavgosain.com";

  /**
   * Let's start with the Sitemap!
   */

  // Start with posts
  let pages = await globby([
    "src/pages/*.{js,jsx}",
    "src/data/blog/**/*.{mdx,md}",
  ]);
  pages = pages
    .filter(
      (page) =>
        !(
          page.includes("_app.jsx") ||
          page.includes("index.jsx") ||
          page.includes("_document.jsx")
        )
    )
    .map((page) => {
      if (page.includes("src/data/"))
        return page.replace("src/data/", "").replace(".mdx", "");
      if (page.includes("src/pages/"))
        return page
          .replace("src/pages/", "")
          .replace(".jsx", "")
          .replace(".js", "");
    });

  let sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  pages.forEach((page) => {
    let type = "page";
    sitemap += `<url><loc>${siteUrl}/${page}</loc></url>`;
  });

  sitemap += `</urlset>`;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });

  fs.writeFileSync("public/sitemap.xml", formatted);

  /**
   * Next: The RSS feed.
   */
  const posts = await await globby(["src/data/blog/*.{mdx,md}"]);

  const rss = new RSS({
    title: "Arnav Gosain",
    site_url: siteUrl,
    feed_url: siteUrl + "/rss.xml",
  });

  posts.forEach((p) => {
    const postPath = p.replace(/\.mdx?$/, "").replace("src/data", "");
    const body = fs.readFileSync(p, "utf-8");
    const { attributes: post } = frontmatter(body);

    rss.item({
      title: post.title,
      guid: postPath,
      url: `${siteUrl}${postPath}`,
      author: "Arnav Gosain",
      description: "",
      date: post.publishedAt,
    });
  });

  const xmlFeed = rss.xml({ indent: true });

  fs.writeFileSync("public/rss.xml", xmlFeed);
})();
