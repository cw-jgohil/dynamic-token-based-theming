
import type { ButtonProps } from "./types";
 
const Button = ({
  children,
  variant = "primary", // Bootstrap variant
  size,               // sm | lg
  startIcon,
  endIcon,
  className = "",
  type = "button",
  disabled = false,
  ...props
}: ButtonProps) => {
 
  return (
    <button
      type={type}
      disabled={disabled}
      className={`btn btn-${variant} azv-btn-${variant} ${size ? `btn-${size}` : ""} ${className} ${startIcon || endIcon ? "d-flex align-items-center gap-1" : ""}`}
      {...props}
    >
      {startIcon && <i className={`bi bi-${startIcon} azv-btn-icon`}></i>}
      {children}
      {endIcon && <i className={`bi bi-${endIcon} azv-btn-icon`}></i>}
    </button>
  );
};
 
export default Button;