import type { ComponentType } from "react";
import { Button } from "@repo/ui";

export type ComponentKey = "btn";

type ComponentRegistryItem = {
  component: ComponentType<any>;
  label: string;
};

export const componentRegistry: Record<ComponentKey, ComponentRegistryItem> = {
  btn: { component: Button, label: "Button" },
};
