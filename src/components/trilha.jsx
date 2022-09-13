import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from '@material-ui/core/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { ReactTypeformEmbed } from 'react-typeform-embed'
import PropTypes from 'prop-types'

export default class Trilha extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      classNameBotao: props.classNameBotao,
      typeform: props.typeform,
      showModal: false,
      trilha: props.trilha
    }
  }

  render () {
    return (
      <div>
        <Button
          className={this.state.classNameBotao}
          onClick={() => this.setState({ showModal: true })}
        >
          <FontAwesomeIcon icon={faCheck} size='sm' />
        </Button>
        <Modal
          show={this.state.showModal}
          onHide={() => this.setState({ showModal: false })}
          size='lg'
          centered
          aria-labelledby='contained-modal-title-vcenter'
        >
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-vcenter'>
            Completar Trilha: {this.state.trilha}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className='typeform'>
            <ReactTypeformEmbed url={this.state.typeform} />
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

Trilha.propTypes = {
  classNameBotao: PropTypes.string.isRequired,
  typeform: PropTypes.string.isRequired,
  trilha: PropTypes.string.isRequired
}
