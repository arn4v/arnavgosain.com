import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import { BlogPost } from "~/types";
import PostCard from "../PostCard";

interface Props {
  data: BlogPost[];
}

export default function BlogSection({ data }: Props) {
  return (
    <div className="flex flex-col w-full space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold lg:text-3xl dark:text-white">
          Blog posts
        </span>
        <Link href="/blog">
          <a className="flex items-center justify-center px-1 py-2 space-x-2 text-sm transition duration-150 ease-in bg-gray-100 border border-gray-300 rounded-md dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-200 dark:border-gray-800 lg:py-2 lg:px-2 lg:text-base whitespace-nowrap">
            <span>View all posts</span>
            <HiArrowRight />
          </a>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center">
        {data.map((item) => {
          return <PostCard key={item.id as string} data={item} />;
        })}
      </div>
    </div>
  );
}