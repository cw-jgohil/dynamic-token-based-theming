import React from 'react'
import { CheckboxProps } from './types'

const Checkbox = ({ label, id }: CheckboxProps) => {
  return (
    <div className="form-check azv-checkbox">
      <input className="form-check-input" type="checkbox" value="" id={id} />
      <label className="form-check-label" htmlFor={id}>
        {label}
      </label>
    </div>
  )
}

export default Checkbox