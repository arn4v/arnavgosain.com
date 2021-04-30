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
        <div className="flex flex-col space-y-4 items-start justify-center">
          <h1 className="text-2xl lg:text-3xl font-bold dark:text-white max-w-3xl">
            {metadata.title}
          </h1>
          <div className="w-full flex flex-row justify-between max-w-3xl text-gray-800 dark:text-white antialiased">
            <div className="flex items-center justify-center gap-3 lg:gap-4 text-sm lg:text-base">
              <div className="hidden lg:block">
                <Image
                  src="/images/display.jpg"
                  draggable={false}
                  height={32}
                  width={32}
                  className="rounded-full"
                  layout="fixed"
                />
              </div>
              <div className="lg:hidden block">
                <Image
                  src="/images/display.jpg"
                  draggable={false}
                  height={48}
                  width={48}
                  className="rounded-full"
                  layout="fixed"
                />
              </div>
              <div className="flex flex-col lg:flex-row items-start justify-center lg:items-center lg:justify-start gap-2 font-medium lg:gap-4 text-sm lg:text-base whitespace-nowrap">
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
