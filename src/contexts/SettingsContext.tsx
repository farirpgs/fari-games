import React, { useEffect, useState } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";

type IThemeMode = "dark" | "light" | undefined;

export function useSettings() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const systemMode = prefersDarkMode ? "dark" : "light";
  const [themeMode, setThemeMode] = useState<IThemeMode>(() => {
    return localStorage.getItem("themeMode") as IThemeMode;
  });

  useEffect(() => {
    if (!themeMode) {
      localStorage.removeItem("themeMode");
    } else {
      localStorage.setItem("themeMode", themeMode);
    }
  }, [themeMode]);

  return {
    state: {
      themeMode: themeMode ?? systemMode,
    },
    actions: {
      setThemeMode,
    },
  };
}
export const SettingsContext = React.createContext<
  ReturnType<typeof useSettings>
>(undefined as any);
