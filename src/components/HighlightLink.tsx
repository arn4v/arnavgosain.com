import React from "react";
import CustomLink from "./CustomLink";

interface Props {
  children?: React.ReactNode;
  href: string;
  title?: string;
  tabindex?: number;
  description?: string;
}

const HighlightLink = (props: Props) => {
  const { children, href, title } = props;

  return (
    <CustomLink
      href={href}
      className="underline transition-colors ease-in cursor-pointer dark:bg-blueGray-600 dark:text-gray-200 dark:hover:bg-blueGray-500 duration-50 text-black bg-cyan-200 hover:bg-cyan-300"
      title={title}
    >
      {children}
    </CustomLink>
  );
};

export default HighlightLink;