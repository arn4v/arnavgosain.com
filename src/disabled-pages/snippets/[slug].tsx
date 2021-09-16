import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { useRemoteRefresh } from "next-remote-refresh/hook";
import PageLayout from "~/components/PageLayout";
import { SeoProps } from "~/components/Seo";
import { baseUrl } from "~/config";
import SnippetFrontmatter from "~/types/SnippetFrontmatter";

interface Props {
  slug: string;
  mdxSource: MDXRemoteSerializeResult;
  frontmatter: SnippetFrontmatter;
}

export default function SnippetPage({ mdxSource, frontmatter, slug }: Props) {
  const meta: SeoProps = {
    title: frontmatter.title + " | Code Snippets | Arnav Gosain",
    description: frontmatter.description,
    url: baseUrl + "/snippets/" + slug,
    image: "/static/snippets-og-banner.png",
  };

  useRemoteRefresh({
    shouldRefresh: (path) => path.includes(slug),
  });

  return (
    <>
      <PageLayout
        seo={{
          title: meta.title,
          description: meta.description,
        }}
        breadcrumb={{
          Snippets: "/snippets",
          [frontmatter.title]: "/snippets/" + slug,
        }}
      >
        <h1 className="dark:text-white text-xl font-bold font-secondary">
          {frontmatter.title}
        </h1>
        <article className="prose dark:prose-dark">
          <MDXRemote {...mdxSource} />
        </article>
      </PageLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async (
  ctx
) => {
  const { getMdxSource: getPostMdx, getSnippetBySlug } = await import(
    "~/lib/mdx"
  );
  const { frontmatter, mdxSource } = await getSnippetBySlug(ctx.params.slug);
  const slug = ctx.params.slug;

  return {
    props: {
      slug,
      mdxSource,
      frontmatter: frontmatter as SnippetFrontmatter,
    },
  };
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const { getAllFiles } = await import("~/lib/mdx");
  const paths = getAllFiles("snippets").map((item) => {
    return {
      params: { slug: item.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};
