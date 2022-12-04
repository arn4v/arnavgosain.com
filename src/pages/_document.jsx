import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class CustomDocument extends Document {
	render() {
		return (
			<>
				<Html lang="en">
					<Head>
						<link
							rel="alternate"
							type="application/rss+xml"
							title="arnavgosain.com RSS Feed"
							href="rss.xml"
						/>
						<link
							rel="alternate"
							type="application/atom+xml"
							title="arnavgosain.com Atom feed"
							href="atom.xml"
						/>
						<link
							rel="alternate"
							type="application/feed+json"
							title="arnavgosain.com Json feed"
							href="feed.json"
						/>
					</Head>
					<body>
						<Main />
						<NextScript />
					</body>
				</Html>
			</>
		);
	}
}
