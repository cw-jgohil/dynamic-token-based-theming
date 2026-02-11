import { useEffect } from "react";
import { useComponents } from "../../api/components";
import { useThemes } from "../../api/themes";
import {
  ComponentKey,
  componentRegistry,
} from "../../utils/json/componentsMapping";
import { useThemeContext } from "../../context/ThemeContext";

const Home = () => {
  const { data: components, isLoading: componentsLoading } = useComponents();
  const { data: themes, isLoading: themesLoading } = useThemes();
  const { currentTheme, themeJson, setCurrentTheme } = useThemeContext();

  // Set first theme as default when themes are loaded
  useEffect(() => {
    if (themes && themes.length > 0 && !currentTheme) {
      setCurrentTheme(themes[0]);
    }
  }, [themes, currentTheme, setCurrentTheme]);

  // Extract all variants for a component
  const getComponentVariants = (componentKey: string) => {
    const component = themeJson[componentKey];
    if (!component || typeof component !== "object") return [];

    const variants = new Set<string>();

    // Handle components with versions
    if ("versions" in component && component.versions) {
      Object.values(component.versions).forEach((version) => {
        if (version && version.variants) {
          Object.keys(version.variants).forEach((variant) =>
            variants.add(variant),
          );
        }
      });
    }

    // Handle components without versions but with variants
    const componentVariants =
      "variants" in component
        ? component.variants
        : "varients" in component
          ? component.varients
          : undefined;
    if (componentVariants && typeof componentVariants === "object") {
      Object.keys(componentVariants).forEach((variant) =>
        variants.add(variant),
      );
    }

    return Array.from(variants);
  };

  // Get the first version for a component (if it has versions)
  const getFirstVersion = (componentKey: string) => {
    const component = themeJson[componentKey];
    if (!component || typeof component !== "object") return undefined;

    if ("versions" in component && component.versions) {
      return Object.keys(component.versions)[0];
    }

    return undefined;
  };

  const handleThemeChange = (themeId: string) => {
    const selectedTheme = themes?.find((t) => t.id === themeId);
    if (selectedTheme) {
      setCurrentTheme(selectedTheme);
    }
  };

  const isLoading = componentsLoading || themesLoading;

  return (
    <div className="container-fluid p-4">
      {/* Header with Theme Switcher */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <h2>Component Library</h2>
            <div className="d-flex align-items-center gap-3">
              <label htmlFor="theme-select" className="form-label mb-0">
                Theme:
              </label>
              <select
                id="theme-select"
                className="form-select"
                style={{ width: "250px" }}
                value={currentTheme?.id || ""}
                onChange={(e) => handleThemeChange(e.target.value)}
                disabled={themesLoading}
              >
                {themesLoading && <option>Loading themes...</option>}
                {themes?.map((theme) => (
                  <option key={theme.id} value={theme.id}>
                    {theme.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "400px" }}
        >
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* Components Grid */}
      {!isLoading && components && components.length > 0 && (
        <div className="row g-4">
          {components.map((component) => {
            const variants = getComponentVariants(component["component-key"]);
            const firstVersion = getFirstVersion(component["component-key"]);
            const registryItem =
              componentRegistry[component["component-key"] as ComponentKey];

            return (
              <div key={component.id} className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">
                      {component["component-name"]}
                    </h5>
                    <p className="card-text text-muted small mb-3">
                      Component Key: <code>{component["component-key"]}</code>
                      {firstVersion && (
                        <>
                          {" "}
                          | Version: <code>{firstVersion}</code>
                        </>
                      )}
                    </p>

                    {/* Variants Preview */}
                    {registryItem && (
                      <>
                        {component["component-key"] === "btn" &&
                        variants.length > 0 ? (
                          <div>
                            <h6 className="small fw-bold mb-3">
                              All Variants ({variants.length}):
                            </h6>
                            <div className="d-flex flex-wrap gap-3 mb-3">
                              {variants.map((variant) => (
                                <div
                                  key={variant}
                                  className="d-flex flex-column align-items-start gap-2"
                                >
                                  <span className="badge bg-secondary text-capitalize">
                                    {variant}
                                  </span>
                                  <registryItem.component
                                    variant={variant}
                                    version={firstVersion}
                                  >
                                    {variant.charAt(0).toUpperCase() +
                                      variant.slice(1)}{" "}
                                    Button
                                  </registryItem.component>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : component["component-key"] === "table" ? (
                          <div>
                            <h6 className="small fw-bold mb-3">Preview:</h6>
                            <div className="mt-3">
                              <registryItem.component
                                version={firstVersion}
                                rows={[
                                  ["John Doe", "john@example.com", "Admin"],
                                  ["Jane Smith", "jane@example.com", "User"],
                                  ["Bob Johnson", "bob@example.com", "User"],
                                ]}
                                headers={["Name", "Email", "Role"]}
                                enableSearch={true}
                                searchPlaceholder="Search..."
                                enablePagination={true}
                                pageSize={5}
                                enableCheckbox={true}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="mb-3">
                            <span className="badge bg-light text-dark">
                              No preview available
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && (!components || components.length === 0) && (
        <div className="text-center py-5">
          <h4 className="text-muted">No components found</h4>
          <p className="text-muted">Check your API connection</p>
        </div>
      )}
    </div>
  );
};

export default Home;
