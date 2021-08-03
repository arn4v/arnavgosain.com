import * as React from "react";
import { format } from "date-fns";
import { MDXProvider } from "@mdx-js/react";
import Image from "next/image";
import BlogSeo from "~/components/BlogSeo";
import CustomLink from "~/components/CustomLink";
import PageLayout from "~/components/PageLayout";
import { baseUrl } from "~/config";
import { getDateObjectFromString } from "~/lib/utils";

const PostLayout = ({ frontMatter, children }) => {
  const published_on = React.useMemo(
    () => new Date(frontMatter.published_on),
    [frontMatter?.published_on]
  );

  return (
    <>
      <BlogSeo
        title={frontMatter.title}
        author="Arnav Gosain"
        date={frontMatter.published_on}
        url={`${baseUrl}/${frontMatter.slug}`}
      />
      <PageLayout
        breadcrumb={{
          Blog: "/blog",
          [frontMatter.title]: `/${frontMatter.slug}`,
        }}
      >
        <article className="flex flex-col mt-4 space-y-6">
          <div className="flex flex-col items-start justify-center space-y-4">
            <h1 className="max-w-3xl text-2xl font-bold lg:text-3xl dark:text-white">
              {frontMatter.title}
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
                      <time dateTime={published_on.toISOString()}>
                        {format(published_on, "do MMMM yyyy")}
                      </time>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr className="w-full" />
          </div>
          <div className="prose dark:prose-dark max-w-full">
            <MDXProvider components={{ a: CustomLink }}>{children}</MDXProvider>
          </div>
        </article>
      </PageLayout>
    </>
  );
};

export default PostLayout;