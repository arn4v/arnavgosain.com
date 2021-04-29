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
    <nav className="flex flex-row justify-between py-3 items-center box-border my-4 w-full">
      <div className="flex flex-row items-center justify-center space-x-3">
        <Link href="/">
          <a className="dark:text-white text-lg cursor-pointer">Home</a>
        </Link>
        {keys.map((item) => {
          return (
            <React.Fragment key={item}>
              <p className="select-none text-2xl text-gray-500 dark:text-white">
                /
              </p>
              <Link href={breadcrumb[item]}>
                <a className="dark:text-white text-lg cursor-pointer">{item}</a>
              </Link>
            </React.Fragment>
          );
        })}
      </div>
      <div>
        <ThemeButton />
      </div>
    </nav>
  );
}
