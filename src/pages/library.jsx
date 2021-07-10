import { NextSeo } from "next-seo";
import Image from "next/image";
import * as React from "react";
import CustomLink from "~/components/CustomLink";
import PageLayout from "~/components/PageLayout";
import { baseUrl } from "~/config";
import { getBooks } from "~/lib/bookshelf";

const meta = {
  title: "Library",
  url: baseUrl + "/library",
};

/**
 * @returns {React.ReactNode}
 * @default
 */
export default function Bookshelf({ data }) {
  return (
    <>
      <NextSeo title={meta.title} openGraph={meta} />
      <PageLayout breadcrumb={{ Bookshelf: "/bookshelf" }}>
        <div className="flex flex-col gap-6 mt-4">
          {Object.entries(data).map(([key, value], index) => {
            return (
              <React.Fragment key={index}>
                <h1 className="text-2xl font-bold dark:text-white">{key}</h1>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {value.map((book, _index) => {
                    return (
                      <CustomLink
                        key={book.id}
                        href={book.url}
                        className="flex flex-col items-start justify-center w-full gap-2 p-4 transition duration-150 ease-in-out bg-gray-100 rounded-lg shadow dark:text-white hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                      >
                        <Image
                          alt={`${book.title} Cover`}
                          src={`/static/bookshelf/${book.title
                            .replace(/ /g, "-")
                            .replace(/,|'|\./g, "")
                            .toLowerCase()}.jpg`}
                          layout="intrinsic"
                          height={136}
                          width={96}
                          className="mx-auto"
                        />
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
              </React.Fragment>
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
