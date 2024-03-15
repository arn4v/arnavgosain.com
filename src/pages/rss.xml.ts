import rss, { type RSSFeedItem } from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";

export async function GET(context: APIContext) {
  const blog = await getCollection("blog");

  return rss({
    title: "Arnav Gosain",
    description: "Blog posts RSS Feed",
    site: "https://arnavgosain.com/blog/",
    items: blog
      .sort(
        (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime()
      )
      .map((post) => ({
        title: post.data.title,
        link: `/${post.slug}/`,
        pubDate: new Date(post.data.publishedAt),
      })) satisfies RSSFeedItem[],
  });
}
