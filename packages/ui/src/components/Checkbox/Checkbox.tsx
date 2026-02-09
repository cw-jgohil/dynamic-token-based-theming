import React from "react";
import { CheckboxProps } from "./types";

const Checkbox = ({ label, id }: CheckboxProps) => {
  return (
    <div className="azv-checkbox form-check">
      <input
        className="form-check-input azv-checkbox__input"
        type="checkbox"
        id={id}
      />
      <label className="form-check-label azv-checkbox__label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
