const RSS = require("rss");
const frontmatter = require("front-matter");
const globby = require("globby");

(async () => {
  /**
   * Next: The RSS feed.
   */
  const posts = await await globby(["../src/data/blog/*.{mdx,md}"]);

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
