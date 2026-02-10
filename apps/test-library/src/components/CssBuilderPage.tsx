import { useAppSelector } from "../redux/store";
import "./CssBuilderPage.css";
import {
  ComponentKey,
  componentRegistry,
} from "../utils/json/componentsMapping";

const CssBuilderPage = () => {
  const { selectedComponents, selectedVariant, selectedVersion } =
    useAppSelector((state) => state.components);

  const selectedCompData = selectedComponents
    ? componentRegistry[selectedComponents["component-key"] as ComponentKey]
    : null;

  return (
    <div className="css-builder-container">
      <div className="css-builder-header">
        <h5 className="mb-0">CSS Builder</h5>
      </div>
      <div className="css-builder-content">
        {selectedCompData ? (
          <div className="css-builder-content-item m-2">
            {selectedComponents?.["component-key"] === "table" ? (
              <selectedCompData.component
                variant={selectedVariant}
                version={selectedVersion}
                rows={[
                  ["Action", "Name", "Email", "Role"],
                  ["Action", "Name", "Email", "Role"],
                  ["Action", "Name", "Email", "Role"],
                ]}
                headers={["Action", "Name", "Email", "Role"]}
                enableSearch={true}
                searchPlaceholder="Search..."
                enablePagination={true}
                pageSize={5}
                enableCheckbox={true}
              />
            ) : (
              <selectedCompData.component
                variant={selectedVariant}
                version={selectedVersion}
              >
                {selectedCompData.label}
              </selectedCompData.component>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CssBuilderPage;
