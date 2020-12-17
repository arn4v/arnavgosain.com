import { ArticleJsonLd, NextSeo } from "next-seo";

/**
 * @param {object} props
 * @param {string} [props.className]
 * @param {React.ReactNode} [props.children]
 * @param {string} props.title
 * @param {string} props.author
 * @param {string} props.publishedAt
 * @param {string} props.url
 */
export default function BlogSeo(props) {
  const { title, publishedAt, url } = props;
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
