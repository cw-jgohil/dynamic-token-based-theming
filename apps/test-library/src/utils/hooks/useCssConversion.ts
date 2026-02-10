// import { useEffect, useRef } from "react";

// export type TokenValue = {
//     value: string;
//     type: "color" | "input" | "select";
//     allow: boolean;
// };

// export type TokenMap = {
//     [propertyName: string]: TokenValue;
// };

// export type VariantConfig = {
//     tokens: TokenMap;
// };

// export type VersionConfig = {
//     tokens?: TokenMap;
//     variants?: Record<string, VariantConfig>;
// };

// export type ComponentWithVersions = {
//     versions: Record<string, VersionConfig>;
// };

// export type ComponentWithoutVersions = {
//     tokens?: TokenMap;
//     variants?: Record<string, VariantConfig>;
//     varients?: Record<string, VariantConfig>; // typo-safe
// };

// export type ComponentConfig =
//     | ComponentWithVersions
//     | ComponentWithoutVersions;

// export type ThemeTokens = {
//     [componentName: string]: ComponentConfig;
// };

// function generateCss(theme: ThemeTokens): string {
//     const rootVars: string[] = [];
//     const classBlocks: string[] = [];

//     for (const [componentName, component] of Object.entries(theme)) {
//         // ✅ Component WITH versions
//         if ("versions" in component) {
//             for (const [versionName, version] of Object.entries(component.versions)) {
//                 const lines: string[] = [];

//                 if (version.tokens) {
//                     for (const [prop, token] of Object.entries(version.tokens)) {
//                         lines.push(
//                             `  --azv-${componentName}-${prop}: ${token.value};`
//                         );
//                     }
//                 }

//                 if (version.variants) {
//                     for (const [variantName, variant] of Object.entries(version.variants)) {
//                         for (const [prop, token] of Object.entries(variant.tokens)) {
//                             lines.push(
//                                 `  --azv-${componentName}-${prop}-${variantName}: ${token.value};`
//                             );
//                         }
//                     }
//                 }

//                 if (lines.length) {
//                     classBlocks.push(
//                         `.azv-${componentName}-${versionName} {\n${lines.join("\n")}\n}`
//                     );
//                 }
//             }
//             continue;
//         }

//         // ✅ Component WITHOUT versions → :root
//         if (component.tokens) {
//             for (const [prop, token] of Object.entries(component.tokens)) {
//                 rootVars.push(
//                     `  --azv-${componentName}-${prop}: ${token.value};`
//                 );
//             }
//         }

//         const variants = component.variants || component.varients;
//         if (variants) {
//             for (const [variantName, variant] of Object.entries(variants)) {
//                 for (const [prop, token] of Object.entries(variant.tokens)) {
//                     rootVars.push(
//                         `  --azv-${componentName}-${prop}-${variantName}: ${token.value};`
//                     );
//                 }
//             }
//         }
//     }

//     let css = "";

//     if (rootVars.length) {
//         css += `:root {\n${rootVars.join("\n")}\n}\n\n`;
//     }

//     css += classBlocks.join("\n\n");

//     return css.trim();
// }

// export function useCssConversion(
//     themeTokens: ThemeTokens,
//     options?: {
//         styleId?: string;
//         enabled?: boolean;
//     }
// ) {
//     const styleRef = useRef<HTMLStyleElement | null>(null);
//     const styleId = options?.styleId ?? "azv-theme-style";
//     const enabled = options?.enabled ?? true;

//     useEffect(() => {
//         if (!enabled) return;

//         const css = generateCss(themeTokens);

//         let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;

//         if (!styleEl) {
//             styleEl = document.createElement("style");
//             styleEl.id = styleId;
//             document.head.appendChild(styleEl);
//         }

//         if (styleEl.textContent !== css) {
//             styleEl.textContent = css;
//         }

//         styleRef.current = styleEl;
//     }, [themeTokens, enabled, styleId]);

//     return {
//         regenerate: () => {
//             if (!styleRef.current) return;
//             styleRef.current.textContent = generateCss(themeTokens);
//         },
//         remove: () => {
//             styleRef.current?.remove();
//             styleRef.current = null;
//         }
//     };
// }

// useCssConversion.ts
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

type VersionConfig = {
  tokens?: TokenMap;
  variants?: Record<string, VariantConfig>;
  varients?: Record<string, VariantConfig>; // backward/typo safe
};

