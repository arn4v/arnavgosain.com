import Link from "next/link";
import React from "react";
import { HiArrowRight } from "react-icons/hi";
import projects from "../lib/projects";
import ProjectsGrid from "./ProjectsGrid";

const ProjectsList = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between w-full items-center">
        <h1 className="text-2xl font-mono font-bold dark:text-white">
          Recent projects
        </h1>
      </div>
      <ProjectsGrid data={projects.filter((item) => !item.exclude)} />
      <Link href="/projects">
        <a className="bg-gray-100 hover:bg-gray-200 border border-gray-300 dark:bg-gray-900 dark:hover:bg-gray-800 flex items-center gap-2 px-2 py-2 rounded-md transition dark:border-gray-700 justify-center dark:text-white">
          View all {projects.length} projects <HiArrowRight />
        </a>
      </Link>
    </div>
  );
};

export default ProjectsList;
