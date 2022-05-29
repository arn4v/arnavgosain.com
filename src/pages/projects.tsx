import PageLayout from "~/components/PageLayout";
import ProjectsGrid from "~/components/ProjectsGrid";
import { SeoProps } from "~/components/Seo";
import { baseUrl } from "~/constants";
import projects from "~/lib/projects";

const seoConfig: SeoProps = {
  title: "Projects | Arnav Gosain",
  url: baseUrl + "/projects",
};

const ProjectsPage = () => {
  return (
    <>
      <PageLayout breadcrumb={{ Projects: "/projects" }} seo={seoConfig}>
        <div className="flex flex-col gap-6 pb-8">
          <h1 className="hidden font-mono text-3xl font-bold dark:text-white lg:block">
            Projects
          </h1>
          <ProjectsGrid data={projects} />
        </div>
      </PageLayout>
    </>
  );
};

export default ProjectsPage;
