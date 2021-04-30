import PageLayout from "~/components/PageLayout";
import { getAllPosts, getSlugData } from "~/lib/notion";
import PostCard from "~/components/PostCard";

const BlogPage = ({ posts }) => {
  return (
    <PageLayout
      breadcrumb={{
        Blog: "/blog",
      }}
    >
      {posts.map((item) => {
        return <PostCard key={item.id} data={item} />;
      })}
    </PageLayout>
  );
};

export const getStaticProps = async () => {
  const posts = [];
  for (const post of await getAllPosts()) {
    const data = await getSlugData(post.slug);
    const metadata = data.metadata;
    posts.push(metadata);
  }

  return {
    props: { posts },
    revalidate: 60,
  };
};

export default BlogPage;
