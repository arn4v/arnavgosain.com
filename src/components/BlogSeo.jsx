import { ArticleJsonLd, NextSeo } from "next-seo";

export default function BlogSeo({
  title,
  author,
  summary,
  publishedAt,
  url,
  image,
}) {
  return (
    <>
      <NextSeo />
      <ArticleJsonLd />
    </>
  );
}
