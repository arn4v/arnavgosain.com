import PostMetadata from "~/types/metadata";
import PostCard from "./PostCard";

export default function PostsList({ data }: { data: PostMetadata[] }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 lg:gap-6">
      {data
        .sort(
          (a, b) =>
            new Date(b.published_on).valueOf() -
            new Date(a.published_on).valueOf()
        )
        .map((item) => {
          return <PostCard key={item.title as string} data={item} />;
        })}
    </div>
  );
}
