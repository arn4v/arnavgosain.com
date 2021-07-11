import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import PostMetadata from "~/types/metadata";
import PostCard from "./PostCard";

export default function BlogSection({ data }: { data: PostMetadata[] }) {
  return (
    <div className="flex flex-col w-full space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xl font-mono font-bold dark:text-white">
          Recent writing
        </span>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 lg:gap-6">
        {data.map((item: PostMetadata) => {
          return <PostCard key={item.title as string} data={item} />;
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
