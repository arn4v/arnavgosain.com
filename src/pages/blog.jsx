import Link from "next/link";
import PageLayout from "~/components/PageLayout";
import { getAllFilesMetadata } from "~/lib/mdxUtils";

function formatDate(date) {
  const months = {
    12: "December",
    11: "November",
    10: "October",
    "09": "September",
    "08": "August",
    "07": "July",
    "06": "June",
    "05": "May",
    "04": "April",
    "03": "March",
    "02": "February",
    "01": "January",
  };
  date = date.split("-");
  return `${date[2]} ${months[date[1]]}`;
}

export default function BlogPage({ posts }) {
  return (
    <>
      <PageLayout breadcrumb={{ Blog: "/blog" }}>
        <div className="mt-4 flex flex-col space-y-8">
          {Object.keys(posts)
            .reverse()
            .map((key) => {
              return (
                <>
                  <h1 className="text-2xl font-semibold dark:text-white">
                    {key}
                  </h1>
                  <div className="flex flex-col space-y-2">
                    {posts[key].map((p) => {
                      return (
                        <>
                          <Link href={`/blog/${p.slug}`}>
                            <div
                              style={{}}
                              className="w-full flex flex-row justify-between cursor-pointer"
                            >
                              <p className="dark:text-white">{p.title}</p>
                              <p className="dark:text-white">
                                {formatDate(p.publishedAt)}
                              </p>
                            </div>
                          </Link>
                          <div
                            style={{ height: "0.25px" }}
                            className="w-full bg-gray-300"
                          ></div>
                        </>
                      );
                    })}
                  </div>
                </>
              );
            })}
        </div>
      </PageLayout>
    </>
  );
}

export async function getStaticProps() {
  const years = [];
  const posts = getAllFilesMetadata("blog");
  const sortedPosts = {};

  posts.forEach((post) => {
    const year = post.publishedAt.split("-")[0];
    if (!years.includes(year)) years.push(year);
  });

  years.forEach((y) => {
    sortedPosts[y] = posts
      .filter((p) => {
        if (p.publishedAt.includes(y)) return p;
      })
      .sort((a, b) => {
        a = a.publishedAt.split("-");
        b = b.publishedAt.split("-");
        return a > b ? 1 : a < b ? -1 : 0;
      })
      .reverse();
  });

  return {
    props: {
      posts: sortedPosts,
    },
  };
}
