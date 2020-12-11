import BlogSeo from "~/components/BlogSeo";
import PageLayout from "~/components/PageLayout";
import commonPropTypes from "~/lib/commonPropTypes";

export default function BlogLayout({ children, meta }) {
  return (
    <>
      <BlogSeo {...{ meta }} />
      <PageLayout>{children}</PageLayout>
    </>
  );
}

BlogLayout.propTypes = {
  ...commonPropTypes,
};
