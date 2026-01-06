import { useState, createContext, useContext, useEffect } from "react";
import type { ReactNode } from "react";

type Theme = "Light" | "Dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themeColors: {
    bg: string
    bgWidget:string
    surface:string
    elevated: string
    border: string
    text:string
    textMuted:string
    accent: string
    bgHover:string 
  };
}

// const themeColor: Record<Theme, { bg: string; bgHover: string; text: string }> =
//   {
//     Dark: {
//       bg: "bg-black/80",
//       bgHover: "hover:bg-black/40",
//       text: "text-white",
//     },
//     Light: {
//       bg: "bg-white/20",
//       bgHover: "hover:bg-white/40",
//       text: "text-black",
//     },
//   };

const themeColor = {
  Dark: {
    bg: "bg-slate-900",
    bgWidget:"bg-[#111827]",
    surface: "bg-gray-900",
    elevated: "bg-gray-800",
    border: "border-gray-800",
    text: "text-gray-200",
    textMuted: "text-gray-400",
    accent: "text-blue-400",
    bgHover: "hover:bg-gray-800",
  },
  Light: {
    bg: "bg-gray-50",
    bgWidget:"bg-white",
    surface: "bg-white",
    elevated: "bg-gray-100",
    border: "border-gray-200",
    text: "text-gray-900",
    textMuted: "text-gray-600",
    accent: "text-blue-600",
    bgHover: "hover:bg-gray-100",
  },
};


const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {

  // const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem("theme") as Theme || "Light"));

  const getInitialTheme = (): Theme => {
  const stored = localStorage.getItem("theme");
  return stored === "Dark" || stored === "Light" ? stored : "Light";
};

const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const themeColors = themeColor[theme];

  useEffect(()=>{
    localStorage.setItem("theme", theme)
  },[theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
