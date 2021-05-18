import CustomLink from "~/components/CustomLink";
import * as React from "react";
import PageLayout from "~/components/PageLayout";
import Image from "next/image";

/**
 * @returns {React.ReactNode}
 * @default
 */
export default function Bookshelf({ data }) {
  return (
    <PageLayout breadcrumb={{ Bookshelf: "/bookshelf" }}>
      <div className="flex flex-col mt-4 gap-6">
        {Object.entries(data).map(([key, value], index) => {
          return (
            <React.Fragment key={index}>
              <h1 className="text-2xl font-bold dark:text-white">{key}</h1>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {value.map((book, _index) => {
                  return (
                    <React.Fragment key={book.id}>
                      <CustomLink
                        href={book.url}
                        className="flex flex-col items-start justify-center w-full p-4 bg-gray-100 rounded-lg shadow gap-2 dark:text-white hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition duration-150 ease-in-out"
                      >
                        <Image
                          src={`/images/books/${book.title
                            .replace(/ /g, "-")
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
                    </React.Fragment>
                  );
                })}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </PageLayout>
  );
}

export async function getStaticProps() {
  const data = await fetch(
    "https://notion-api.splitbee.io/v1/table/cee24ed079424c76a59cf386b9e9d78d",
    {
      method: "get",
    }
  ).then((res) => res.json());

  return {
    props: {
      data: data.reduce((acc, cur) => {
        const { status, ...metadata } = cur;
        acc[status] = [
          ...(Array.isArray(acc[status]) ? acc[status] : []),
          metadata,
        ];
        return acc;
      }, {}),
    },
  };
}
