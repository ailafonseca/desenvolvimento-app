import React from 'react'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faCheck, faQuestion, faTimes } from '@fortawesome/free-solid-svg-icons'
import './style.css'

const ButtonStatus = (props) => {
  switch (props.status) {
    case 'success':
      return (
        <div className="rounded-pill text-white bg-success attach-status">
          <FontAwesomeIcon icon={faCheck} size="sm" />
        </div>
      )
    case 'error':
      return (
        <div className="rounded-pill text-white bg-danger attach-status">
          <FontAwesomeIcon icon={faTimes} size="sm" />
        </div>
      )
    case 'warning':
      return (
        <div className="rounded-pill text-white bg-warning attach-status">
          <FontAwesomeIcon icon={faQuestion} size="sm" />
        </div>
      )
    default:
      return <div>{props.children}</div>
  }
}

export default class Trilha extends React.Component {
  render() {
    return (
      <div className="attach-row d-flex align-items-center justify-content-between">
        <Button variant="success" size="sm">
          <FontAwesomeIcon icon={faPen} />
        </Button>
        <div className="flex-grow-1 px-4">{this.props.children}</div>
        <div>
          <ButtonStatus status={this.props.status}></ButtonStatus>
        </div>
      </div>
    )
  }
}
