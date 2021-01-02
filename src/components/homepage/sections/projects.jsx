import { VscGithub } from "react-icons/vsc";
import React from "react";
import CustomLink from "~/components/CustomLink";

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
    name: "Syncify",
    description:
      "Discord bot that interfaces with the Spotify API to sync the Spotify accounts of two discord users in a session.",
    duration: "August 2020 - September 2020",
    github: "https://github.com/arn4v/syncify",
    tags: ["TypeScript", "NodeJS"],
  },
  {
    name: "Bookmarky",
    description:
      "A React/NextJS app to track and curate bookmarked content from Kindle, Instapaper, Pocket, et cetera.",
    duration: "Ongoing",
    tags: ["React", "NextJS", "NodeJS", "TypeScript"],
  },
  {
    name: "Ptool",
    description: "A simple project scaffolding tool.",
    github: "https://github.com/arn4v/ptool",
    duration: "August 2020",
    tags: ["Python"],
  },
  {
    name: "Auto App Builder",
    description:
      "A script to automate the building and signing of opensource Android apps I use.",
    github: "https://github.com/arn4v/auto-app-builder",
    duration: "May 2020 - August 2020",
    tags: ["Bash", "Python"],
  },
];

const tagColors = {
  NextJS: "bg-gray-600",
  NodeJS: "bg-emerald-700",
  TypeScript: "bg-blue-900",
  React: "bg-lightBlue-600",
  Python: "bg-yellow-700",
  Bash: "bg-purple-900",
};

/*
 * @returns {JSX.Element}
 */
export default function ProjectsSection() {
  return (
    <>
      <div className="flex flex-col space-y-5">
        <h1 className="text-3xl font-bold dark:text-white">Projects</h1>
        <div className="grid grid-rows-4 lg:grid-rows-2 lg:grid-cols-2 gap-8">
          {projects.map((p) => {
            return (
              <>
                <div className="relative">
                  <div
                    key={p.name}
                    className="w-full shadow-sm dark:shadow-inner h-full gap-3 rounded-md dark:bg-gray-900 dark:text-white bg-coolGray-100 hover:shadow-md transition-shadow duration-200 ease-in-out p-4 flex flex-col items-start justify-center"
                  >
                    <span className="flex flex-row items-center justify-start space-x-4">
                      <p className="text-base lg:text-lg font-semibold">
                        {p.name}
                      </p>
                    </span>
                    <p className="text-sm lg:text-base">{p.description}</p>
                    <p className="text-sm lg:text-base">{p.duration ?? ""}</p>
                    <span className="flex flex-row gap-2 flex-wrap">
                      {p.tags.sort().map((t) => {
                        return (
                          <>
                            <div
                              key={`${p.name}-${t}`}
                              className={`rounded-xl py-1 font-semibold text-white px-2 text-xs ${tagColors[t]}`}
                            >
                              {t}
                            </div>
                          </>
                        );
                      })}
                    </span>
                  </div>
                  {p.github && (
                    <>
                      <style jsx>{`
                        .github-icon {
                          transform: translate(
                            calc(0.5 * 3rem),
                            calc(-0.5 * 3rem)
                          );
                        }
                      `}</style>
                      <div className="z-10 github-icon bg-white h-12 w-12 top-0 right-0 rounded-full flex items-center justify-center absolute">
                        <CustomLink href={p.github}>
                          <VscGithub className="w-8 h-8 lg:w-10 lg:h-10 text-black" />
                        </CustomLink>
                      </div>
                    </>
                  )}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
