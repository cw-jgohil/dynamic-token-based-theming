import type { ComponentType } from "react";
import {
  Badge,
  Button,
  Checkbox,
  DataGrid,
  Input,
  ListView,
  Pagination,
  Select,
} from "@repo/ui";

export type ComponentKey =
  | "btn"
  | "table"
  | "listview"
  | "input"
  | "pagination"
  | "badge"
  | "checkbox"
  | "select";

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
  listview: {
    component: ListView,
    label: "ListView",
  },
  input: {
    component: Input,
    label: "Input",
  },
  pagination: {
    component: Pagination,
    label: "Pagination",
  },
  badge: {
    component: Badge,
    label: "Badge",
  },
  checkbox: {
    component: Checkbox,
    label: "Checkbox",
  },
  select: {
    component: Select,
    label: "Select",
  },
};
