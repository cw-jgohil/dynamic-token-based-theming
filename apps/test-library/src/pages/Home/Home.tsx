import { useState, useEffect } from "react";
import { useComponents } from "../../api/components";
import { useThemes, useCreateTheme, useDeleteTheme } from "../../api/themes";
import {
  ComponentKey,
  componentRegistry,
} from "../../utils/json/componentsMapping";
import { useThemeContext } from "../../context/ThemeContext";
import { useCssConversion } from "../../utils/hooks/useCssConversion";
import {
  LISTVIEW_COLUMNS,
  LISTVIEW_ROWS,
  type ListViewDemoRow,
} from "../../constants/listview";

const Home = () => {
  const { data: components, isLoading: componentsLoading } = useComponents();
  const { data: themes, isLoading: themesLoading } = useThemes();
  const { currentTheme, themeJson, themeUpdatedChanges, setCurrentTheme } =
    useThemeContext();
  const { generateCss, injectCss } = useCssConversion();
  const [listViewActiveIndex, setListViewActiveIndex] = useState<number>(0);
  const [paginationPage, setPaginationPage] = useState<number>(1);
  const createTheme = useCreateTheme();
  const deleteTheme = useDeleteTheme();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newThemeName, setNewThemeName] = useState("");
  const [newThemeDescription, setNewThemeDescription] = useState("");

  // Set first theme as default when themes are loaded
  useEffect(() => {
    if (themes && themes.length > 0 && !currentTheme) {
      setCurrentTheme(themes[0]);
    }
  }, [themes, currentTheme, setCurrentTheme]);

  const handleCreateTheme = async (event: React.FormEvent) => {
    event.preventDefault();
    const name = newThemeName.trim();
    const description = newThemeDescription.trim();

    if (!name || !description) {
      return;
    }

    try {
      await createTheme.mutateAsync({ name, description });
      setNewThemeName("");
      setNewThemeDescription("");
      setIsCreateOpen(false);
    } catch (error) {
      console.error("Failed to create theme:", error);
      alert("Failed to create theme. Please try again.");
    }
  };

  const handleDeleteTheme = async () => {
    if (!currentTheme || currentTheme.id === "1") {
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete theme "${currentTheme.name}"?`,
    );
    if (!confirmDelete) return;

    try {
      await deleteTheme.mutateAsync(currentTheme.id);
      // Clear selection so the next themes fetch can reset to the default theme
      setCurrentTheme(null);
    } catch (error) {
      console.error("Failed to delete theme:", error);
      alert("Failed to delete theme. Please try again.");
    }
  };

  // Inject only updatedChanges into azv-theme (no azv-theme-base)
  useEffect(() => {
    const patch = themeUpdatedChanges?.components ?? {};
    const global = themeUpdatedChanges?.global;
    const hasPatch =
      patch && typeof patch === "object" && Object.keys(patch).length > 0;
    const hasGlobal =
      global && typeof global === "object" && Object.keys(global).length > 0;
    if (!hasPatch && !hasGlobal) {
      const el = document.getElementById("azv-theme");
      if (el) el.remove();
      return;
    }

    const css = generateCss(
      hasPatch ? patch : {},
      hasGlobal ? global : undefined,
    );
    if (!css.trim()) return;
    injectCss(css, "azv-theme");
  }, [themeUpdatedChanges, generateCss, injectCss]);

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
              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={() => setIsCreateOpen(true)}
                disabled={themesLoading || createTheme.isPending}
              >
                {createTheme.isPending ? "Creating..." : "Create"}
              </button>
              {currentTheme && currentTheme.id !== "1" && (
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={handleDeleteTheme}
                  disabled={themesLoading || deleteTheme.isPending}
                >
                  {deleteTheme.isPending ? "Deleting..." : "Delete"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {isCreateOpen && (
        <div className="row mb-4">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-3">Create New Theme</h5>
                <form className="row g-3" onSubmit={handleCreateTheme}>
                  <div className="col-md-4">
                    <label className="form-label">Name</label>
                    <input
                      className="form-control"
                      value={newThemeName}
                      onChange={(e) => setNewThemeName(e.target.value)}
                      disabled={createTheme.isPending}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Description</label>
                    <input
                      className="form-control"
                      value={newThemeDescription}
                      onChange={(e) => setNewThemeDescription(e.target.value)}
                      disabled={createTheme.isPending}
                      required
                    />
                  </div>
                  <div className="col-md-2 d-flex align-items-end gap-2">
                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      disabled={createTheme.isPending}
                    >
                      {createTheme.isPending ? "Creating..." : "Save"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary w-100"
                      onClick={() => {
                        setIsCreateOpen(false);
                        setNewThemeName("");
                        setNewThemeDescription("");
                      }}
                      disabled={createTheme.isPending}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

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
                        ) : component["component-key"] === "listview" ? (
                          <div>
                            <h6 className="small fw-bold mb-3">Preview:</h6>
                            <div className="mt-3" style={{ maxWidth: "480px" }}>
                              <registryItem.component
                                version={firstVersion}
                                rows={LISTVIEW_ROWS}
                                columns={LISTVIEW_COLUMNS}
                                showHeader={true}
                                enableSearch={true}
                                searchPlaceholder="Search team..."
                                enablePagination={true}
                                pageSize={2}
                                paginationSize="sm"
                                keyExtractor={(row: ListViewDemoRow) => row.id}
                                onRowClick={(
                                  _row: ListViewDemoRow,
                                  index: number,
                                ) => setListViewActiveIndex(index)}
                                activeIndex={listViewActiveIndex}
                                emptyMessage="No items to display."
                                aria-label="Team list"
                              />
                            </div>
                          </div>
                        ) : component["component-key"] === "input" ? (
                          <div>
                            <h6 className="small fw-bold mb-3">Preview:</h6>
                            <div className="mt-3" style={{ maxWidth: "320px" }}>
                              <registryItem.component
                                version={firstVersion}
                                placeholder="Type here..."
                                aria-label="Demo input"
                              />
                            </div>
                          </div>
                        ) : component["component-key"] === "pagination" ? (
                          <div>
                            <h6 className="small fw-bold mb-3">Preview:</h6>
                            <div className="mt-3">
                              <registryItem.component
                                version={firstVersion}
                                currentPage={paginationPage}
                                totalPages={5}
                                onPageChange={setPaginationPage}
                                showFirstLast
                              />
                            </div>
                          </div>
                        ) : component["component-key"] === "badge" ? (
                          <div>
                            <h6 className="small fw-bold mb-3">
                              All Variants ({variants.length || 8}):
                            </h6>
                            <div className="d-flex flex-wrap gap-2">
                              {(variants.length
                                ? variants
                                : [
                                    "primary",
                                    "secondary",
                                    "success",
                                    "danger",
                                    "warning",
                                    "info",
                                    "light",
                                    "dark",
                                  ]
                              ).map((variant) => (
                                <registryItem.component
                                  key={variant}
                                  variant={variant}
                                  version={firstVersion}
                                >
                                  {variant}
                                </registryItem.component>
                              ))}
                            </div>
                          </div>
                        ) : component["component-key"] === "checkbox" ? (
                          <div>
                            <h6 className="small fw-bold mb-3">Preview:</h6>
                            <registryItem.component
                              label="Checkbox label"
                              defaultChecked
                            />
                          </div>
                        ) : component["component-key"] === "select" ? (
                          <div>
                            <h6 className="small fw-bold mb-3">Preview:</h6>
                            <div className="mt-3" style={{ maxWidth: "320px" }}>
                              <registryItem.component
                                version={firstVersion}
                                defaultValue="option1"
                                aria-label="Demo select"
                              >
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                              </registryItem.component>
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
