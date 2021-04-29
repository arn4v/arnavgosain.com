import * as React from "react";
import BlogSeo from "~/components/BlogSeo";
import Image from "next/image";
import PageLayout from "~/components/PageLayout";
import { NotionRenderer } from "react-notion-x";
import { baseUrl } from "~/config";
import { getAllPostSlugs, getSlugData } from "~/lib/notion";
import { useTheme } from "next-themes";

/**
 * @typedef {Object} Props
 * @property {Object} metadata
 * @property {any} recordMap
 */

/**
 * @type {import("react").FC<Props>}
 */
const PostPage = ({ metadata, recordMap }) => {
  const { theme } = useTheme();

  return (
    <PageLayout
      breadcrumb={{
        Blog: "/blog",
        [metadata.title]: `/${metadata.slug}`,
      }}
    >
      <BlogSeo
        title={metadata.title}
        author="Arnav Gosain"
        date={metadata.date}
        url={`${baseUrl}/blog/${metadata.slug}`}
      />
      <article className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-4 items-start justify-center4">
          <h1 className="text-3xl font-bold dark:text-white max-w-3xl">
            {metadata.title}
          </h1>
          <div className="w-full flex flex-row justify-between max-w-3xl text-gray-600">
            <div className="flex flex-row space-x-4 items-center justify-center h-8">
              <Image
                src="/images/display.jpg"
                height={32}
                width={32}
                className="object-contain rounded-full"
              />
              <p className="dark:text-white antialiased">{metadata.author}</p>
            </div>
          </div>
          <hr className="w-full" />
        </div>
        <NotionRenderer
          recordMap={recordMap}
          darkMode={theme === "dark"}
          className="w[100%]"
        />
      </article>
    </PageLayout>
  );
};

/** @type {import("next").GetStaticProps<Props, { slug: string }>} */
export const getStaticProps = async (ctx) => {
  const slug = ctx.params.slug;
  const { metadata, recordMap } = await getSlugData(slug);

  return {
    props: { metadata, recordMap },
    revalidate: 1,
  };
};

/** @type {import("next").GetStaticPaths<{ slug: string }>} */
export const getStaticPaths = async () => {
  const slugs = await getAllPostSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export default PostPage;
