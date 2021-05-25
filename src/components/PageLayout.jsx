import Footer from "./Footer";
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
        "flex flex-col bg-white min-h-screen dark:bg-black overflow-x-hidden space-y-6",
        className,
      ])}
    >
      <div className="w-full h-full max-w-4xl px-6 mx-auto lg:px-0">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
