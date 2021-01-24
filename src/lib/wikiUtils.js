import { mdxOptions } from "./mdxUtils";
import MDXComponents from "~/components/MDXComponents";
import fs from "fs";
import path from "path";
import os from "os";
import matter from "gray-matter";
import readingTime from "reading-time";
import renderToString from "next-mdx-remote/render-to-string";

const checkPath = (_path) => {
  let paths = [];
  const files = fs.readdirSync(_path);
  files.forEach((f) => {
    const fPath = path.resolve(path.join(_path, f));
    const isFile = fs.lstatSync(fPath).isFile();

    if (!isFile) {
      paths = [...paths, ...checkPath(fPath)];
    } else {
      paths.push(fPath);
    }
  });
  return paths;
};

export const getWikiPaths = () =>
  checkPath(path.join(process.cwd(), "src/data/wiki")).map((i) => {
    if (i.includes(".md")) i = i.replace(/\.mdx?/g, "");
    i = i.replace(path.resolve(process.cwd(), "src/data/wiki"), "");
    if (os.platform() === "win32") i = i.replace(/\\/g, "/");
    // i = "wiki" + i;
    i = i.replace("/", "");
    if (i.includes("/")) i = i.split("/");
    return { params: { slug: [...(Array.isArray(i) ? i : [i])] } };
  });

/**
 * Returns post content
 * @param  {string} slug
 */
export async function getWikiBySlug(slug) {
  let fPath = path.resolve(
    path.join(process.cwd(), "src/data/wiki", slug + ".md")
  );
  try {
    if (!(await fs.promises.lstat(fPath)).isFile()) {
      fPath = fPath + "x";
    }
  } catch (err) {
    console.log(err);
  }
  const source = await fs.promises.readFile(fPath);
  const { data, content } = matter(source);
  const mdxSource = await renderToString(content, {
    components: MDXComponents,
    mdxOptions,
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
