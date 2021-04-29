import BlogSeo from "~/components/BlogSeo";
import PageLayout from "~/components/PageLayout";
import { baseUrl } from "~/config";
import { useRouter } from "next/router";
import Image from "next/image";

/**
 * @param {Object} props
 * @param {React.ReactNode} [props.children]
 * @param {Object} props.metadata
 * @param {string} props.metadata.title
 * @param {string} props.metadata.author
 * @param {string} props.metadata.slug
 * @param {string} props.metadata.date
 */
export default function BlogLayout({ children, metadata }) {
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
          <div className="w-full max-w-3xl text-justify">{children}</div>
        </article>
      </PageLayout>
    </>
  );
}
