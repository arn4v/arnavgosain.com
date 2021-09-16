import axios from "axios";
import { format } from "date-fns";
import { GetStaticPaths, GetStaticProps } from "next";
import CustomLink from "~/components/CustomLink";
import PageLayout from "~/components/PageLayout";
import { SeoProps } from "~/components/Seo";
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
  const seoConfig: SeoProps = {
    title: "Bookmarks | Arnav Gosain",
    description: "Links for later.",
    url: baseUrl + "/bookmarks",
    image: "/static/bookmarks-og-banner.png",
  };

  return (
    <PageLayout seo={seoConfig}>
      <h1 className="text-3xl font-bold dark:text-gray-200 font-secondary hidden lg:block mb-2">
        Bookmarks
      </h1>
      <p className="lg:text-lg text-base font-medium mb-8 dark:text-gray-200">
        Built on top of{" "}
        <CustomLink
          href="https://bookmarky.io"
          className="bg-cyan-200 dark:bg-blueGray-600 underline"
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
              className="flex flex-col items-start justify-center w-full h-full gap-3 py-2 px-4 dark:text-gray-200 rounded-md dark:hover:bg-gray-900 transition hover:bg-gray-50 border border-gray-300 dark:border-gray-800 hover:shadow-sm"
            >
              <span className="text-sm font-medium lg:text-base">
                {item.title}
              </span>
              <div className="flex gap-2 items-center">
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
