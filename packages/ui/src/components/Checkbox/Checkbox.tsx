import type { CheckboxProps } from './types';
import { useCheckbox } from './useCheckbox';

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  disabled = false,
}) => {
  const { isChecked, handleChange } = useCheckbox({ id, label, disabled });

  return (
    <div className="form-check azv-checkbox">
      <input
        className="form-check-input"
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
      />
      {label && (
        <label className="form-check-label" htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  );
};
