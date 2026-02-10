import { useAppSelector } from "../redux/store";
import "./CssBuilderPage.css";
import {
  ComponentKey,
  getComponentByKey,
} from "../utils/json/componentsMapping";
import { useMemo } from "react";

const CssBuilderPage = () => {
  const { selectedComponents, selectedVariant, selectedVersion } =
    useAppSelector((state) => state.components);

  const selectedCompData = useMemo(() => {
    return selectedComponents
      ? getComponentByKey(selectedComponents["component-key"] as ComponentKey)
      : null;
  }, [selectedComponents, selectedVariant, selectedVersion]);

  return (
    <div className="css-builder-container">
      <div className="css-builder-header">
        <h5 className="mb-0">CSS Builder</h5>
      </div>
      <div className="css-builder-content">
        {selectedCompData ? (
          <div className="css-builder-content-item m-2">
            <selectedCompData.component
              {...(selectedCompData.props ? selectedCompData.props : {})}
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
