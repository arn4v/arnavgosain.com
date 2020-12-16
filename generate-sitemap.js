const fs = require("fs");
const globby = require("globby");
const prettier = require("prettier");
const RSS = require("rss");
const frontmatter = require("front-matter");

(async () => {
  const prettierConfig = await prettier.resolveConfig("./.prettierrc.js");
  const siteUrl = "https://arnavgosain.com/";

  /**
   * Let's start with the Sitemap!
   */

  // Start with posts
  const pages = await globby([
    "src/pages/*.{js,jsx}",
    "src/data/**/*.{mdx,md}",
  ]);

  let sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  pages.forEach((page) => {
    let type = "page";
    if (page.includes(".mdx")) {
      page = page.replace(/\.mdx?$/, "");
      type = "blog";
    } else if (page.includes(".js")) {
      page.replace(".js", "");
    } else if (page.includes(".jsx")) {
      page = page.replace(".jsx", "");
    }
    sitemap += `<url><loc>${siteUrl}/${
      type === "blog" && `blog/`
    }${page}</loc></url>`;
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
  const posts = await globby(["src/data/**/*.{mdx,md}"]);

  const rss = new RSS({
    title: "Arnav Gosain",
    site_url: siteUrl,
  });

  posts.forEach((p) => {
    const postPath = p.replace(/\.mdx?$/, "");
    const body = fs.readFileSync(p, "utf-8");
    const { attributes: post } = frontmatter(body);

    if (post.externalUrl) return;

    rss.item({
      title: post.title,
      guid: `/blog/${postPath}`,
      url: `${siteUrl}/blog/${postPath}`,
      author: "Arnav Gosain",
      date: post.date,
    });
  });

  const xmlFeed = rss.xml({ indent: true });

  fs.writeFileSync("public/rss-feed.xml", xmlFeed);
})();
