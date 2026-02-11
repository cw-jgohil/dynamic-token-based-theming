// ConfigSidebar.tsx
import React, { useEffect, useState } from "react";
import "./ConfigSidebar.css";
import { ComponentPropertiesResult } from "../utils/hooks/useComponentProperties";
import {
  ThemeTokens,
  TokenValue,
  useCssConversion,
} from "../utils/hooks/useCssConversion";
import { useDebounce } from "../utils/hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  setSelectedVariant,
  setSelectedVersion,
} from "../redux/slices/componentSlice";
import {
  allowOnlyNumberAndDot,
  getSelectOptions,
} from "../utils/common-functions";
import { useThemeContext } from "../context/ThemeContext";
import { useUpdateTheme } from "../api/themes";

type ConfigSidebarProps = {
  componentData: ComponentPropertiesResult;
};

type ThemePatch = {
  [componentKey: string]: {
    versions?: {
      [versionKey: string]: {
        variants?: {
          [variantKey: string]: {
            tokens: Record<string, TokenValue>;
          };
        };
        tokens?: Record<string, TokenValue>;
      };
    };
    variants?: {
      [variantKey: string]: {
        tokens: Record<string, TokenValue>;
      };
    };
    tokens?: Record<string, TokenValue>;
  };
};

const STYLE_UNITS = ["px", "rem", "em", "%", "vh", "vw"] as const;
type StyleUnit = (typeof STYLE_UNITS)[number];

function parseNumericValue(value: string): {
  number: string;
  unit: StyleUnit | null;
} {
  if (!value) return { number: "", unit: null };

  // Match optional number + optional decimal, followed by unit
  const match = value.match(/^(-?\d*\.?\d*)(px|rem|em|%|vh|vw)$/);

  if (!match) {
    return { number: "", unit: null };
  }

  return {
    number: match[1] ?? "",
    unit: match[2] as StyleUnit,
  };
}

function composeValue(number: string, unit: StyleUnit | null) {
  return `${number || ""}${unit || ""}`;
}

