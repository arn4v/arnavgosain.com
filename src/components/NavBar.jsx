import * as React from "react";
import ThemeButton from "./ThemeButton";
import { useRouter } from "next/router";
import Link from "next/link";

/**
 * @param {Object} props
 * @param {string} [props.className]
 * @param {React.ReactNode} [props.children]
 * @param {Object} [props.breadcrumb]
 */
export default function NavBar(props) {
  const { breadcrumb, className } = props;
  const keys = Object.keys(breadcrumb) ?? [""];

  return (
    <nav className="flex flex-row justify-between py-3 items-center box-border my-4 w-full -ml-1">
      <div className="flex flex-row items-center justify-center space-x-3">
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

function NavLink({ href, children }) {
  return (
    <Link href={href}>
      <a className="dark:text-white text-lg cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 rounded transition duration-75 ease-in px-2">
        {children}
      </a>
    </Link>
  );
}
