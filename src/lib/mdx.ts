import fs from "fs";
import matter from "gray-matter";
// @ts-ignore
import mdxPrism from "mdx-prism";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import readingTime from "reading-time";
import { isProd } from "~/constants";
import { UnpackArray } from "~/types";

const rootPath = path.resolve(process.cwd());
type DataType = "blog" | "snippets";

export const getAllFiles = (type: DataType = "blog") => {
  const dirPath = path.join(rootPath, "data", type);

  const absolutePaths = fs
    .readdirSync(dirPath, {
      encoding: "utf-8",
    })
    .filter((filePath) => {
      return /\.mdx?/.test(filePath);
    })
    .map((filePath) => {
      const absPath = path.join(dirPath, filePath);
      const source = fs.readFileSync(absPath, { encoding: "utf-8" });
      const { data: metadata, content } = matter(source);
      metadata.reading_time = readingTime(content).text;
      return {
        filePath,
        absPath,
        published: metadata.published,
        slug: filePath.replace(/\.mdx?/, ""),
        metadata: metadata,
        source: source,
        content: content,
      };
    });

  if (type === "blog") {
    return absolutePaths.filter((item) => (isProd ? !!item.published : true));
  }

  return absolutePaths;
};

export const getMdxSource = async <Frontmatter = unknown>(
  type: DataType = "blog",
  slug: string
) => {
  const allFiles = getAllFiles(type);
  const mdxFile: UnpackArray<ReturnType<typeof getAllFiles>> = allFiles.find((item) => item.slug === slug);

  const mdxSource = await serialize(mdxFile.content, {
    mdxOptions: {
      remarkPlugins: [
        require("remark-slug"),
        require("remark-autolink-headings"),
        require("remark-code-titles"),
        require("remark-gfm"),
      ],
      rehypePlugins: [mdxPrism],
    },
  });

  mdxFile.metadata.reading_time = readingTime(mdxFile.content).text;

  return {
    mdxSource: mdxSource,
    frontmatter: mdxFile.metadata as Frontmatter,
  };
};

export const getPostBySlug = (slug: string) => getMdxSource("blog", slug);

export const getSnippetBySlug = (slug: string) =>
  getMdxSource("snippets", slug);
