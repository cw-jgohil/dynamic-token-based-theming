import type { ReactNode } from 'react';

export interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size'
  > {
  /** Optional icon or content rendered before the input (Bootstrap input-group start). */
  startIcon?: ReactNode;
  /** Optional icon or content rendered after the input (Bootstrap input-group end). */
  endIcon?: ReactNode;
  /** Bootstrap input-group size when using icons. */
  size?: 'sm' | 'lg';
}
