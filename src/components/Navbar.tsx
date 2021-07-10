import clsx from "clsx";
import { useRouter } from "next/router";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import useDisclosure from "~/hooks/use-disclosure";
import NavItem from "./NavItem";
import ThemeButton from "./ThemeButton";

interface Props {
  className?: string;
}

const links = [
  { title: "Home", href: "/" },
  { title: "Projects", href: "/projects" },
  { title: "Snippets", href: "/snippets" },
  { title: "Library", href: "/library" },
  { title: "Playlists", href: "/playlists" },
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
      <div className="flex w-full items-center justify-between h-full">
        <div className="flex gap-4 ml-6">
          <button
            onClick={onToggle}
            className="focus:outline-none dark:text-white"
          >
            {isOpen ? (
              <HiOutlineX className="h-6 w-6" />
            ) : (
              <HiOutlineMenu className="h-6 w-6" />
            )}
          </button>
          <span className="dark:text-white text-lg font-medium font-mono">
            {
              links.find((el) => {
                if (router.pathname === "/") {
                  return router.pathname === el.href;
                }

                return el.href !== "/" && router.pathname.includes(el.href);
              }).title
            }
          </span>
        </div>
        <ul className="items-center justify-center gap-4 w-full hidden lg:flex">
          {links.map((item) => (
            <NavItem
              key={item.title}
              href={item.href}
              active={router.pathname === item.href}
            >
              {item.title}
            </NavItem>
          ))}
        </ul>
        <ThemeButton className="mr-6" />
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
