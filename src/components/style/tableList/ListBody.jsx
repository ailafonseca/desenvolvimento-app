import React from 'react'

export default class ListBody extends React.Component {
  render () {
    const { children } = this.props

    return <tbody>{children}</tbody>
  }
}
