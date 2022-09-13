import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class ActionButton extends React.Component {
  static propTypes = {
    /**
     * Inform src to locate
     */
    to: PropTypes.string.isRequired,

    /**
     * Inform last column
     */
    icon: PropTypes.object.isRequired,
    classes: PropTypes.string,
    /**
     * True if you wanna hide this
     */
    hidden: PropTypes.bool,
  }

  render() {
    const { to, icon, hidden, classes } = this.props

    if (hidden) {
      return <></>
    }

    return (
      <Link to={to} className={`btn-primary btn-lg btncenter ${classes}`}>
        <FontAwesomeIcon icon={icon} size="1x" color="#FFF" />
      </Link>
    )
  }
}
