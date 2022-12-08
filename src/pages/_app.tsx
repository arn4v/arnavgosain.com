import { DM_Serif_Text, Inter } from '@next/font/google';
import clsx from 'clsx';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { GoogleAnalytics, usePageViews } from 'nextjs-google-analytics';
import 'prism-themes/themes/prism-gruvbox-dark.css';
import Seo from '~/components/Seo';
import { isProd } from '~/constants';
import { PresenceProvider } from '~/providers/PresenceProvider';
import '../styles/index.css';

const inter = Inter({
	weight: ['400', '500', '600'],
	subsets: ['latin'],
	variable: '--font-inter'
});

const dmSerif = DM_Serif_Text({
	weight: ['400'],
	subsets: ['latin'],
	variable: '--font-dm-serif-text'
});

const App = ({ Component, pageProps }: AppProps) => {
	usePageViews();

	return (
		<main className={clsx(inter.variable, dmSerif.variable, 'h-full w-full font-sans')}>
			{isProd ? (
				<>
					<Script async src="https://unpkg.com/thesemetrics@latest"></Script>
					<GoogleAnalytics />
				</>
			) : null}
			<Head>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Seo />
			<PresenceProvider>
				<Component {...pageProps} />
			</PresenceProvider>
		</main>
	);
};

export default App;
