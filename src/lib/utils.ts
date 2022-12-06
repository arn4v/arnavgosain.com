import { allPosts } from 'contentlayer/generated';
import { format } from 'date-fns';
import { Feed } from 'feed';
import fs from 'fs';
import glob from 'glob';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import path from 'path';
import prettier from 'prettier';
import { baseUrl } from '~/constants';

export const getFormattedDateText = (dateString: string): string => {
	const date = getDateObjectFromString(dateString);
	return format(date, 'do MMMM yyyy');
};

export const getDateObjectFromString = (dateString: string): Date => {
	const [year, month, day] = dateString.split('-').map(i => parseInt(i));
	return new Date(year, month, day);
};

export const generateSiteMap = async () => {
	const pages = [
		...glob
			.sync(path.join(process.cwd(), 'src/pages/**/*.{js,jsx,ts,tsx}'))
			.filter(page => !/(_app|_document|\[slug\]|api)/.test(page))
			.map(page => {
				page = page.split('src/pages')[1].replace(/\.(.*)/, '');
				return page.includes('index') ? page.replace('/index', '') : page;
			}),
		...allPosts.map(item => '/' + item.slug)
	];

	const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
							.map(page => {
								return `
                        <url>
                            <loc>${`https://arnavgosain.com${page}`}</loc>
                        </url>
                    `;
							})
							.join('\n')}
        </urlset>
    `;

	const formatted = prettier.format(sitemap, {
		endOfLine: 'lf',
		tabWidth: 4,
		parser: 'html'
	});

	fs.writeFileSync('public/sitemap.xml', formatted);
};

export const generateFeeds = async () => {
	const updated = new Date();

	const author = {
		name: 'Arnav Gosain',
		email: 'arnav@arnavgosain.com',
		link: 'https://twitter.com/arn4v'
	};

	const feed = new Feed({
		id: baseUrl,
		title: "Arnav Gosain's Blog",
		author,
		link: baseUrl,
		description: '',
		copyright: `All rights reserved ${updated.getFullYear()}, Arnav Gosain`,
		favicon: `${baseUrl}/favicon.ico`,
		updated: updated,
		feedLinks: {
			rss2: `${baseUrl}/rss.xml`,
			json: `${baseUrl}/feed.json`,
			atom: `${baseUrl}/atom.xml`
		}
	});

	allPosts.forEach(({ slug, title, publishedOn }) => {
		feed.addItem({
			title: title,
			link: `${baseUrl}/${slug}`,
			author: [author],
			date: new Date(publishedOn)
		});
	});

	const rootPath = path.resolve(process.cwd());
	fs.writeFileSync(path.join(rootPath, 'public/rss.xml'), feed.rss2());
	fs.writeFileSync(path.join(rootPath, 'public/atom.xml'), feed.atom1());
	fs.writeFileSync(path.join(rootPath, 'public/feed.json'), feed.json1());
};

export const nc = () => nextConnect<NextApiRequest, NextApiResponse>();
