import { useState, useCallback } from "react";

type TokenValue = {
  value: string;
  type: "color" | "input" | "select";
  allow: boolean;
};

type TokenMap = {
  [propertyName: string]: TokenValue;
};

type VariantConfig = {
  tokens: TokenMap;
};

type NestedConfig = {
  tokens?: TokenMap;
  nested?: Record<string, NestedConfig>;
};

type VersionConfig = {
  tokens?: TokenMap;
  variants?: Record<string, VariantConfig>;
  varients?: Record<string, VariantConfig>; // backward/typo safe
  nested?: Record<string, NestedConfig>;
};

type ComponentWithVersions = {
  activeVersion: string;
  versions: Record<string, VersionConfig>;
};

type ThemeTokens = {
  [componentName: string]: ComponentWithVersions;
};

/** Global design tokens (e.g. global.colors) — same shape as TokenMap */
export type GlobalTokens = TokenMap;

export const useCssConversion = () => {
  const [generatedCss, setGeneratedCss] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const generateCss = useCallback(
    (theme: ThemeTokens, globalTokens?: GlobalTokens): string => {
      const rootVars: string[] = [];

      if (globalTokens && typeof globalTokens === "object") {
        for (const [prop, token] of Object.entries(globalTokens)) {
          if (token && token.value !== undefined) {
            rootVars.push(`  --azv-${prop}: ${token.value};`);
          }
        }
      }

      const pushToken = (
        componentName: string,
        pathParts: string[],
        prop: string,
        token: TokenValue,
      ) => {
        if (!token || token.value === undefined) return;

        const path = pathParts.filter(Boolean).join("-");
        const variableName = path
          ? `--azv-${componentName}-${path}-${prop}`
          : `--azv-${componentName}-${prop}`;

        rootVars.push(`  ${variableName}: ${token.value};`);
      };

      const walkNested = (
        componentName: string,
        nested?: Record<string, NestedConfig>,
      ) => {
        if (!nested || typeof nested !== "object") return;

        for (const [nestedKey, nestedConfig] of Object.entries(nested)) {
          if (!nestedConfig || typeof nestedConfig !== "object") continue;

          if (nestedConfig.tokens && typeof nestedConfig.tokens === "object") {
            for (const [prop, token] of Object.entries(nestedConfig.tokens)) {
              pushToken(componentName, [], prop, token);
            }
          }

          if (nestedConfig.nested) {
            walkNested(componentName, nestedConfig.nested);
          }
        }
      };

      // Safety check for theme
      if (!theme || typeof theme !== "object") {
        console.warn("Invalid theme object provided to generateCss");
        return "";
      }

      console.log(
        "Generating CSS for theme with components:",
        Object.keys(theme),
      );

      for (const [componentName, component] of Object.entries(theme)) {
        // Skip if component is null or undefined
        if (!component || typeof component !== "object") {
          console.warn(`Skipping invalid component: ${componentName}`);
          continue;
        }

        /* ---------- COMPONENT WITH VERSIONS ---------- */
        if ("versions" in component && component.versions) {
          for (const [versionName, version] of Object.entries(
            component.versions,
          )) {
            if (!version || typeof version !== "object") {
              console.warn(
                `Skipping invalid version: ${versionName} in ${componentName}`,
              );
              continue;
            }

            // Tokens without variants (e.g., table)
            if (version.tokens && typeof version.tokens === "object") {
              for (const [prop, token] of Object.entries(version.tokens)) {
                pushToken(componentName, [], prop, token);
              }
            }

            // Tokens with variants (e.g., btn)
            if (version.variants && typeof version.variants === "object") {
              for (const [variantName, variant] of Object.entries(
                version.variants,
              )) {
                if (
                  variant &&
                  variant.tokens &&
                  typeof variant.tokens === "object"
                ) {
                  for (const [prop, token] of Object.entries(variant.tokens)) {
                    // Generate CSS variable: --azv-btn-primary-color
                    pushToken(componentName, [variantName], prop, token);
                  }
                }
              }
            }

            // Nested component tokens (e.g., listview header/searchbar/table)
            if (version.nested && typeof version.nested === "object") {
              walkNested(componentName, version.nested);
            }
          }
          continue;
        }

        /* ---------- COMPONENT WITHOUT VERSIONS ---------- */
        // Plain tokens → :root
        if (
          "tokens" in component &&
          component.tokens &&
          typeof component.tokens === "object"
        ) {
          for (const [prop, token] of Object.entries(component.tokens)) {
            pushToken(componentName, [], prop, token);
          }
        }
      }

      let css = "";
      if (rootVars.length) {
        css = `:root {\n${rootVars.join("\n")}\n}`;
        console.log(`Generated ${rootVars.length} CSS variables`, css);
      } else {
        console.warn("No CSS variables generated!");
      }

      return css.trim();
    },
    [],
  );

  const convertAndSet = useCallback(
    (theme: ThemeTokens, globalTokens?: GlobalTokens) => {
      setIsGenerating(true);
      try {
        const css = generateCss(theme, globalTokens);
        setGeneratedCss(css);
        return css;
      } catch (error) {
        console.error("Error generating CSS:", error);
        throw error;
      } finally {
        setIsGenerating(false);
      }
    },
    [generateCss],
  );

  const injectCss = useCallback(
    (css: string, styleId: string = "azv-theme") => {
      // Remove existing style tag if present
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }

      // Create and inject new style tag
      const styleTag = document.createElement("style");
      styleTag.id = styleId;
      styleTag.textContent = css;
      document.head.appendChild(styleTag);
    },
    [],
  );

  const convertAndInject = useCallback(
    (theme: ThemeTokens, styleId?: string, globalTokens?: GlobalTokens) => {
      const css = convertAndSet(theme, globalTokens);
      injectCss(css, styleId);
      return css;
    },
    [convertAndSet, injectCss],
  );

  const resetToDefault = useCallback(() => {
    setGeneratedCss("");
    ["azv-theme", "azv-theme-base"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.remove();
    });
  }, []);

  return {
    resetToDefault,
    generateCss,
    convertAndSet,
    injectCss,
    convertAndInject,
    generatedCss,
    isGenerating,
  };
};

// Export types for use in other files (GlobalTokens exported inline above)
export type {
  TokenValue,
  TokenMap,
  VariantConfig,
  VersionConfig,
  ComponentWithVersions,
  NestedConfig,
  ThemeTokens,
};
