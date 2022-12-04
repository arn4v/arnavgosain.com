import PageLayout from '~/components/PageLayout';
import ProjectsGrid from '~/components/ProjectsGrid';
import { SeoProps } from '~/components/Seo';
import { baseUrl } from '~/constants';
import projects from '~/lib/projects';

const seoConfig: SeoProps = {
	title: 'Projects | Arnav Gosain',
	url: baseUrl + '/projects'
};

const ProjectsPage = () => {
	return (
		<>
			<PageLayout breadcrumb={{ Projects: '/projects' }} seo={seoConfig}>
				<ProjectsGrid data={projects} />
			</PageLayout>
		</>
	);
};

export default ProjectsPage;
