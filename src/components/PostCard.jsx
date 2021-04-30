import { HiArrowRight } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";
import { getDateObjectFromString } from "~/lib/utils";

export default function PostCard({ data }) {
  return (
    <Link href={`/${data.slug}`}>
      <a className="px-2 lg:px-4 w-full py-4 bg-gray-100 hover:bg-gray-200 ease-out transition duration-100 dark:bg-gray-900 rounded-md border border-gray-300 dark:border-gray-800 shadow-md flex items-center justify-between group dark:hover:bg-gray-800">
        <div className="flex flex-col space-y-4">
          <h1 className="text-lg font-semibold">{data.title}</h1>
          <div className="flex items-center justify-center gap-2 lg:gap-4 text-sm lg:text-base">
            <div>
              <Image
                src="/images/display.jpg"
                draggable={false}
                height={36}
                width={36}
                className="rounded-full"
                layout="fixed"
              />
            </div>
            <div className="flex items-center justify-start gap-1 font-medium lg:gap-4 text-sm lg:text-base whitespace-nowrap flex-wrap">
              <h2>{data.author}</h2>
              <div className="flex items-center justify-start gap-2 lg:gap-4">
                <div className="hidden lg:block">/</div>
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
        <HiArrowRight className="h-6 w-6 hidden lg:block" />
      </a>
    </Link>
  );
}
