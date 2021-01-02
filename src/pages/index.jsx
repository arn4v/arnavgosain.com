import IntroSection from "~/components/homepage/sections/Intro";
import PageLayout from "~/components/PageLayout";
// import PhotographySection from "~/components/homepage/sections/photography";
import ProjectsSection from "~/components/homepage/sections/projects";

export default function IndexPage() {
  return (
    <>
      <PageLayout className="items-center justify-center" noFooter>
          <div className="flex flex-col lg:px-5 space-y-8">
          <IntroSection />
          <ProjectsSection />
        </div>
      </PageLayout>
    </>
  );
}
