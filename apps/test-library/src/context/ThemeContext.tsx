import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  ThemeTokens,
  GlobalTokens,
  useCssConversion,
} from "../utils/hooks/useCssConversion";
import type {
  Theme,
  ThemeJsonPayload,
  ThemeUpdatedChanges,
} from "../api/types";
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
  globalTokens: GlobalTokens;
  baseThemeJson: ThemeTokens;
  baseGlobalTokens: GlobalTokens;
  defaultBaseThemeJson: ThemeTokens;
  defaultBaseGlobalTokens: GlobalTokens;
  themeUpdatedChanges: ThemeUpdatedChanges;
  getMergedForInject: (
    themePatch: Record<string, unknown>,
    editedGlobalKeys: string[],
  ) => ThemeUpdatedChanges;
  getUpdatedChangesForSave: (
    themePatch: Record<string, unknown>,
    editedGlobalKeys: string[],
  ) => ThemeUpdatedChanges;
  setCurrentTheme: (theme: Theme | null) => void;
  setThemeJson: (json: ThemeTokens) => void;
  setGlobalTokens: (tokens: GlobalTokens) => void;
  updateThemeJson: (json: ThemeTokens) => void;
  updateGlobalToken: (propertyName: string, token: { value: string }) => void;
  getFullThemeJson: () => ThemeJsonPayload;
  getThemeJsonForSave: (
    themePatch: Record<string, unknown>,
    editedGlobalKeys: string[],
  ) => ThemeJsonPayload;
  commitSave: (
    themePatch: Record<string, unknown>,
    editedGlobalKeys: string[],
  ) => void;
  resetToCurrentTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/** Deep-merge patch into base (patch overwrites). Used to apply updatedChanges on load. */
function mergeThemeTokens(
  base: ThemeTokens,
  patch: ThemeTokens | undefined,
): ThemeTokens {
  if (!patch || typeof patch !== "object" || Object.keys(patch).length === 0) {
    return base;
  }
  const result = structuredClone(base) as ThemeTokens;
  for (const [compKey, compPatch] of Object.entries(patch)) {
    const comp = compPatch as { versions?: Record<string, unknown> };
    if (!comp?.versions) continue;
    const existing = result[compKey];
    if (!existing || !("versions" in existing)) {
      (result as Record<string, unknown>)[compKey] = structuredClone(compPatch);
      continue;
    }
    const versions = (existing.versions ?? {}) as Record<string, unknown>;
    for (const [vKey, vPatch] of Object.entries(comp.versions)) {
      const v = vPatch as Record<string, unknown>;
      if (!v) continue;
      const ev = (versions[vKey] ?? {}) as Record<string, unknown>;
      if (v.tokens && typeof v.tokens === "object") {
        ev.tokens = { ...(ev.tokens as object), ...v.tokens };
      }
      if (v.variants && typeof v.variants === "object") {
        ev.variants = ev.variants ?? {};
        const evVariants = ev.variants as Record<
          string,
          { tokens?: Record<string, unknown> }
        >;
        for (const [variantKey, variantPatch] of Object.entries(v.variants)) {
          const vp = variantPatch as { tokens?: Record<string, unknown> };
          if (vp?.tokens) {
            const cur = evVariants[variantKey] ?? { tokens: {} };
            cur.tokens = { ...(cur.tokens ?? {}), ...vp.tokens };
            evVariants[variantKey] = cur;
          }
        }
      }
      if (v.nested && typeof v.nested === "object") {
        ev.nested = mergeNested(
          (ev.nested ?? {}) as Record<string, unknown>,
          v.nested as Record<string, unknown>,
        );
      }
      versions[vKey] = ev;
    }
    (result[compKey] as { versions: Record<string, unknown> }).versions =
      versions;
  }
  return result;
}

