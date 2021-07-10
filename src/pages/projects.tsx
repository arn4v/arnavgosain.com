import { NextSeo } from "next-seo";
import { OpenGraph } from "next-seo/lib/types";
import projects from "~/components/homepage/projects";
import PageLayout from "~/components/PageLayout";
import ProjectsGrid from "~/components/ProjectsGrid";
import { baseUrl } from "~/config";

const meta: OpenGraph = {
  title: "Projects",
  url: baseUrl + "/projects",
};

const ProjectsPage = () => {
  return (
    <>
      <NextSeo title={meta.title} openGraph={meta} />
      <PageLayout breadcrumb={{ Projects: "/projects" }}>
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold dark:text-white font-mono hidden lg:block">
            Projects
          </h1>
          <ProjectsGrid data={projects} />
        </div>
      </PageLayout>
    </>
  );
};

export default ProjectsPage;
