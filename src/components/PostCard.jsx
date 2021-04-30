import { HiArrowRight } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";
import { getDateObjectFromString } from "~/lib/utils";

export default function PostCard({ data }) {
  return (
    <Link href={`/${data.slug}`}>
      <a className="px-4 w-full py-4 bg-gray-100 hover:bg-gray-200 ease-out transition duration-100 dark:bg-gray-900 rounded-md border border-gray-300 dark:border-gray-800 shadow-md flex items-center justify-between group dark:hover:bg-gray-800">
        <div className="flex flex-col space-y-4">
          <h1 className="text-lg font-semibold">{data.title}</h1>
          <div className="flex items-center justify-start space-x-4">
            <Image
              src="/images/display.jpg"
              height={32}
              width={32}
              className="object-contain rounded-full"
              decoding="async"
              loading="lazy"
            />
            <h2>{data.author}</h2>
            <div>/</div>
            <p>
              Published on{" "}
              <time dateTime={getDateObjectFromString(data.date).toISOString()}>
                {data.formattedDate}
              </time>
            </p>
            <div>/</div>
            <h2>{data.readingTime}</h2>
          </div>
        </div>
        <Link href={`/${data.slug}`}>
          <HiArrowRight className="h-5 w-5" />
        </Link>
      </a>
    </Link>
  );
}
