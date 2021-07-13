import CustomLink from "../components/CustomLink";

const projects = [
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
    tags: ["TailwindCSS", "Framer Motion", "NextJS", "React", "GraphQL"],
  },
  {
    id: "f5202a90-218f-42c7-be9d-21193040624a",
    name: "Brevis.link",
    description: (
      <>
        Simple URL shortener built to test{" "}
        <CustomLink href="https://upstash.com">Upstash.com's</CustomLink>{" "}
        Serverless Redis offering.
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
    tags: ["NextJS", "Redis"],
  },
  {
    id: "784bf98a-a474-4b75-8f73-f64411265149",
    name: "Portfolio",
    description:
      "My portfolio (this website) built with NextJS, React and TailwindCSS.",
    duration: "December 2020 - Present",
    tags: ["NextJS", "React", "TailwindCSS"],
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
