import { trpc } from "~/imports";
import * as yup from "yup";
import { prisma } from "~/lib/prisma";
import superjson from "superjson";

export const appRouter = trpc
  .router()
  .transformer(superjson)
  .query("views", {
    input: yup.string().required(),
    async resolve({ input: slug, type }) {
      return (
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
      ).count;
    },
  });

export type AppRouter = typeof appRouter;
