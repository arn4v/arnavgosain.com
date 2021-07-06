import fs from "fs";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import path from "path";
import readingTime from "reading-time";
import { isProd } from "~/config";
import PostMetadata from "../types/metadata";

const rootPath = path.resolve(process.cwd());
const postsPath = path.join(rootPath, "data", "blog");

export const getAllPosts = () => {
  const absolutePaths = fs
    .readdirSync(postsPath, {
      encoding: "utf-8",
    })
    .filter((filePath) => {
      return /\.mdx?/.test(filePath);
    })
    .map((filePath) => {
      const absPath = path.join(postsPath, filePath);
      const source = fs.readFileSync(absPath, { encoding: "utf-8" });
      const { data, content } = matter(source);
      const metadata = data as PostMetadata;
      return {
        filePath,
        absPath,
        published: metadata.published,
        slug: filePath.replace(/\.mdx?/, ""),
        metadata: metadata,
        source: source,
        content: content,
      };
    })
    .filter((item) => (isProd ? !!item.published : true));

  return absolutePaths;
};

export const getPostMdx = async (slug: string) => {
  if (process.platform === "win32") {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "esbuild.exe"
    );
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "bin",
      "esbuild"
    );
  }

  const post = getAllPosts().find((item) => item.slug === slug);
  const { code } = await bundleMDX(post.source, {
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

  post.metadata.reading_time = readingTime(post.content).text;

  return {
    code,
    frontmatter: post.metadata as PostMetadata,
  };
};
