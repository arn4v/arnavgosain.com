import * as React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { baseUrl } from "~/config";
import PageLayout from "~/components/PageLayout";
import BlogSeo from "~/components/BlogSeo";
import { getAllPostSlugs, getSlugData } from "~/lib/notion";
import { getDateObjectFromString } from "~/lib/utils";

const NotionRenderer = dynamic(() =>
  import("react-notion-x").then((mod) => mod.NotionRenderer)
);

/**
 * @typedef {Object} Props
 * @property {Object} metadata
 * @property {any} recordMap
 */

/**
 * @type {import("react").FC<Props>}
 */
const PostPage = ({ metadata, recordMap }) => {
  const [darkMode, setDarkMode] = React.useState(false);
  const { theme } = useTheme();
  const router = useRouter();

  React.useEffect(() => {
    setDarkMode(theme === "dark");
  }, [theme]);

  if (router.isFallback) return null;
  if (!metadata || !recordMap) return null;

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
        <div className="flex flex-col items-start justify-center space-y-4">
          <h1 className="max-w-3xl text-2xl font-bold lg:text-3xl dark:text-white">
            {metadata.title}
          </h1>
          <div className="flex flex-row justify-between w-full max-w-3xl antialiased text-gray-800 dark:text-white">
            <div className="flex items-center justify-center gap-3 text-sm lg:gap-4 lg:text-base">
              <div className="hidden lg:block">
                <Image
                  src="/static/display.jpg"
                  draggable={false}
                  height={32}
                  width={32}
                  className="rounded-full"
                  layout="fixed"
                />
              </div>
              <div className="block lg:hidden">
                <Image
                  src="/static/display.jpg"
                  draggable={false}
                  height={48}
                  width={48}
                  className="rounded-full"
                  layout="fixed"
                />
              </div>
              <div className="flex flex-col items-start justify-center gap-2 text-sm font-medium lg:flex-row lg:items-center lg:justify-start lg:gap-4 lg:text-base whitespace-nowrap">
                <h2>{metadata.author}</h2>
                <div className="flex items-center justify-start gap-2 lg:gap-4">
                  <div className="hidden lg:block">/</div>
                  <p>
                    Published on{" "}
                    <time
                      dateTime={getDateObjectFromString(
                        metadata.date
                      ).toISOString()}
                    >
                      {metadata.formattedDate}
                    </time>
                  </p>
                  <div>/</div>
                  <h2>{metadata.readingTime}</h2>
                </div>
              </div>
            </div>
          </div>
          <hr className="w-full" />
        </div>
        <NotionRenderer recordMap={recordMap} darkMode={darkMode} />
      </article>
    </PageLayout>
  );
};

/** @type {import("next").GetStaticProps<Props, { slug: string }>} */
export const getStaticProps = async (ctx) => {
  const slug = ctx.params.slug;
  const slugs = await getAllPostSlugs();

  if (!slug || !slugs.includes(slug)) {
    return {
      notFound: true,
    };
  }

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
    fallback: true,
  };
};

export default PostPage;
