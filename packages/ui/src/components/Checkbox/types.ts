export interface CheckboxProps {
  id: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  /**
   * Additional class applied to both input and label
   */
  className?: string;
}