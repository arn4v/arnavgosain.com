import * as React from "react";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { HiMoon, HiSun } from "react-icons/hi";

/**
 * @param {Object} props
 * @param {string} [props.className]
 * @param {boolean} [props.noDarkMode = false]
 * @param {React.CSSProperties} [props.style]
 */
export default function ThemeButton(props) {
  const { className, noDarkMode = false, style = {} } = props;
  const { theme, setTheme } = useTheme();

  return (
    <button
      style={style}
      aria-label="Toggle Dark Mode"
      className={clsx([
        "dark:bg-gray-800 dark:hover:bg-gray-700 bg-gray-100 border border-gray-300 hover:bg-gray-200 dark:border-gray-800 flex items-center justify-center space-x-2 focus:outline-none rounded-md h-10 w-10",
        className,
      ])}
      onClick={() =>
        setTheme(
          theme === "light" || theme?.toString() === "null" ? "dark" : "light"
        )
      }
    >
      {(theme?.toString() === "null" || theme === "light") && (
        <HiMoon
          className={clsx(["h-5 w-5", !noDarkMode && "dark:text-white"])}
        />
      )}
      {theme === "dark" && (
        <HiSun
          className={clsx(["h-5 w-5", !noDarkMode && "dark:text-white"])}
        />
      )}
    </button>
  );
}
