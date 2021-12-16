import { NextApiRequest, NextApiResponse } from "next";
import cors from "cors";
import nextConnect from "next-connect";
import { prisma } from "~/lib/prisma";
import { isProd } from "~/constants";

export default nextConnect<NextApiRequest, NextApiResponse>()
  .use(
    cors({
      methods: ["GET"],
      origin: isProd ? "arnavgosain.com" : "*",
    })
  )
  .get(async (req: NextApiRequest, res) => {
    const slug = req.query?.slug;
    if (typeof slug === "string")
      res.status(200).send(
        (
          await prisma.views.upsert({
            where: {
              slug: slug,
            },
            create: {
              slug: slug,
            },
            update: {
              count: {
                increment: 1,
              },
            },
          })
        ).count
      );

    res.status(400).end();
  });
