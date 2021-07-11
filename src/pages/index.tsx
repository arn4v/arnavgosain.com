import BlogSection from "~/components/BlogSection";
import IntroSection from "~/components/IntroSection";
import PageLayout from "~/components/PageLayout";
import ProjectsSection from "~/components/ProjectsSection";
import { getDateObjectFromString } from "~/lib/utils";
import { defaultOpenGraph } from "~/next-seo.config";
import PostMetadata from "~/types/metadata";

export default function IndexPage({ posts }: { posts: PostMetadata[] }) {
  return (
    <PageLayout seo={{ openGraph: defaultOpenGraph }}>
      <div className="flex flex-col space-y-16">
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
