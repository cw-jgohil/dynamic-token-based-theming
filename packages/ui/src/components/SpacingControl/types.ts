import type { HTMLAttributes } from "react";

export type SpacingSide = "top" | "right" | "bottom" | "left";

export interface SpacingValues {
  top: string;
  right: string;
  bottom: string;
  left: string;
}

export interface SpacingControlValue {
  margin: SpacingValues;
  padding: SpacingValues;
}

export interface SpacingControlProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Optional section title shown above the box, e.g. "Paddings" */
  label?: string;
  /** Controlled value for margin and padding on all 4 sides */
  value: SpacingControlValue;
  /** Change handler called whenever any input changes */
  onChange: (value: SpacingControlValue) => void;
  /** Disable all inputs */
  disabled?: boolean;
}

