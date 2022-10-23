import Head from "next/head";

export interface SeoProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  publishedAt?: string;
}

export default function Seo({
  title = "Arnav Gosain",
  description,
  url = "https://arnavgosain.com",
  image,
  publishedAt,
}: SeoProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta content={description} name="description" />
      <meta name="robots" content="follow, index" />
      <meta property="og:description" content={description} />
      {!!image && <meta property="og:image" content={image} />}
      <meta property="og:site_name" content="Arnav Gosain" />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      {publishedAt ? (
        <meta property="article:published_time" content={publishedAt} />
      ) : null}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@arn4v" />
      <meta name="twitter:creator" content="@arn4v" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={url} />
    </Head>
  );
}
