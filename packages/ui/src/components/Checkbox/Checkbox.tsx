import React from "react";
import { CheckboxProps } from "./types";

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, id, ...props }, ref) => {
    return (
      <div className="azv-checkbox form-check">
        <input
          ref={ref}
          className="form-check-input azv-checkbox-input"
          type="checkbox"
          id={id}
          {...props}
        />
        <label className="form-check-label azv-checkbox-label" htmlFor={id}>
          {label}
        </label>
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
