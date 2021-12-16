import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { isProd } from "~/constants";
import useDisclosure from "~/hooks/use-disclosure";
import NavItem from "./NavItem";
import ThemeButton from "./ThemeButton";
import { useIsAtTop } from "react-sensible";

interface Props {
  className?: string;
}

const links = [
  { title: "Home", href: "/", active: /\/$/ },
  {
    title: "Blog",
    href: "/blog",
    active: /\/blog(.*)$/,
  },
  { title: "Projects", href: "/projects", active: /\/projects$/ },
  { title: "Bookmarks", href: "/bookmarks", active: /\/bookmarks\/?(.*)$/ },
  { title: "Library", href: "/library", active: /\/library$/ },
  { title: "Playlists", href: "/playlists", active: /\/playlists$/ },
];

export default function Navbar({ className = "" }: Props) {
  const isAtTop = useIsAtTop();
  const router = useRouter();
  const active = React.useMemo(() => {
    return links.find((el) => {
      return el.active.test(router.pathname);
    });
  }, [router.pathname]);
  const { isOpen, onToggle } = useDisclosure();

  return (
    <nav
      className={clsx([
        className,
        "h-20 w-full dark:bg-black bg-white border-b border-gray-200 dark:border-blueGray-600 fixed top-0 z-50 transition-shadow duration-100 ease-in-out",
        isAtTop ? null : "shadow-lg",
      ])}
    >
      <div className="flex w-full items-center justify-between h-full lg:max-w-4xl px-6 lg:px-0 mx-auto">
        <div className="items-center justify-start gap-4 flex">
          <button
            onClick={onToggle}
            className="focus:outline-none dark:text-white lg:hidden"
          >
            {isOpen ? (
              <HiOutlineX className="h-6 w-6" />
            ) : (
              <HiOutlineMenu className="h-6 w-6" />
            )}
          </button>
          {active && (
            <span className="dark:text-white text-lg font-medium font-secondary lg:hidden">
              <Link href={active.href}>
                <a>{active.title}</a>
              </Link>
            </span>
          )}
          <ul className="gap-4 lg:flex items-center hidden">
            {links.map((item) => {
              return (
                <NavItem
                  key={item.title}
                  href={item.href}
                  active={typeof active !== "undefined" && item.title === active.title}
                >
                  {item.title}
                </NavItem>
              );
            })}
          </ul>
        </div>
      </div>
      {isOpen && (
        <ul className="w-full flex flex-col gap-2 lg:hidden dark:bg-black bg-white border-b border-gray-200 dark:border-gray-700">
          {links.map((item) => (
            <NavItem
              key={item.title}
              href={item.href}
              active={item.active.test(router.pathname)}
              className="border-none px-6"
            >
              {item.title}
            </NavItem>
          ))}
        </ul>
      )}
    </nav>
  );
}
