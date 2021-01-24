import PageLayout from "~/components/PageLayout";
import { getWikiBySlug, getWikiPaths } from "~/lib/wikiUtils";
import MDXComponents from "~/components/MDXComponents";
import hydrate from "next-mdx-remote/hydrate";
import { useRouter } from "next/router";

export default function WikiPage({ mdxSource, metadata }) {
  const router = useRouter();
  const content = hydrate(mdxSource, { components: MDXComponents });
  const breadcrumbs = {
    Wiki: "/wiki",
  };

  const slugArr = router.query.slug;
  if (Array.isArray(slugArr)) {
    slugArr.forEach((param) => {
      /** @type {(string|string[])} */
      let _p = param;
      if (param.includes("-")) {
        _p = param
          .split("-")
          .map((p) => {
            return p[0].toUpperCase() + p.slice(1);
          })
          .join(" ");
      } else {
        _p = param[0].toUpperCase() + param.slice(1);
      }
      breadcrumbs[_p] = `/wiki/${slugArr.join("/")}`;
    });
  }

  return (
    <>
      <PageLayout breadcrumb={breadcrumbs}>{content}</PageLayout>
    </>
  );
}

export async function getStaticPaths() {
  const paths = getWikiPaths();
  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const props = await getWikiBySlug(slug.join("/"));
  return { props };
}
