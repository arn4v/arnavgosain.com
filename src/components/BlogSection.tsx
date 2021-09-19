import { format } from "date-fns";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import PostMetadata from "~/types/metadata";

export default function BlogSection({ data }: { data: PostMetadata[] }) {
  return (
    <div className="flex flex-col w-full space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xl font-secondary font-bold dark:text-white">
          Recent writing
        </span>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 lg:gap-6">
        {data.map((data: PostMetadata) => {
          return (
            <Link key={`${data.title}-${data.slug}`} href={`/${data.slug}`}>
              <a className="flex items-center justify-between w-full h-full gap-3 p-4 dark:text-gray-200 rounded-md dark:hover:bg-gray-900 transition hover:bg-gray-50 border border-gray-300 dark:border-gray-800 hover:shadow-sm font-medium">
                <p className="font-semibold">{data.title}</p>
                <p>
                  Published on{" "}
                  <time dateTime={new Date(data.published_on).toISOString()}>
                    {format(new Date(data.published_on), "do MMMM yyyy")}
                  </time>
                </p>
              </a>
            </Link>
          );
        })}
      </div>
      <Link href="/blog">
        <a className="flex items-center justify-center px-1 py-2 space-x-2 text-sm transition duration-150 ease-in bg-gray-100 border border-gray-300 rounded-md dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-200 dark:border-gray-800 lg:py-2 lg:px-2 lg:text-base whitespace-nowrap dark:text-white">
          <span>View all posts</span>
          <HiArrowRight />
        </a>
      </Link>
    </div>
  );
}
