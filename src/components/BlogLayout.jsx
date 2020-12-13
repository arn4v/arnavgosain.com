import BlogSeo from "~/components/BlogSeo";
import PageLayout from "~/components/PageLayout";
import commonPropTypes from "~/lib/commonPropTypes";

export default function BlogLayout({ children, metadata }) {
  return (
    <>
      {/* <BlogSeo metadata={metadata}/> */}
      <PageLayout>
        <article className="max-w-2xl mx-auto">
          <div className="flex flex-col space-y-4 items-start justify-center mb-4">
            <h1 className="text-3xl font-bold">{metadata.title}</h1>
            <div className="w-full flex flex-row justify-between">
              <div className="flex flex-row space-x-4">
                <p className="text-gray-600 text-lg">{metadata.author}</p>
              </div>
              <div className=""></div>
            </div>
          </div>
          <div className="prose text-justify dark:prose-dark">{children}</div>
        </article>
      </PageLayout>
    </>
  );
}

BlogLayout.propTypes = {
  ...commonPropTypes,
};
