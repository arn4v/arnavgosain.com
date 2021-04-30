import { NotionAPI } from "notion-client";
import readingTime from "reading-time";
import { getFormattedDateText } from "./utils";

const notion = new NotionAPI();
const NOTION_BLOG_ID = process.env.NOTION_BLOG_ID;

const requiredKeys = [
  "title",
  "date",
  "slug",
  "tags",
  "date",
  "published",
  "author",
];

/**
 * @returns {Promise<Array<string>>}
 */
export const getAllPostSlugs = async () => {
  const posts = await getAllPosts();
  const slugs = posts
    .map((post) => post.slug)
    .filter((post) => !post.published);
  return slugs;
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
  )
    .then((res) => res.json())
    .then((json) => {
      return json.filter((/** @type {Record<any, any>} */ post) =>
        requiredKeys.reduce((acc, cur) => {
          if (typeof post[cur] === "undefined") {
            acc = false;
          } else {
            acc = true;
          }
          return acc;
        }, true)
      );
    })
    .then((filtered) => {
      return filtered.map((item) => {
        const { author, ...metadata } = item;
        return {
          ...metadata,
          author: author[0]?.fullName,
        };
      });
    });
};

/**
 * @param {string} slug
 */
export const getSlugData = async (slug) => {
  const posts = await getAllPosts();
  const metadata = posts.filter((item) => item.slug === slug)[0];
  const recordMap = await notion.getPage(metadata.id);
  const readingTime = await getBlocksReadingTime(
    Object.values(recordMap.block)
  );
  const formattedDate = getFormattedDateText(metadata.date);
  return { metadata: { ...metadata, readingTime, formattedDate }, recordMap };
};

export const blocksToText = async (blocks) => {
  return blocks
    .filter((block) => block.value)
    .map((block) => block.value)
    .reduce((acc, block) => {
      if (typeof block.properties === "undefined") {
        switch (block.type) {
          default:
            acc = [...acc, "\n"];
            break;
        }
        return acc;
      }

      acc = [
        ...acc,
        ...Object.values(block.properties).reduce((textArr, property) => {
          if (Array.isArray(property)) {
            property.forEach((text) => {
              if (Array.isArray(text)) {
                text.forEach((i) => {
                  textArr.push(i);
                  textArr.push("\n");
                });
              } else {
                if (typeof text === "string") {
                  textArr.push(text);
                  textArr.push("\n");
                }
              }
            });
          } else {
            if (typeof property === "string") {
              textArr.push(property);
              textArr.push("\n");
            }
          }
          return textArr;
        }, []),
      ];

      return acc;
    }, [])
    .join("");
};

export const getBlocksReadingTime = async (blocks) => {
  const text = await blocksToText(blocks);
  return readingTime(text).text;
};
