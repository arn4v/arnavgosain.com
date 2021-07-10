import { getMDXComponent } from "mdx-bundler/client";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import * as React from "react";
import PageLayout from "~/components/PageLayout";
import SnippetFrontmatter from "~/types/SnippetFrontmatter";

interface Props {
  code: string;
  slug: string;
  frontmatter: SnippetFrontmatter;
}

export default function SnippetPage({ code, frontmatter }: Props) {
  const Component = React.useMemo(() => getMDXComponent(code), [code]);
  const router = useRouter();
  const slug = router.query.slug;

  return (
    <>
      <NextSeo titleTemplate="%s | Snippets" title={frontmatter.title} />
      <PageLayout
        breadcrumb={{
          Snippets: "/snippets",
          [frontmatter.title]: "/snippets/" + slug,
        }}
        className="py-8"
      >
        <h1 className="dark:text-white text-xl font-bold">
          {frontmatter.title}
        </h1>
        <article className="prose dark:prose-dark">
          <Component />
        </article>
      </PageLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async (
  ctx
) => {
  const { getMdx: getPostMdx } = await import("~/lib/mdx");
  const slug = ctx.params.slug;
  return {
    props: {
      slug,
      ...(await getPostMdx<SnippetFrontmatter>("snippets", slug)),
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
