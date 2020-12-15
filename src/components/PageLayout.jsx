import NavBar from "./NavBar";
import clsx from "clsx";
import { useRouter } from "next/router";

export default function PageLayout({ children, className, breadcrumb }) {
  const router = useRouter();

  return (
    <>
      <main
        className={clsx([
          "flex flex-col bg-white min-h-screen dark:bg-black overflow-x-hidden",
        ])}
      >
        <div className="w-full max-w-3xl mx-auto">
          {breadcrumb && <NavBar breadcrumb={breadcrumb} />}
          {children}
        </div>
      </main>
    </>
  );
}
