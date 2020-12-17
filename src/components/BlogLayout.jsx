import BlogSeo from "~/components/BlogSeo";
import PageLayout from "~/components/PageLayout";
import { baseUrl } from "~/config";
import { useRouter } from "next/router";

/**
 * @param {Object} props
 * @param {React.ReactNode} [props.children]
 * @param {Object} props.metadata
 * @param {string} props.metadata.title
 * @param {string} props.metadata.author
 * @param {string} props.metadata.slug
 * @param {string} props.metadata.publishedAt
 */
export default function BlogLayout({ children, metadata }) {
  const router = useRouter();
  return (
    <>
      <PageLayout
        breadcrumb={{
          Blog: "/blog",
          [metadata.title]: `/blog/${metadata.slug}`,
        }}
      >
        <BlogSeo
          title={metadata.title}
          author="Arnav Gosain"
          publishedAt={metadata.publishedAt}
          url={`${baseUrl}/blog/${metadata.slug}`}
        />
        <article className="max-w-3xl">
          <div className="flex flex-col space-y-4 items-start justify-center mb-4">
            <h1 className="text-3xl font-bold dark:text-white">
              {metadata.title}
            </h1>
            <div className="w-full flex flex-row justify-between">
              <div className="flex flex-row space-x-4">
                <p className="text-gray-600 dark:text-white antialiased text-lg">
                  {metadata.author}
                </p>
              </div>
              <div className=""></div>
            </div>
          </div>
          <div className="prose w-full max-w-full dark:prose-dark text-justify">
            {children}
          </div>
        </article>
      </PageLayout>
    </>
  );
}
