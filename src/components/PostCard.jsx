import { HiArrowRight } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";

export default function PostCard({ data }) {
  return (
    <Link href={`/${data.slug}`}>
      <div className="cursor-pointer px-4 w-full py-4 bg-gray-100 dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-800 shadow-md flex items-center justify-between group">
        <div className="flex flex-col space-y-4">
          <h1 className="text-lg font-semibold">{data.title}</h1>
          <div className="flex items-center justify-start space-x-2">
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
            <h2>Published on {data.date}</h2>
          </div>
        </div>
        <Link href={`/${data.slug}`}>
          <HiArrowRight className="h-5 w-5 group-hover:animate-bounce" />
        </Link>
      </div>
    </Link>
  );
}
