import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrismPlus from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkExternalLinks from "remark-external-links";
import remarkGfm from "remark-gfm";

const Post = defineDocumentType(() => ({
  name: "Post",
  contentType: "mdx",
  filePathPattern: "**/*.{md,mdx}",
  fields: {
    title: { type: "string", required: true },
    publishedOn: { type: "date", required: true },
    banner: { type: "string", required: false },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath,
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm, remarkExternalLinks],
    rehypePlugins: [
      rehypeSlug,
      rehypeCodeTitles,
      [
        rehypeAutolinkHeadings,
        { properties: { behavior: "wrap", className: ["anchor"] } },
      ],
      rehypePrismPlus,
    ],
  },
});
