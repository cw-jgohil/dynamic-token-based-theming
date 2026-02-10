import type { SelectProps } from "./types";

export const Select = ({
  size,
  error,
  className = "",
  version,
  children,
  ...selectProps
}: SelectProps) => {
  const hasError = Boolean(error);
  const versionClass = version ? `azv-select-${version}` : "";

  const rootClasses = [
    "azv-select",
    hasError && "azv-select-error",
    className,
    versionClass,
  ]
    .filter(Boolean)
    .join(" ");

  const selectClasses = [
    "form-select",
    size && `form-select-${size}`,
    "azv-form-select",
    hasError && "is-invalid",
    versionClass,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClasses}>
      <select
        className={selectClasses}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${selectProps.id}-error` : undefined}
        {...selectProps}
      >
        {children}
      </select>

      {hasError && (
        <div
          id={`${selectProps.id}-error`}
          className="invalid-feedback azv-select-error"
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default Select;
