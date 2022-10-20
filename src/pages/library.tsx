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
        <div className="flex flex-col items-start justify-between space-y-8">
          {Object.entries(data).map(([key, value], index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-start justify-start w-full space-y-4"
              >
                <h1 className="sticky top-0 text-2xl font-bold dark:text-gray-200">
                  {key}
                </h1>
                <div className="flex flex-col w-full gap-4">
                  {value.map((book) => {
                    return (
                      <Link
                        key={book.id}
                        href={book.url}
                        className="flex flex-col items-start justify-center w-full h-full gap-3 px-2 py-1 transition border border-gray-300 rounded-md dark:text-gray-200 dark:hover:bg-gray-900 hover:bg-gray-50 dark:border-gray-800 hover:shadow-sm"
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
