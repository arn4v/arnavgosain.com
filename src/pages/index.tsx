import About from "~/components/About";
import BlogSection from "~/components/BlogSection";
import PageLayout from "~/components/PageLayout";
import ProjectsList from "~/components/ProjectsList";
import { generateSiteMap, getDateObjectFromString } from "~/lib/utils";
import { defaultOpenGraph } from "~/next-seo.config";
import PostMetadata from "~/types/metadata";

export const getStaticProps = async () => {
  // Generate sitemap
  await generateSiteMap();

  const { getAllFiles: getAllPosts } = await import("~/lib/mdx");

  return {
    props: {
      posts: getAllPosts("blog")
        .sort(
          (a, b) =>
            getDateObjectFromString(b.metadata.published_on).valueOf() -
            getDateObjectFromString(a.metadata.published_on).valueOf()
        )
        .slice(0, 6)
        .map((item) => item.metadata),
    },
  };
};

const IndexPage = ({ posts }: { posts: PostMetadata[] }) => {
  return (
    <PageLayout
      seo={{
        title: defaultOpenGraph.title,
        description: defaultOpenGraph.description,
        openGraph: defaultOpenGraph,
      }}
    >
      <div className="flex flex-col space-y-8">
        <About />
        <ProjectsList />
        {posts.length > 0 && <BlogSection data={posts} />}
      </div>
    </PageLayout>
  );
};

export default IndexPage;
