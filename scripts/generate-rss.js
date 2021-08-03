const { Feed } = require("feed");
const path = require("path");
const matter = require("gray-matter");
const fs = require("fs");
const glob = require("glob");

const siteURL = "https://arnavgosain.com";
const updated = new Date();

const author = {
  name: "Arnav Gosain",
  email: "arnav@arnavgosain.com",
  link: "https://twitter.com/arn4v",
};

const posts = glob
  .sync(path.join(__dirname, "../src/pages/**/*.{md,mdx}"))
  .map((filePath) => [filePath, fs.readFileSync(filePath, "utf8")]);

const feed = new Feed({
  title: "Arnav Gosain's Blog",
  author,
  site_url: siteURL,
  updated: updated,
  feedLinks: {
    rss2: `${siteURL}/rss/feed.xml`,
    json: `${siteURL}/rss/feed.json`,
    atom: `${siteURL}/rss/atom.xml`,
  },
});

posts.forEach(([filePath, source]) => {
  const postPath = filePath
    .split("src/pages/writing")[1]
    .replace(/\.(md|mdx)$/, "")
    .replace(/\\/g, "/");
  const { data, content } = matter(source);

  feed.addItem({
    title: data.title,
    url: `${siteURL}/writing/${postPath}`,
    author: [author],
    date: new Date(data.publishedAt),
  });
});

fs.writeFileSync(path.join(__dirname, "../public/rss.xml"), feed.rss2());
fs.writeFileSync(path.join(__dirname, "../public/atom.xml"), feed.atom1());
fs.writeFileSync(path.join(__dirname, "../public/feed.json"), feed.json());
