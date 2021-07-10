import projects from "~/components/homepage/projects";
import PageLayout from "~/components/PageLayout";
import ProjectsGrid from "~/components/ProjectsGrid";

const ProjectsPage = () => {
  return (
    <PageLayout breadcrumb={{ Projects: "/projects" }}>
      <div className="flex flex-col gap-6 mt-6">
        <h1 className="text-3xl font-bold dark:text-white font-mono hidden lg:block">Projects</h1>
        <ProjectsGrid data={projects} />
      </div>
    </PageLayout>
  );
};

export default ProjectsPage;
