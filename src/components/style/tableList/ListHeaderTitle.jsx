import React from 'react'
import classNames from 'classnames'

export default class ListHeaderTitle extends React.Component {
  render () {
    const { className, children, display } = this.props
    let cssClassName = className

    if (display) {
      cssClassName = classNames('d-none d-lg-table-cell', className)
    }

    return <th className={cssClassName}>{children}</th>
  }
}
