import axios from "axios";
import { format } from "date-fns";
import { GetStaticPaths, GetStaticProps } from "next";
import { OpenGraph } from "next-seo/lib/types";
import CustomLink from "~/components/CustomLink";
import PageLayout from "~/components/PageLayout";
import { baseUrl } from "~/config";

type Bookmark = {
  id: string;
  title: string;
  url: string;
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
};

type Tag = {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
};

interface Props {
  data: Bookmark[];
}

const BookmarksPage = ({ data }: Props) => {
  const meta: OpenGraph = {
    title: "Bookmarks | Arnav Gosain",
    description: "Links for later.",
    url: baseUrl + "/bookmarks",
    images: [
      { url: "/static/bookmarks-og-banner.png", height: 627, width: 1200 },
    ],
  };

  return (
    <PageLayout
      seo={{
        title: meta.title,
        description: meta.description,
        openGraph: meta,
      }}
    >
      <h1 className="text-3xl font-bold dark:text-white font-secondary hidden lg:block mb-2">
        Bookmarks
      </h1>
      <p className="lg:text-lg text-base font-medium mb-8 dark:text-white">
        Built on top of{" "}
        <CustomLink
          href="https://bookmarky.io"
          className="bg-cyan-200 dark:text-black transition underline"
        >
          Bookmarky.io
        </CustomLink>{" "}
        API.
      </p>
      <div className="grid grid-cols-1 gap-4">
        {data.map((item) => {
          return (
            <CustomLink
              key={item.id}
              href={item.url}
              className="flex flex-col items-start justify-center px-4 w-full py-2 transition duration-150 ease-in-out bg-gray-50 rounded-lg shadow dark:text-white hover:bg-gray-200 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 space-y-2 border border-gray-300"
            >
              <span className="text-sm font-medium lg:text-base">
                {item.title}
              </span>
              <div className="flex gap-2 items-center dark:text-white">
                <span>{format(new Date(item.createdAt), "do MMMM yyyy")}</span>
                <span>/</span>
                {item.tags.length > 0 ? (
                  <>
                    <span>
                      {item.tags
                        .map((item) => item.name)
                        .sort((a, b) => a.localeCompare(b))
                        .join(", ")}
                    </span>
                  </>
                ) : (
                  <span>Uncategorized</span>
                )}
              </div>
            </CustomLink>
          );
        })}
      </div>
    </PageLayout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const res = await axios.get("https://bookmarky.io/api/v1/bookmarks", {
    headers: {
      Authorization: `Bearer ${process.env.BOOKMARKY_TOKEN.replace(
        /(\\r|\\n)/g,
        ""
      )}`,
    },
    data: {
      tags: { AND: ["Public"] },
    },
  });

  const data = (res.data.data as Bookmark[])
    .sort(
      (a, b) =>
        new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
    )
    .map((item) => {
      item.tags = item.tags.filter((item) => item.name !== "Public");
      return item;
    });

  return {
    props: {
      data,
    },
    revalidate: 60,
  };
};

export default BookmarksPage;
