import { OpenGraph } from "next-seo/lib/types";
import Image from "next/image";
import * as React from "react";
import CustomLink from "~/components/CustomLink";
import PageLayout from "~/components/PageLayout";
import { baseUrl } from "~/config";
import { getBooks } from "~/lib/bookshelf";

interface Book {
  id: string;
  title: string;
  author: string;
  url: string;
  status: string;
}

interface Props {
  data: Record<string, Array<Book>>;
}

export default function Bookshelf({ data }: Props) {
  const openGraph: OpenGraph = {
    title: "Library | Arnav Gosain",
    description: "Books I've read, reading and want to read.",
    url: baseUrl + "/library",
    images: [
      {
        url: "/static/library-og-banner.png",
        height: 627,
        width: 1200,
      },
    ],
  };

  return (
    <>
      <PageLayout
        breadcrumb={{ Bookshelf: "/bookshelf" }}
        seo={{ title: openGraph.title, openGraph: openGraph }}
      >
        <h1 className="text-3xl font-bold dark:text-white font-secondary hidden lg:block mb-8">
          Library
        </h1>
        <div className="flex flex-col space-y-8 items-start justify-between">
          {Object.entries(data).map(([key, value], index) => {
            return (
              <div
                key={index}
                className="flex flex-col space-y-4 items-start justify-start w-full"
              >
                <h1 className="text-2xl font-bold dark:text-white sticky top-0">{key}</h1>
                <div className="flex flex-col gap-4 w-full">
                  {value.map((book) => {
                    return (
                      <CustomLink
                        key={book.id}
                        href={book.url}
                        className="flex flex-col items-start justify-center px-2 w-full py-1 transition duration-150 ease-in-out bg-gray-50 border border-gray-300 rounded-lg shadow dark:text-white hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                      >
                        <div className="flex flex-col items-start justify-center gap-1">
                          <span className="text-sm font-medium lg:text-base">
                            {book.title}
                          </span>
                          <span className="text-xs lg:text-sm">
                            {book.author}
                          </span>
                        </div>
                      </CustomLink>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </PageLayout>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      data: await getBooks(),
    },
  };
}
