import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons' // faUsers
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { Row, Col } from 'react-bootstrap'
import Select from 'react-select'

class DisplayHorario extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showModal: false,
      sender: null,
      receiver: null
    }
  }

  diaDaSemana = (i) => {
    switch (parseInt(i)) {
      case 0:
        return 'Domingo'
      case 1:
        return 'Segunda'
      case 2:
        return 'Terça'
      case 3:
        return 'Quarta'
      case 4:
        return 'Quinta'
      case 5:
        return 'Sexta'
      case 6:
        return 'Sábado'
      default:
        return ''
    }
  };

  horarios = (inicio, fim) => `${inicio} até ${fim}`;

  displayLine = (horario, index, onRemove) => {
    return (
      <tr key={`display_horario_${index}`}>
        <td className='align-middle'>{this.diaDaSemana(horario.diaDaSemana)}</td>
        <td className='align-middle'>{this.horarios(horario.inicioReserva, horario.fimReserva)}</td>
        <td className='align-middle'>{this.horarios(horario.inicioEntrega, horario.fimEntrega)}</td>
        <td className='align-middle text-right'>
          {/* <button
            type="button"
            onClick={() => this.setState({ showModal: true })}
          >
            <FontAwesomeIcon icon={faUsers} color="#000000" size="sm" />
          </button> */}
          <button type='button' className='btn btn-link btn-sm' onClick={(e) => onRemove(index)}>
            <FontAwesomeIcon icon={faTimes} color='#FF0000' size='sm' />
          </button>
        </td>
      </tr>
    )
  };

  handleCloseModal () {
    this.setState({ showModal: false })
  }

  filterContacts = (source) => {
    if (source === 'sender') {
      return [
        {
          label: 'Eduardo',
          value: 'eduardo',
          infoTotal: '28.446.363/0001-74 - eduardo - edu.eabp@gmail.com'
        },
        {
          label: 'Ruben',
          value: 'ruben',
          infoTotal: '28.446.363/0001-74 - ruben - ruben.licio@gmail.com'
        }
      ]
    }
    return [
      {
        label: 'Salvador',
        value: 'salvador',
        infoTotal: '28.446.363/0001-74 - salvador - salvador@saveadd.com'
      },
      {
        label: 'ONG 1',
        value: 'ong1',
        infoTotal: '28.446.363/0001-74 - ONG 1 - ong1@saveadd.com'
      }
    ]
  };

  handleSender = (e) => this.setState({ sender: e.infoTotal });
  handleReceiver = (e) => this.setState({ receiver: e.infoTotal });

  renderModal () {
    return (
      <Modal show={this.state.showModal} onHide={this.handleCloseModal.bind(this)} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>Contatos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={12}>
                <div className='form-group float-lg-left mr-5'>
                  <input type='radio' name='contato-setor' value='' id='contato-setor-presidente' />
                  <label htmlFor='contato-setor-presidente'>Presidente</label>
                </div>
                <div className='form-group float-lg-left mx-lg-5'>
                  <input type='radio' name='contato-setor' value='' id='contato-setor-gerente' />
                  <label htmlFor='contato-setor-gerente'>Gerente</label>
                </div>
                <div className='form-group float-lg-left mx-lg-5'>
                  <input type='radio' name='contato-setor' value='' id='contato-setor-gestor' />
                  <label htmlFor='contato-setor-gestor'>Gestor</label>
                </div>
                <div className='form-group float-lg-left mx-lg-5'>
                  <input type='radio' name='contato-setor' value='' id='contato-setor-doca' />
                  <label htmlFor='contato-setor-doca'>Operador de doca</label>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <Select
                  id='contato-sender'
                  name='contato-sender'
                  placeholder='Selecione o contato...'
                  options={this.filterContacts('sender')}
                  cacheOptions
                  defaultOptions
                  isSearchable={false}
                  onChange={this.handleSender}
                  styles={{
                    // Fixes the overlapping problem of the component
                    menu: provided => ({ ...provided, zIndex: 9999 })
                  }}
                />
              </Col>
              <Col xs={6}>
                <Select
                  id='contato-receiver'
                  name='contato-receiver'
                  placeholder='Selecione o contato...'
                  options={this.filterContacts('receiver')}
                  cacheOptions
                  defaultOptions
                  isSearchable={false}
                  onChange={this.handleReceiver}
                  styles={{
                    // Fixes the overlapping problem of the component
                    menu: provided => ({ ...provided, zIndex: 9999 })
                  }}
                />
              </Col>
            </Row>
            {this.state.sender && this.state.receiver && (
              <Row className='mt-3'>
                <Col xs={12}>
                  <table className='table table-striped table-bordered table-responsive'>
                    <thead>
                      <th>Doador</th>
                      <th>Recebedor</th>
                    </thead>
                    <tbody>
                      <td>{this.state.sender}</td>
                      <td>{this.state.receiver}</td>
                    </tbody>
                  </table>
                </Col>
              </Row>
            )}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Row>
            <Col xs={12}>
              <Button type='button' className='btn btn-primary mr-1' onClick={() => console.log('salvar dados de contato')}>
                Enviar
              </Button>
              <Button type='button' className='btn btn-secondary' onClick={() => this.setState({ showModal: false })}>
                Cancelar
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    )
  }

  render () {
    const { onRemove, horarios } = this.props
    if (horarios !== undefined && horarios.constructor === Array && horarios.length > 0) {
      const body = horarios.map((horario, index) => this.displayLine(horario, index, onRemove))

      return (
        <>
          {this.renderModal()}
          <table className='table table-hover table-sm'>
            <thead>
              <tr>
                <th>Dia</th>
                <th>Reserva</th>
                <th>Entrega</th>
                <th />
              </tr>
            </thead>
            <tbody>{body}</tbody>
          </table>
        </>
      )
    }

    return <div className='form-control border-0'>Não há horários atribuidos</div>
  }
}

export default DisplayHorario
