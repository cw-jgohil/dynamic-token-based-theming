import type { ComponentType } from "react";
import { Button, DataGrid } from "@repo/ui";

export type ComponentKey = "btn" | "table";

type ComponentRegistryItem = {
  component: ComponentType<any>;
  label: string;
};

export const componentRegistry: Record<ComponentKey, ComponentRegistryItem> = {
  btn: {
    component: Button,
    label: "Button",
  },
  table: {
    component: DataGrid,
    label: "Table",
  },
};
