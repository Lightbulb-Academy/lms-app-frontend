import React, { createContext, useState } from "react";

// contextAPI - for global data management
// ThemeContext - for implementing dark/light theme across the app
// Context Provider - stores and manipulates context data
// Context Consumer - useContext() hook to use the context value

interface ThemeContextValues {
  theme: string;
}

const ThemeContext = createContext<ThemeContextValues>({
  theme: "light",
});

const ThemeProvider = ({ children }: { children: React.ReactElement }) => {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
