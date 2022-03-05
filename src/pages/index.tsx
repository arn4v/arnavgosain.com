import { allPosts, Post } from ".contentlayer/generated";
import About from "~/components/About";
import BlogSection from "~/components/BlogSection";
import PageLayout from "~/components/PageLayout";
import ProjectsList from "~/components/ProjectsList";
import { generateFeeds, generateSiteMap } from "~/lib/utils";

const IndexPage = ({ posts }: { posts: Post[] }) => {
  return (
    <PageLayout>
      <div className="flex flex-col space-y-8">
        <About />
        <BlogSection data={posts} />
        <ProjectsList />
      </div>
    </PageLayout>
  );
};

export const getStaticProps = async () => {
  await generateFeeds();
  await generateSiteMap();

  const posts = allPosts
    .sort((a, b) => {
      return (
        new Date(b.publishedOn).valueOf() - new Date(a.publishedOn).valueOf()
      );
    })
    .slice(0, 3);

  return {
    props: {
      posts: posts,
    },
  };
};

export default IndexPage;
