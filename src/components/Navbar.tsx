import clsx from "clsx";
import { useRouter } from "next/router";
import * as React from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import useDisclosure from "~/hooks/use-disclosure";
import NavItem from "./NavItem";
import ThemeButton from "./ThemeButton";

interface Props {
  className?: string;
}

const links = [
  { title: "Home", href: "/" },
  { title: "Projects", href: ["/projects"] },
  { title: "Snippets", href: ["/snippets", "/snippets/[slug]"] },
  { title: "Library", href: ["/library"] },
  { title: "Playlists", href: ["/playlists"] },
];

export default function Navbar({ className = "" }: Props) {
  const router = useRouter();
  const { isOpen, onToggle } = useDisclosure();

  return (
    <nav
      className={clsx([
        className,
        "h-20 w-full dark:bg-black bg-white border-b border-gray-200 dark:border-gray-700 fixed top-0 z-50",
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
          <span className="dark:text-white text-lg font-medium font-mono lg:hidden">
            {
              links.find((el) => {
                if (router.pathname === "/") {
                  return router.pathname === el.href[0];
                }

                return (
                  router.pathname !== "/" && el.href.includes(router.pathname)
                );
              }).title
            }
          </span>
          <ul className="gap-4 lg:flex items-center hidden">
            {links.map((item) => {
              return (
                <NavItem
                  key={item.title}
                  href={item.href[0]}
                  active={item.href.includes(router.pathname)}
                >
                  {item.title}
                </NavItem>
              );
            })}
          </ul>
        </div>
        <ThemeButton />
      </div>
      {isOpen && (
        <ul className="w-full flex flex-col gap-2 lg:hidden dark:bg-black bg-white border-b border-gray-200 dark:border-gray-700">
          {links.map((item) => (
            <NavItem
              key={item.title}
              href={item.href}
              active={router.pathname === item.href}
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
