import { VscGithub } from "react-icons/vsc";
import React from "react";
import CustomLink from "~/components/CustomLink";
import { HiLink } from "react-icons/hi";

/*
 * @typedef {Object} Project
 * @property {string} name
 * @property {string} description
 * @property {string} duration
 * @property {Array.<string>} tags
 */

/*
 * @type {Array.<Project>}
 */
const projects = [
  {
    name: "Portfolio",
    description:
      "My portfolio (this website) built with NextJS, React and TailwindCSS.",
    duration: "December 2020 - Present",
    github: "https://github.com/arn4v/arnavgosain.com",
    tags: ["NextJS", "React", "TailwindCSS"],
  },
  {
    name: "Bookmarky",
    description: (
      <>
        <CustomLink
          className="transition duration-100 ease-in-out hover:text-blue-600"
          href="https://pinboard.in"
        >
          Pinboard.in
        </CustomLink>
        {" alternative built in NextJS, Tailwind & Framer Motion."}
      </>
    ),
    duration: "February 2021 - Present",
    github: "https://github.com/arn4v/bookmarky",
    tags: ["TailwindCSS", "Framer Motion", "NextJS", "React"],
  },
  {
    name: "Syncify",
    description:
      "Discord bot that interfaces with the Spotify API to sync the Spotify accounts of two discord users in a session.",
    duration: "August 2020 - September 2020",
    github: "https://github.com/arn4v/syncify",
    tags: ["TypeScript", "NodeJS"],
  },
  {
    name: "Email2Roam",
    description: "NodeJS script to add notes to Roam Research via Email.",
    duration: "January 2021",
    github: "https://github.com/arn4v/email2roam",
    tags: ["NodeJS"],
    exclude: true,
  },
  {
    name: "Onetab2Sqlite",
    description:
      "Another weapon in my infovore arsenal, adds OneTab links to an sqlite database.",
    duration: "February 2021",
    github: "https://github.com/arn4v/onetab2sqlite",
    tags: ["NodeJS"],
    exclude: true,
  },
  {
    name: "Ptool",
    description: "A simple project scaffolding tool.",
    github: "https://github.com/arn4v/ptool",
    duration: "August 2020",
    tags: ["Python"],
    exclude: true,
  },
  {
    name: "Auto App Builder",
    description:
      "A script to automate the building and signing of opensource Android apps I use.",
    github: "https://github.com/arn4v/auto-app-builder",
    duration: "May 2020 - August 2020",
    tags: ["Bash", "Python"],
    exclude: true,
  },
].filter((i) => !i.exclude);

const tagColors = {
  "Framer Motion": "bg-gradient-to-tr from-pink-400 to-purple-600",
  TailwindCSS: "bg-gradient-to-tr from-lightBlue-600 to-teal-400",
  NextJS: "bg-gradient-to-tr from-gray-500 dark:from-gray-600 to-blueGray-900",
  NodeJS: "bg-gradient-to-tr from-green-700 to-emerald-500",
  TypeScript: "bg-gradient-to-tr from-blue-900 bg-lightBlue-600",
  React: "bg-gradient-to-tr from-blue-700 to-lightBlue-500",
  Python: "bg-gradient-to-tr from-orange-600 to-yellow-600",
  Bash: "bg-gradient-to-tr from-blue-600 to-lightBlue-700",
};

/*
 * @returns {JSX.Element}
 */
export default function ProjectsSection() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-bold dark:text-white">Projects</h1>
      <div className="grid grid-flow-row gap-4 lg:grid-rows-2 lg:grid-cols-2 lg:gap-6">
        {projects.map((p) => {
          return (
            <>
              <div
                key={p.name}
                className="flex flex-col items-start justify-center w-full h-full gap-3 p-4 transition-all ease-in-out rounded-md shadow-sm dark:shadow-inner dark:bg-gray-900 dark:text-white bg-coolGray-100 hover:shadow-md duration-250"
              >
                <span className="flex flex-row items-center justify-start space-x-2">
                  <p className="text-base font-semibold lg:text-lg">{p.name}</p>
                  {p.github && (
                    <>
                      <p>•</p>
                      <CustomLink
                        href={p.github}
                        className="flex flex-row space-x-0.5 items-center justify-center group"
                      >
                        <div className="top-0 right-0 flex items-center justify-center w-6 h-6 rounded-full">
                          <HiLink className="w-5 h-5 text-black transition-colors ease-in-out group-hover:text-orange-400 duration-250 dark:text-white" />
                        </div>
                        <p className="text-sm transition-colors ease-in-out lg:text-base group-hover:text-orange-400 duration-250">
                          GitHub
                        </p>
                      </CustomLink>
                    </>
                  )}
                </span>
                <p className="text-sm lg:text-base">{p.description}</p>
                <p className="text-sm lg:text-base">{p.duration ?? ""}</p>
                <span className="flex flex-row flex-wrap gap-2">
                  {p.tags.sort().map((t) => {
                    return (
                      <div
                        key={`${p.name}-${t}`}
                        className={`rounded-xl h-6 py-1 font-medium text-white px-2 text-xs ${tagColors[t]}`}
                      >
                        {t}
                      </div>
                    );
                  })}
                </span>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
