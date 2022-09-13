import React from 'react'

export default class ListHeaders extends React.Component {
  render () {
    const { children } = this.props

    return (
      <thead>
        <tr>
          {children}
        </tr>
      </thead>
    )
  }
}
