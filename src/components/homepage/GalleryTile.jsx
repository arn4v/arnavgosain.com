export default function GalleryTile({ title, img, alt, href }) {
  return (
    <>
      <a
        href={href}
        rel="noreferrer noopener"
        className="flex flex-col space-y-4"
        target="_blank"
      >
        <div
          style={{ backgroundImage: `url(${img})`, backgroundSize: "auto" }}
          className="overflow-hidden h-32 w-full rounded-md shadow-md p-3"
        >
          <div className="h-full w-full flex items-end justify-start">
            <p className="font-medium text-xl">{title}</p>
          </div>
        </div>
      </a>
    </>
  );
}
