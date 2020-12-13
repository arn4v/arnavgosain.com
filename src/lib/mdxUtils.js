import matter from "gray-matter";
import fs from "fs";
import path from "path";
import renderToString from "next-mdx-remote/render-to-string";
import MDXComponents from "~/components/MDXComponents";
import mdxPrism from "mdx-prism";
import readingTime from "reading-time";

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

export async function getAllFilesMetadata(type) {
  const files = fs.readdirSync(path.join(root, "data", type));

  return files.reduce((allPosts, postSlug) => {
    const source = fs.readFileSync(
      path.join(root, "data", type, postSlug),
      "utf8"
    );
    const { data } = matter(source);

    return [
      {
        ...data,
        slug: postSlug.replace(".mdx", ""),
      },
      ...allPosts,
    ];
  }, []);
}
