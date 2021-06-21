import clsx from "clsx";
import { useRouter } from "next/router";
import NavItem from "./NavItem";
import ThemeButton from "./ThemeButton";

interface Props {
  className?: string;
}

const links = [
  { title: "Home", href: "/" },
  { title: "Bookshelf", href: "/bookshelf" },
  { title: "Playlists", href: "/playlists" },
];

export default function Navbar({ className = "" }: Props) {
  const router = useRouter();

  return (
    <nav
      className={clsx([
        className,
        "flex w-full items-center justify-between py-4",
      ])}
    >
      <div className="flex items-center justify-center gap-4">
        {links.map((item) => (
          <NavItem
            key={item.title}
            href={item.href}
            active={router.pathname === item.href}
          >
            {item.title}
          </NavItem>
        ))}
      </div>
      <ThemeButton />
    </nav>
  );
}
