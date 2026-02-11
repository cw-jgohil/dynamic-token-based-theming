import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { ThemeTokens, useCssConversion } from "../utils/hooks/useCssConversion";
import type { Theme } from "../api/types";
import {
  validateThemeStructure,
  logThemeStructure,
} from "../utils/validateTheme";
import { useComponentProperties } from "../utils/hooks/useComponentProperties";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  setSelectedVariant,
  setSelectedVersion,
  resetSelectedVariant,
  resetSelectedVersion,
} from "../redux/slices/componentSlice";
import { useTheme } from "../api";

interface ThemeContextType {
  currentTheme: Theme | null;
  themeJson: ThemeTokens;
  setCurrentTheme: (theme: Theme | null) => void;
  setThemeJson: (json: ThemeTokens) => void;
  updateThemeJson: (json: ThemeTokens) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Normalize API theme-json.components into internal ThemeTokens shape
const normalizeThemeTokens = (raw: any): ThemeTokens => {
  const componentsSrc = raw?.components ?? raw;
  const empty: ThemeTokens = {};

  if (!componentsSrc || typeof componentsSrc !== "object") {
    return empty;
  }

  const looksLikeTokenValue = (value: unknown): boolean => {
    return (
      !!value &&
      typeof value === "object" &&
      "value" in (value as any) &&
      "type" in (value as any) &&
      "allow" in (value as any)
    );
  };

  const looksLikeAzvThemeTokens = (src: any): src is ThemeTokens => {
    if (!src || typeof src !== "object") return false;

    for (const componentValue of Object.values(src)) {
      if (!componentValue || typeof componentValue !== "object") continue;
      const comp: any = componentValue;

      if (!comp.versions || typeof comp.versions !== "object") continue;

      for (const versionValue of Object.values(comp.versions)) {
        if (!versionValue || typeof versionValue !== "object") continue;
        const ver: any = versionValue;

        if (ver.tokens && typeof ver.tokens === "object") {
          const sample = Object.values(ver.tokens)[0];
          if (looksLikeTokenValue(sample)) return true;
        }

        if (ver.variants && typeof ver.variants === "object") {
          const variantSample = Object.values(ver.variants)[0] as any;
          if (
            variantSample &&
            variantSample.tokens &&
            typeof variantSample.tokens === "object"
          ) {
            const tokenSample = Object.values(variantSample.tokens)[0];
            if (looksLikeTokenValue(tokenSample)) return true;
          }
        }
      }
    }

    return false;
  };

  // If data already matches the Azv ThemeTokens shape, just return it
  if (looksLikeAzvThemeTokens(componentsSrc)) {
    return componentsSrc as ThemeTokens;
  }

  // Fallback: legacy normalization where tokens are primitive values
  const result: ThemeTokens = {};

  const toTokenValue = (value: unknown) => {
    const str = String(value ?? "");
    const isColor =
      /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(str) || /^rgba?\(/i.test(str);
    return {
      value: str,
      type: isColor ? "color" : "input",
      allow: true,
    } as const;
  };

  for (const [componentName, componentValue] of Object.entries(componentsSrc)) {
    const comp: any = componentValue;
    const versions: Record<string, any> = {};

    if (comp.versions && typeof comp.versions === "object") {
      for (const [versionName, versionValue] of Object.entries(comp.versions)) {
        const ver: any = versionValue;
        const normalizedVersion: any = {};

        if (ver.tokens && typeof ver.tokens === "object") {
          const tokens: any = {};
          for (const [prop, val] of Object.entries(ver.tokens)) {
            tokens[prop] = toTokenValue(val);
          }
          normalizedVersion.tokens = tokens;
        }

        if (ver.variants && typeof ver.variants === "object") {
          const variants: any = {};
          for (const [variantName, variantValue] of Object.entries(
            ver.variants,
          )) {
            const variantTokensSrc: any = variantValue;
            const variantTokens: any = {};
            for (const [prop, val] of Object.entries(variantTokensSrc)) {
              variantTokens[prop] = toTokenValue(val);
            }
            variants[variantName] = { tokens: variantTokens };
          }
          normalizedVersion.variants = variants;
        }

        versions[versionName] = normalizedVersion;
      }
    }

    const activeVersion: string =
      typeof comp.activeVersion === "string" && comp.activeVersion in versions
        ? comp.activeVersion
        : (Object.keys(versions)[0] ?? "v1");

    result[componentName] = { activeVersion, versions };
  }

  return result;
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const { selectedVersion, selectedVariant, selectedComponents } =
    useAppSelector((state) => state.components);
  const { data: defaultThemeJson } = useTheme("1");
  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);
  const [themeJson, setThemeJson] = useState<ThemeTokens>({} as ThemeTokens);
  // const { convertAndInject } = useCssConversion();

  const componentData = useComponentProperties(
    themeJson,
    selectedComponents?.["component-key"] as string,
    selectedVersion,
    selectedVariant,
  );

  useEffect(() => {
    if (defaultThemeJson && defaultThemeJson["theme-json"]) {
      const normalized = normalizeThemeTokens(defaultThemeJson["theme-json"]);
      if (validateThemeStructure(normalized)) {
        setThemeJson(normalized);
      } else {
        console.error(
          "Default API theme (id=1) has invalid structure; skipping load.",
        );
      }
    }
  }, [defaultThemeJson]);

  useEffect(() => {
    if (
      componentData.hasVersions &&
      (!selectedVersion || !componentData.versions.includes(selectedVersion))
    ) {
      dispatch(setSelectedVersion(componentData.versions[0]));
    } else if (!componentData.hasVersions && selectedVersion) {
      dispatch(resetSelectedVersion());
    }

    if (
      componentData.hasVariants &&
      (!selectedVariant || !componentData.variants.includes(selectedVariant))
    ) {
      dispatch(setSelectedVariant(componentData.variants[0]));
    } else if (!componentData.hasVariants && selectedVariant) {
      dispatch(resetSelectedVariant());
    }
  }, [
    selectedComponents?.["component-key"] as string,
    componentData.versions,
    componentData.variants,
  ]);

  // Update themeJson when currentTheme changes
  useEffect(() => {
    if (currentTheme && currentTheme["theme-json"]) {
      const normalized = normalizeThemeTokens(currentTheme["theme-json"]);

      // Log for debugging
      console.log("Loading theme:", currentTheme.name);
      logThemeStructure(normalized, "Theme JSON (normalized components)");

      // Validate theme data is an object
      if (normalized && typeof normalized === "object") {
        const isValid = validateThemeStructure(normalized);
        if (isValid) {
          setThemeJson(normalized);
        } else {
          console.error("Theme validation failed, keeping previous themeJson");
        }
      } else {
        console.warn(
          "Invalid theme-json structure (normalized components):",
          normalized,
        );
      }
    }
  }, [currentTheme]);

  // Convert and inject CSS whenever themeJson changes
  // useEffect(() => {
  //   if (
  //     themeJson &&
  //     typeof themeJson === "object" &&
  //     Object.keys(themeJson).length > 0
  //   ) {
  //     try {
  //       convertAndInject(themeJson, "azv-global-theme");
  //     } catch (error) {
  //       console.error("Failed to convert and inject theme CSS:", error);
  //     }
  //   }
  // }, [themeJson, convertAndInject]);

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
