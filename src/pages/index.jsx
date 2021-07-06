import IntroSection from "~/components/homepage/IntroSection";
import ProjectsSection from "~/components/homepage/ProjectsSection";
import PageLayout from "~/components/PageLayout";

export default function IndexPage() {
  return (
    <PageLayout>
      <div className="flex flex-col mt-6 space-y-16">
        <IntroSection />
        <ProjectsSection />
      </div>
    </PageLayout>
  );
}

export const _getStaticProps = async () => {
  const posts = [];

  for (const { slug } of await getAllPosts()) {
    const { metadata } = await getSlugData(slug);
    posts.push(metadata);
  }

  return {
    props: {
      posts: posts.slice(0, 6),
    },
  };
};
