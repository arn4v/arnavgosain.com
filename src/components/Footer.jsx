import CustomLink from "./CustomLink";

export default function Footer() {
  const className =
    "hover:bg-trueGray-200 dark:hover:bg-trueGray-700 transition duration-100 ease-in-out";
  return (
    <>
      <div className="flex flex-row text-sm items-center justify-center w-full px-4 pb-4 lg:text-base text-black space-x-4 dark:text-white pt-auto">
        <CustomLink className={className} href="/">
          /home
        </CustomLink>
        <CustomLink className={className} href="/blog">
          /blog
        </CustomLink>
        <CustomLink className={className} href="/playlists">
          /playlists
        </CustomLink>
        <CustomLink className={className} href="/rss">
          /rss
        </CustomLink>
      </div>
    </>
  );
}
