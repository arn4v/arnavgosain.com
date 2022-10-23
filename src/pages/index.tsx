import { allPosts, Post } from ".contentlayer/generated";
import { format } from "date-fns";
import { useRouter } from "next/router";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillMail,
  AiFillTwitterSquare,
} from "react-icons/ai";
import { IconType } from "react-icons/lib";
import Link from "~/components/CustomLink";
import PageLayout from "~/components/PageLayout";
import projects from "~/lib/projects";
import { generateFeeds, generateSiteMap } from "~/lib/utils";

const IndexPage = ({ posts }: { posts: Post[] }) => {
  const router = useRouter();

  return (
    <PageLayout
      seo={{
        description: "Arnav Gosain • Software engineer and maker of things.",
      }}
    >
      <section className="flex flex-col space-y-6">
        <div className="flex items-center justify-start space-x-2">
          <span className="font-medium text-lg">Arnav Gosain</span>
          <span>•</span>
          <span className="font-medium text-zinc-500">Delhi, India</span>
        </div>
        <p className="text-md">
          I'm a{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/arn4v"
            className="font-semibold text-orange-500 hover:underline"
          >
            developer
          </a>
          /PM currently working at{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://remnote.com"
            className="font-semibold text-orange-500 hover:underline"
          >
            RemNote
          </a>
          . I like to learn by{" "}
          <Link
            href="/projects"
            className="font-semibold text-orange-500 hover:underline"
          >
            making things
          </Link>{" "}
          and frequently{" "}
          <Link
            href="/blog"
            className="font-semibold text-orange-500 hover:underline"
          >
            write
          </Link>{" "}
          about it.
        </p>
      </section>
      <section id="social_links" className="flex items-center mt-8 space-x-4">
        {(
          [
            [AiFillMail, "Email", "mailto:arnav@arnavgosain.com"],
            [AiFillTwitterSquare, "Twitter", "https://twitter.com/arn4v"],
            [AiFillGithub, "GitHub", "https://github.com/arn4v/"],
            [AiFillLinkedin, "LinkedIn", "https://www.linkedin.com/in/arn4v/"],
          ] as [IconType, string, string][]
        ).map(([Icon, title, href], idx) => (
          <Link href={href} key={idx}>
            <Icon className="w-7 h-7" />
            <span className="sr-only">{title}</span>
          </Link>
        ))}
      </section>
      <section id="recent_posts" className="flex flex-col mt-8 space-y-4">
        <h2 className="text-xl font-semibold text-zinc-800">Recent posts</h2>
        <ul className="flex flex-col space-y-2 list-none">
          {posts.map((item, idx) => (
            <li key={idx} className="flex flex-col">
              <Link
                href={"/" + item.slug}
                className="font-medium text-orange-500 whitespace-pre-wrap hover:underline"
              >
                {item.title}
              </Link>
              <span className="text-sm text-zinc-600">
                Published on{" "}
                {format(new Date(item.publishedOn), "do MMMM yyyy")}
              </span>
            </li>
          ))}
        </ul>
      </section>
      <section id="recent_projects" className="flex flex-col mt-12 space-y-4">
        <h2 className="text-xl font-semibold text-zinc-800">Recent projects</h2>
        <ul className="flex flex-col space-y-2 list-none">
          {projects.slice(0, 3).map((item, idx) => (
            <li key={idx}>
              <Link
                href={item?.links[0]?.url}
                className="font-medium text-orange-500 whitespace-pre-wrap hover:underline"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </PageLayout>
  );
};

export const getStaticProps = async () => {
  await generateFeeds();
  await generateSiteMap();

  const posts = allPosts
    .sort((a, b) => {
      return (
        new Date(b.publishedOn).valueOf() - new Date(a.publishedOn).valueOf()
      );
    })
    .slice(0, 3);

  return {
    props: {
      posts: posts,
    },
  };
};

export default IndexPage;