type ComponentWithVersions = {
  versions: Record<string, VersionConfig>; 
};

type ComponentWithoutVersions = {
  tokens?: TokenMap;
  variants?: Record<string, VariantConfig>;
  varients?: Record<string, VariantConfig>; // backward/typo safe
  

};

type ComponentConfig = ComponentWithVersions | ComponentWithoutVersions;

type ThemeTokens = {
  [componentName: string]: ComponentConfig;
};

export const useCssConversion = () => {
  const [generatedCss, setGeneratedCss] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const generateCss = useCallback((theme: ThemeTokens): string => {
    const rootVars: string[] = [];

    // Safety check for theme
    if (!theme || typeof theme !== 'object') {
      console.warn('Invalid theme object provided to generateCss');
      return '';
    }

    console.log('Generating CSS for theme with components:', Object.keys(theme));

    for (const [componentName, component] of Object.entries(theme)) {
      // Skip if component is null or undefined
      if (!component || typeof component !== 'object') {
        console.warn(`Skipping invalid component: ${componentName}`);
        continue;
      }

      /* ---------- COMPONENT WITH VERSIONS ---------- */
      if ("versions" in component && component.versions) {
        for (const [versionName, version] of Object.entries(component.versions)) {
          if (!version || typeof version !== 'object') {
            console.warn(`Skipping invalid version: ${versionName} in ${componentName}`);
            continue;
          }

          // Tokens without variants (e.g., table)
          if (version.tokens && typeof version.tokens === 'object') {
            for (const [prop, token] of Object.entries(version.tokens)) {
              if (token && token.value !== undefined) {
                rootVars.push(`  --azv-${componentName}-${prop}: ${token.value};`);
              }
            }
          }

          // Tokens with variants (e.g., btn)
          if (version.variants && typeof version.variants === 'object') {
            for (const [variantName, variant] of Object.entries(version.variants)) {
              if (variant && variant.tokens && typeof variant.tokens === 'object') {
                for (const [prop, token] of Object.entries(variant.tokens)) {
                  if (token && token.value !== undefined) {
                    // Generate CSS variable: --azv-btn-primary-color
                    rootVars.push(
                      `  --azv-${componentName}-${variantName}-${prop}: ${token.value};`,
                    );
                  }
                }
              }
            }
          }
        }
        continue;
      }

      /* ---------- COMPONENT WITHOUT VERSIONS ---------- */
      // Plain tokens → :root
      if (component.tokens && typeof component.tokens === 'object') {
        for (const [prop, token] of Object.entries(component.tokens)) {
          if (token && token.value !== undefined) {
            rootVars.push(`  --azv-${componentName}-${prop}: ${token.value};`);
          }
        }
      }

      // Variants → :root (e.g., listview, input)
      const variants = component.variants || component.varients;
      if (variants && typeof variants === 'object') {
        for (const [variantName, variant] of Object.entries(variants)) {
          if (variant && variant.tokens && typeof variant.tokens === 'object') {
            for (const [prop, token] of Object.entries(variant.tokens)) {
              if (token && token.value !== undefined) {
                // Generate CSS variable: --azv-listview-default-bg
                rootVars.push(
                  `  --azv-${componentName}-${variantName}-${prop}: ${token.value};`,
                );
              }
            }
          }
        }
      }
    }

    let css = "";
    if (rootVars.length) {
      css = `:root {\n${rootVars.join("\n")}\n}`;
      console.log(`Generated ${rootVars.length} CSS variables`);
    } else {
      console.warn('No CSS variables generated!');
    }

    return css.trim();
  }, []);

  const convertAndSet = useCallback(
    (theme: ThemeTokens) => {
      setIsGenerating(true);
      try {
        const css = generateCss(theme);
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
    (theme: ThemeTokens, styleId?: string) => {
      const css = convertAndSet(theme);
      injectCss(css, styleId);
      return css;
    },
    [convertAndSet, injectCss],
  );

  const resetToDefault = useCallback(() => {
    setGeneratedCss("");
    const styleTag = document.getElementById("azv-theme");
    if (styleTag) {
      styleTag.remove();
    }
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

// Export types for use in other files
export type {
  TokenValue,
  TokenMap,
  VariantConfig,
  VersionConfig,
  ComponentWithVersions,
  ComponentWithoutVersions,
  ComponentConfig,
  ThemeTokens,
};
