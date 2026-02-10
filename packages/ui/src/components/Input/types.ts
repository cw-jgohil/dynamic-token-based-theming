import type { ReactNode } from "react";

export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  size?: "sm" | "lg";
  error?: string;
  version?: string;
}
