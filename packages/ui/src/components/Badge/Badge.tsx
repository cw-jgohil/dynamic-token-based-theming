import type { BadgeProps } from "./types";

const Badge = ({
  children,
  variant = "primary",
  className = "",
  version,
  ...props
}: BadgeProps) => {
  const versionClass = version ? `azv-badge-${version}` : "";

  const classes = [
    "badge",
    `bg-${variant}`,
    `azv-badge-${variant}`,
    versionClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};

export default Badge;
