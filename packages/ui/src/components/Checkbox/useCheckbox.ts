import { useState } from "react";
import type { CheckboxProps } from "./types";

export const useCheckbox = ({
    checked = false,
    onChange,
}: CheckboxProps) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.checked;
      setIsChecked(value);
      onChange?.(value);
    };

  return { isChecked, handleChange };
};