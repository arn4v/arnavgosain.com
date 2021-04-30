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
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-start gap-3 lg:gap-4 text-sm lg:text-base whitespace-nowrap flex-wrap font-normal">
            <div className="items-center justify-start gap-4 text-sm lg:text-base whitespace-nowrap flex-wrap hidden lg:flex">
              <Image
                src="/images/display.jpg"
                height={32}
                width={32}
                className="object-contain rounded-full"
                decoding="async"
                loading="lazy"
              />
              <h2>{data.author}</h2>
            </div>
            <div className="flex items-center justify-start gap-2 lg:gap-4 text-sm lg:text-base whitespace-nowrap flex-wrap">
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
        <HiArrowRight className="h-6 w-6 hidden lg:block" />
      </a>
    </Link>
  );
}
