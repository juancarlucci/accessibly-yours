import { useEffect, useState } from "react";

export function useTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const dark = document.documentElement.classList.contains('dark');
    setIsDark(dark);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.toggle('dark');
    setIsDark(!isDark);
    localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
  };

  return { isDark, toggleTheme };
}