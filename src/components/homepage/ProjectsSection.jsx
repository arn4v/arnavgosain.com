import Link from "next/link";
import React from "react";
import { HiArrowRight } from "react-icons/hi";
import ProjectsGrid from "../ProjectsGrid";
import projects from "./projects";

/*
 * @returns {JSX.Element}
 */
export default function ProjectsSection() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between w-full items-center">
        <h1 className="text-3xl font-bold dark:text-white">Recent Projects</h1>
      </div>
      <ProjectsGrid data={projects.filter((item) => !item.exclude)} />
      <Link href="/projects">
        <a className="bg-gray-100 hover:bg-gray-200 border border-gray-300 dark:bg-gray-900 dark:hover:bg-gray-800 flex items-center gap-2 px-2 py-2 rounded-md transition dark:border-gray-700 justify-center">
          View all {projects.length} projects <HiArrowRight />
        </a>
      </Link>
    </div>
  );
}
