import React from 'react'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faQuestion, faPaperclip, faTimes } from '@fortawesome/free-solid-svg-icons'

import './style.css'

const TrailButtons = ({ children, idform, status, url, onClick }) => {
  let to = ''
  let history = useHistory()

  const toLink = (e, path) => {
    e.preventDefault()
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()

    history.push(path)
  }

  switch (status) {
    case 'complete':
      return (
        <Button variant="success" className="btn-trail btn-pill">
          <FontAwesomeIcon icon={faCheck} size="lg" />
        </Button>
      )
    case 'incomplete':
      to = `/perfil/trilhas/incompleto?idform=${idform}`
      return (
        <Button variant="warning" href={to} className="btn-trail btn-pill" onClick={(e) => toLink(e, to)}>
          <FontAwesomeIcon icon={faQuestion} size="lg" />
        </Button>
      )
    case 'can_answer':
      return (
        <Button variant="success" href={url} className="btn-trail btn-trail--content btn-pill" onClick={(e) => toLink(e, url)}>
          <div className="btn-trail-content">
            <FontAwesomeIcon icon={faPaperclip} size="lg" />
          </div>
        </Button>
      )
    case 'error':
      to = `/perfil/trilhas/naoaprovado?idform=${idform}`
      return (
        <Button variant="danger" href={to} className="btn-trail btn-pill" onClick={(e) => toLink(e, to)}>
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </Button>
      )
    default:
      return <Button>{children}</Button>
  }
}

export default class Trilha extends React.Component {
  render() {
    let classNameRoot = `trail-block`
    if (this.props.className) classNameRoot = `${classNameRoot} ${this.props.className}`

    return (
      <div className={classNameRoot}>
        <TrailButtons idform={this.props.idform} status={this.props.status} url={this.props.url}></TrailButtons>
        <div className="text-center mb-0">{this.props.name}</div>
      </div>
    )
  }
}
