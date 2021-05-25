import { NextSeo } from "next-seo";

export default function DedupeCsvPage(): JSX.Element {
  return (
    <>
      <NextSeo
        title="OneTab Export to CSV Converter"
        description="Convert OneTab Export text to CSV for importing into Notion."
        openGraph={{
          title: "OneTab Export to CSV Converter",
          description:
            "Convert OneTab Export text to CSV for importing into Notion.",
        }}
      />
      <style jsx scoped>
        {`
          .gradient {
            background-image: url("/static/dedupecsv/mesh.png");
          }
        `}
      </style>
      <div className="w-screen h-screen overflow-hidden gradient"></div>
    </>
  );
}
