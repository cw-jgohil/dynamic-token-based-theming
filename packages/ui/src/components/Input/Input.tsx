import type { InputProps } from "./types";

export const Input = ({
  startIcon,
  endIcon,
  size,
  error,
  className = "",
  version,
  ...inputProps
}: InputProps) => {
  const hasAddons = Boolean(startIcon || endIcon);
  const hasStartIcon = Boolean(startIcon);
  const hasError = Boolean(error);

  const versionClass = version ? `azv-input-${version}` : "";

  const rootClasses = [
    "azv-input",
    hasError && "azv-input-error",
    className,
    versionClass,
  ]
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
    hasStartIcon && "azv-form-control-with-start-icon",
    versionClass,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClasses}>
      {hasAddons ? (
        <div className={groupClasses}>
          {startIcon && (
            <div className="azv-input-icon-start">
              <i className={`bi bi-${startIcon} azv-input-icon`}></i>
            </div>
          )}

          <input
            className={inputClasses}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${inputProps.id}-error` : undefined}
            {...inputProps}
          />

          {endIcon && <i className={`bi bi-${endIcon} azv-input-icon`}></i>}
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
