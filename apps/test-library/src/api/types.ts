import { ThemeTokens } from "../utils/hooks/useCssConversion";

export interface ComponentMeta {
    id: string;
    name: string;
    "component-key": string;
}

export interface Theme {
    id: string;
    "theme-name": string;
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
