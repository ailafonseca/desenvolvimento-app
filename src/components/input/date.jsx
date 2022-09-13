import React from 'react'
import MaskedInput from 'react-maskedinput'
import moment from 'moment'

export default class InputNumberComConfirm extends React.PureComponent {
  handleOnChange = (e) => {
    const { onChange } = this.props

    const pureValue = e.target.value
    if (pureValue.replaceAll('_', '').length < 7) return false
    const dateValue = moment(pureValue, 'MM/YYYY').format()
    if (dateValue === 'Invalid date') return false

    onChange(dateValue)
  }

  parseDate(value) {
    if (!value) return ''
    return moment(value).format('MM/YYYY')
  }

  renderInput = () => {
    const { id, valor, readOnly, disabled, className, style } = this.props

    return (
      <MaskedInput
        id={id}
        value={this.parseDate(valor)}
        className={className || 'form-control form-control-sm nospin'}
        readOnly={readOnly || false}
        disabled={disabled || false}
        mask="11/1111"
        name="expiry"
        placeholder=""
        style={style}
        onChange={this.handleOnChange}
      />
    )
  }

  renderAppend = () => {
    if (this.props.confirmacao) {
      return (
        <div className="input-group-append">
          {this.renderCancelar()}
          {this.renderConfirmar()}
        </div>
      )
    } else {
      return null
    }
  }

  render() {
    return (
      <>
        <div className="input-group input-group-sm" style={{ width: '100%' }}>
          {this.renderInput()}
          {this.renderAppend()}
        </div>
      </>
    )
  }
}
