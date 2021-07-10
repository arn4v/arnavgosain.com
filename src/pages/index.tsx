import BlogSection from "~/components/homepage/BlogSection";
import IntroSection from "~/components/homepage/IntroSection";
import ProjectsSection from "~/components/homepage/ProjectsSection";
import PageLayout from "~/components/PageLayout";
import { getDateObjectFromString } from "~/lib/utils";
import PostMetadata from "~/types/metadata";

export default function IndexPage({ posts }: { posts: PostMetadata[] }) {
  return (
    <PageLayout>
      <div className="flex flex-col mt-6 space-y-16">
        <IntroSection />
        <ProjectsSection />
        {posts.length > 0 && <BlogSection data={posts} />}
      </div>
    </PageLayout>
  );
}

export const getStaticProps = async () => {
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
