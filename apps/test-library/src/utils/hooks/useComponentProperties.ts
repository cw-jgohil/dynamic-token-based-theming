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
import type {
  ThemeTokens,
  TokenValue,
  NestedConfig,
} from "./useCssConversion";

interface PropertyInfo {
  name: string;
  type: "color" | "input" | "select";
  value: string;
  allow: boolean;
  path?: string[];
}

interface ComponentPropertiesResult {
  properties: PropertyInfo[];
  versions: string[];
  variants: string[];
  hasVersions: boolean;
  hasVariants: boolean;
  activeVersion?: string;
  activeVariant?: string;
  nestedGroups: NestedPropertyGroup[];
}

interface NestedPropertyGroup {
  key: string;
  properties: PropertyInfo[];
  children: NestedPropertyGroup[];
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
        nestedGroups: [],
      };
    }

    const properties: PropertyInfo[] = [];
    const versions = new Set<string>();
    const variants = new Set<string>();
    const nestedGroups: NestedPropertyGroup[] = [];

    const toProperty = (
      name: string,
      token: TokenValue,
      path?: string[],
    ): PropertyInfo => ({
      name,
      type: token.type,
      value: token.value,
      allow: token.allow,
      path,
    });

    const collectNestedGroups = (
      source: Record<string, NestedConfig> | undefined,
      pathPrefix: string[],
    ): NestedPropertyGroup[] => {
      if (!source || typeof source !== "object") return [];

      const groups: NestedPropertyGroup[] = [];

      for (const [key, config] of Object.entries(source)) {
        if (!config || typeof config !== "object") continue;

        const groupProperties: PropertyInfo[] = [];
        const currentPath = [...pathPrefix, key];

        if (config.tokens && typeof config.tokens === "object") {
          for (const [name, token] of Object.entries(config.tokens)) {
            groupProperties.push(toProperty(name, token, currentPath));
          }
        }

        const children = collectNestedGroups(config.nested, currentPath);

        groups.push({
          key,
          properties: groupProperties,
          children,
        });
      }

      return groups;
    };

    /* ================= COMPONENT WITH VERSIONS ================= */
    if ("versions" in component && component.versions) {
      const versionKeys = Object.keys(component.versions);
      versionKeys.forEach((v) => versions.add(v));

      const activeVersion =
        selectedVersion && component.versions[selectedVersion]
          ? selectedVersion
          : component.activeVersion &&
              component.versions[component.activeVersion]
            ? component.activeVersion
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
          nestedGroups: [],
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

        if (version.nested) {
          nestedGroups.push(...collectNestedGroups(version.nested, []));
        }

        return {
          properties,
          versions: Array.from(versions),
          variants: Array.from(variants),
          hasVersions: true,
          hasVariants: variants.size > 0,
          activeVersion,
          activeVariant,
        nestedGroups,
        };
      }

      /* ----- Version tokens only ----- */
      if (version.tokens) {
        Object.entries(version.tokens).forEach(([name, token]) => {
          properties.push(toProperty(name, token));
        });
      }

      if (version.nested) {
        nestedGroups.push(...collectNestedGroups(version.nested, []));
      }

      return {
        properties,
        versions: Array.from(versions),
        variants: [],
        hasVersions: true,
        hasVariants: false,
        activeVersion,
        nestedGroups,
      };
    }

    return {
      properties,
      versions: Array.from(versions),
      variants: Array.from(variants),
      hasVersions: versions.size > 0,
      hasVariants: variants.size > 0,
      nestedGroups,
    };
  }, [theme, componentName, selectedVersion, selectedVariant]);
};

export type { PropertyInfo, ComponentPropertiesResult, NestedPropertyGroup };
