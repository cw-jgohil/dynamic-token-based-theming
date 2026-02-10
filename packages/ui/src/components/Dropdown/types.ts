import type { HTMLAttributes, ReactNode } from "react";
import type { ButtonSize, ButtonVariant } from "../Button/types";

export interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
  /** Trigger label/content */
  label?: ReactNode;
  /** Button variant for the trigger, reuses Button variants */
  variant?: ButtonVariant;
  /** Button size for the trigger, reuses Button sizes */
  size?: ButtonSize;
  /** Align menu to start or end (Bootstrap: start/end) */
  align?: "start" | "end";
  /** Optional design-system version hook e.g. `azv-dropdown-v1` */
  version?: string;
  /** Additional class for the menu element */
  menuClassName?: string;
  children?: ReactNode;
}