const ConfigSidebar: React.FC<ConfigSidebarProps> = ({ componentData }) => {
  const dispatch = useAppDispatch();
  const { selectedVersion, selectedVariant, selectedComponents } =
    useAppSelector((state) => state.components);
  const { convertAndInject, resetToDefault } = useCssConversion();
  const [isThemeChanged, setIsThemeChanged] = useState<boolean>(false);
  const [themePatch, setThemePatch] = useState<ThemePatch>({});
  //   const debounce = useDebounce();
  const { currentTheme, themeJson, updateThemeJson } = useThemeContext();
  const updateThemeMutation = useUpdateTheme();

  function writePatch(
    patch: ThemePatch,
    path: {
      component: string;
      version?: string;
      variant?: string;
      property: string;
    },
    token: TokenValue,
  ) {
    const { component, version, variant, property } = path;

    patch[component] ??= {};

    if (version) {
      patch[component].versions ??= {};
      patch[component].versions![version] ??= {};

      if (variant) {
        patch[component].versions![version].variants ??= {};
        patch[component].versions![version].variants![variant] ??= {
          tokens: {},
        };
        patch[component].versions![version].variants![variant].tokens[
          property
        ] = token;
      } else {
        patch[component].versions![version].tokens ??= {};
        patch[component].versions![version].tokens![property] = token;
      }

      return;
    }

    if (variant) {
      patch[component].variants ??= {};
      patch[component].variants![variant] ??= { tokens: {} };
      patch[component].variants![variant].tokens[property] = token;
      return;
    }

    patch[component].tokens ??= {};
    patch[component].tokens![property] = token;
  }

  const handlePropertyChange = (propertyName: string, value: string) => {
    !isThemeChanged && setIsThemeChanged(true);

    const convertedJSON = () => {
      const next = structuredClone(themeJson);
      const component = next[selectedComponents?.["component-key"] as string];
      if (!component) return themeJson;

      let updatedToken: TokenValue | undefined;

      // ---------- VERSION ----------
      if ("versions" in component && selectedVersion) {
        const version = component.versions[selectedVersion];
        if (!version) return themeJson;

        // Version + Variant
        if (version.variants && selectedVariant) {
          const variant = version.variants[selectedVariant];
          if (!variant?.tokens[propertyName]) return themeJson;

          variant.tokens[propertyName].value = value;
          updatedToken = structuredClone(variant.tokens[propertyName]);
        }

        // Version only
        else if (version.tokens?.[propertyName]) {
          version.tokens[propertyName].value = value;
          updatedToken = structuredClone(version.tokens[propertyName]);
        }
      }

      // ---------- COMPONENT ----------
      else if ("tokens" in component && component.tokens?.[propertyName]) {
        component.tokens[propertyName].value = value;
        updatedToken = structuredClone(component.tokens[propertyName]);
      }

      // ---------- VARIANT-ONLY ----------
      else {
        const variants =
          "variants" in component
            ? component.variants
            : "varients" in component
              ? component.varients
              : null;

        if (variants && selectedVariant) {
          const variant = variants[selectedVariant];
          if (variant?.tokens[propertyName]) {
            variant.tokens[propertyName].value = value;
            updatedToken = structuredClone(variant.tokens[propertyName]);
          }
        }
      }

      // ---------- PATCH UPDATE ----------
      //   if (updatedToken) {
      //     setThemePatch((prevPatch) => {
      //       const nextPatch = structuredClone(prevPatch);

      //       writePatch(
      //         nextPatch,
      //         {
      //           component: selectedComponents?.["component-key"] as string,
      //           version: selectedVersion,
      //           variant: selectedVariant,
      //           property: propertyName,
      //         },
      //         updatedToken,
      //       );

      //       return nextPatch;
      //     });
      //   }

      return next;
    };

    updateThemeJson(convertedJSON());
  };

  //   useEffect(() => {
  //     if (isThemeChanged)
  //       debounce(() => {
  //         convertAndInject(themePatch);
  //       }, 500);
  //   }, [isThemeChanged, themePatch]);

  const handleResetToDefault = () => {
    if (currentTheme && currentTheme["theme-json"]) {
      updateThemeJson(currentTheme["theme-json"]);
      setThemePatch({});
      resetToDefault();
      setIsThemeChanged(false);
    }
  };

  const handleSaveTheme = async () => {
    if (!currentTheme) {
      alert("No theme selected");
      return;
    }

    try {
      await updateThemeMutation.mutateAsync({
        id: currentTheme.id,
        data: {
          "theme-json": themeJson,
        },
      });
      alert("Theme saved successfully!");
      setIsThemeChanged(false);
      setThemePatch({});
    } catch (error) {
      console.error("Failed to save theme:", error);
      alert("Failed to save theme. Please try again.");
    }
  };

  const renderInput = (property: any) => {
    switch (property.type) {
      case "color":
        return (
          <div className="input-group">
            <input
              type="color"
              className="form-control form-control-color"
              value={property.value}
              onChange={(e) =>
                handlePropertyChange(property.name, e.target.value)
              }
              title={property.name}
            />
            <input
              type="text"
              className="form-control"
              value={property.value}
              onChange={(e) => {
                handlePropertyChange(property.name, e.target.value);
              }}
              placeholder="#000000"
            />
          </div>
        );

      case "select":
        const oprions = getSelectOptions(property.name);
        return (
          <select
            className="form-select"
            value={property.value}
            onChange={(e) =>
              handlePropertyChange(property.name, e.target.value)
            }
          >
            {oprions.map((option) => (
              <option key={option} value={option}>
                {option.replaceAll("-", " ").charAt(0).toUpperCase() +
                  option.slice(1)}
              </option>
            ))}
          </select>
        );

      case "input":
      default: {
        const { number, unit } = parseNumericValue(property.value);

        if (unit) {
          return (
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                value={number}
                onKeyDown={(e) => allowOnlyNumberAndDot(e, number)}
                onChange={(e) =>
                  handlePropertyChange(
                    property.name,
                    composeValue(e.target.value, unit),
                  )
                }
                placeholder="0"
              />
              <span className="input-group-text">{unit}</span>
            </div>
          );
        }

        // Fallback → normal text input
        return (
          <input
            type="text"
            className="form-control"
            value={property.value}
            onKeyDown={(e) => allowOnlyNumberAndDot(e, number)}
            onChange={(e) =>
              handlePropertyChange(property.name, e.target.value)
            }
            placeholder="Enter value"
          />
        );
      }
    }
  };

  return (
    <div className="config-sidebar">
      <div className="sidebar-top">
        {/* Header */}
        <div className="sidebar-header">
          <h5 className="mb-0">Component Configuration</h5>
        </div>

        {/* Component Name */}
        <div className="px-3 py-2 border-bottom bg-light d-flex justify-content-between">
          <p className="mb-0">
            {selectedComponents?.["component-name"] as string}
          </p>
        </div>

        {/* Version Selection */}
        {componentData.hasVersions && (
          <div className="config-section">
            <label className="form-label fw-bold">Version</label>
            <select
              className="form-select"
              value={selectedVersion || ""}
              onChange={(e) => dispatch(setSelectedVersion(e.target.value))}
            >
              {componentData.versions.map((version) => (
                <option key={version} value={version}>
                  {version}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Variant Selection */}
        {componentData.hasVariants && (
          <div className="config-section">
            <label className="form-label fw-bold">Variant</label>
            <select
              className="form-select"
              value={selectedVariant || ""}
              onChange={(e) => dispatch(setSelectedVariant(e.target.value))}
            >
              {componentData.variants.map((variant) => (
                <option key={variant} value={variant}>
                  {variant}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="sidebar-scroll">
        <div className="config-section">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h6 className="mb-0 fw-bold">Properties</h6>
            <span className="badge bg-secondary">
              {componentData.properties.length}
            </span>
          </div>

          {componentData.properties.length === 0 ? (
            <div className="alert alert-info">No properties available</div>
          ) : (
            <div className="properties-list">
              {componentData.properties.map((property) => (
                <div key={property.name} className="property-item">
                  <label className="form-label mb-1">
                    <span className="property-name">
                      {property.name.replace(/-/g, " ")}
                    </span>
                    <span className="badge bg-light text-dark ms-2">
                      {property.type}
                    </span>
                  </label>
                  {renderInput(property)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="d-grid gap-2">
          <button
            className="btn btn-primary"
            onClick={handleSaveTheme}
            disabled={!isThemeChanged || updateThemeMutation.isPending}
          >
            {updateThemeMutation.isPending ? "Saving..." : "Save Theme"}
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={handleResetToDefault}
          >
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigSidebar;

// {
//     // If component doesn't have version and variants
//     "component-key": {
//         "tokens": {
//             "css-property-name": {
//                 "value": "css-property-value", // "#ffffff", "16px", "bold", "Arial, sans-serif"
//                 "type": "color", // "color", "input", "select" , dropdown, slider, etc.
//                 "allow": true // true, false : if false, the property will be hidden in the CSS Builder UI
//             }
//         }
//     },
//     // If component have only variants
//     "component-key": {
//         "variants": {
//             "variant-key": { // "primary", "secondary", "success", "danger", "warning", "info", "light", "dark"
//                 "tokens": {
//                     "css-property-name": {
//                         "value": "css-property-value",
//                         "type": "color",
//                         "allow": true
//                     }
//                 }
//             }
//         }
//     },
//     // If component only have versions, without variants
//     "component-key": {
//         "versions": {
//             "version-key": {
//                 "tokens": {
//                     "css-property-name": {
//                         "value": "css-property-value",
//                         "type": "color",
//                         "allow": true
//                     }
//                 }
//             }
//         }
//     },
//     // If component have versions and variants
//     "component-key": {
//         "versions": {
//             "version-key": {
//                 "variants": {
//                     "variant-key": {
//                         "tokens": {
//                             "css-property-name": {
//                                 "value": "css-property-value",
//                                 "type": "color",
//                                 "allow": true
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }
// }
