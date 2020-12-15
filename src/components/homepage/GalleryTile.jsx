import Image from "next/image";

export default function GalleryTile({ title, img, alt, href }) {
  return (
    <>
      <a href={href} className="flex flex-col space-y-4" target="_blank">
        <div
          style={{ backgroundImage: `url(${img})`, backgroundSize: "auto" }}
          className="overflow-hidden h-32 w-full rounded-md shadow-md p-3"
        >
          {/* <Image
            className="absolute"
            height={128}
            width={128}
            objectFit="cover"
            src={img}
            alt={alt}
            loading="eager"
          /> */}
          <div className="h-full w-full flex items-end justify-start">
            <p className="font-medium text-xl">{title}</p>
          </div>
        </div>
      </a>
    </>
  );
}
