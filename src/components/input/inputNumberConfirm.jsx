import React from 'react'
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'

export default class InputNumberComConfirm extends React.PureComponent {
  static propTypes = {
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    id: PropTypes.string.isRequired,
    valor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    precision: PropTypes.number,
    step: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    style: PropTypes.object
  }

  handleOnChange = (e) => {
    const { onChange, precision, id } = this.props

    let value = parseFloat(e.value)

    if (precision && precision >= 0) {
      value = value.toFixed(precision)
    }

    if (value >= 0 && !isNaN(value) && onChange) {
      onChange(value, id)
    }
  }

  renderInput = () => {
    const { id, valor, precision, step, min, max, readOnly, disabled, className, style } = this.props

    const withValueLimit = ({ floatValue }) => !max || floatValue <= max

    return (
      <NumberFormat
        id={id}
        defaultValue={parseFloat(valor)}
        value={parseFloat(valor)}
        className={className || 'form-control form-control-sm nospin'}
        type='numeric'
        readOnly={readOnly || false}
        disabled={disabled || false}
        min={min}
        max={max}
        style={style}
        step={step}
        thousandSeparator='.'
        decimalSeparator=','
        //fixedDecimalScale
        isAllowed={withValueLimit}
        decimalScale={precision}
        onValueChange={(obj) => {
          if (!max || parseFloat(max) >= obj.floatValue) {
            this.handleOnChange(obj)
          } else {
            console.log('NoN')
          }
        }}
      />
    )
  }

  renderAppend = () => {
    if (this.props.confirmacao) {
      return (
        <div className='input-group-append'>
          {this.renderCancelar()}
          {this.renderConfirmar()}
        </div>
      )
    } else {
      return null
    }
  }

  render () {
    return (
      <>
        <div className='input-group input-group-sm' style={{ width: '100%' }}>
          {this.renderInput()}
          {this.renderAppend()}
        </div>
      </>
    )
  }
}
