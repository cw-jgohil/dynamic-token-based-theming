import { ThemeTokens, GlobalTokens } from "../utils/hooks/useCssConversion";

export interface ComponentMeta {
  id: string;
  "component-name": string;
  "component-key": string;
  category: string;
  description: string;
}

/** Delta stored in API: only changed globals and component tokens */
export interface ThemeUpdatedChanges {
  global?: GlobalTokens;
  components?: ThemeTokens;
}

/** API theme-json payload: base + optional updatedChanges (delta) */
export interface ThemeJsonPayload {
  global?: { colors?: GlobalTokens };
  components?: ThemeTokens;
  updatedChanges?: ThemeUpdatedChanges;
}

export interface Theme {
  id: string;
  name: string;
  description?: string;
  "theme-json"?: ThemeJsonPayload | ThemeTokens;
  updatedChanges?: ThemeUpdatedChanges;
  "design-tokens-json"?: Record<string, any>;
}

export interface CreateThemeDto {
  name: string;
  description: string;
}

export interface UpdateThemeDto {
  name?: string;
  description?: string;
  "theme-json"?: ThemeJsonPayload | ThemeTokens;
  updatedChanges?: ThemeUpdatedChanges;
  "design-tokens-json"?: Record<string, any>;
}
