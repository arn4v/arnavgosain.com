import CustomLink from "~/components/CustomLink";
import { Fragment } from "react";
import PageLayout from "~/components/PageLayout";
import books from "~/data/bookshelf";

/**
 * @returns {React.ReactNode}
 */
export default function Bookshelf() {
  return (
    <>
      <PageLayout breadcrumb={{ Bookshelf: "/bookshelf" }}>
        <h1 className="text-2xl font-bold dark:text-white">
          Arnav's Bookshelf
        </h1>
        <div className="flex flex-col space-y-2 mt-4">
          {books.map((book) => {
            return (
              <Fragment key={books.indexOf(book)}>
                <div className="flex flex-row items-center justify-start space-x-2">
                  <div className="h-1.5 w-1.5 bg-black rounded-full dark:bg-white"></div>
                  <CustomLink href={book.link} className="dark:text-white">
                    {book.title}
                    {book.author && ` by ${book.author}`}
                  </CustomLink>
                </div>
                <div
                  style={{ height: "0.25px" }}
                  className="w-full bg-gray-300"
                ></div>
              </Fragment>
            );
          })}
        </div>
      </PageLayout>
    </>
  );
}
