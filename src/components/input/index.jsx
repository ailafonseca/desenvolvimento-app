import React from 'react'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import MaskedInput from 'react-maskedinput'
import validation from 'modules/signup/validation'
import Select from 'react-select'

class Input extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      erro: '',
    }
  }

  render() {
    const { id, label, hasError, type, valor, name, placeholder, errorClass, onBlur, onChange, mask, children, isSearchable, containerClass, className, ...rest } = this.props
    const { erro } = this.state

    if (type === 'textarea') {
      return (
        <div className={containerClass ? containerClass : 'form-group'}>
          <label htmlFor={id}>{label}</label>
          {erro !== '' ? (
            <OverlayTrigger placement="auto" overlay={<Tooltip id="tooltip-disabled">{erro}</Tooltip>} trigger={['hover', 'hover']}>
              <textarea
                name={name}
                id={id}
                placeholder={placeholder}
                aria-describedby="nameHelpBlock"
                className={erro !== '' ? errorClass : ''}
                onBlur={(e) => this.setState({ erro: validation(e.target.name, e.target.value, e.target.classList) }, () => onBlur && onBlur())}
                onChange={(e) => onChange(e)}
                {...rest}
              />
            </OverlayTrigger>
          ) : (
            <textarea
              name={name}
              id={id}
              placeholder={placeholder}
              aria-describedby="nameHelpBlock"
              className={erro !== '' ? errorClass : ''}
              onBlur={(e) => this.setState({ erro: validation(e.target.name, e.target.value, e.target.classList) }, () => onBlur && onBlur())}
              onChange={(e) => onChange(e)}
              {...rest}
            />
          )}
        </div>
      )
    }

    if (type === 'select') {
      return (
        <div className={containerClass ? containerClass : 'form-group'}>
          <label htmlFor={id}>{label}</label>
          {erro !== '' ? (
            <OverlayTrigger placement="auto" overlay={<Tooltip id="tooltip-disabled">{erro}</Tooltip>} trigger={['hover', 'hover']}>
              <Select
                isSearchable
                name={name}
                id={id}
                placeholder={placeholder}
                aria-describedby="nameHelpBlock"
                className={erro !== '' ? errorClass : ''}
                onBlur={(e) => this.setState({ erro: validation(e.target.name, e.target.value, e.target.classList) }, () => onBlur && onBlur())}
                onChange={(e) => onChange(e)}
                styles={{
                  // Fixes the overlapping problem of the component
                  menu: (provided) => ({ ...provided, zIndex: 9999 }),
                }}
                {...rest}
              />
            </OverlayTrigger>
          ) : (
            <Select
              isSearchable
              name={name}
              id={id}
              placeholder={placeholder}
              aria-describedby="nameHelpBlock"
              onBlur={(e) => this.setState({ erro: validation(e.target.name, e.target.value, e.target.classList) }, () => onBlur && onBlur())}
              onChange={(e) => onChange(e)}
              styles={{
                // Fixes the overlapping problem of the component
                menu: (provided) => ({ ...provided, zIndex: 9999 }),
              }}
              {...rest}
            />
          )}
        </div>
      )
    }

    if (mask && type !== 'select') {
      return (
        <div className={containerClass ? containerClass : 'form-group'}>
          <label htmlFor={id}>{label}</label>
          {erro !== '' ? (
            <OverlayTrigger placement="auto" overlay={<Tooltip id="tooltip-disabled">{erro}</Tooltip>} trigger={['hover', 'hover']}>
              <MaskedInput
                mask={mask}
                type={type}
                name={name}
                id={id}
                placeholder={placeholder}
                aria-describedby="nameHelpBlock"
                className={`${erro !== '' ? errorClass : ''} form-control`}
                onBlur={(e) => this.setState({ erro: validation(e.target.name, e.target.value, e.target.classList) }, () => onBlur && onBlur())}
                onChange={(e) => onChange(e)}
                {...rest}
              />
            </OverlayTrigger>
          ) : (
            <MaskedInput
              mask={mask}
              type={type}
              name={name}
              id={id}
              placeholder={placeholder}
              aria-describedby="nameHelpBlock"
              className="form-control"
              onBlur={(e) => this.setState({ erro: validation(e.target.name, e.target.value, e.target.classList) }, () => onBlur && onBlur())}
              onChange={(e) => onChange(e)}
              {...rest}
            />
          )}
        </div>
      )
    }

    return (
      <div className={containerClass ? containerClass : 'form-group'}>
        <label htmlFor={id}>{label}</label>
        {false && erro !== '' ? (
          <OverlayTrigger placement="auto" overlay={<Tooltip id="tooltip-disabled">{erro}</Tooltip>} trigger={['hover', 'hover']}>
            <input
              type={type}
              name={name}
              id={id}
              placeholder={placeholder}
              aria-describedby="nameHelpBlock"
              className={`${erro !== '' ? errorClass : ''} form-control`}
              onBlur={(e) => this.setState({ erro: validation(e.target.name, e.target.value, e.target.classList) }, () => onBlur && onBlur())}
              onChange={(e) => onChange(e)}
              {...rest}
            />
          </OverlayTrigger>
        ) : (
          <input
            type={type}
            name={name}
            id={id}
            value={valor}
            placeholder={placeholder}
            aria-describedby="nameHelpBlock"
            className={`${erro !== '' ? errorClass : ''} ${className ? className : 'form-control'}`}
            onChange={(e) => onChange(e)}
            {...rest}
          />
        )}
      </div>
    )
  }
}

export default Input
