import { allPosts, Post } from ".contentlayer/generated";
import { format } from "date-fns";
import { GetStaticProps } from "next";
import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";
import { SWRConfiguration } from "swr";
import Link from "~/components/CustomLink";
import PageLayout from "~/components/PageLayout";
import { SeoProps } from "~/components/Seo";
import { baseUrl } from "~/constants";
import { generateOgImages } from "~/lib/generate-og-images";

interface Frontmatter {
  title: string;
  slug: string;
  published_on: string;
  // url of og & banner image
  banner: string;
}

const staleSwrConfig: SWRConfiguration = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnMount: false,
  revalidateOnReconnect: false,
  refreshWhenHidden: false,
  refreshWhenOffline: false,
  refreshInterval: 0,
};

const PostLayout = ({ post }: { post: Post }) => {
  const MDXComponent = useMDXComponent(post.body.code);
  const publishedOn = new Date(post.publishedOn);
  const seoProps: SeoProps = {
    title: `${post.title} | Arnav Gosain`,
    url: `${baseUrl}/${post.slug}`,
    publishedAt: publishedOn.toISOString(),
    // image: post?.banner ?? `${baseUrl}/og-images/${post.slug}.png`,
  };

  return (
    <PageLayout
      breadcrumb={{
        Blog: "/blog",
        [post.title]: `/${post.slug}`,
      }}
      seo={seoProps}
    >
      <article className="flex flex-col mt-4 space-y-6">
        <div className="flex flex-col items-start justify-center space-y-4">
          <h1 className="max-w-3xl text-2xl font-bold lg:text-3xl dark:text-white">
            {post.title}
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
                    <time dateTime={publishedOn.toISOString()}>
                      {format(publishedOn, "do MMMM yyyy")}
                    </time>
                  </p>
                </div>
              </span>
            </div>
          </div>
          <div className="w-full h-px bg-gray-200 dark:bg-slate-600" />
        </div>
        <div className="max-w-full prose dark:prose-dark">
          <MDXComponent
            components={{
              a: Link,
            }}
          />
        </div>
      </article>
    </PageLayout>
  );
};

export const getStaticPaths = async () => {
  // await generateOgImages();

  return {
    paths: allPosts.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ post: Post }> = ({ params }) => {
  const post = allPosts.find((post) => post.slug === params?.slug);

  return { props: { post } };
};

export default PostLayout;
