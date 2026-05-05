import { create } from "zustand";

const THEMES = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
];

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("theme") || "retro",
  themes: THEMES,

  setTheme: (theme) => {
    if (THEMES.includes(theme)) {
      localStorage.setItem("theme", theme);
      set({ theme });
      document.documentElement.setAttribute("data-theme", theme);
    }
  },

  initializeTheme: () => {
    const savedTheme = localStorage.getItem("theme") || "retro";
    document.documentElement.setAttribute("data-theme", savedTheme);
    set({ theme: savedTheme });
  },
}));
