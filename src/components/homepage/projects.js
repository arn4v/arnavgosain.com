import CustomLink from "../CustomLink";

const projects = [
  {
    name: "Bookmarky",
    description:
      "API-First bookmarking tool for developers built with React, Next.js, GraphQL and TailwindCSS",
    duration: "February 2021 - Present",
    links: [
      { title: "Live", url: "https://bookmarky.io" },
      { title: "GitHub", url: "https://github.com/arn4v/bookmarky" },
    ],
    tags: ["TailwindCSS", "Framer Motion", "NextJS", "React", "GraphQL"],
  },
  {
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
      { title: "Live", url: "https://brevis.link" },
      { title: "GitHub", url: "https://github.com/arn4v/brevis.link" },
    ],
    tags: ["NextJS", "Redis"],
  },
  {
    name: "Portfolio",
    description:
      "My portfolio (this website) built with NextJS, React and TailwindCSS.",
    duration: "December 2020 - Present",
    tags: ["NextJS", "React", "TailwindCSS"],
    links: [
      { title: "Live", url: "https://arnavgosain.com" },
      { title: "GitHub", url: "https://github.com/arn4v/arnavgosain.com" },
    ],
    exclude: true,
  },
  {
    name: "Onetab2Sqlite",
    description:
      "Another weapon in my infovore arsenal, adds OneTab links to an sqlite database.",
    duration: "February 2021",
    links: [{ title: "GitHub", url: "https://github.com/arn4v/onetab2sqlite" }],
    tags: ["NodeJS"],
    exclude: true,
  },
  {
    name: "Email2Roam",
    description: "NodeJS script to add notes to Roam Research via Email.",
    duration: "January 2021",
    links: [{ title: "GitHub", url: "https://github.com/arn4v/email2roam" }],
    tags: ["NodeJS"],
    exclude: true,
  },
  {
    name: "Syncify",
    description:
      "Discord bot that interfaces with the Spotify API to sync the Spotify accounts of two discord users in a session.",
    duration: "August 2020 - September 2020",
    links: [{ title: "GitHub", url: "https://github.com/arn4v/syncify" }],
    tags: ["TypeScript", "NodeJS"],
    exclude: true,
  },

  {
    name: "Ptool",
    description: "A simple project scaffolding tool.",
    links: [{ title: "GitHub", url: "https://github.com/arn4v/ptool" }],
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
      { title: "GitHub", url: "https://github.com/arn4v/auto-app-builder" },
    ],
    duration: "May 2020 - August 2020",
    tags: ["Bash", "Python"],
    exclude: true,
  },
];

export default projects;
