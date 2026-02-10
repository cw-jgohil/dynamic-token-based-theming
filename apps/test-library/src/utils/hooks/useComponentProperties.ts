// // useComponentProperties.ts
// import { useMemo } from 'react';
// import type { ThemeTokens, TokenValue } from './useCssConversion';

// interface PropertyInfo {
//     name: string;
//     type: "color" | "input" | "select";
//     value: string;
//     allow: boolean;
// }

// interface ComponentPropertiesResult {
//     properties: PropertyInfo[];
//     versions: string[];
//     variants: string[];
//     hasVersions: boolean;
//     hasVariants: boolean;
// }

// export const useComponentProperties = (
//     theme: ThemeTokens,
//     componentName: string
// ): ComponentPropertiesResult => {
//     const result = useMemo(() => {
//         const component = theme[componentName];

//         if (!component) {
//             return {
//                 properties: [],
//                 versions: [],
//                 variants: [],
//                 hasVersions: false,
//                 hasVariants: false
//             };
//         }

//         const propertiesMap = new Map<string, PropertyInfo>();
//         const versionsSet = new Set<string>();
//         const variantsSet = new Set<string>();

//         const addProperty = (name: string, token: TokenValue) => {
//             if (!propertiesMap.has(name)) {
//                 propertiesMap.set(name, {
//                     name,
//                     type: token.type,
//                     value: token.value,
//                     allow: token.allow
//                 });
//             }
//         };

//         // Component with versions
//         if ('versions' in component) {
//             for (const [versionName, version] of Object.entries(component.versions)) {
//                 versionsSet.add(versionName);

//                 // Tokens in version
//                 if (version.tokens) {
//                     Object.entries(version.tokens).forEach(([name, token]) =>
//                         addProperty(name, token)
//                     );
//                 }

//                 // Variants in version
//                 if (version.variants) {
//                     for (const [variantName, variant] of Object.entries(version.variants)) {
//                         variantsSet.add(variantName);
//                         Object.entries(variant.tokens).forEach(([name, token]) =>
//                             addProperty(name, token)
//                         );
//                     }
//                 }
//             }
//         }
//         // Component without versions
//         else {
//             // Direct tokens
//             if (component.tokens) {
//                 Object.entries(component.tokens).forEach(([name, token]) =>
//                     addProperty(name, token)
//                 );
//             }

//             // Variants
//             const variants = component.variants || component.varients;
//             if (variants) {
//                 for (const [variantName, variant] of Object.entries(variants)) {
//                     variantsSet.add(variantName);
//                     Object.entries(variant.tokens).forEach(([name, token]) =>
//                         addProperty(name, token)
//                     );
//                 }
//             }
//         }

//         return {
//             properties: Array.from(propertiesMap.values()),
//             versions: Array.from(versionsSet),
//             variants: Array.from(variantsSet),
//             hasVersions: versionsSet.size > 0,
//             hasVariants: variantsSet.size > 0
//         };
//     }, [theme, componentName]);

//     return result;
// };

// export type { PropertyInfo, ComponentPropertiesResult };

// useComponentProperties.ts
import { useMemo } from "react";
import type { ThemeTokens, TokenValue } from "./useCssConversion";

interface PropertyInfo {
  name: string;
  type: "color" | "input" | "select";
  value: string;
  allow: boolean;
}

interface ComponentPropertiesResult {
  properties: PropertyInfo[];
  versions: string[];
  variants: string[];
  hasVersions: boolean;
  hasVariants: boolean;
  activeVersion?: string;
  activeVariant?: string;
}

const pickFirstKey = (obj?: Record<string, any>) =>
  obj ? Object.keys(obj)[0] : undefined;

export const useComponentProperties = (
  theme: ThemeTokens,
  componentName: string,
  selectedVersion: string | undefined,
  selectedVariant: string | undefined,
): ComponentPropertiesResult => {
  return useMemo(() => {
    const component = theme[componentName];

    if (!component) {
      return {
        properties: [],
        versions: [],
        variants: [],
        hasVersions: false,
        hasVariants: false,
      };
    }

    const properties: PropertyInfo[] = [];
    const versions = new Set<string>();
    const variants = new Set<string>();

    const toProperty = (name: string, token: TokenValue): PropertyInfo => ({
      name,
      type: token.type,
      value: token.value,
      allow: token.allow,
    });

    /* ================= COMPONENT WITH VERSIONS ================= */
    if ("versions" in component) {
      const versionKeys = Object.keys(component.versions);
      versionKeys.forEach((v) => versions.add(v));

      const activeVersion =
        selectedVersion && component.versions[selectedVersion]
          ? selectedVersion
          : pickFirstKey(component.versions);

      const version = activeVersion
        ? component.versions[activeVersion]
        : undefined;

      if (!version) {
        return {
          properties: [],
          versions: Array.from(versions),
          variants: [],
          hasVersions: versions.size > 0,
          hasVariants: false,
        };
      }

      /* ----- Version has variants ----- */
      if (version.variants) {
        const variantKeys = Object.keys(version.variants);
        variantKeys.forEach((v) => variants.add(v));

        const activeVariant =
          selectedVariant && version.variants[selectedVariant]
            ? selectedVariant
            : pickFirstKey(version.variants);

        const variant = activeVariant
          ? version.variants[activeVariant]
          : undefined;

        if (variant) {
          Object.entries(variant.tokens).forEach(([name, token]) => {
            properties.push(toProperty(name, token));
          });
        }

        return {
          properties,
          versions: Array.from(versions),
          variants: Array.from(variants),
          hasVersions: true,
          hasVariants: variants.size > 0,
          activeVersion,
          activeVariant,
        };
      }

      /* ----- Version tokens only ----- */
      if (version.tokens) {
        Object.entries(version.tokens).forEach(([name, token]) => {
          properties.push(toProperty(name, token));
        });
      }

      return {
        properties,
        versions: Array.from(versions),
        variants: [],
        hasVersions: true,
        hasVariants: false,
        activeVersion,
      };
    }

    /* ================= COMPONENT WITHOUT VERSIONS ================= */

    const componentVariants = component.variants || component.varients;

    if (componentVariants) {
      const variantKeys = Object.keys(componentVariants);
      variantKeys.forEach((v) => variants.add(v));

      const activeVariant =
        selectedVariant && componentVariants[selectedVariant]
          ? selectedVariant
          : pickFirstKey(componentVariants);

      const variant = activeVariant
        ? componentVariants[activeVariant]
        : undefined;

      if (variant) {
        Object.entries(variant.tokens).forEach(([name, token]) => {
          properties.push(toProperty(name, token));
        });
      }

      return {
        properties,
        versions: [],
        variants: Array.from(variants),
        hasVersions: false,
        hasVariants: true,
        activeVariant,
      };
    }

    /* ----- Plain component tokens ----- */
    if (component.tokens) {
      Object.entries(component.tokens).forEach(([name, token]) => {
        properties.push(toProperty(name, token));
      });
    }

    return {
      properties,
      versions: [],
      variants: [],
      hasVersions: false,
      hasVariants: false,
    };
  }, [theme, componentName, selectedVersion, selectedVariant]);
};

export type { PropertyInfo, ComponentPropertiesResult };
