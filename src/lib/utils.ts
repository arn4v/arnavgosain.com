import { format } from "date-fns";
import fs from "fs";
import glob from "glob";
import prettier from "prettier";
import path from "path";
import { Feed } from "feed";
import matter from "gray-matter";
import { baseUrl } from "~/config";
import readingTime from "reading-time";

export const getFormattedDateText = (dateString: string): string => {
  const date = getDateObjectFromString(dateString);
  return format(date, "do MMMM yyyy");
};

export const getDateObjectFromString = (dateString: string): Date => {
  const [year, month, day] = dateString.split("-").map((i) => parseInt(i));
  return new Date(year, month, day);
};

export const generateSiteMap = async () => {
  const pages = glob
    .sync(path.join(process.cwd(), "src/pages/**/*.{js,jsx,ts,tsx,md,mdx}"))
    .filter((page) => !/(_app|_document)/.test(page))
    .map((page) => {
      page = page.split("src/pages")[1].replace(/\.(.*)/, "");
      return page.includes("index") ? page.replace("/index", "") : page;
    });

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                return `
                        <url>
                            <loc>${`https://arnavgosain.com${page}`}</loc>
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
};

export const generateFeeds = async () => {
  const updated = new Date();

  const author = {
    name: "Arnav Gosain",
    email: "arnav@arnavgosain.com",
    link: "https://twitter.com/arn4v",
  };

  const posts = glob
    .sync(path.join(process.cwd(), "src/pages/**/*.{md,mdx}"))
    .map((filePath) => [filePath, fs.readFileSync(filePath, "utf8")]);

  const feed = new Feed({
    id: baseUrl,
    title: "Arnav Gosain's Blog",
    author,
    link: baseUrl,
    description: "",
    copyright: `All rights reserved ${updated.getFullYear()}, Arnav Gosain`,
    favicon: `${baseUrl}/favicon.ico`,
    updated: updated,
    feedLinks: {
      rss2: `${baseUrl}/rss.xml`,
      json: `${baseUrl}/feed.json`,
      atom: `${baseUrl}/atom.xml`,
    },
  });

  posts.forEach(([filePath, source]) => {
    const postPath = filePath
      .split("src/pages/writing")[1]
      .replace(/\\/g, "/")
      .replace(/\.(.+)/, "");
    const { data } = matter(source);

    feed.addItem({
      title: data.title,
      link: `${baseUrl}/writing${postPath}`,
      author: [author],
      date: new Date(data.published_on),
    });
  });

  const rootPath = path.resolve(process.cwd());
  fs.writeFileSync(path.join(rootPath, "public/rss.xml"), feed.rss2());
  fs.writeFileSync(path.join(rootPath, "public/atom.xml"), feed.atom1());
  fs.writeFileSync(path.join(rootPath, "public/feed.json"), feed.json1());
};

export const getPostsData = () => {
  const postPaths = glob.sync(
    `${path.join(process.cwd(), "src/pages/writing")}/**/*.{md,mdx}`.replace(
      /\\/g,
      "/"
    )
  );

  const posts = postPaths.map((filePath) => {
    return [filePath, fs.readFileSync(filePath, "utf8")];
  });

  const processed = [];

  for (const [filePath, source] of posts) {
    const { data, content } = matter(source);
    data.slug = filePath
      .split("src/pages/writing")[1]
      .replace(/\//, "")
      .replace(/\.(md|mdx)/g, "");
    data.reading_time = readingTime(content).text;
    processed.push(data);
  }

  return processed;
};
