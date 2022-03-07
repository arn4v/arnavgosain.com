import Link from "~/components/CustomLink";
import PageLayout from "~/components/PageLayout";
import { SeoProps } from "~/components/Seo";
import { baseUrl } from "~/constants";
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

const seoConfig: SeoProps = {
  title: "Library | Arnav Gosain",
  description: "Books I've read, reading and want to read.",
  url: baseUrl + "/library",
  image: "/static/library-og-banner.png",
};

export default function Bookshelf({ data }: Props) {
  return (
    <>
      <PageLayout breadcrumb={{ Bookshelf: "/bookshelf" }} seo={seoConfig}>
        <h1 className="text-3xl font-bold font-mono dark:text-gray-200 hidden lg:block mb-8">
          Library
        </h1>
        <div className="flex flex-col space-y-8 items-start justify-between">
          {Object.entries(data).map(([key, value], index) => {
            return (
              <div
                key={index}
                className="flex flex-col space-y-4 items-start justify-start w-full"
              >
                <h1 className="text-2xl font-bold sticky top-0 dark:text-gray-200">
                  {key}
                </h1>
                <div className="flex flex-col gap-4 w-full">
                  {value.map((book) => {
                    return (
                      <Link
                        key={book.id}
                        href={book.url}
                        className="flex flex-col items-start justify-center w-full h-full gap-3 px-2 py-1 dark:text-gray-200 rounded-md dark:hover:bg-gray-900 transition hover:bg-gray-50 border border-gray-300 dark:border-gray-800 hover:shadow-sm"
                      >
                        <div className="flex flex-col items-start justify-center gap-1">
                          <span className="text-sm font-medium lg:text-base">
                            {book.title}
                          </span>
                          <span className="text-xs lg:text-sm">
                            {book.author}
                          </span>
                        </div>
                      </Link>
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
