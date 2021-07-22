import React, { useEffect, useState } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";

type IThemeMode = "dark" | "light";

export function useSettings() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [themeMode, setThemeMode] = useState<IThemeMode>(() => {
    return (
      (localStorage.getItem("themeMode") as IThemeMode) ||
      (prefersDarkMode ? "dark" : "light")
    );
  });

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  return {
    state: {
      themeMode,
    },
    actions: {
      setThemeMode,
    },
  };
}
export const SettingsContext = React.createContext<
  ReturnType<typeof useSettings>
>(undefined as any);
