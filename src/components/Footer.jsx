import Link from './CustomLink';

export default function Footer() {
	const className =
		'hover:bg-trueGray-200 dark:hover:bg-trueGray-700 transition duration-100 ease-in-out';
	return (
		<>
			<div className="flex flex-row text-sm items-center justify-center w-full px-4 pb-4 lg:text-base text-black space-x-4 dark:text-white pt-auto">
				<Link className={className} href="/">
					/home
				</Link>
				<Link className={className} href="/blog">
					/blog
				</Link>
				<Link className={className} href="/playlists">
					/playlists
				</Link>
				<Link className={className} href="/rss">
					/rss
				</Link>
			</div>
		</>
	);
}
