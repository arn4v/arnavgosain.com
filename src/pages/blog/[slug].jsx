import { useRouter } from "next";
import { getFilesByType, getPostContent } from "~/lib/mdxUtils";
import MDXComponents from "~/components/MDXComponents";
import hydrate from "next-mdx-remote/hydrate";
import PageLayout from "~/components/PageLayout";

export default function Post({ mdxSource, metadata }) {
  const router = useRouter();
  const content = hydrate(mdxSource, {
    components: MDXComponents,
  });

  return (
    <>
      <PageLayout>{content}</PageLayout>
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
  console.log(post.mdxSource);
  return { props: post };
}
