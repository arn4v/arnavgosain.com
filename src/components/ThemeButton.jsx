import { HiMoon, HiSun } from "react-icons/hi";

import clsx from "clsx";
import { useTheme } from "../contexts/ThemeContext";

export default function ThemeButton() {
  const { theme, setTheme } = useTheme();
  const isDarkTheme = theme === "dark";

  return (
    <>
      <button
        className={clsx([
          "flex justify-center items-center px-3 h-12 focus:outline-none focus:ring focus:ring-black rounded-md",
        ])}
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? (
          <HiMoon className="h-6 w-6" />
        ) : (
          <HiSun className="h-6 w-6" />
        )}
      </button>
    </>
  );
}
