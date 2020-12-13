import NavBar from "./NavBar";
import PropTypes from "prop-types";
import clsx from "clsx";
import commonPropTypes from "~/lib/commonPropTypes";
import { useTheme } from "~/contexts/ThemeContext";

export default function PageLayout({ children, className }) {
  const { setTheme, theme } = useTheme();
  return (
    <>
      <main
        className={clsx([
          "flex flex-col bg-white dark:bg-black overflow-x-hidden",
        ])}
      >
        <div className="w-3/6 mx-auto">
          <NavBar />
          {children}
        </div>
      </main>
    </>
  );
}
