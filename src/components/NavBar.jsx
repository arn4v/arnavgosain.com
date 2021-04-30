import * as React from "react";
import ThemeButton from "./ThemeButton";
import Link from "next/link";
import clsx from "clsx";

/**
 * @param {Object} props
 * @param {string} [props.className]
 * @param {React.ReactNode} [props.children]
 * @param {Object} [props.breadcrumb]
 */
export default function NavBar(props) {
  const { breadcrumb, className } = props;
  const keys = Object.keys(breadcrumb ?? {});

  return (
<<<<<<< HEAD
    <nav className="flex flex-row justify-between py-3 items-center box-border my-4 w-full">
      <div className="flex flex-row items-center justify-center space-x-3 -ml-2">
=======
    <nav className="flex flex-row justify-between py-3 items-center box-border my-4 w-full -ml-2">
      <div className="flex flex-row items-center justify-center space-x-3">
>>>>>>> origin/main
        <NavLink href="/">arnavgosain.com</NavLink>
        {keys.map((item) => {
          return (
            <React.Fragment key={item}>
              <p className="select-none text-2xl text-gray-500 dark:text-white">
                /
              </p>
              <NavLink href={breadcrumb[item]}>{item}</NavLink>
            </React.Fragment>
          );
        })}
      </div>
      <div className="pl-1">
        <ThemeButton />
      </div>
    </nav>
  );
}

function NavLink({ href, children, className = "" }) {
  return (
    <Link href={href}>
      <a
        className={clsx([
          "dark:text-white text-lg cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 rounded transition duration-75 ease-in px-2",
          className,
        ])}
      >
        {children}
      </a>
    </Link>
  );
}
