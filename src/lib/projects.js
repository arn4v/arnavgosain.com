import DescLink from "~/components/DescLink";
import Link from "../components/CustomLink";

/**
 * @typedef {object} Link
 * @property {string} title
 * @property {string} url
 */

/**
 * @type {Array.<import("~/types").Project>}
 */
const projects = [
  {
    name: "Hookswitch",
    duration: "December 2021 - Present",
    description:
      "HTTP Request Interceptor & Forwarding Tool. Made for local development involving webhooks.",
    links: [
      {
        title: "Live",
        url: "https://hookswitch.xyz",
      },
    ],
    tags: ["React", "TypeScript", "Next.js"],
  },
  {
    name: "tsrq",
    duration: "September 2021 - Present",
    description: <>Easily Create Type-Safe React Query Hooks</>,
    links: [
      {
        title: "Npm",
        url: "https://npmjs.org/package/tsrq",
      },
      {
        title: "GitHub",
        url: "https://github.com/arn4v/tsrq",
      },
    ],
    tags: ["React", "TypeScript"],
  },
  {
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
        title: "GitHub",
        url: "https://github.com/arn4v/relink",
      },
    ],
    tags: ["Go", "Svelte"],
  },
  {
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
    name: "Markbox (FKA Bookmarky)",
    description:
      "API-First, Tag Based Bookmarking Tool Inspired by Pinboard.in",
    duration: "February 2021 - Present",
    links: [
      {
        title: "Live",
        url: "https://markbox.in",
      },
      {
        title: "GitHub",
        url: "https://github.com/arn4v/markbox",
      },
    ],
    tags: ["TailwindCSS", "Framer Motion", "Next.js", "React", "GraphQL"],
  },
  {
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
        title: "Live",
        url: "https://brevis.link",
      },
      {
        title: "GitHub",
        url: "https://github.com/arn4v/brevis",
      },
    ],
    tags: ["Next.js", "Redis"],
  },
  {
    name: "Portfolio",
    description:
      "My portfolio (this website) built with Next.js, React and TailwindCSS.",
    duration: "December 2020 - Present",
    tags: ["Next.js", "React", "TailwindCSS"],
    links: [
      {
        title: "Live",
        url: "https://arnavgosain.com",
      },
      {
        title: "GitHub",
        url: "https://github.com/arn4v/arnavgosain.com",
      },
    ],
    exclude: true,
  },
  {
    name: "Onetab2Sqlite",
    description:
      "Another weapon in my infovore arsenal, adds OneTab links to an sqlite database.",
    duration: "February 2021",
    links: [
      {
        title: "GitHub",
        url: "https://github.com/arn4v/onetab2sqlite",
      },
    ],
    tags: ["NodeJS"],
    exclude: true,
  },
  {
    name: "Email2Roam",
    description: "NodeJS script to add notes to Roam Research via Email.",
    duration: "January 2021",
    links: [
      {
        title: "GitHub",
        url: "https://github.com/arn4v/email2roam",
      },
    ],
    tags: ["NodeJS"],
    exclude: true,
  },
  {
    name: "Syncify",
    description:
      "Discord bot that interfaces with the Spotify API to sync the Spotify accounts of two discord users in a session.",
    duration: "August 2020 - September 2020",
    links: [
      {
        title: "GitHub",
        url: "https://github.com/arn4v/syncify",
      },
    ],
    tags: ["TypeScript", "NodeJS"],
    exclude: true,
  },
  {
    name: "Ptool",
    description: "A simple project scaffolding tool.",
    links: [
      {
        title: "GitHub",
        url: "https://github.com/arn4v/ptool",
      },
    ],
    duration: "August 2020",
    tags: ["Python"],
    exclude: true,
  },
  {
    name: "Auto App Builder",
    description:
      "A script to automate the building and signing of opensource Android apps I use.",
    github: "https://github.com/arn4v/auto-app-builder",
    links: [
      {
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