function mergeNested(
  base: Record<string, unknown>,
  patch: Record<string, unknown>,
): Record<string, unknown> {
  const result = { ...base };
  for (const [key, p] of Object.entries(patch)) {
    if (!p || typeof p !== "object") continue;
    const cur = (result[key] ?? {}) as Record<string, unknown>;
    const pObj = p as Record<string, unknown>;
    if (pObj.tokens && typeof pObj.tokens === "object") {
      (cur as Record<string, unknown>).tokens = {
        ...((cur.tokens as object) ?? {}),
        ...pObj.tokens,
      };
    }
    if (pObj.nested && typeof pObj.nested === "object") {
      (cur as Record<string, unknown>).nested = mergeNested(
        (cur.nested ?? {}) as Record<string, unknown>,
        pObj.nested as Record<string, unknown>,
      );
    }
    result[key] = cur;
  }
  return result;
}

/** Extract global.colors from API theme-json payload */
const normalizeGlobalTokens = (raw: unknown): GlobalTokens => {
  if (!raw || typeof raw !== "object") return {};
  const r = raw as Record<string, unknown>;
  const globalObj = r.global as Record<string, unknown> | undefined;
  const colors = globalObj?.colors;
  if (!colors || typeof colors !== "object") return {};
  const result: GlobalTokens = {};
  const looksLikeTokenValue = (value: unknown): boolean =>
    !!value &&
    typeof value === "object" &&
    "value" in (value as object) &&
    "type" in (value as object) &&
    "allow" in (value as object);
  for (const [key, val] of Object.entries(colors)) {
    if (looksLikeTokenValue(val)) {
      result[key] = val as import("../utils/hooks/useCssConversion").TokenValue;
    }
  }
  return result;
};

