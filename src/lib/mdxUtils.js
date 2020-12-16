import MDXComponents from "~/components/MDXComponents";
import fs from "fs";
import matter from "gray-matter";
import mdxPrism from "mdx-prism";
import path from "path";
import readingTime from "reading-time";
import renderToString from "next-mdx-remote/render-to-string";

const root = process.cwd();

/**
 * Returns the absolute path of a directory in src/data
 * @param {string} type
 * @returns {string} path
 */
function getTypePath(type) {
  return path.resolve(path.join(root, "src", "data", type));
}

/**
 * Returns a list of files by type in src/data/{type} directory.
 * Valid types - 'blog'
 * @export
 * @param {string} type
 * @returns Array<string>
 */
export function getFilesByType(type) {
  const dirPath = getTypePath(type);
  return fs.readdirSync(dirPath);
}

/**
 * Returns a list of slugs of all blog posts.
 * @export
 * @returns {Array.<string>}
 */
export function getAllPosts() {
  return getDocsByType("blog").map((f) => f.replace(".mdx", ""));
}

/*
 * Returns the content of a blog post.
 * @param ${string} slug - The slug of the blog post.
 */
export function getPostBySlug(slug) {
  return fs.readFileSync(path.join(getTypePath("blog"), `${slug}.mdx`), "utf8");
}
/**
 * Returns post content
 * @param  {string} slug
 */
export async function getPostContent(slug) {
  const source = getPostBySlug(slug);
  const { data, content } = matter(source);
  const mdxSource = await renderToString(content, {
    components: MDXComponents,
    mdxOptions: {
      remarkPlugins: [
        require("remark-autolink-headings"),
        require("remark-slug"),
        require("remark-code-titles"),
      ],
      rehypePlugins: [mdxPrism],
    },
  });

  return {
    mdxSource,
    metadata: {
      wordCount: content.split(/\s+/gu).length,
      readingTime: readingTime(content),
      slug: slug || null,
      ...data,
    },
  };
}

export function getAllFilesMetadata(type) {
  const files = fs.readdirSync(path.join(root, "src/data", type));

  return files.reduce((allPosts, postSlug) => {
    const source = fs.readFileSync(
      path.join(root, "src/data", type, postSlug),
      "utf8"
    );
    const { data } = matter(source);

    return [
      {
        ...data,
      },
      ...allPosts,
    ];
  }, []);
}

export function getBlogPostsByYear(year) {
  const years = [];
  const posts = getAllFilesMetadata("blog");
  const sortedPosts = {};

  posts.forEach((post) => {
    const year = post.publishedAt.split("-")[0];
    if (!years.includes(year)) years.push(year);
  });

  years.forEach((y) => {
    sortedPosts[y] = posts
      .filter((p) => {
        if (p.publishedAt.includes(y)) return p;
      })
      .sort((a, b) => {
        a = a.publishedAt.split("-");
        b = b.publishedAt.split("-");
        return a > b ? 1 : a < b ? -1 : 0;
      })
      .reverse();
  });

  if (year) {
    return sortedPosts[year];
  }

  return sortedPosts;
}
