import { GetStaticProps } from "next";
import PageLayout from "~/components/PageLayout";
import PostsList from "~/components/PostsList";
import { SeoProps } from "~/components/Seo";
import { baseUrl } from "~/config";
import { generateFeeds, getPostsData } from "~/lib/utils";

const seoConfig: SeoProps = {
  title: "Writing | Arnav Gosain",
  url: baseUrl + "/writing",
};

const ProjectsPage = ({ data }) => {
  return (
    <>
      <PageLayout breadcrumb={{ Projects: "/projects" }} seo={seoConfig}>
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold dark:text-white font-secondary hidden lg:block">
            Writing
          </h1>
          <PostsList data={data} />
        </div>
      </PageLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  await generateFeeds();
  const data = getPostsData();

  return {
    props: {
      data,
    },
  };
};

export default ProjectsPage;
