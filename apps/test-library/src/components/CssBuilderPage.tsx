import { useAppSelector } from "../redux/store";
import { useComponents } from "../api/components";
import "./CssBuilderPage.css";
import {
  ComponentKey,
  componentRegistry,
} from "../utils/json/componentsMapping";

const CssBuilderPage = () => {
  const { data: componentList } = useComponents();
  const { selectedComponents, selectedVariant, selectedVersion } =
    useAppSelector((state) => state.componwents);

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
            <selectedCompData.component
              variant={selectedVariant}
              version={selectedVersion}
            >
              {selectedCompData.label}
            </selectedCompData.component>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CssBuilderPage;
