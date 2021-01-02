import GalleryTile from "../GalleryTile";
import galleries from "~/data/galleries";
import { VscGithub } from "react-icons/vsc";
import React from "react";
import CustomLink from "~/components/CustomLink";

const projects = [
  {
    name: "Syncify",
    description:
      "Discord bot that interfaces with the Spotify API to sync the Spotify accounts of two discord users in a session.",
    duration: "August 2020 - September 2020",
    github: "https://github.com/arn4v/syncify",
  },
  {
    name: "Bookmarky",
    description:
      "A React/NextJS app to track and curate bookmarked content from Kindle, Instapaper, Pocket, et cetera.",
    duration: "Ongoing",
  },
];

export default function ProjectsSection() {
  return (
    <>
      <div className="flex flex-col space-y-5">
        <h1 className="text-3xl font-bold dark:text-white">Projects</h1>
        <div className="grid lg:grid-cols-2 gap-4">
          {projects.map((p) => {
            return (
              <>
                <div className="items-start justify-center w-full p-4 shadow-md dark:shadow-inner grid grid-flow-cols gap-3 rounded-md dark:bg-gray-900 dark:text-white bg-gray-50">
                  <span className="flex flex-row items-center justify-start space-x-4">
                    <p className="text-lg font-semibold">{p.name}</p>
                    {p.github && (
                      <CustomLink href={p.github}>
                        <VscGithub className="w-6 h-6" />
                      </CustomLink>
                    )}
                  </span>
                  <p className="text-base">{p.description}</p>
                  <p className="text-base">{p.duration ?? ""}</p>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
