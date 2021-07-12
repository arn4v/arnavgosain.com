import clsx from "clsx";
import { NextSeo, NextSeoProps } from "next-seo";
import * as React from "react";
import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
  breadcrumb?: Record<string, string>;
  className?: string;
  seo?: NextSeoProps;
}

export default function PageLayout({
  children,
  className = "",
  seo = {},
}: Props) {
  return (
    <>
      <NextSeo {...seo} />
      <div
        className={clsx([
          "flex flex-col bg-white min-h-screen dark:bg-black overflow-x-hidden",
          className,
        ])}
      >
        <Navbar />
        <div className="w-full h-full px-6 mx-auto lg:px-0 mt-20 lg:max-w-4xl py-8">
          {children}
        </div>
      </div>
    </>
  );
}
