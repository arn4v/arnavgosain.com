import { createContext, useContext, useEffect, useState } from "react";
import cookie from "js-cookie";

const themeContext = createContext({ theme: "light", setTheme: null });

export default function ThemeProvider() {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && typeof savedTheme === "string") {
      setTheme(savedTheme);
    } else {
      localStorage.setItem("theme", "light");
    }
  }, []);

  return (
    <>
      <themeContext.Provider
        value={{ theme, setTheme }}
      ></themeContext.Provider>
    </>
  );
}

export function useTheme() {
  const context = useContext(themeContext);
  if (context) {
    return context;
  } else {
    throw new Error("Hook used outside the context of ThemeProvider.");
  }
}
