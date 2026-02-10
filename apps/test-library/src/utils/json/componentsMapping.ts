import type { ComponentType } from "react";
import { Button, DataGrid } from "@repo/ui";
import { getComponentState } from "../../redux/slices/componentSlice";

export type ComponentKey = "btn" | "table";

type ComponentRegistryItem = {
  component: ComponentType<any>;
  label: string;
  props?: Record<string, any>;
};

// Convert to a function that returns the registry
export const getComponentRegistry = (): Record<
  ComponentKey,
  ComponentRegistryItem
> => {
  const componentState = getComponentState(); // Get fresh state every time

  return {
    btn: {
      component: Button,
      label: "Button",
      props: {
        variant: componentState.selectedVariant,
        version: componentState.selectedVersion,
      },
    },
    table: {
      component: DataGrid,
      label: "Table",
      props: {
        rows: [
          ["Action", "Name", "Email", "Role"],
          ["Action", "Name", "Email", "Role"],
          ["Action", "Name", "Email", "Role"],
        ],
        headers: ["Action", "Name", "Email", "Role"],
        enableSearch: true,
        searchPlaceholder: "Search...",
        enablePagination: true,
        pageSize: 5,
        enableCheckbox: true,
        // selectedRowIndices: selected,
        // onSelectionChange: setSelected,
        variant: componentState.selectedVariant,
        version: componentState.selectedVersion,
      },
    },
  };
};

// Helper to get a specific component
export const getComponentByKey = (key: ComponentKey): ComponentRegistryItem => {
  return getComponentRegistry()[key];
};
