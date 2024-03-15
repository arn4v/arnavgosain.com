import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    publishedAt: z.string().datetime().or(z.date()),
    banner: z.string().optional(),
  }),
});

export const collections = { blog };
