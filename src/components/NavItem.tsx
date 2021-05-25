import clsx from "clsx";
import Link from "next/link";

interface Props {
  href: string;
  className?: string;
  children: React.ReactNode;
  active: boolean;
}

export default function NavItem({
  href,
  children,
  className,
  active = false,
}: Props) {
  return (
    <Link href={href}>
      <a
        className={clsx([
          className,
          "px-2 border-l-2 border-cyan-200 dark:border-cyan-200 dark:text-white border-b-2 hover:bg-cyan-200 font-bold text-black h-9 flex items-center justify-center dark:hover:text-black",
          active && "bg-cyan-200 dark:text-black",
        ])}
      >
        {children}
      </a>
    </Link>
  );
}
