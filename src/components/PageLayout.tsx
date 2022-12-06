import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { PresenceCounter } from './PresenceCounter';
import Seo, { SeoProps } from './Seo';

interface Props {
	children: React.ReactNode;
	breadcrumb?: Record<string, string>;
	className?: string;
	seo?: SeoProps;
}

export default function PageLayout(props: Props) {
	const { children, seo = {} } = props;
	const router = useRouter();

	return (
		<>
			<Seo {...seo} />
			<div className="w-full h-auto min-h-full px-8 py-12 lg:p-12  bg-[#f6f3ed] text-radix-slateDark-slate1">
				<header className="w-full mx-auto md:max-w-2xl">
					<nav className="flex space-x-4">
						{(
							[
								['About', '/', /\/$/],
								['Writing', '/blog', /\/blog(.*)$/],
								['Projects', '/projects', /\/projects$/],
								['Library', '/library', /\/library$/]
								// ["Playlists", "/playlists", /\/playlists$/],
							] as [string, string, RegExp][]
						).map(([title, to, isActive], idx) => (
							<Link
								key={idx}
								href={to}
								passHref
								className={clsx(
									'font-medium text-xs md:text-sm text-radix-slateDark-slate8 hover:text-black hover:underline',
									isActive.test(router.pathname) && 'underline'
								)}
							>
								{title}
							</Link>
						))}
					</nav>
				</header>
				<main className="w-full mx-auto mt-8 md:max-w-2xl">{children}</main>
				<footer className="w-full mx-auto mt-8 md:max-w-2xl border-t border-gray-200 py-8">
					<PresenceCounter />
				</footer>
			</div>
		</>
	);
}
