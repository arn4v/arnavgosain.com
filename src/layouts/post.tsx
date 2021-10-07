import { MDXProvider } from "@mdx-js/react";
import { format } from "date-fns";
import Image from "next/image";
import * as React from "react";
import { HiEye } from "react-icons/hi";
import CustomLink from "~/components/CustomLink";
import { RadixEye } from "~/components/icons/RadixEye";
import PageLayout from "~/components/PageLayout";
import { baseUrl } from "~/config";
import { useMutation, useQuery } from "~/trpc/hooks";

interface Frontmatter {
  title: string;
  slug: string;
  published_on: string;
  // url of og & banner image
  banner: string;
}

const editUrl = (slug) =>
  `https://github.com/leerob/leerob.io/edit/main/data/${slug}.mdx`;

const PostLayout = ({
  frontMatter,
  children,
}: {
  frontMatter: Frontmatter;
  children: React.ReactNode;
}) => {
  const published_on = new Date(frontMatter.published_on);
  const seoProps = {
    title: `${frontMatter.title} | Arnav Gosain`,
    url: `${baseUrl}/${frontMatter.slug}`,
    publishedAt: published_on.toISOString(),
    ...(typeof frontMatter?.banner === "string"
      ? {
          image: frontMatter.banner,
        }
      : {}),
  };
  const { data, isLoading } = useQuery(["views", frontMatter.slug]);

  return (
    <PageLayout
      breadcrumb={{
        Blog: "/blog",
        [frontMatter.title]: `/${frontMatter.slug}`,
      }}
      seo={seoProps}
    >
      <article className="flex flex-col mt-4 space-y-6">
        <div className="flex flex-col items-start justify-center space-y-4">
          <h1 className="max-w-3xl text-2xl font-bold lg:text-3xl dark:text-white">
            {frontMatter.title}
          </h1>
          <div className="flex flex-row justify-between w-full max-w-3xl antialiased text-gray-800 dark:text-white">
            <div className="flex items-center justify-center gap-3 text-sm lg:gap-4 lg:text-base">
              <span className="hidden lg:block">
                <Image
                  alt="Arnav Gosain"
                  src="/static/display.jpg"
                  draggable={false}
                  height={32}
                  width={32}
                  className="rounded-full"
                  layout="fixed"
                />
              </span>
              <span className="block lg:hidden">
                <Image
                  alt="Arnav Gosain"
                  src="/static/display.jpg"
                  draggable={false}
                  height={48}
                  width={48}
                  className="rounded-full"
                  layout="fixed"
                />
              </span>
              <span className="flex flex-col items-start justify-center gap-2 text-sm font-medium lg:flex-row lg:items-center lg:justify-start lg:gap-4 lg:text-base whitespace-nowrap">
                <h2>Arnav Gosain</h2>
                <div className="flex items-center justify-start gap-2 lg:gap-4">
                  <div className="hidden lg:block">/</div>
                  <p>
                    Published on{" "}
                    <time dateTime={published_on.toISOString()}>
                      {format(published_on, "do MMMM yyyy")}
                    </time>
                  </p>
                </div>
                <div className="flex items-center justify-start gap-2 lg:gap-4">
                  <div className="hidden lg:block">/</div>
                  <RadixEye className="h-4 w-4" />
                  <p>{isLoading ? "---" : Number(data)}</p>
                </div>
              </span>
            </div>
          </div>
          <div className="w-full h-px bg-gray-200 dark:bg-blueGray-600" />
        </div>
        <div className="prose dark:prose-dark max-w-full">
          <MDXProvider components={{ a: CustomLink }}>{children}</MDXProvider>
        </div>
      </article>
    </PageLayout>
  );
};

export default PostLayout;
