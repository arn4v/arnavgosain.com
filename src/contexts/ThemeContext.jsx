import { createContext, useContext, useEffect, useState } from "react";

const themeContext = createContext({ theme: "light", setTheme: null });

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && typeof savedTheme === "string") {
      setTheme(savedTheme);
    } else {
      localStorage.setItem("theme", "light");
    }
    document.querySelector("html").classList.add(theme);
  }, []);

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    document.querySelector("html").classList.remove(currentTheme);
    localStorage.setItem("theme", theme);
    document.querySelector("html").classList.add(theme);
  }, [theme]);

  return (
    <>
      <themeContext.Provider value={{ theme, setTheme }}>
        {children}
      </themeContext.Provider>
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
