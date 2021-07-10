import fs from "fs";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import path from "path";
import readingTime from "reading-time";
import { isProd } from "~/config";

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

export const getMdx = async <Frontmatter = unknown>(
  type: DataType = "blog",
  slug: string
) => {
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

  const allFiles = getAllFiles(type);
  const mdxFile = allFiles.find((item) => item.slug === slug);

  const { code } = await bundleMDX(mdxFile.source, {
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

  mdxFile.metadata.reading_time = readingTime(mdxFile.content).text;

  return {
    code,
    frontmatter: mdxFile.metadata as Frontmatter,
  };
};
