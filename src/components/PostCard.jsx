import { HiArrowRight } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";
import { getDateObjectFromString } from "~/lib/utils";

export default function PostCard({ data }) {
  return (
    <Link href={`/${data.slug}`}>
      <a className="flex items-center justify-between w-full px-4 py-4 transition duration-100 ease-out bg-gray-100 border border-gray-300 rounded-md shadow-md hover:bg-gray-200 dark:bg-gray-900 dark:border-gray-800 group dark:hover:bg-gray-800">
        <div className="flex flex-col space-y-4">
          <h1 className="text-lg font-semibold">{data.title}</h1>
          <div className="flex items-center justify-center gap-4 text-sm lg:text-base">
            <div>
              <Image
                src="/static/display.jpg"
                draggable={false}
                height={36}
                width={36}
                className="rounded-full"
                layout="fixed"
              />
            </div>
            <div className="flex flex-wrap items-center justify-start gap-1 text-sm font-medium lg:gap-4 lg:text-base whitespace-nowrap">
              <h2>{data.author}</h2>
              <div className="flex items-center justify-start gap-2 lg:gap-4">
                <div className="hidden md:block">/</div>
                <p>
                  Published on{" "}
                  <time
                    dateTime={getDateObjectFromString(data.date).toISOString()}
                  >
                    {data.formattedDate}
                  </time>
                </p>
                <div>/</div>
                <h2>{data.readingTime}</h2>
              </div>
            </div>
          </div>
        </div>
        <HiArrowRight className="hidden w-6 h-6 lg:block" />
      </a>
    </Link>
  );
}
