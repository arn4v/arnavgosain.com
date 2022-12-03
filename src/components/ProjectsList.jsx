import Link from "next/link";
import React from "react";
import { HiArrowRight } from "react-icons/hi";
import projects from "../lib/projects";
import ProjectsGrid from "./ProjectsGrid";

const tagColors = {
  "Framer Motion": "bg-gradient-to-tr from-pink-400 to-purple-600",
  TailwindCSS: "bg-gradient-to-tr from-sky-600 to-teal-400",
  "Next.js": "bg-gradient-to-tr from-gray-500 dark:from-gray-600 to-slate-900",
  NodeJS: "bg-gradient-to-tr from-green-700 to-emerald-500",
  TypeScript: "bg-gradient-to-tr from-blue-900 bg-sky-600",
  GraphQL: "bg-gradient-to-tr from-pink-900 to-pink-700",
  React: "bg-gradient-to-tr from-blue-700 to-sky-500",
  Python: "bg-gradient-to-tr from-orange-600 to-yellow-600",
  Bash: "bg-gradient-to-tr from-blue-600 to-sky-700",
  Redis: "bg-gradient-to-tr from-radix-red-red10 to-radix-red-red9",
};

const ProjectsList = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between w-full items-center">
        <h1 className="text-2xl font-mono font-bold dark:text-white">
          Recent projects
        </h1>
      </div>
      <ProjectsGrid data={projects.filter((item) => !item.exclude)} />
      <Link
        href="/projects"
        className="bg-gray-100 hover:bg-gray-200 border border-gray-300 dark:bg-gray-900 dark:hover:bg-gray-800 flex items-center space-x-4 px-6 py-2 rounded-md transition dark:border-gray-700 justify-center dark:text-white ml-auto"
      >
        <span>View all {projects.length} projects</span>
        <HiArrowRight />
      </Link>
    </div>
  );
};

export default ProjectsList;
