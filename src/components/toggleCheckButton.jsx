import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ToggleComponent extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    value: PropTypes.bool.isRequired
  };

  render () {
    const { id, value, onChange } = this.props

    return <input type='checkbox' key={id} id={id} value={value} onChange={(e) => onChange(id, !value)} />
  }
}
