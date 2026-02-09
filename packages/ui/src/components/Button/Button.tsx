import type { ButtonProps } from "./types";

const Button = ({
  children,
  variant = "primary",
  size,
  startIcon,
  endIcon,
  className = "",
  type = "button",
  disabled = false,
  version,
  ...props
}: ButtonProps) => {
  const versionClass = version
    ? `azv-btn${variant ? `-${variant}` : ""}${version ? `-${version}` : ""}`
    : "";

  return (
    <button
      type={type}
      disabled={disabled}
      className={`btn btn-${variant} azv-btn-${variant} ${size ? `btn-${size}` : ""} ${versionClass} ${className} ${startIcon || endIcon ? "d-flex align-items-center gap-1" : ""}`}
      {...props}
    >
      {startIcon && (
        <i
          className={`bi bi-${startIcon} azv-btn__icon azv-btn__icon--start`}
        ></i>
      )}
      {children}
      {endIcon && (
        <i className={`bi bi-${endIcon} azv-btn__icon azv-btn__icon--end`}></i>
      )}
    </button>
  );
};

export default Button;
