import { useRouter } from "next";
import fs from "fs";
import path from "path";

export default function Post({ title, slug, content, publishedAt, updatedAt }) {
  const router = useRouter();
  return <></>;
}

export async function getStaticPaths() {
  const mdxPath = path.resolve(path.join(process.cwd(), "../../posts"));
  const posts = fs.readdirSync(mdxPath);
  return { paths: [] };
}

export async function getStaticProps(ctx) {
  const {
    params: { slug },
  } = ctx;
  return { props: {} };
}
