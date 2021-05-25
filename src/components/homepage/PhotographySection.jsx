import GalleryTile from "../GalleryTile";
import galleries from "~/data/galleries";

export default function PhotographySection() {
  return (
    <>
      <div className="flex flex-col space-y-6">
        <h1 className="text-3xl font-bold dark:text-white">Photography</h1>
        <div className="flex flex-col space-y-4">
          {galleries.map((g) => {
            return <GalleryTile {...g} />;
          })}
        </div>
      </div>
    </>
  );
}
