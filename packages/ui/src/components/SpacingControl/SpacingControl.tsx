import type { ChangeEvent } from "react";
import type {
  SpacingControlProps,
  SpacingControlValue,
  SpacingSide,
} from "./types";

const updateSpacing = (
  current: SpacingControlValue,
  layer: "margin" | "padding",
  side: SpacingSide,
  nextValue: string,
): SpacingControlValue => ({
  ...current,
  [layer]: {
    ...current[layer],
    [side]: nextValue,
  },
});

export const SpacingControl = ({
  label,
  value,
  onChange,
  disabled,
  className = "",
  ...rest
}: SpacingControlProps) => {
  const handleChange =
    (layer: "margin" | "padding", side: SpacingSide) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const next = updateSpacing(value, layer, side, event.target.value);
      onChange(next);
    };

  const rootClasses = ["azv-spacing-control", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClasses} {...rest}>
      {label && (
        <div className="azv-spacing-control-header">
          <span>{label}</span>
        </div>
      )}

      <div className="azv-spacing-control-box">
        {/* Outer margin box */}
        <div className="azv-spacing-control-margin-box">
          <span className="azv-spacing-control-label azv-spacing-control-label-margin">
            margin
          </span>

          {/* Margin inputs */}
          <input
            type="text"
            className="form-control form-control-sm azv-spacing-input azv-spacing-input-margin-top"
            aria-label="margin top"
            value={value.margin.top}
            onChange={handleChange("margin", "top")}
            disabled={disabled}
          />
          <input
            type="text"
            className="form-control form-control-sm azv-spacing-input azv-spacing-input-margin-right"
            aria-label="margin right"
            value={value.margin.right}
            onChange={handleChange("margin", "right")}
            disabled={disabled}
          />
          <input
            type="text"
            className="form-control form-control-sm azv-spacing-input azv-spacing-input-margin-bottom"
            aria-label="margin bottom"
            value={value.margin.bottom}
            onChange={handleChange("margin", "bottom")}
            disabled={disabled}
          />
          <input
            type="text"
            className="form-control form-control-sm azv-spacing-input azv-spacing-input-margin-left"
            aria-label="margin left"
            value={value.margin.left}
            onChange={handleChange("margin", "left")}
            disabled={disabled}
          />

          {/* Inner padding box */}
          <div className="azv-spacing-control-padding-box">
            <span className="azv-spacing-control-label azv-spacing-control-label-padding">
              padding
            </span>

            <input
              type="text"
              className="form-control form-control-sm azv-spacing-input azv-spacing-input-padding-top"
              aria-label="padding top"
              value={value.padding.top}
              onChange={handleChange("padding", "top")}
              disabled={disabled}
            />
            <input
              type="text"
              className="form-control form-control-sm azv-spacing-input azv-spacing-input-padding-right"
              aria-label="padding right"
              value={value.padding.right}
              onChange={handleChange("padding", "right")}
              disabled={disabled}
            />
            <input
              type="text"
              className="form-control form-control-sm azv-spacing-input azv-spacing-input-padding-bottom"
              aria-label="padding bottom"
              value={value.padding.bottom}
              onChange={handleChange("padding", "bottom")}
              disabled={disabled}
            />
            <input
              type="text"
              className="form-control form-control-sm azv-spacing-input azv-spacing-input-padding-left"
              aria-label="padding left"
              value={value.padding.left}
              onChange={handleChange("padding", "left")}
              disabled={disabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

