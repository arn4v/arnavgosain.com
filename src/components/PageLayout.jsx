import clsx from "clsx";
import Navbar from "./Navbar";

/**
 * @param {object} props
 * @param {string} [props.className]
 * @param {React.ReactNode} [props.children]
 * @param {object} [props.breadcrumb]
 * @param {boolean} [props.noFooter = false]
 */
export default function PageLayout({ children, className = "" }) {
  return (
    <div
      className={clsx([
        "flex flex-col bg-white min-h-screen dark:bg-black overflow-x-hidden pb-8 py-8",
        className,
      ])}
    >
      <Navbar />
      <div className="w-full h-full px-6 mx-auto lg:px-0 mt-20 lg:max-w-4xl">
        {children}
      </div>
    </div>
  );
}
