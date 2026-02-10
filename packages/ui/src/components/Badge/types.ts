import type { HTMLAttributes, ReactNode } from "react";

export const BADGE_VARIANTS = [
  // Bootstrap contextual variants
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "light",
  "dark",
] as const;

export type BadgeVariant = (typeof BADGE_VARIANTS)[number];

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  /** Optional design-system version hook e.g. `azv-badge-v1` */
  version?: string;
  children?: ReactNode;
}
