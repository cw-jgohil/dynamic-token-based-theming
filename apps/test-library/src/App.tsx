import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { MENU_ITEMS } from "./components/Sidebar/Sidebar.constants";
import { AppRoutes } from "./routes";
import { ThemeProvider } from "./context/ThemeContext";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { useEffect, useState } from "react";
import { useComponentProperties } from "./utils/hooks/useComponentProperties";
import { setSelectedVariant, setSelectedVersion } from "./redux/slices/componentSlice";
import { ThemeTokens } from "./utils/hooks/useCssConversion";
import { json } from "./utils/json/cssJson";

function App() {
  const dispatch = useAppDispatch();
  const { selectedVersion, selectedVariant, selectedComponents } =
    useAppSelector((state) => state.components);
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
    <ThemeProvider>
      <BrowserRouter>
        <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
          <Sidebar menuItems={MENU_ITEMS} />
          <div style={{ flex: 1, overflow: "auto" }}>
            <AppRoutes />
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
