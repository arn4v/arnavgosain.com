import Link from "next/link";
import * as React from "react";
import PageLayout from "~/components/PageLayout";
import { getAllFiles, getMdx } from "~/lib/mdx";
import SnippetFrontmatter from "~/types/SnippetFrontmatter";

interface Props {
  snippets: { code: string; slug: string; frontmatter: SnippetFrontmatter }[];
}

export default function SnippetsListPage({ snippets }: Props) {
  return (
    <PageLayout className="py-8">
      <h1 className="text-2xl font-bold dark:text-white font-mono hidden lg:block">
        Snippets
      </h1>
      <div className="w-full grid lg:grid-cols-3 grid-cols-1 gap-6 lg:gap-8">
        {snippets.map(({ frontmatter, slug }) => {
          return (
            <Link key={frontmatter.slug} href={"/snippets/" + slug}>
              <a className="flex flex-col bg-white border border-gray-200 shadow-sm dark:bg-gray-900 dark:border-gray-700 rounded-md px-2 py-2 gap-2 dark:text-white">
                <span className="font-mono font-bold">
                  {frontmatter.title}
                </span>
                <span className="text-sm">{frontmatter.description}</span>
              </a>
            </Link>
          );
        })}
      </div>
    </PageLayout>
  );
}

export const getStaticProps = async () => {
  const slugs = getAllFiles("snippets").map((item) => item.slug);
  const snippets = [];
  for (const slug of slugs) {
    const { code, frontmatter } = await getMdx("snippets", slug);
    snippets.push({
      code,
      slug,
      frontmatter,
    });
  }
  return {
    props: {
      snippets,
    },
  };
};
