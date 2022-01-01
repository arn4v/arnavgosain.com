import About from "~/components/About";
import BlogSection from "~/components/BlogSection";
import PageLayout from "~/components/PageLayout";
import ProjectsList from "~/components/ProjectsList";
import {
  generateSiteMap,
  getDateObjectFromString,
  getPostsData,
} from "~/lib/utils";
import PostMetadata from "~/types/metadata";

const IndexPage = ({ posts }: { posts: PostMetadata[] }) => {
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
  // Generate sitemap
  await generateSiteMap();

  const posts = getPostsData()
    .sort(
      (a, b) =>
        getDateObjectFromString(b.published_on).valueOf() -
        getDateObjectFromString(a.published_on).valueOf()
    )
    .slice(0, 3);

  return {
    props: {
      posts: posts,
    },
  };
};

export default IndexPage;
