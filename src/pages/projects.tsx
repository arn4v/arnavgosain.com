import { OpenGraph } from "next-seo/lib/types";
import PageLayout from "~/components/PageLayout";
import ProjectsGrid from "~/components/ProjectsGrid";
import { baseUrl } from "~/config";
import projects from "~/lib/projects";

const meta: OpenGraph = {
  title: "Projects | Arnav Gosain",
  url: baseUrl + "/projects",
};

const ProjectsPage = () => {
  return (
    <>
      <PageLayout
        breadcrumb={{ Projects: "/projects" }}
        seo={{ title: meta.title, openGraph: meta }}
      >
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold dark:text-white font-secondary hidden lg:block">
            Projects
          </h1>
          <ProjectsGrid data={projects} />
        </div>
      </PageLayout>
    </>
  );
};

export default ProjectsPage;
