import type { InputProps } from './types';

export const Input = ({
  startIcon,
  endIcon,
  size,
  className = '',
  ...inputProps
}: InputProps) => {
  const hasAddons = startIcon != null || endIcon != null;
  const sizeClass = size ? `input-group-${size}` : '';

  const inputEl = (
    <input
      className={`form-control azv-input`.trim()}
      {...inputProps}
    />
  );

  if (!hasAddons) {
    return inputEl;
  }

  return (
    <div className={`input-group azv-input-group ${sizeClass} ${className}`.trim()}>
      {startIcon != null && (
        <span className="input-group-text">{startIcon}</span>
      )}
      {inputEl}
      {endIcon != null && (
        <span className="input-group-text">{endIcon}</span>
      )}
    </div>
  );
};
