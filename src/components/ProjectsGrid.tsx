import clsx from 'clsx';
import React from 'react';
import { HiLink } from 'react-icons/hi';
import { tagColors } from '~/constants';
import { Project } from '~/types';
import CustomLink from './CustomLink';

const ProjectsGrid = ({ data }: { data: Project[] }) => {
	return (
		<div className="grid grid-rows-1 gap-4 lg:gap-6">
			{data.map((p, idx) => {
				return (
					<div
						key={idx}
						className="flex flex-col items-start justify-center w-full h-full gap-3 p-4 dark:text-gray-200 rounded-md dark:hover:bg-gray-900 transition hover:bg-gray-50 border border-gray-300 dark:border-gray-800 hover:shadow-sm"
					>
						<span className="flex flex-row items-center justify-start space-x-2">
							<p className="text-base font-semibold">{p.name}</p>
							{p.links.map(({ title, url }, idx) => (
								<React.Fragment key={idx}>
									<p>•</p>
									<CustomLink
										href={url}
										className="flex flex-row space-x-0.5 items-center justify-center group"
									>
										<div className="top-0 right-0 flex items-center justify-center w-6 h-6 rounded-full">
											<HiLink className="w-5 h-5 text-black group-hover:text-amber-600 dark:group-hover:text-amber-500 dark:text-white transition" />
										</div>
										<p className="text-sm lg:text-base group-hover:text-amber-600 dark:group-hover:text-amber-500 transition">
											{title}
										</p>
									</CustomLink>
								</React.Fragment>
							))}
						</span>
						<p className="text-sm lg:text-base">{p.description}</p>
						<p className="text-sm lg:text-base">{p.duration ?? ''}</p>
						<span className="flex flex-row flex-wrap gap-2">
							{p.tags.map(t => {
								return (
									<div
										key={`${p.name}-${t}`}
										className={clsx(
											`rounded-xl h-6 py-1 font-medium px-2 text-xs text-white`,
											tagColors[t] ?? 'bg-blue-400 border border-gray-300'
										)}
									>
										{t}
									</div>
								);
							})}
						</span>
					</div>
				);
			})}
		</div>
	);
};

export default ProjectsGrid;
