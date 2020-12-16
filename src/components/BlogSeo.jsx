import { ArticleJsonLd, NextSeo } from "next-seo";

export default function BlogSeo({ title, publishedAt, url }) {
  const date = new Date(
    publishedAt.replace(new RegExp("-", "g"), "/")
  ).toISOString();
  return (
    <>
      <NextSeo
        title={`${title} – Arnav Gosain`}
        canonical={url}
        openGraph={{
          type: "article",
          article: {
            publishedTime: date,
          },
          url,
          title,
        }}
      />
      <ArticleJsonLd
        authorName="Arnav Gosain"
        dateModified={date}
        datePublished={date}
        publisherName="Arnav Gosain"
        title={title}
        url={url}
      />
    </>
  );
}
