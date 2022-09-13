import React from 'react'

export default class ListBodyRow extends React.Component {
  render () {
    const { className, children } = this.props

    return <tr className={className}>{children}</tr>
  }
}
