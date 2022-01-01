import axios from "axios";
import { format } from "date-fns";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "~/components/CustomLink";
import PageLayout from "~/components/PageLayout";
import { SeoProps } from "~/components/Seo";
import { baseUrl } from "~/constants";

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
        <Link
          href="https://bookmarky.io"
          className="bg-cyan-200 dark:bg-blueGray-600 underline"
        >
          Bookmarky.io
        </Link>{" "}
        API.
      </p>
      <div className="grid grid-cols-1 gap-4">
        {data.map((item) => {
          return (
            <div key={item.id} className="flex flex-col gap-2 w-full">
              <Link
                className="text-orange-500 hover:text-orange-700 underline font-medium"
                href={item.url}
              >
                {item.title}
              </Link>
              <div className="flex space-x-2 items-center text-gray-600 dark:text-blueGray-500">
                <span>{format(new Date(item.createdAt), "do MMMM yyyy")}</span>
                <span>/</span>
                {item.tags.length > 0 ? (
                  <>
                    <span className="flex-nowrap">
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
            </div>
          );
        })}
      </div>
    </PageLayout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const res = await axios.get("https://bookmarky.mnsht.xyz/api/v1/bookmarks", {
    headers: {
      Authorization: `Bearer ${(process.env.BOOKMARKY_TOKEN as string).replace(
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
