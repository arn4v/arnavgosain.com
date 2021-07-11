import axios from "axios";
import { format, minutesToSeconds } from "date-fns";
import { GetServerSideProps } from "next";
import { OpenGraph } from "next-seo/lib/types";
import { HiOutlineExternalLink } from "react-icons/hi";
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
    title: "Bookmarks",
    description: "Links for later.",
    url: baseUrl + "/bookmarks",
  };

  return (
    <PageLayout
      seo={{
        title: meta.title,
        description: meta.description,
        openGraph: meta,
      }}
    >
      <h1 className="text-3xl font-bold dark:text-white font-mono hidden lg:block mb-2">
        Bookmarks
      </h1>
      <p className="lg:text-lg text-base font-medium mb-8 dark:text-white">
        Built on top of{" "}
        <CustomLink
          href="https://bookmarky.io"
          className="bg-cyan-200 dark:text-black font-mono transition underline"
        >
          Bookmarky.io
        </CustomLink>{" "}
        API.
      </p>
      <div className="grid grid-cols-1 gap-4">
        {data.map((item) => {
          return (
            <a
              key={item.id}
              href={item.url}
              title={item.title}
              rel="noopener noreferrer"
              target="_blank"
              className="flex items-center justify-between py-2 px-4 rounded-md shadow-sm dark:shadow-inner dark:bg-gray-900 dark:hover:bg-gray-800 transiton dark:text-white bg-gray-100 hover:bg-gray-200 border border-gray-300 dark:border-gray-700 hover:shadow-md duration-150 ease-in"
            >
              <div className="flex flex-col gap-3">
                <span className="font-bold">{item.title}</span>
                <span>
                  Created on {format(new Date(item.createdAt), "do MMMM yyyy")}
                </span>
              </div>
              <HiOutlineExternalLink className="h-5 w-5" />
            </a>
          );
        })}
      </div>
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
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
      tags = ["Reading List"];
    }
    case slug === "/reading": {
      tags = ["Reading List"];
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

  ctx.res.setHeader(
    "Cache-Control",
    `public, s-maxage=1, stale-while-revalidate=${minutesToSeconds(10)}`
  );
  const data = (res.data.data as Bookmark[]).sort(
    (a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
  );

  return {
    props: {
      data,
    },
  };
};

export default BookmarksPage;
