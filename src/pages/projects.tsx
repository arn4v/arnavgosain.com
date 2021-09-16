import PageLayout from "~/components/PageLayout";
import ProjectsGrid from "~/components/ProjectsGrid";
import { SeoProps } from "~/components/Seo";
import { baseUrl } from "~/config";
import projects from "~/lib/projects";

const seoConfig: SeoProps = {
  title: "Projects | Arnav Gosain",
  url: baseUrl + "/projects",
};

const ProjectsPage = () => {
  return (
    <>
      <PageLayout breadcrumb={{ Projects: "/projects" }} seo={seoConfig}>
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
