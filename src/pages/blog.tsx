import { allPosts, Post } from ".contentlayer/generated";
import { format } from "date-fns";
import { GetStaticProps } from "next";
import Link from "next/link";
import PageLayout from "~/components/PageLayout";
import { SeoProps } from "~/components/Seo";
import { baseUrl } from "~/constants";

const seoConfig: SeoProps = {
  title: "Blog | Arnav Gosain",
  url: baseUrl + "/writing",
};

const BlogPage = ({ data }: { data: Post[] }) => {
  return (
    <PageLayout breadcrumb={{ Projects: "/projects" }} seo={seoConfig}>
      <div className="flex flex-col gap-10">
        <h1 className="text-3xl font-bold dark:text-white font-mono hidden lg:block">
          Entries
        </h1>
        <div className="flex flex-col items-center justify-center gap-4 lg:gap-6">
          {data
            .sort(
              (a, b) =>
                new Date(b.publishedOn).valueOf() -
                new Date(a.publishedOn).valueOf()
            )
            .map((item) => {
              const date = new Date(item.publishedOn);
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
                    <time dateTime={date.toISOString()}>
                      {format(date, "do MMMM yyyy")}
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
  return {
    props: {
      data: allPosts,
    },
  };
};

export default BlogPage;
