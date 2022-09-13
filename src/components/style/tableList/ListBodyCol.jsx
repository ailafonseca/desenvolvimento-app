import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { DateTimeFormat } from 'util/display'

export default class ListBodyCol extends React.Component {
  static propTypes = {
    /**
     * Inform that is the first column
     */
    first: PropTypes.bool,

    /**
     * Inform last column
     */
    last: PropTypes.bool,

    format: PropTypes.oneOf(['text', 'date', 'time', 'datetime', 'actionButtons']).isRequired
  };

  render () {
    const { className, children, format, first, last } = this.props

    let cssClassName = className

    if (format === 'actionButtons' || last) {
      cssClassName = classNames('text-right', className)
    } else if (!first && !last) {
      cssClassName = classNames('d-none d-lg-table-cell', className)
    }

    let body = ''

    switch (format) {
      case 'datetime':
        body = DateTimeFormat(children)
        break

      default:
        body = children
    }

    return <td className={cssClassName}>{body}</td>
  }
}
