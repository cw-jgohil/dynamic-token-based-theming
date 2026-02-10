import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { ThemeTokens, useCssConversion } from "../utils/hooks/useCssConversion";
import { json as defaultTheme } from "../utils/json/cssJson";
import type { Theme } from "../api/types";
import { validateThemeStructure, logThemeStructure } from "../utils/validateTheme";

interface ThemeContextType {
  currentTheme: Theme | null;
  themeJson: ThemeTokens;
  setCurrentTheme: (theme: Theme | null) => void;
  setThemeJson: (json: ThemeTokens) => void;
  updateThemeJson: (json: ThemeTokens) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);
  const [themeJson, setThemeJson] = useState<ThemeTokens>(defaultTheme);
  const { convertAndInject } = useCssConversion();

  // Update themeJson when currentTheme changes
  useEffect(() => {
    if (currentTheme && currentTheme["theme-json"]) {
      const themeData = currentTheme["theme-json"];

      // Log for debugging
      console.log('Loading theme:', currentTheme["theme-name"]);
      logThemeStructure(themeData, 'Theme JSON');

      // Validate theme data is an object
      if (themeData && typeof themeData === 'object') {
        const isValid = validateThemeStructure(themeData);
        if (isValid) {
          setThemeJson(themeData);
        } else {
          console.error('Theme validation failed, falling back to default theme');
          setThemeJson(defaultTheme);
        }
      } else {
        console.warn('Invalid theme-json structure:', themeData);
        setThemeJson(defaultTheme);
      }
    }
  }, [currentTheme]);

  // Convert and inject CSS whenever themeJson changes
  useEffect(() => {
    if (themeJson && typeof themeJson === 'object' && Object.keys(themeJson).length > 0) {
      try {
        convertAndInject(themeJson, "azv-global-theme");
      } catch (error) {
        console.error('Failed to convert and inject theme CSS:', error);
      }
    }
  }, [themeJson, convertAndInject]);

  const updateThemeJson = (json: ThemeTokens) => {
    setThemeJson(json);
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        themeJson,
        setCurrentTheme,
        setThemeJson,
        updateThemeJson,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
}
