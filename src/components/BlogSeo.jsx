import { ArticleJsonLd, NextSeo } from "next-seo";

export default function BlogSeo({ title, author, publishedAt, url, image }) {
  const date = new Date(publishedAt).toISOString();
  return (
    <>
      <NextSeo
        title={`${title} – Arnav Gosain`}
        description={summary}
        canonical={url}
        openGraph={{
          type: "article",
          article: {
            publishedTime: date,
          },
          url,
          title,
          description: summary,
          images: [featuredImage],
        }}
      />
      <ArticleJsonLd
        authorName="Arnav Gosain"
        dateModified={date}
        datePublished={date}
        description={summary}
        images={[featuredImage]}
        publisherLogo="/static/logo-192x192.png"
        publisherName="Arnav Gosain"
        title={title}
        url={url}
      />
    </>
  );
}
