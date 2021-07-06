import { format } from "date-fns";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import { getDateObjectFromString } from "~/lib/utils";
import PostMetadata from "~/types/metadata";

export default function PostCard({ data }: { data: PostMetadata }) {
  return (
    <Link href={`/${data.slug}`}>
      <a className="flex items-center justify-between w-full px-4 py-4 transition duration-100 ease-out bg-gray-100 border border-gray-300 rounded-md shadow-md hover:bg-gray-200 dark:bg-gray-900 dark:border-gray-800 group dark:hover:bg-gray-800 dark:text-white">
        <div className="flex flex-col space-y-4 items-start justify-start">
          <h1 className="text-lg font-semibold">{data.title}</h1>
          <div className="flex items-center justify-center gap-4 text-sm lg:text-base">
            <div className="flex flex-wrap items-center justify-start gap-1 text-sm font-medium lg:gap-4 lg:text-base whitespace-nowrap">
              <div className="flex items-center justify-start gap-2 lg:gap-4">
                <p>
                  Published on{" "}
                  {(() => {
                    const date = getDateObjectFromString(
                      data.published_on as string
                    );
                    return (
                      <time dateTime={date.toISOString()}>
                        {format(date, "do MMMM yyyy")}
                      </time>
                    );
                  })()}
                </p>
                <div>/</div>
                <h2>{data.reading_time}</h2>
              </div>
            </div>
          </div>
        </div>
        <HiArrowRight className="hidden w-6 h-6 lg:block" />
      </a>
    </Link>
  );
}
