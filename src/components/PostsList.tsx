import PostMetadata from "~/types/metadata";
import PostCard from "./PostCard";

export default function PostsList({ data }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 lg:gap-6">
      {data.map((item: PostMetadata) => {
        return <PostCard key={item.title as string} data={item} />;
      })}
    </div>
  );
}
