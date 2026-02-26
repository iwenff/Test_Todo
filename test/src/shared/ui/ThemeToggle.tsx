import React from "react";
import { useTheme } from "../../app/providers/ThemeProvider/index";

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="icon-button"
      onClick={toggleTheme}
      aria-label="Переключить тему"
      aria-pressed={theme === "dark"}
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
};
