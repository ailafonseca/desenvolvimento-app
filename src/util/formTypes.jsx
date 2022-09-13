import React from 'react'
import PropTypes from 'prop-types'

export const InputComponent = ({ name, type, defaultValue, disabled, value, onChange, className, invalid }) =>
  (
    <input
      type={type}
      name={name}
      id={name}
      className={'form-control' + (className ? ' ' + className : '') + (invalid ? ' invalid' : '')}
      autoComplete='off'
      defaultValue={defaultValue}
      disabled={disabled}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )

InputComponent.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string.isRequired,
  defaultValue: PropTypes.number,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
}
