import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { PresenceCounter } from "./PresenceCounter";
import Seo, { SeoProps } from "./Seo";

interface Props {
  children: React.ReactNode;
  breadcrumb?: Record<string, string>;
  className?: string;
  seo?: SeoProps;
}

export default function PageLayout(props: Props) {
  const { children, seo = {} } = props;
  const router = useRouter();

  return (
    <>
      <Seo {...seo} />
      <div className="w-full h-auto px-8 py-12 lg:p-12">
        <header className="w-full mx-auto md:w-2/5">
          <nav className="flex space-x-4">
            {(
              [
                ["About", "/", /\/$/],
                ["Writing", "/blog", /\/blog(.*)$/],
                ["Projects", "/projects", /\/projects$/],
                ["Library", "/library", /\/library$/],
                ["Playlists", "/playlists", /\/playlists$/],
              ] as [string, string, RegExp][]
            ).map(([title, to, isActive], idx) => (
              <Link
                key={idx}
                href={to}
                passHref
                className={clsx(
                  "font-medium text-sm md:text-base",
                  isActive.test(router.pathname)
                    ? "text-black underline"
                    : "text-zinc-600 hover:text-black hover:underline"
                )}
              >
                {title}
              </Link>
            ))}
          </nav>
        </header>
        <main className="w-full mx-auto mt-8 md:w-2/5">{children}</main>
        <footer>
          <PresenceCounter />
        </footer>
      </div>
    </>
  );
}
