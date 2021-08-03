import { GetStaticProps } from "next";
import glob from "glob";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { OpenGraph } from "next-seo/lib/types";
import PageLayout from "~/components/PageLayout";
import { baseUrl } from "~/config";
import PostsList from "~/components/PostsList";
import { generateFeeds, generateSiteMap, getPostsData } from "~/lib/utils";

const meta: OpenGraph = {
  title: "Writing | Arnav Gosain",
  url: baseUrl + "/writing",
};

const ProjectsPage = ({ data }) => {
  return (
    <>
      <PageLayout
        breadcrumb={{ Projects: "/projects" }}
        seo={{ title: meta.title, openGraph: meta }}
      >
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
