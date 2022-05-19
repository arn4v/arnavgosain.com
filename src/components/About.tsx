import React from "react";
import { HiOutlineMail } from "react-icons/hi";
import { VscTwitter } from "react-icons/vsc";
import Link from "~/components/CustomLink";
import HighlightLink from "./HighlightLink";

const About = () => {
  return (
    <>
      <section className="w-full antialiased rounded-md dark:text-white dark:border-transparent">
        <div className="flex flex-col items-start justify-center space-y-6">
          <h1 className="w-2/3 font-mono text-lg font-bold lg:text-2xl whitespace-nowrap lg:w-full">
            Hey, I'm Arnav Gosain 👋🏼
          </h1>
          <p className="text-xl font-medium leading-relaxed text-gray-800 dark:text-white">
            I'm a software engineer & product manager based in Delhi, India. I
            work at{" "}
            <HighlightLink href="https://remnote.com">RemNote</HighlightLink>{" "}
            where build delightful interfaces with React & TailwindCSS. During
            the night, I put my builder hat on and create{" "}
            <HighlightLink href="/projects">side projects</HighlightLink> that
            solve my own problems.
          </p>
          <div className="flex flex-row items-center justify-start w-full space-x-6">
            <p className="text-xl font-semibold text-gray-800 whitespace-nowrap lg:text-xl dark:text-white dark:bg-slate-600 bg-cyan-200">
              Get in touch:
            </p>
            <div className="relative flex flex-row items-center justify-center space-x-3">
              <Link
                href="mailto:arnav@arnavgosain.com"
                title="Link to my email address"
                className="z-0 hover:text-amber-400"
              >
                <HiOutlineMail className="w-8 h-8" />
              </Link>
              <Link
                href="https://twitter.com/arn4v"
                title="Link to my Twitter"
                className="hover:text-blue-400"
              >
                <VscTwitter className="z-0 w-8 h-8" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
