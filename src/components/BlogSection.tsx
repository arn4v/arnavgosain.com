import { Post } from '.contentlayer/generated';
import { format } from 'date-fns';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';

export default function BlogSection({ data }: { data: Post[] }) {
	return (
		<div className="flex flex-col w-full space-y-6">
			<div className="flex items-center justify-between">
				<span className="text-xl font-mono font-bold dark:text-white">Recent posts</span>
			</div>
			<div className="flex flex-col items-center justify-center gap-4 lg:gap-6">
				{data.map((data, index) => {
					const date = new Date(data.publishedOn);
					return (
						<div key={index} className="flex items-center justify-between w-full h-full">
							<Link
								href={`/${data.slug}`}
								className="text-orange-500 hover:text-orange-700 underline font-medium"
							>
								{data.title}
							</Link>
							<p>
								Published on{' '}
								<time dateTime={date.toISOString()}>{format(date, 'do MMMM yyyy')}</time>
							</p>
						</div>
					);
				})}
			</div>
			<Link
				href="/blog"
				className="flex items-center justify-center px-6 ml-auto py-2 space-x-4 text-sm transition duration-150 ease-in bg-gray-100 border border-gray-300 rounded-md dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-200 dark:border-gray-800 lg:text-base whitespace-nowrap dark:text-white"
			>
				<span>View all posts</span>
				<HiArrowRight />
			</Link>
		</div>
	);
}
