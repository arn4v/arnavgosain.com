import { NotionRenderer } from "react-notion-x";
import BlogLayout from "~/components/BlogLayout";
import { getAllPostSlugs, getSlugData } from "~/lib/notion";

/**
 * @typedef {Object} Props
 * @property {Object} metadata
 * @property {any} recordMap
 */

/**
 * @type {import("react").FC<Props>}
 */
const PostPage = ({ metadata, recordMap }) => {
  return (
    <BlogLayout metadata={metadata}>
      <NotionRenderer recordMap={recordMap} />
    </BlogLayout>
  );
};

/** @type {import("next").GetStaticProps<Props, { slug: string }>} */
export const getStaticProps = async (ctx) => {
  const slug = ctx.params.slug;
  const { metadata, recordMap } = await getSlugData(slug);

  return {
    props: { metadata, recordMap },
    revalidate: 1,
  };
};

/** @type {import("next").GetStaticPaths<{ slug: string }>} */
export const getStaticPaths = async () => {
  return {
    paths: (await getAllPostSlugs()).map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export default PostPage;
