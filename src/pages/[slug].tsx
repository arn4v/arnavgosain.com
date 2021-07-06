import { format } from "date-fns";
import { getMDXComponent } from "mdx-bundler/client";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import * as React from "react";
import BlogSeo from "~/components/BlogSeo";
import PageLayout from "~/components/PageLayout";
import { baseUrl } from "~/config";
import { getDateObjectFromString } from "~/lib/utils";
import PostMetadata from "~/types/metadata";

interface Props {
  code: string;
  frontmatter: PostMetadata;
}

const PostPage = ({ code, frontmatter: metadata }: Props) => {
  const Component = React.useMemo(() => getMDXComponent(code), [code]);

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
        date={metadata.published_on}
        url={`${baseUrl}/${metadata.slug}`}
      />
      <article className="flex flex-col mt-4 space-y-6">
        <div className="flex flex-col items-start justify-center space-y-4">
          <h1 className="max-w-3xl text-2xl font-bold lg:text-3xl dark:text-white">
            {metadata.title}
          </h1>
          <div className="flex flex-row justify-between w-full max-w-3xl antialiased text-gray-800 dark:text-white">
            <div className="flex items-center justify-center gap-3 text-sm lg:gap-4 lg:text-base">
              <div className="hidden lg:block">
                <Image
                  alt="Arnav Gosain"
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
                  alt="Arnav Gosain"
                  src="/static/display.jpg"
                  draggable={false}
                  height={48}
                  width={48}
                  className="rounded-full"
                  layout="fixed"
                />
              </div>
              <div className="flex flex-col items-start justify-center gap-2 text-sm font-medium lg:flex-row lg:items-center lg:justify-start lg:gap-4 lg:text-base whitespace-nowrap">
                <h2>Arnav Gosain</h2>
                <div className="flex items-center justify-start gap-2 lg:gap-4">
                  <div className="hidden lg:block">/</div>
                  <p>
                    Published on{" "}
                    {(() => {
                      const date = getDateObjectFromString(
                        metadata.published_on
                      );
                      const isoString = date.toISOString();
                      return (
                        <time dateTime={isoString}>
                          {format(date, "do MMMM yyyy")}
                        </time>
                      );
                    })()}
                  </p>
                  <div>/</div>
                  <h2>{metadata.reading_time}</h2>
                </div>
              </div>
            </div>
          </div>
          <hr className="w-full" />
        </div>
        <div className="prose dark:prose-dark">
          <Component />
        </div>
      </article>
    </PageLayout>
  );
};

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async (
  ctx
) => {
  const { getPostMdx } = await import("../lib/mdx");
  const slug = ctx.params.slug;
  return {
    props: await getPostMdx(slug),
  };
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const { getAllPosts } = await import("../lib/mdx");
  const paths = getAllPosts().map((item) => {
    return {
      params: { slug: item.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export default PostPage;
