import { OpenGraph } from "next-seo/lib/types";
import Link from "next/link";
import * as React from "react";
import PageLayout from "~/components/PageLayout";
import { getAllFiles, getMdx } from "~/lib/mdx";
import SnippetFrontmatter from "~/types/SnippetFrontmatter";

interface Props {
  snippets: { code: string; slug: string; frontmatter: SnippetFrontmatter }[];
}

const meta: OpenGraph = {
  title: "Code Snippets",
  description:
    "A collection of code snippets that I use in my projects. Includes Next.js, React & Nodejs.",
  images: [
    {
      url: "/static/snippets-og-banner.png",
      height: 627,
      width: 1200,
    },
  ],
};

export default function SnippetsListPage({ snippets }: Props) {
  return (
    <>
      <PageLayout
        className="py-8"
        seo={{
          title: meta.title,
          description: meta.description,
          openGraph: meta,
        }}
      >
        <h1 className="text-2xl font-bold dark:text-white font-mono hidden lg:block mb-6">
          Snippets
        </h1>
        <div className="w-full grid lg:grid-cols-3 grid-cols-1 gap-6 lg:gap-8">
          {snippets.map(({ frontmatter, slug }) => {
            return (
              <Link key={frontmatter.slug} href={"/snippets/" + slug}>
                <a className="flex flex-col items-start justify-start gap-3 py-2 px-4 rounded-md shadow-sm dark:shadow-inner dark:bg-gray-900 dark:hover:bg-gray-800 transiton dark:text-white bg-gray-100 hover:bg-gray-200 border border-gray-300 dark:border-gray-700 hover:shadow-md duration-150 ease-in">
                  <span className="font-bold">{frontmatter.title}</span>
                  <span className="text-sm">{frontmatter.description}</span>
                </a>
              </Link>
            );
          })}
        </div>
      </PageLayout>
    </>
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
