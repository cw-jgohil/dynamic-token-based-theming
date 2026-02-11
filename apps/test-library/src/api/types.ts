import { ThemeTokens } from "../utils/hooks/useCssConversion";

export interface ComponentMeta {
  id: string;
  "component-name": string;
  "component-key": string;
  category: string;
  description: string;
}

export interface Theme {
  id: string;
  name: string;
  "theme-json": ThemeTokens;
  "design-tokens-json": Record<string, any>;
}

export interface CreateThemeDto {
  "theme-name": string;
  "theme-json": ThemeTokens;
  "design-tokens-json"?: Record<string, any>;
}

export interface UpdateThemeDto {
  "theme-name"?: string;
  "theme-json"?: ThemeTokens;
  "design-tokens-json"?: Record<string, any>;
}
