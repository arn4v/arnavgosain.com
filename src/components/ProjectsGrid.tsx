import clsx from "clsx";
import React from "react";
import { HiLink } from "react-icons/hi";
import CustomLink from "./CustomLink";

const tagColors = {
  "Framer Motion": "bg-gradient-to-tr from-pink-400 to-purple-600",
  TailwindCSS: "bg-gradient-to-tr from-sky-600 to-teal-400",
  "Next.js":
    "bg-gradient-to-tr from-gray-500 dark:from-gray-600 to-blueGray-900",
  NodeJS: "bg-gradient-to-tr from-green-700 to-emerald-500",
  TypeScript: "bg-gradient-to-tr from-blue-900 bg-sky-600",
  GraphQL: "bg-gradient-to-tr from-pink-900 to-pink-700",
  React: "bg-gradient-to-tr from-blue-700 to-sky-500",
  Python: "bg-gradient-to-tr from-orange-600 to-yellow-600",
  Bash: "bg-gradient-to-tr from-blue-600 to-sky-700",
  Redis: "bg-gradient-to-tr from-radix-red-red10 to-radix-red-red9",
};

interface Project {
  id: string;
  name: string;
}

const ProjectsGrid = ({ data }) => {
  return (
    <div className="grid grid-rows-1 gap-4 lg:gap-6">
      {data.map((p) => {
        return (
          <div
            key={p.id}
            className="flex flex-col items-start justify-center w-full h-full gap-3 p-4 rounded-md shadow-sm dark:shadow-inner dark:bg-gray-900 dark:hover:bg-gray-800 transition dark:text-white bg-gray-100 hover:bg-gray-200 border border-gray-300 dark:border-gray-700 hover:shadow-md"
          >
            <span className="flex flex-row items-center justify-start space-x-2">
              <p className="text-base font-semibold">{p.name}</p>
              {p.links.map(({ title, url }) => (
                <React.Fragment key={`${title}-${url}-${p.id}`}>
                  <p>•</p>
                  <CustomLink
                    href={url}
                    className="flex flex-row space-x-0.5 items-center justify-center group"
                  >
                    <div className="top-0 right-0 flex items-center justify-center w-6 h-6 rounded-full">
                      <HiLink className="w-5 h-5 text-black group-hover:text-amber-600 dark:group-hover:text-amber-500 dark:text-white transition" />
                    </div>
                    <p className="text-sm lg:text-base group-hover:text-amber-600 dark:group-hover:text-amber-500 transition">
                      {title}
                    </p>
                  </CustomLink>
                </React.Fragment>
              ))}
            </span>
            <p className="text-sm lg:text-base">{p.description}</p>
            <p className="text-sm lg:text-base">{p.duration ?? ""}</p>
            <span className="flex flex-row flex-wrap gap-2">
              {p.tags.map((t) => {
                return (
                  <div
                    key={`${p.name}-${t}`}
                    className={clsx(
                      `rounded-xl h-6 py-1 font-medium px-2 text-xs text-white`,
                      tagColors[t] ?? "bg-blue-400 border border-gray-300"
                    )}
                  >
                    {t}
                  </div>
                );
              })}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectsGrid;
