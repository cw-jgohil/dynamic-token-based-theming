import { useEffect, useState } from "react";
import ConfigSidebar from "../../components/ConfigSidebar";
import { useComponentProperties } from "../../utils/hooks/useComponentProperties";
import ComponentSidebar from "../../components/ComponentSidebar";
import CssBuilderPage from "../../components/CssBuilderPage";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  setSelectedVariant,
  setSelectedVersion,
} from "../../redux/slices/componentSlice";
import { useThemeContext } from "../../context/ThemeContext";

const CssBuilder = () => {
  const dispatch = useAppDispatch();
  const { selectedVersion, selectedVariant, selectedComponents } =
    useAppSelector((state) => state.components);
  const { themeJson } = useThemeContext();
  const [previewDisabled, setPreviewDisabled] = useState(false);

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

  useEffect(() => {
    setPreviewDisabled(false);
  }, [selectedComponents?.["component-key"] as string]);

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        minHeight: 0,
        overflow: "hidden",
      }}
    >
      <ComponentSidebar />
      <CssBuilderPage previewDisabled={previewDisabled} />
      <ConfigSidebar
        componentData={componentData}
        previewDisabled={previewDisabled}
        setPreviewDisabled={setPreviewDisabled}
      />
    </div>
  );
};

export default CssBuilder;
