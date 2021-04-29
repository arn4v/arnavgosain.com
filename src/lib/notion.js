import { NotionAPI } from "notion-client";

const notion = new NotionAPI();
const NOTION_BLOG_ID = process.env.NOTION_BLOG_ID;

/**
 * @returns {Promise<Array<string>>}
 */
export const getAllPostSlugs = async () => {
  const posts = await getAllPosts();
  return posts
    .filter((post) => !post.published || !post.date)
    .map((post) => post.slug);
};

/**
 * @returns {Promise<Array<Object>>}
 */
export const getAllPosts = async () => {
  return await fetch(
    `https://notion-api.splitbee.io/v1/table/${NOTION_BLOG_ID}`,
    {
      method: "get",
    }
  ).then((res) => res.json());
};

/**
 * @param {string} slug
 */
export const getSlugData = async (slug) => {
  const posts = await getAllPosts();
  const post = posts.filter((item) => item.slug === slug)[0];
  return { metadata: post, recordMap: await notion.getPage(post.id) };
};
