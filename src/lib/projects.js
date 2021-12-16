import DescLink from "~/components/DescLink";
import Link from "../components/CustomLink";

/**
 * @typedef {object} Link
 * @property {string} id
 * @property {string} title
 * @property {string} url
 */

/**
 * @type {Array.<import("~/types").Project>}
 */
const projects = [
  {
    id: "b346a995-b2af-4877-8fb8-4895e131d306",
    name: "tsrq",
    duration: "Easily Create Type-Safe React Query Hooks",
    description: <></>,
    links: [
      {
        id: "33bb21ef-8974-4b73-9cf9-c3abe87f953b",
        title: "Npm",
        url: "https://npmjs.org/package/tsrq",
      },
      {
        id: "3a6ee375-be46-4f92-a85a-7c9bad085121",
        title: "GitHub",
        url: "https://github.com/arn4v/tsrq",
      },
    ],
    tags: ["React", "TypeScript"],
  },
  {
    id: "553b97d8-29b5-4456-86ad-ad9ecebb8a6f",
    name: "relink",
    duration: "August 2021",
    description: (
      <>
        Relink is a personal contacts manager inspired by
        <DescLink href="https://thesephist.com">thesephist</DescLink>'s{" "}
        <DescLink href="https://github.com/thesephist/mira">mira</DescLink>.
        Built with Golang and Svelte.
      </>
    ),
    links: [
      {
        id: "487354b4-69e1-4abe-aaf4-ee827f768146",
        title: "GitHub",
        url: "https://github.com/arn4v/relink",
      },
    ],
    tags: ["Go", "Svelte"],
  },
  {
    id: "2f6065fa-c979-41c6-9e92-ff781af5e037",
    name: "next-mdx-builder",
    description: (
      <>
        Next.js plugin that adds support for MDX Pages with layout support in
        frontMatter. Inspired by{" "}
        <Link
          href="https://github.com/hashicorp/next-mdx-enhanced"
          className=""
        >
          next-mdx-enhanced
        </Link>
        , powered by{" "}
        <Link
          href="https://github.com/hashicorp/next-mdx-remote"
          className="font-mono text-cyan-600 hover:bg-cyan-200 hover:text-black transition"
        >
          next-mdx-remote
        </Link>
        .
      </>
    ),
    duration: "August 2021",
    links: [
      {
        id: "6596bc33-75b5-43e4-bef2-4f3267af25c6",
        title: "Npm",
        url: "https://www.npmjs.com/package/next-mdx-builder",
      },
      {
        id: "97dfbcd3-926d-4940-bc32-d1ec2127cdc8",
        title: "GitHub",
        url: "https://github.com/arn4v/next-mdx-builder",
      },
    ],
    tags: ["Next.js", "MDX"],
  },
  {
    id: "fba4cf7d-72b7-4791-bc5e-c36bb85bf3c2",
    name: "react-sensible",
    description: (
      <>
        Set of React hooks I use across my projects. Inspired by the{" "}
        <Link
          href="https://usehooks.com/"
          className="font-mono text-cyan-600 hover:bg-cyan-200 hover:text-black transition"
        >
          use-hooks
        </Link>{" "}
        project and{" "}
        <Link
          href="https://www.npmjs.com/package/react-use"
          className="font-mono text-cyan-600 hover:bg-cyan-200 hover:text-black transition"
        >
          react-use
        </Link>{" "}
        library.
      </>
    ),
    duration: "July 2021",
    links: [
      {
        id: "39974630-ac2b-48e5-be79-4f905b79cd7e",
        title: "Npm",
        url: "https://www.npmjs.com/package/react-sensible",
      },
    ],
    tags: ["React"],
  },
  {
    id: "45932b82-650e-4bcf-80a5-7b00f3d5d117",
    name: "use-children",
    description:
      "React hook for filtering the `children` for a specific component",
    duration: "July 2021",
    links: [
      {
        id: "6737897c-d381-40f2-abf0-4bc642857a48",
        title: "Npm",
        url: "https://www.npmjs.com/package/use-children",
      },
      {
        id: "6737897c-d381-40f2-abf0-4bc642857a48",
        title: "GitHub",
        url: "https://github.com/arn4v/use-children",
      },
    ],
    tags: ["React"],
  },
  {
    id: "aade4e01-d791-489b-b85b-4040b8d6dde5",
    name: "Bookmarky",
    description:
      "API-First bookmarking tool for developers built with React, Next.js, GraphQL and TailwindCSS",
    duration: "February 2021 - Present",
    links: [
      {
        id: "8b885119-35d5-4310-82a7-ee08382e6533",
        title: "Live",
        url: "https://bookmarky.io",
      },
      {
        id: "92d49432-9e70-4ced-a753-6c11c3bf3465",
        title: "GitHub",
        url: "https://github.com/arn4v/bookmarky",
      },
    ],
    tags: ["TailwindCSS", "Framer Motion", "Next.js", "React", "GraphQL"],
  },
  {
    id: "f5202a90-218f-42c7-be9d-21193040624a",
    name: "Brevis.link",
    description: (
      <>
        Simple URL shortener built to test{" "}
        <Link href="https://upstash.com">Upstash.com's</Link> Serverless Redis
        offering.
      </>
    ),
    duration: "June 2021",
    links: [
      {
        id: "44636df5-192b-424f-ba01-f6e84ee8a68f",
        title: "Live",
        url: "https://brevis.link",
      },
      {
        id: "2b706fc4-e686-4770-9183-677f3c62fa50",
        title: "GitHub",
        url: "https://github.com/arn4v/brevis",
      },
    ],
    tags: ["Next.js", "Redis"],
  },
  {
    id: "784bf98a-a474-4b75-8f73-f64411265149",
    name: "Portfolio",
    description:
      "My portfolio (this website) built with Next.js, React and TailwindCSS.",
    duration: "December 2020 - Present",
    tags: ["Next.js", "React", "TailwindCSS"],
    links: [
      {
        id: "86bba27e-a2d8-4e2d-ba35-96f434da1f8b",
        title: "Live",
        url: "https://arnavgosain.com",
      },
      {
        id: "617da7e4-7605-4de6-9c63-a799bd2e2715",
        title: "GitHub",
        url: "https://github.com/arn4v/arnavgosain.com",
      },
    ],
    exclude: true,
  },
  {
    id: "e7dc0e18-dc6b-481a-a690-c470357d20bd",
    name: "Onetab2Sqlite",
    description:
      "Another weapon in my infovore arsenal, adds OneTab links to an sqlite database.",
    duration: "February 2021",
    links: [
      {
        id: "e92dd5df-ef15-4c93-9df1-1c0028421dd7",
        title: "GitHub",
        url: "https://github.com/arn4v/onetab2sqlite",
      },
    ],
    tags: ["NodeJS"],
    exclude: true,
  },
  {
    id: "13db65b8-cdf0-4a33-ad63-584f73d391f3",
    name: "Email2Roam",
    description: "NodeJS script to add notes to Roam Research via Email.",
    duration: "January 2021",
    links: [
      {
        id: "35b1b287-3114-4e91-a747-6a1b6d168841",
        title: "GitHub",
        url: "https://github.com/arn4v/email2roam",
      },
    ],
    tags: ["NodeJS"],
    exclude: true,
  },
  {
    id: "1b3083c9-569a-4c88-90cc-923548dbbb20",
    name: "Syncify",
    description:
      "Discord bot that interfaces with the Spotify API to sync the Spotify accounts of two discord users in a session.",
    duration: "August 2020 - September 2020",
    links: [
      {
        id: "091f0a96-470f-4480-b317-fb688e7e77a4",
        title: "GitHub",
        url: "https://github.com/arn4v/syncify",
      },
    ],
    tags: ["TypeScript", "NodeJS"],
    exclude: true,
  },
  {
    id: "a41efe13-5c0c-4c24-9755-ac565f0c0e3b",
    name: "Ptool",
    description: "A simple project scaffolding tool.",
    links: [
      {
        id: "e6f19a8c-fbd2-4250-a4ea-54ad228ce202",
        title: "GitHub",
        url: "https://github.com/arn4v/ptool",
      },
    ],
    duration: "August 2020",
    tags: ["Python"],
    exclude: true,
  },
  {
    id: "dd492606-e9a8-4e0d-887d-fc3506a446cd",
    name: "Auto App Builder",
    description:
      "A script to automate the building and signing of opensource Android apps I use.",
    github: "https://github.com/arn4v/auto-app-builder",
    links: [
      {
        id: "8a3e6b48-cb9a-4c19-a65d-ba540cd3202c",
        title: "GitHub",
        url: "https://github.com/arn4v/auto-app-builder",
      },
    ],
    duration: "May 2020 - August 2020",
    tags: ["Bash", "Python"],
    exclude: true,
  },
];

export default projects;
