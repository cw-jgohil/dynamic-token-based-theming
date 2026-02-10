import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ConfigSidebar from "./components/ConfigSidebar";
import { useEffect, useState } from "react";
import { useComponentProperties } from "./utils/hooks/useComponentProperties";
import { ThemeTokens } from "./utils/hooks/useCssConversion";
import ComponentSidebar from "./components/ComponentSidebar";
import CssBuilderPage from "./components/CssBuilderPage";
import { useAppDispatch, useAppSelector } from "./redux/store";
import {
  setSelectedVariant,
  setSelectedVersion,
} from "./redux/slices/componentSlice";
import { json } from "./utils/json/cssJson";

function App() {
  const dispatch = useAppDispatch();
  const { selectedVersion, selectedVariant, selectedComponents } =
    useAppSelector((state) => state.componwents);
  const [themeJson, setThemeJson] = useState<ThemeTokens>(json);

  const componentData = useComponentProperties(
    themeJson,
    selectedComponents?.["component-key"] as string,
    selectedVersion,
    selectedVariant,
  );

  useEffect(() => {
    if (
      componentData.hasVersions &&
      (!selectedVersion || !componentData.versions.includes(selectedVersion))
    ) {
      dispatch(setSelectedVersion(componentData.versions[0]));
    }

    if (
      componentData.hasVariants &&
      (!selectedVariant || !componentData.variants.includes(selectedVariant))
    ) {
      dispatch(setSelectedVariant(componentData.variants[0]));
    }
  }, [
    selectedComponents?.["component-key"] as string,
    componentData.versions,
    componentData.variants,
  ]);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <ComponentSidebar />
      <CssBuilderPage />
      <ConfigSidebar
        componentData={componentData}
        setThemeJson={setThemeJson}
      />
    </div>
  );
}

export default App;
