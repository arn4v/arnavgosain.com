import { format } from "date-fns";
import Link from "next/link";
import PostMetadata from "~/types/metadata";

export default function PostCard({ data }: { data: PostMetadata }) {
  return (
    <Link href={`/${data.slug}`}>
      <a className="flex items-center justify-between w-full h-full gap-3 p-4 dark:text-gray-200 rounded-md dark:hover:bg-gray-900 transition hover:bg-gray-50 hover:shadow-sm bg-gray-100">
        <div className="flex items-center justify-between w-full gap-4 text-sm lg:text-base font-medium">
          <h1 className="text-lg">{data.title}</h1>
          <div className="flex items-center justify-start gap-2 lg:gap-4">
            <p>
              Published on{" "}
              <time dateTime={new Date(data.published_on).toISOString()}>
                {format(new Date(data.published_on), "do MMMM yyyy")}
              </time>
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
}
