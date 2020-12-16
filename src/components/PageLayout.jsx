import Footer from "./Footer";
import NavBar from "./NavBar";
import clsx from "clsx";
import { useRouter } from "next/router";

export default function PageLayout({
  children,
  className,
  breadcrumb,
  noFooter = false,
}) {
  const router = useRouter();

  return (
    <>
      <main
        className={clsx([
          "flex flex-col bg-white min-h-screen dark:bg-black overflow-x-hidden space-y-6",
          !noFooter && "justify-between",
          className,
        ])}
      >
        <div className="w-full max-w-4xl mx-auto px-8 lg:px-0">
          {breadcrumb && <NavBar breadcrumb={breadcrumb} />}
          {children}
        </div>
        {!noFooter && <Footer />}
      </main>
    </>
  );
}
