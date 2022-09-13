import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { Row, Col, Button } from 'react-bootstrap'

import ACTIONS from './reducerTypes'
import { Screen } from 'components/style'
import { isFomeDeTudo } from 'util/utils'

class SelecaoPerfil extends Component {
  componentDidMount () {
    const { dispatch } = this.props
    if (window.location.pathname !== '/') {
      dispatch(push('/'))
    }
  }

  render () {
    const { dispatch } = this.props

    if (isFomeDeTudo()) {
      return (
        <Screen header={false} footer={false} middle>
          <Row>
            <Col xs={12}>
              <img id='main-logo' src={`${process.env.PUBLIC_URL}/logoFome.svg`} alt='' class="img-fluid" />
            </Col>
            <Col xs={6}>
              <Button className='w-100' style={{ minHeight: '120px' }} onClick={() => dispatch({ type: ACTIONS.PERFIL.SELECIONAR.DOACAO.DONATARIO })}>
                Pedir ajuda
              </Button>
            </Col>
            <Col xs={6}>
              <Button className='w-100' style={{ minHeight: '120px' }} onClick={() => dispatch({ type: ACTIONS.PERFIL.SELECIONAR.DOACAO.DOADOR })}>
                Oferecer ajuda
              </Button>
            </Col>
          </Row>
        </Screen>
      )
    }

    return (
      <Screen header={false} footer={false} middle>
        <Row>
          <Col xs={12}>
            <img id='saveadd-main-logo' src={`${process.env.PUBLIC_URL}/logo.svg`} alt='' style={{ maxWidth: '400px' }} />
          </Col>
          <Col xs={6}>
            <Button className='w-100' style={{ minHeight: '120px' }} onClick={() => dispatch({ type: ACTIONS.PERFIL.SELECIONAR.DOACAO.DONATARIO })}>
              Pedir ajuda
            </Button>
          </Col>
          <Col xs={6}>
            <Button className='w-100' style={{ minHeight: '120px' }} onClick={() => dispatch({ type: ACTIONS.PERFIL.SELECIONAR.DOACAO.DOADOR })}>
              Oferecer ajuda
            </Button>
          </Col>
          <Col xs={6}>
            <Button className='w-100' style={{ minHeight: '120px' }} onClick={() => dispatch({ type: ACTIONS.PERFIL.SELECIONAR.VENDA.COMPRADOR })}>
              Comprador
            </Button>
          </Col>
          <Col xs={6}>
            <Button className='w-100' style={{ minHeight: '120px' }} onClick={() => dispatch({ type: ACTIONS.PERFIL.SELECIONAR.VENDA.VENDEDOR })}>
              Vendedor
            </Button>
          </Col>
        </Row>
      </Screen>
    )
  }
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({
  dispatch
})
export default connect(mapStateToProps, mapDispatchToProps)(SelecaoPerfil)
