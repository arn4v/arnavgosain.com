import { ImageResponse } from '@vercel/og';

export const config = {
	runtime: 'experimental-edge'
};

const dmSerifTextRegular = fetch(
	new URL('../../../public/fonts/DMSerifText-Regular.ttf', import.meta.url)
).then(res => res.arrayBuffer());

const interMedium = fetch(new URL('../../../public/fonts/Inter-Medium.ttf', import.meta.url)).then(
	res => res.arrayBuffer()
);

const interBold = fetch(new URL('../../../public/fonts/Inter-Bold.ttf', import.meta.url)).then(
	res => res.arrayBuffer()
);

/**
 * @type {import('next').NextApiHandler}
 */
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
	try {
		const url = new URL(req.url);
		const { title } = Object.fromEntries(url.searchParams);

		const normal = await dmSerifTextRegular;
		const medium = await interMedium;
		const bold = await interBold;

		return new ImageResponse(
			(
				<div tw="h-full w-full flex items-start justify-start bg-[#f6f3ed]">
					<div tw="flex items-start justify-start h-full">
						<div tw="flex flex-col justify-between w-full h-full">
							<h1
								tw="leading-[1.1] text-[80px] p-20 text-emerald-800 text-left"
								style={{
									fontFamily: 'DM Serif Text',
									fontSize: title.length > 60 ? '70px' : '100px'
								}}
							>
								{title}
							</h1>
							<div tw="flex flex-col items-start justify-center pb-10">
								<div
									tw="text-3xl px-20 font-bold mb-4"
									style={{
										fontFamily: 'Inter'
									}}
								>
									Arnav Gosain
								</div>
								<div
									tw="text-2xl px-20 font-medium text-zinc-500"
									style={{
										fontFamily: 'Inter'
									}}
								>
									https://arnavgosain.com
								</div>
							</div>
						</div>
					</div>
				</div>
			),
			{
				width: 1200,
				height: 630,
				fonts: [
					{ data: normal, name: 'DM Serif Text', weight: 400, style: 'normal' },
					{ data: medium, name: 'Inter', weight: 500, style: 'normal' },
					{ data: bold, name: 'Inter', weight: 700, style: 'normal' }
				]
			}
		);
	} catch {
		return new Response('Failed to generate image', {
			status: 500,
		});
	}
};
