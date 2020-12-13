import { getFilesByType, getPostContent } from "~/lib/mdxUtils";

import BlogLayout from "~/components/BlogLayout";
import MDXComponents from "~/components/MDXComponents";
import { MDXProvider } from "@mdx-js/react";
import PageLayout from "~/components/PageLayout";
import hydrate from "next-mdx-remote/hydrate";
import { useRouter } from "next";

export default function Post({ mdxSource, metadata }) {
  const content = hydrate(mdxSource, { components: MDXComponents });

  return (
    <>
      <BlogLayout metadata={metadata}>{content}</BlogLayout>
    </>
  );
}

export async function getStaticPaths() {
  const posts = await getFilesByType("blog");
  return {
    paths: posts.map((p) => ({
      params: {
        slug: p.replace(/\.mdx/, ""),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const post = await getPostContent(slug);
  return { props: post };
}
