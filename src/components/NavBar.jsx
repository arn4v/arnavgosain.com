import Link from "next/link";
import ThemeButton from "./ThemeButton";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useState } from "react";

/**
 * @param {Object} props
 * @param {string} [props.className]
 * @param {React.ReactNode} [props.children]
 * @param {Object} [props.breadcrumb]
 */
export default function NavBar(props) {
  const { breadcrumb, className } = props;
  const router = useRouter();
  const keys = Object.keys(breadcrumb) ?? [""];
  return (
    <>
      <nav className="flex flex-row justify-between py-3 items-center box-border my-4 w-full">
        <div className="flex flex-row items-center justify-center space-x-3">
          <button
            onClick={() => router.push("/")}
            className="dark:text-white text-lg"
          >
            Home
          </button>
          {keys.map((b) => {
            return (
              <>
                <p className="select-none text-2xl text-gray-500 dark:text-white">
                  /
                </p>
                <button
                  onClick={() => router.push(breadcrumb[b])}
                  className="dark:text-white text-lg"
                >
                  {b}
                </button>
              </>
            );
          })}
        </div>
        {/* <div className="flex flex-row space-x-6 box-border h-full items-center justify-start">
          <h1 className="font-bold font-mono text-3xl">Arnav Gosain</h1>
          <NavBar.Item href="/">Home</NavBar.Item>
          <NavBar.Item href="/blog">Blog</NavBar.Item>
          <NavBar.Item href="/about">About</NavBar.Item>
        </div> */}
        <div className="">
          <ThemeButton className="" />
        </div>
      </nav>
    </>
  );
}

/**
 * @param {Object} props
 * @param {React.ReactNode} [props.children]
 * @param {string} [props.className]
 * @param {string} [props.href]
 */
function NavItem({ children, className, href }) {
  const router = useRouter();
  let isActive = router.pathname.includes(href) || router.pathname === href;
  if (router.pathname !== "/") isActive = router.pathname === href;

  return (
    <>
      <button
        onClick={() => router.push(href)}
        className={clsx(
          [
            "p-2 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-gray-600 rounded-md uppercase dark:text-white antialiased text-lg font-semibold hover:bg-coolGray-200 dark:hover:bg-gray-700 transition-colors duration-200 ease-in text-gray-900",
          ],
          isActive && "bg-coolGray-200 dark:bg-gray-700"
        )}
      >
        {children}
      </button>
    </>
  );
}
