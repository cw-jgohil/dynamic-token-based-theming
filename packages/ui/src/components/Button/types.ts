import type { ButtonHTMLAttributes } from 'react';

export const BUTTON_VARIANTS = [
  /* ---------- Bootstrap solid ---------- */
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'light',
  'dark',

  /* ---------- Bootstrap outline ---------- */
  'outline-primary',
  'outline-secondary',
  'outline-success',
  'outline-danger',
  'outline-warning',
  'outline-info',
  'outline-light',
  'outline-dark',

  /* ---------- Custom design-system ---------- */
  'ghost',
  'list',
  'linkText',
  'time',
  'link',
  'btnGradient',
  'btnGreen',
] as const;

export const BUTTON_SIZES = ['default', 'sm', 'md', 'lg'] as const;

export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];
export type ButtonSize = (typeof BUTTON_SIZES)[number];

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  loading?: boolean;
  buttonChildWrapperClasses?: string;
  startIcon?: string;
  endIcon?: string;
  isLoadingButton?: boolean;
  disableRipple?: boolean;
  tabIndex?: number;
  children?: React.ReactNode;
  version?: string
}
