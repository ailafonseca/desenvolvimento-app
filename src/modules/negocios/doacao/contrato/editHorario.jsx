import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class HorarioModalForm extends React.Component {
  constructor (props) {
    super(props)

    if (props.initialData === undefined) this.state = this.defaultState()
    else this.state = props.initialData
  }

  defaultState = () => ({
    diaDaSemana: 0,
    inicioReserva: undefined,
    fimReserva: undefined,
    inicioEntrega: undefined,
    fimEntrega: undefined
  });

  onChangeAll = (newState) => {
    this.setState(newState)
  };

  handleOnChangeDiaDaSemana = (event) => this.onChangeAll({ diaDaSemana: event.target.value });

  handleOnChangeInicioReserva = (event) => this.onChangeAll({ inicioReserva: event.target.value });

  handleOnChangeFimReserva = (event) => this.onChangeAll({ fimReserva: event.target.value });

  handleOnChangeInicioEntrega = (event) => this.onChangeAll({ inicioEntrega: event.target.value });

  handleOnChangeFimEntrega = (event) => this.onChangeAll({ fimEntrega: event.target.value });

  resetState = () => this.onChangeAll(this.defaultState());

  validForm = () =>
    this.state.diaDaSemana !== undefined &&
    this.state.inicioReserva !== undefined &&
    this.state.fimReserva !== undefined &&
    this.state.inicioEntrega !== undefined &&
    this.state.fimEntrega !== undefined;

  handleOnSubmit = () => {
    const { onSave, onHide } = this.props
    onSave(this.state)
    onHide()
  };

  renderForm () {
    const { show, onHide } = this.props

    return (
      <Modal show={show} onHide={onHide} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>Adicionar dia e horário comuns de disponibilidade</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form>
              <Row className='show-grid'>
                <Col xs={12} md={12}>
                  <Form.Group controlId='horarioForm.DiaDaSemana'>
                    <Form.Label>Dia da semana:</Form.Label>
                    <Form.Control as='select' onChange={this.handleOnChangeDiaDaSemana}>
                      <option value='0'>Domingo</option>
                      <option value='1'>Segunda</option>
                      <option value='2'>Terça</option>
                      <option value='3'>Quarta</option>
                      <option value='4'>Quinta</option>
                      <option value='5'>Sexta</option>
                      <option value='6'>Sábado</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group controlId='horarioForm.ReservaInicio'>
                    <Form.Label>Reserva Início:</Form.Label>
                    <Form.Control type='time' onChange={this.handleOnChangeInicioReserva} />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group controlId='horarioForm.ReservaFim'>
                    <Form.Label>Reserva Fim:</Form.Label>
                    <Form.Control type='time' onChange={this.handleOnChangeFimReserva} />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group controlId='horarioForm.EntregaInicio'>
                    <Form.Label>Entrega Início:</Form.Label>
                    <Form.Control type='time' onChange={this.handleOnChangeInicioEntrega} />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group controlId='horarioForm.EntregaFim'>
                    <Form.Label>Entrega Fim:</Form.Label>
                    <Form.Control type='time' onChange={this.handleOnChangeFimEntrega} />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={this.props.onHide}>
            Fechar
          </Button>
          <Button variant='primary' disabled={!this.validForm()} onClick={this.handleOnSubmit}>
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  render () {
    return this.renderForm()
  }
}

HorarioModalForm.propTypes = {
  onSave: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProps)(HorarioModalForm)
