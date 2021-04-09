import BlogSeo from "~/components/BlogSeo";
import PageLayout from "~/components/PageLayout";
import { baseUrl } from "~/config";
import { useRouter } from "next/router";
import Image from "next/image";

/**
 * @typedef {Object} Frontmatter
 * @param {string} frontMatter.title
 * @param {string} author
 * @param {string} slug
 * @param {string} publishedAt
 * @param {Object} readingTime
 */

/**
 * @param {Object} props
 * @param {React.ReactNode} [props.children]
 * @param {Frontmatter} props.frontMatter
 */
export default function BlogLayout({ children, frontMatter: metadata }) {
  const router = useRouter();
  return (
    <>
      <PageLayout
        breadcrumb={{
          Blog: "/blog",
          [metadata.title]: `/${metadata.slug}`,
        }}
      >
        <BlogSeo
          title={metadata.title}
          author="Arnav Gosain"
          publishedAt={metadata.publishedAt}
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
                <p className="dark:text-white">&bull;</p>
                <p className="dark:text-white">
                  {metadata?.readingTime.minutes} minute read
                </p>
              </div>
            </div>
            <hr className="w-full" />
          </div>
          <div className="prose w-full max-w-3xl dark:prose-dark text-justify">
            {children}
          </div>
        </article>
      </PageLayout>
    </>
  );
}
