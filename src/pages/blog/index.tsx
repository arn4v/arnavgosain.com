import { format } from "date-fns";
import { GetStaticProps } from "next";
import Link from "next/link";
import PageLayout from "~/components/PageLayout";
import { SeoProps } from "~/components/Seo";
import { baseUrl } from "~/constants";
import { generateFeeds, getPostsData } from "~/lib/utils";
import PostMetadata from "~/types/metadata";

const seoConfig: SeoProps = {
  title: "Blog | Arnav Gosain",
  url: baseUrl + "/writing",
};

const ProjectsPage = ({ data }: { data: PostMetadata[] }) => {
  return (
    <PageLayout breadcrumb={{ Projects: "/projects" }} seo={seoConfig}>
      <div className="flex flex-col gap-10">
        <h1 className="text-3xl font-bold dark:text-white font-secondary hidden lg:block">
          Entries
        </h1>
        <div className="flex flex-col items-center justify-center gap-4 lg:gap-6">
          {data
            .sort(
              (a, b) =>
                new Date(b.published_on).valueOf() -
                new Date(a.published_on).valueOf()
            )
            .map((item) => {
              return (
                <div
                  key={`${item.title}-${item.slug}`}
                  className="flex items-center justify-between w-full"
                >
                  <Link href={`/${item.slug}`} passHref>
                    <a className="text-orange-500 font-medium hover:text-orange-700 underline">
                      {item.title}
                    </a>
                  </Link>
                  <p className="self-center justify-self-end">
                    Published on{" "}
                    <time dateTime={new Date(item.published_on).toISOString()}>
                      {format(new Date(item.published_on), "do MMMM yyyy")}
                    </time>
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </PageLayout>
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
