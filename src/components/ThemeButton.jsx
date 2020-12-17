import { HiMoon, HiSun } from "react-icons/hi";

import clsx from "clsx";
import { useTheme } from "../contexts/ThemeContext";

/**
 * @param {Object} props
 * @param {string} [props.className]
 * @param {boolean} [props.noDarkMode = false]
 * @param {React.CSSProperties} [props.style]
 */
export default function ThemeButton({
  className,
  noDarkMode = false,
  style = {},
}) {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <button
        style={style}
        aria-label="Toggle Dark Mode"
        className={clsx(
          [
            "flex justify-center items-center h-10 w-10 p-2.5 focus:outline-none focus:ring-2 focus:ring-black rounded-md bg-coolGray-200",
            className,
          ],
          !noDarkMode && "dark:focus:ring-coolGray-400 dark:bg-gray-600"
        )}
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? (
          <HiMoon
            className={clsx([
              "h-full w-full",
              !noDarkMode && "dark:text-white",
            ])}
          />
        ) : (
          <HiSun
            className={clsx([
              "h-full w-full",
              !noDarkMode && "dark:text-white",
            ])}
          />
        )}
      </button>
    </>
  );
}
