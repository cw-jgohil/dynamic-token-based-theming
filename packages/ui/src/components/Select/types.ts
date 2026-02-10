import type React from "react";

export interface SelectProps extends Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "size"
> {
  size?: "sm" | "lg";
  error?: string;
  /** Optional design-system version hook e.g. `azv-select-v1` */
  version?: string;
}

