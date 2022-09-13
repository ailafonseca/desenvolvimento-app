import React, { Component } from 'react'

import ProgressBar from 'react-bootstrap/ProgressBar'
import './style.css'

export default class Progress extends Component {
  get now() {
    const total = this.props.total || 1
    const now = this.props.now || 0

    return (100 * now) / total
  }

  get label() {
    return `${this.now}/${100}`
  }

  render() {
    return (
      <div className="progess-container">
        <ProgressBar>
          <ProgressBar key={1} variant="success" now={this.now} />
        </ProgressBar>
        <div className="progress-bar-label">{this.label}</div>
      </div>
    )
  }
}
