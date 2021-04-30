import Footer from "./Footer";
import NavBar from "./NavBar";
import clsx from "clsx";
import { useRouter } from "next/router";

/**
 * @param {object} props
 * @param {string} [props.className]
 * @param {React.ReactNode} [props.children]
 * @param {object} [props.breadcrumb]
 * @param {boolean} [props.noFooter = false]
 */
export default function PageLayout({
  children,
  className = "",
  breadcrumb,
  noFooter = false,
}) {
  return (
    <div
      className={clsx([
        "flex flex-col bg-white min-h-screen dark:bg-black overflow-x-hidden space-y-6",
        !noFooter ? "justify-between" : "justify-start",
        className,
      ])}
    >
      <div className="w-full h-full max-w-4xl px-6 mx-auto lg:px-0">
        {breadcrumb && <NavBar breadcrumb={breadcrumb} />}
        {!breadcrumb && <NavBar />}
        {children}
      </div>
      {!noFooter && <Footer />}
    </div>
  );
}
