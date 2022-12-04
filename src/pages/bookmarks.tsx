import PageLayout from '~/components/PageLayout';
import { SeoProps } from '~/components/Seo';
import { baseUrl } from '~/constants';

const BookmarksPage = () => {
	const seoConfig: SeoProps = {
		title: 'Bookmarks | Arnav Gosain',
		description: 'Links for later.',
		url: baseUrl + '/bookmarks',
		image: baseUrl + '/api/og?title=Bookmarks'
	};

	return (
		<PageLayout seo={seoConfig}>
			<iframe
				src="https://markbox.in/share/3eabfb0e-e63b-4693-9b78-67d227e80bd0"
				style={{
					border: 'none',
					minHeight: 'calc(100vh - 10rem)',
					width: '100%'
				}}
				allowFullScreen
			></iframe>
		</PageLayout>
	);
};

export default BookmarksPage;
