import CustomLink from "~/components/CustomLink";
import * as React from "react";
import PageLayout from "~/components/PageLayout";
import { books } from "~/data/bookshelf";
import Image from "next/image";

/**
 * @returns {React.ReactNode}
 * @default
 */
export default function Bookshelf() {
  return (
    <>
      <PageLayout breadcrumb={{ Bookshelf: "/bookshelf" }}>
        <div className="flex flex-col mt-4 gap-6">
          {Object.entries(books).map(([key, value], index) => {
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
    </>
  );
}
