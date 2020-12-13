import clsx from "clsx";
import PropTypes from "prop-types";
import { useTheme } from "~/contexts/ThemeContext";
import commonPropTypes from "~/lib/commonPropTypes";
import NavBar from "./NavBar";

export default function PageLayout({ children, className }) {
  const { setTheme, theme } = useTheme();
  return (
    <>
      <div
        className={clsx(
          ["h-screen w-screen overflow-hidden flex flex-col"],
          theme === "dark" && "dark"
        )}
      >
        <div className="mt-3">
          <NavBar />
        </div>
        {children}
      </div>
    </>
  );
}

PageLayout.propTypes = {
  ...commonPropTypes,
};
