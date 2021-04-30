import IntroSection from "~/components/homepage/sections/Intro";
import PageLayout from "~/components/PageLayout";
import ProjectsSection from "~/components/homepage/sections/projects";
import PostCard from "~/components/PostCard";
import { getAllPosts, getSlugData } from "~/lib/notion";
import { HiArrowRight } from "react-icons/hi";
import Link from "next/link";

export default function IndexPage({ posts }) {
  return (
    <>
      <PageLayout>
        <div className="flex flex-col space-y-16 pt-8 pb-6">
          <IntroSection />
          <div className="flex flex-col space-y-6 w-full">
            <div className="flex items-center justify-between">
              <span className="text-2xl lg:text-3xl font-bold dark:text-white">
                Blog posts
              </span>
              <Link href="/blog">
                <a className="dark:bg-gray-800 dark:hover:bg-gray-700 bg-gray-100 border border-gray-300 hover:bg-gray-200 dark:border-gray-800 flex items-center justify-center transition duration-150 ease-in space-x-2 lg:py-2 lg:px-2 text-sm lg:text-base py-2 px-1 whitespace-nowrap rounded-md">
                  <span>View all posts</span>
                  <HiArrowRight />
                </a>
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center">
              {posts.map((item) => {
                return <PostCard key={item.id} data={item} />;
              })}
            </div>
          </div>
          <ProjectsSection />
        </div>
      </PageLayout>
    </>
  );
}

export const getStaticProps = async () => {
  const posts = [];

  for (const { slug } of await getAllPosts()) {
    const { metadata } = await getSlugData(slug);
    posts.push(metadata);
  }

  return {
    props: {
      posts: posts.slice(0, 6),
    },
  };
};
