import CustomLink from "./CustomLink";

export default function Footer() {
  return (
    <>
      <div className="flex flex-row items-center justify-center w-full px-4 pb-4 text-base text-black space-x-4 dark:text-white pt-auto lg:text-lg">
        <CustomLink href="/">/home</CustomLink>
        <CustomLink href="/blog">/blog</CustomLink>
        <CustomLink href="/playlists">/playlists</CustomLink>
        <CustomLink href="/rss">/rss</CustomLink>
      </div>
    </>
  );
}
