import { ImageResponse } from "@vercel/og";
import { NextApiHandler } from "next";

export const config = {
  runtime: "experimental-edge",
};

const interPromises = [
  fetch(
    new URL("../../../public/fonts/Inter-Regular.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer()),
  fetch(
    new URL("../../../public/fonts/Inter-Medium.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer()),
  fetch(new URL("../../../public/fonts/Inter-Bold.ttf", import.meta.url)).then(
    (res) => res.arrayBuffer()
  ),
];

const handler: NextApiHandler = async (req, res) => {
  const { searchParams } = new URL(req.url!);
  const title = searchParams?.get("title");
  const [normal, medium, bold] = (await Promise.all(interPromises)) as [
    ArrayBuffer,
    ArrayBuffer,
    ArrayBuffer
  ];

  try {
    return new ImageResponse(
      (
        <div
          tw="h-full w-full flex items-start justify-start bg-gray-50"
        >
          <div tw="flex items-start justify-start h-full">
            <div tw="flex flex-col justify-between w-full h-full">
              <h1 tw="text-[80px] p-20 font-bold text-left">{title}</h1>
              <div tw="flex flex-col items-start justify-center pb-10">
                <div tw="text-2xl px-20 font-bold mb-4">Arnav Gosain</div>
                <div tw="text-lg px-20 font-medium">
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
          {
            data: normal,
            name: "Inter",
            weight: 400,
            style: "normal",
          },
          {
            data: medium,
            name: "Inter",
            weight: 500,
            style: "normal",
          },
          {
            data: bold,
            name: "Inter",
            weight: 700,
            style: "normal",
          },
        ],
      }
    );
  } catch (e) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
};

export default handler;
