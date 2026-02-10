import React from "react";
import type { DropdownProps } from "./types";

const Dropdown = ({
  label,
  variant = "secondary",
  size = "default",
  align = "start",
  className = "",
  version,
  menuClassName = "",
  children,
  ...rest
}: DropdownProps) => {
  const [open, setOpen] = React.useState(false);

  const versionClass = version ? `azv-dropdown-${version}` : "";

  const rootClasses = ["azv-dropdown", "dropdown", className, versionClass]
    .filter(Boolean)
    .join(" ");

  const triggerClasses = [
    "btn",
    `btn-${variant}`,
    `azv-btn-${variant}`,
    size !== "default" && `btn-${size}`,
    size !== "default" && `azv-btn-${size}`,
    "dropdown-toggle",
    "azv-dropdown-toggle",
  ]
    .filter(Boolean)
    .join(" ");

  const menuAlignClass = align === "end" ? "dropdown-menu-end" : "dropdown-menu-start";

  const menuClasses = [
    "dropdown-menu",
    menuAlignClass,
    open && "show",
    "azv-dropdown-menu",
    menuClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleBlur: React.FocusEventHandler<HTMLDivElement> = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setOpen(false);
    }
  };

  return (
    <div className={rootClasses} onBlur={handleBlur} {...rest}>
      <button
        type="button"
        className={triggerClasses}
        onClick={handleToggle}
        aria-expanded={open}
      >
        {label}
      </button>

      <div className={menuClasses}>{children}</div>
    </div>
  );
};

export default Dropdown;

