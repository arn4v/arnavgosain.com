import { useTheme } from "../contexts/ThemeContext";
import { HiSun, HiMoon } from "react-icons/hi";

export default function ThemeButton() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <button
        className="flex justify-center items-center sm:p-3 lg:p-5"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? <HiMoon /> : <HiSun />}
      </button>
    </>
  );
}
