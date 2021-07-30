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
          className="bg-cyan-200 dark:text-black font-secondary transition underline"
        >
          Bookmarky.io
        </CustomLink>{" "}
        API.
      </p>
      <div className="grid grid-cols-1 gap-4 divide-y divide-gray-200">
        {data.map((item) => {
          return (
            <div
              key={item.id}
              className="flex items-start justify-start flex-col gap-2 pt-4"
            >
              <a
                href={item.url}
                title={item.title}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="font-bold bg-cyan-200 hover:bg-cyan-300 transition">
                  {item.title}
                </span>
              </a>
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
            </div>
          );
        })}
      </div>
    </PageLayout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const slug = ctx.params.slug;
  const valid = undefined;
  if (slug !== valid) {
    return {
      notFound: true,
    };
  }

  let tags: string[];
  switch (true) {
    case typeof slug === "undefined": {
      tags = ["Public"];
      break;
    }
    case slug === "/reading": {
      tags = ["Reading List"];
      break;
    }
  }

  const res = await axios.get("https://bookmarky.io/api/v1/bookmarks", {
    headers: {
      Authorization: `Bearer ${process.env.BOOKMARKY_TOKEN.replace(
        /(\\r|\\n)/g,
        ""
      )}`,
    },
    data: {
      tags: { AND: tags },
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { slug: undefined } }],
    fallback: false,
  };
};

export default BookmarksPage;
