import IntroSection from "~/components/homepage/sections/Intro";
import PageLayout from "~/components/PageLayout";
import PhotographySection from "~/components/homepage/sections/photography";
import ProjectsSection from "~/components/homepage/sections/projects";

export default function IndexPage() {
  return (
    <>
      <PageLayout>
        <div className="flex flex-col space-y-6">
          <IntroSection />
          <div className="grid grid-cols-2 gap-x-8">
            <PhotographySection />
            <ProjectsSection />
          </div>
        </div>
      </PageLayout>
    </>
  );
}
