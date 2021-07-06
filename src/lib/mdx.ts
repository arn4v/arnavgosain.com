import fs from "fs";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import path from "path";
import readingTime from "reading-time";
import { isProd } from "~/config";
import PostMetadata from "../types/metadata";

const rootPath = path.resolve(process.cwd());
const postsPath = path.join(rootPath, "/data/blog");

export const getAllPostsPaths = () => {
  const absolutePaths = fs
    .readdirSync(postsPath, {
      encoding: "utf-8",
    })
    .filter((filePath) => {
      return /\.(md|mdx)/.test(filePath);
    })
    .map((filePath) => {
      const absPath = path.join(postsPath, filePath);
      const metadata = matter(fs.readFileSync(absPath, { encoding: "utf-8" }));
      return {
        filePath,
        absPath,
        published: metadata.data.published,
        slug: filePath.replace(/\.mdx?/, ""),
        metadata: metadata,
      };
    })
    .filter((item) => (isProd ? !!item.published : true));

  return absolutePaths;
};

export const getPostMdx = async (slug: string) => {
  const post = getAllPostsPaths().find((item) => item.slug === slug);
  const source = fs.readFileSync(post.absPath, { encoding: "utf-8" });
  const { data: frontmatter, content } = matter(source);
  const { code } = await bundleMDX(source, {
    xdmOptions(opts) {
      opts.remarkPlugins = [
        ...(opts.remarkPlugins ?? []),
        require("remark-slug"),
        require("remark-autolink-headings"),
        require("remark-code-titles"),
      ];
      opts.rehypePlugins = [
        ...(opts.rehypePlugins ?? []),
        require("mdx-prism"),
      ];
      return opts;
    },
  });

  frontmatter.reading_time = readingTime(content).text;

  return {
    code,
    frontmatter: frontmatter as PostMetadata,
  };
};
