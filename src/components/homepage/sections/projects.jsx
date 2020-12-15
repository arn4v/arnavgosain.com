import GalleryTile from "../GalleryTile";
import galleries from "~/data/homepage/galleries";

export default function ProjectsSection() {
  return (
    <>
      <div className="flex flex-col space-y-5">
        <h1 className="text-3xl font-bold dark:text-white">Projects</h1>
        <div className="flex flex-col space-y-4">
          {galleries.map((g) => {
            return <GalleryTile {...g} />;
          })}
        </div>
      </div>
    </>
  );
}
