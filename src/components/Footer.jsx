import CustomLink from "./CustomLink";

export default function Footer() {
  return (
    <>
      <div className="flex flex-row space-x-4 w-full items-center justify-center text-black dark:text-white px-4 pt-auto pb-4 text-lg">
        <CustomLink href="/blog">/blog</CustomLink>
        <CustomLink href="/playlists">/playlists</CustomLink>
      </div>
    </>
  );
}
