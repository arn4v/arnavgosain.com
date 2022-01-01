import cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { isProd } from "~/constants";
import { prisma } from "~/lib/prisma";

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
