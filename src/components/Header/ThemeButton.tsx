import { useTheme } from "../../context/ThemeContext";
const ThemeButton = () => {
  const { theme, setTheme, themeColors } = useTheme();
  return (
    <button
      onClick={() => setTheme(theme === "Dark" ? "Light" : "Dark")}
      className={`px-4 py-2  ${themeColors.bgHover} rounded-lg backdrop-blur-md transition ${themeColors.text}`}
      data-testid="theme-toggle"
    >
      {theme === "Dark" ? "Light Mode ☀️" : "Dark Mode 🌙"}
    </button>
  );
};

export default ThemeButton;
