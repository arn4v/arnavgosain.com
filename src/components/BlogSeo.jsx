import { ArticleJsonLd, NextSeo } from "next-seo";

/**
 * @param {object} props
 * @param {string} [props.className]
 * @param {React.ReactNode} [props.children]
 * @param {string} props.title
 * @param {string} props.author
 * @param {string} props.date
 * @param {string} props.url
 */
export default function BlogSeo(props) {
  const { title, date, url } = props;
  const [year, month, day] = date.split("-").map((i) => parseInt(i));
  return (
    <>
      <NextSeo
        title={`${title} – Arnav Gosain`}
        canonical={url}
        openGraph={{
          type: "article",
          article: {
            publishedTime: new Date(year, month - 1, day).toISOString(),
          },
          url,
          title,
        }}
      />
    </>
  );
}
