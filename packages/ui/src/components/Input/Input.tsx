import type { InputProps } from "./types";

export const Input = ({
  startIcon,
  endIcon,
  size,
  error,
  className = "",
  ...inputProps
}: InputProps) => {
  const hasAddons = Boolean(startIcon || endIcon);
  const hasError = Boolean(error);

  const rootClasses = ["azv-input", hasError && "azv-input-error", className]
    .filter(Boolean)
    .join(" ");

  const groupClasses = [
    "input-group",
    size && `input-group-${size}`,
    "azv-input-group",
  ]
    .filter(Boolean)
    .join(" ");

  const inputClasses = [
    "form-control",
    "azv-form-control",
    hasError && "is-invalid",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClasses}>
      {hasAddons ? (
        <div className={groupClasses}>
          {startIcon && (
            <span className="input-group-text azv-input-addon">
              {startIcon}
            </span>
          )}

          <input
            className={inputClasses}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${inputProps.id}-error` : undefined}
            {...inputProps}
          />

          {endIcon && (
            <span className="input-group-text azv-input-addon">{endIcon}</span>
          )}
        </div>
      ) : (
        <input
          className={inputClasses}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${inputProps.id}-error` : undefined}
          {...inputProps}
        />
      )}

      {hasError && (
        <div
          id={`${inputProps.id}-error`}
          className="invalid-feedback azv-input-error"
        >
          {error}
        </div>
      )}
    </div>
  );
};
