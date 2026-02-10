import { ThemeTokens } from "./hooks/useCssConversion";

export function validateThemeStructure(theme: any): theme is ThemeTokens {
  if (!theme || typeof theme !== 'object') {
    console.error('Theme is not an object:', theme);
    return false;
  }

  const issues: string[] = [];

  for (const [componentName, component] of Object.entries(theme)) {
    if (!component || typeof component !== 'object') {
      issues.push(`Component "${componentName}" is invalid (not an object)`);
      continue;
    }

    // Check for versions structure
    if ('versions' in component) {
      const comp = component as any;
      if (!comp.versions || typeof comp.versions !== 'object') {
        issues.push(`Component "${componentName}" has invalid versions structure`);
        continue;
      }

      for (const [versionName, version] of Object.entries(comp.versions)) {
        if (!version || typeof version !== 'object') {
          issues.push(`Version "${versionName}" in "${componentName}" is invalid`);
          continue;
        }

        const ver = version as any;

        // Check tokens
        if (ver.tokens && typeof ver.tokens !== 'object') {
          issues.push(`Tokens in "${componentName}.${versionName}" is not an object`);
        }

        // Check variants
        if (ver.variants) {
          if (typeof ver.variants !== 'object') {
            issues.push(`Variants in "${componentName}.${versionName}" is not an object`);
          } else {
            for (const [variantName, variant] of Object.entries(ver.variants)) {
              if (!variant || typeof variant !== 'object') {
                issues.push(`Variant "${variantName}" in "${componentName}.${versionName}" is invalid`);
                continue;
              }

              const vari = variant as any;
              if (!vari.tokens || typeof vari.tokens !== 'object') {
                issues.push(`Tokens in variant "${variantName}" of "${componentName}.${versionName}" is invalid`);
              }
            }
          }
        }
      }
    } else {
      // Component without versions
      const comp = component as any;

      if (comp.tokens && typeof comp.tokens !== 'object') {
        issues.push(`Tokens in "${componentName}" is not an object`);
      }

      const variants = comp.variants || comp.varients;
      if (variants) {
        if (typeof variants !== 'object') {
          issues.push(`Variants in "${componentName}" is not an object`);
        } else {
          for (const [variantName, variant] of Object.entries(variants)) {
            if (!variant || typeof variant !== 'object') {
              issues.push(`Variant "${variantName}" in "${componentName}" is invalid`);
              continue;
            }

            const vari = variant as any;
            if (!vari.tokens || typeof vari.tokens !== 'object') {
              issues.push(`Tokens in variant "${variantName}" of "${componentName}" is invalid`);
            }
          }
        }
      }
    }
  }

  if (issues.length > 0) {
    console.warn('Theme validation issues found:', issues);
    return false;
  }

  return true;
}

export function logThemeStructure(theme: any, label: string = 'Theme') {
  console.group(`${label} Structure`);
  console.log('Type:', typeof theme);
  console.log('Is null/undefined:', theme == null);

  if (theme && typeof theme === 'object') {
    console.log('Keys:', Object.keys(theme));
    console.log('Full data:', JSON.stringify(theme, null, 2));
  }

  console.groupEnd();
}