// Normalize API theme-json.components into internal ThemeTokens shape
const normalizeThemeTokens = (raw: any): ThemeTokens => {
  const componentsSrc =
    (raw && typeof raw === "object" && "components" in raw
      ? (raw as { components?: unknown }).components
      : undefined) ?? raw;
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
  const [globalTokens, setGlobalTokens] = useState<GlobalTokens>({});
  const [baseThemeJson, setBaseThemeJson] = useState<ThemeTokens>(
    {} as ThemeTokens,
  );
  const [baseGlobalTokens, setBaseGlobalTokens] = useState<GlobalTokens>({});
  const [defaultBaseThemeJson, setDefaultBaseThemeJson] = useState<ThemeTokens>(
    {} as ThemeTokens,
  );
  const [defaultBaseGlobalTokens, setDefaultBaseGlobalTokens] =
    useState<GlobalTokens>({});
  const [themeUpdatedChanges, setThemeUpdatedChanges] =
    useState<ThemeUpdatedChanges>({});
  // const { convertAndInject } = useCssConversion();

  const componentData = useComponentProperties(
    themeJson,
    selectedComponents?.["component-key"] as string,
    selectedVersion,
    selectedVariant,
  );

  useEffect(() => {
    if (defaultThemeJson && defaultThemeJson["theme-json"]) {
      const raw = defaultThemeJson["theme-json"] as Record<string, unknown>;
      const baseGlobal = normalizeGlobalTokens(raw);
      const baseComponents = normalizeThemeTokens(raw);
      if (!validateThemeStructure(baseComponents)) {
        console.error(
          "Default API theme (id=1) has invalid structure; skipping load.",
        );
        return;
      }
      setBaseGlobalTokens(baseGlobal);
      setBaseThemeJson(baseComponents);
      setDefaultBaseGlobalTokens(baseGlobal);
      setDefaultBaseThemeJson(baseComponents);
      const changes = raw.updatedChanges as ThemeUpdatedChanges | undefined;
      setThemeUpdatedChanges(changes ?? {});
      if (changes?.global || changes?.components) {
        setGlobalTokens({ ...baseGlobal, ...changes.global });
        setThemeJson(mergeThemeTokens(baseComponents, changes.components));
      } else {
        setGlobalTokens(baseGlobal);
        setThemeJson(baseComponents);
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

  // Update themeJson and globalTokens when currentTheme changes; apply updatedChanges over base
  useEffect(() => {
    if (!currentTheme) return;

    if (currentTheme["theme-json"]) {
      const raw = currentTheme["theme-json"] as Record<string, unknown>;
      const hasComponents =
        "components" in raw &&
        raw.components &&
        typeof raw.components === "object" &&
        Object.keys(raw.components as Record<string, unknown>).length > 0;
      const hasGlobal =
        "global" in raw &&
        raw.global &&
        typeof raw.global === "object" &&
        Object.keys(raw.global as Record<string, unknown>).length > 0;

      const updatedFromPayload =
        (raw.updatedChanges as ThemeUpdatedChanges | undefined) ??
        (raw.updatedJSON as ThemeUpdatedChanges | undefined);

      if (!hasComponents && !hasGlobal) {
        const changes = updatedFromPayload ?? {};
        setThemeUpdatedChanges(changes);
        if (changes.global || changes.components) {
          setGlobalTokens({
            ...defaultBaseGlobalTokens,
            ...(changes.global ?? {}),
          });
          setThemeJson(
            mergeThemeTokens(defaultBaseThemeJson, changes.components ?? {}),
          );
        } else {
          setGlobalTokens(defaultBaseGlobalTokens);
          setThemeJson(defaultBaseThemeJson);
        }
        return;
      }

      const baseGlobal = normalizeGlobalTokens(raw);
      const baseComponents = normalizeThemeTokens(raw);

      console.log("Loading theme:", currentTheme.name);
      logThemeStructure(baseComponents, "Theme JSON (normalized components)");

      if (
        !baseComponents ||
        typeof baseComponents !== "object" ||
        !validateThemeStructure(baseComponents)
      ) {
        console.error("Theme validation failed, keeping previous themeJson");
        return;
      }
      setBaseGlobalTokens(baseGlobal);
      setBaseThemeJson(baseComponents);
      const changes = updatedFromPayload;
      setThemeUpdatedChanges(changes ?? {});
      if (changes?.global || changes?.components) {
        setGlobalTokens({ ...baseGlobal, ...changes.global });
        setThemeJson(mergeThemeTokens(baseComponents, changes.components));
      } else {
        setGlobalTokens(baseGlobal);
        setThemeJson(baseComponents);
      }
      return;
    }

    const changes =
      (currentTheme.updatedChanges as ThemeUpdatedChanges | undefined) ?? {};
    setThemeUpdatedChanges(changes);

    if (changes.global || changes.components) {
      setGlobalTokens({
        ...defaultBaseGlobalTokens,
        ...(changes.global ?? {}),
      });
      setThemeJson(
        mergeThemeTokens(defaultBaseThemeJson, changes.components ?? {}),
      );
    } else {
      setGlobalTokens(defaultBaseGlobalTokens);
      setThemeJson(defaultBaseThemeJson);
    }
  }, [currentTheme, defaultBaseGlobalTokens, defaultBaseThemeJson]);

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

  const updateGlobalToken = (
    propertyName: string,
    token: { value: string },
  ) => {
    setGlobalTokens((prev) => {
      const next = { ...prev };
      const existing = next[propertyName];
      next[propertyName] = existing
        ? { ...existing, value: token.value }
        : {
            value: token.value,
            type: "input",
            allow: true,
          };
      return next;
    });
  };

  const getFullThemeJson = (): ThemeJsonPayload => ({
    global: { colors: globalTokens },
    components: themeJson,
  });

  /** Merged updatedChanges + current edits for injecting into azv-theme (update, don't override). */
  const getMergedForInject = (
    themePatch: Record<string, unknown>,
    editedGlobalKeys: string[],
  ): ThemeUpdatedChanges => {
    const baseComponents = themeUpdatedChanges?.components ?? {};
    const baseGlobal = themeUpdatedChanges?.global ?? {};
    const mergedComponents =
      themePatch &&
      typeof themePatch === "object" &&
      Object.keys(themePatch).length > 0
        ? mergeThemeTokens(baseComponents, themePatch as ThemeTokens)
        : baseComponents;
    const editedGlobal: GlobalTokens = {};
    editedGlobalKeys.forEach((k) => {
      if (globalTokens[k]) editedGlobal[k] = globalTokens[k];
    });
    const mergedGlobal =
      Object.keys(editedGlobal).length > 0
        ? { ...baseGlobal, ...editedGlobal }
        : baseGlobal;
    return {
      ...(Object.keys(mergedComponents).length
        ? { components: mergedComponents }
        : {}),
      ...(Object.keys(mergedGlobal).length ? { global: mergedGlobal } : {}),
    };
  };

  /** Build theme-json for API: base + updatedChanges (accumulated = previous updatedChanges + this session's edits). */
  const getThemeJsonForSave = (
    themePatch: Record<string, unknown>,
    editedGlobalKeys: string[],
  ): ThemeJsonPayload => {
    const updatedGlobal: GlobalTokens = {};
    if (editedGlobalKeys.length && globalTokens) {
      editedGlobalKeys.forEach((k) => {
        if (globalTokens[k]) updatedGlobal[k] = globalTokens[k];
      });
    }
    const hasUpdatedGlobal = Object.keys(updatedGlobal).length > 0;
    const hasUpdatedComponents =
      themePatch &&
      typeof themePatch === "object" &&
      Object.keys(themePatch).length > 0;

    // Merge with any existing updatedChanges so we don't drop previous edits
    const existingComponents = themeUpdatedChanges?.components ?? {};
    const existingGlobal = themeUpdatedChanges?.global ?? {};
    const mergedComponents = hasUpdatedComponents
      ? mergeThemeTokens(existingComponents, themePatch as ThemeTokens)
      : existingComponents;
    const mergedGlobal =
      hasUpdatedGlobal || Object.keys(existingGlobal).length > 0
        ? { ...existingGlobal, ...(hasUpdatedGlobal ? updatedGlobal : {}) }
        : {};

    const hasMergedGlobal = Object.keys(mergedGlobal).length > 0;
    const hasMergedComponents =
      mergedComponents && Object.keys(mergedComponents).length > 0;

    return {
      global: { colors: baseGlobalTokens },
      components: baseThemeJson,
      ...(hasMergedGlobal || hasMergedComponents
        ? {
            updatedChanges: {
              ...(hasMergedGlobal ? { global: mergedGlobal } : {}),
              ...(hasMergedComponents ? { components: mergedComponents } : {}),
            },
          }
        : {}),
    };
  };

  /** Build only updatedChanges for save – used for themes that don't have a full theme-json (new themes). */
  const getUpdatedChangesForSave = (
    themePatch: Record<string, unknown>,
    editedGlobalKeys: string[],
  ): ThemeUpdatedChanges => {
    const updatedGlobal: GlobalTokens = {};
    if (editedGlobalKeys.length && globalTokens) {
      editedGlobalKeys.forEach((k) => {
        if (globalTokens[k]) updatedGlobal[k] = globalTokens[k];
      });
    }
    const hasUpdatedGlobal = Object.keys(updatedGlobal).length > 0;
    const hasUpdatedComponents =
      themePatch &&
      typeof themePatch === "object" &&
      Object.keys(themePatch).length > 0;

    const existingComponents = themeUpdatedChanges?.components ?? {};
    const existingGlobal = themeUpdatedChanges?.global ?? {};
    const mergedComponents = hasUpdatedComponents
      ? mergeThemeTokens(existingComponents, themePatch as ThemeTokens)
      : existingComponents;
    const mergedGlobal =
      hasUpdatedGlobal || Object.keys(existingGlobal).length > 0
        ? { ...existingGlobal, ...(hasUpdatedGlobal ? updatedGlobal : {}) }
        : {};

    const hasMergedGlobal = Object.keys(mergedGlobal).length > 0;
    const hasMergedComponents =
      mergedComponents && Object.keys(mergedComponents).length > 0;

    return {
      ...(hasMergedGlobal ? { global: mergedGlobal } : {}),
      ...(hasMergedComponents ? { components: mergedComponents } : {}),
    };
  };

  const commitSave = (
    themePatch: Record<string, unknown>,
    editedGlobalKeys: string[],
  ) => {
    const savedGlobal: GlobalTokens = {};
    editedGlobalKeys.forEach((k) => {
      if (globalTokens[k]) savedGlobal[k] = globalTokens[k];
    });
    const existingComponents = themeUpdatedChanges?.components ?? {};
    const existingGlobal = themeUpdatedChanges?.global ?? {};
    const hasUpdatedComponents =
      themePatch &&
      typeof themePatch === "object" &&
      Object.keys(themePatch).length > 0;
    const mergedComponents = hasUpdatedComponents
      ? mergeThemeTokens(existingComponents, themePatch as ThemeTokens)
      : existingComponents;
    const mergedGlobal =
      Object.keys(savedGlobal).length > 0 ||
      Object.keys(existingGlobal).length > 0
        ? { ...existingGlobal, ...savedGlobal }
        : {};

    setThemeUpdatedChanges({
      ...(Object.keys(mergedGlobal).length ? { global: mergedGlobal } : {}),
      ...(mergedComponents && Object.keys(mergedComponents).length > 0
        ? { components: mergedComponents }
        : {}),
    });
  };

  const resetToCurrentTheme = () => {
    if (!currentTheme) return;

    // Legacy/default themes with full theme-json
    if (currentTheme["theme-json"]) {
      const raw = currentTheme["theme-json"] as Record<string, unknown>;
      const hasComponents =
        "components" in raw &&
        raw.components &&
        typeof raw.components === "object" &&
        Object.keys(raw.components as Record<string, unknown>).length > 0;
      const hasGlobal =
        "global" in raw &&
        raw.global &&
        typeof raw.global === "object" &&
        Object.keys(raw.global as Record<string, unknown>).length > 0;

      const updatedFromPayload =
        (raw.updatedChanges as ThemeUpdatedChanges | undefined) ??
        (raw.updatedJSON as ThemeUpdatedChanges | undefined);

      if (!hasComponents && !hasGlobal) {
        const changes = updatedFromPayload ?? {};
        setThemeUpdatedChanges(changes);
        if (changes.global || changes.components) {
          setGlobalTokens({
            ...defaultBaseGlobalTokens,
            ...(changes.global ?? {}),
          });
          setThemeJson(
            mergeThemeTokens(defaultBaseThemeJson, changes.components ?? {}),
          );
        } else {
          setGlobalTokens(defaultBaseGlobalTokens);
          setThemeJson(defaultBaseThemeJson);
        }
      } else {
        const baseGlobal = normalizeGlobalTokens(raw);
        const baseComponents = normalizeThemeTokens(raw);
        if (
          baseComponents &&
          typeof baseComponents === "object" &&
          validateThemeStructure(baseComponents)
        ) {
          setBaseGlobalTokens(baseGlobal);
          setBaseThemeJson(baseComponents);
          const changes = updatedFromPayload;
          setThemeUpdatedChanges(changes ?? {});
          if (changes?.global || changes?.components) {
            setGlobalTokens({ ...baseGlobal, ...changes.global });
            setThemeJson(mergeThemeTokens(baseComponents, changes.components));
          } else {
            setGlobalTokens(baseGlobal);
            setThemeJson(baseComponents);
          }
        }
      }
      return;
    }

    // New themes without theme-json: reset to default base + their updatedChanges
    const changes =
      (currentTheme.updatedChanges as ThemeUpdatedChanges | undefined) ?? {};
    setThemeUpdatedChanges(changes);
    if (changes.global || changes.components) {
      setGlobalTokens({
        ...defaultBaseGlobalTokens,
        ...(changes.global ?? {}),
      });
      setThemeJson(
        mergeThemeTokens(defaultBaseThemeJson, changes.components ?? {}),
      );
    } else {
      setGlobalTokens(defaultBaseGlobalTokens);
      setThemeJson(defaultBaseThemeJson);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        themeJson,
        globalTokens,
        baseThemeJson,
        baseGlobalTokens,
        defaultBaseThemeJson,
        defaultBaseGlobalTokens,
        themeUpdatedChanges,
        getMergedForInject,
        setCurrentTheme,
        setThemeJson,
        setGlobalTokens,
        updateThemeJson,
        updateGlobalToken,
        getFullThemeJson,
        getThemeJsonForSave,
        getUpdatedChangesForSave,
        commitSave,
        resetToCurrentTheme,
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
