import React from 'react'
import { connect } from 'react-redux'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faSpinner, faPen, faBullhorn } from '@fortawesome/free-solid-svg-icons'
import { DisplayStringLimit } from 'util/display'
import Loading from 'components/loading'
import Refresh from 'components/refresh'

import URL from '../urls-browser'
import {
  ativarContrato,
  inativarContrato,
  loadContratoTodos
} from './action'
import { TableList, ListHeaders, ListHeaderTitle, ListBody, ListBodyRow, ListBodyCol } from 'components/style/tableList'
import { Screen } from 'components/style'

class DoacaoContratoListar extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      tipo: ''
    }
  }

  componentDidMount () {
    const { loadContratoTodos, match: { params } } = this.props

    loadContratoTodos()

    if (params) {
      this.setState({ tipo: params.tipo })
    }
  }

  renderStatus (contrato) {
    const { ativarContrato, inativarContrato } = this.props

    if (contrato.statusUpdating !== undefined && contrato.statusUpdating === true) {
      return (
        <Link to='#' className='btn-danger btn-lg btncenter'>
          <FontAwesomeIcon icon={faSpinner} size='1x' />
        </Link>
      )
    } else if (contrato.ativo === true) {
      return (
        <Link onClick={() => inativarContrato(contrato.id)} to='#' className='btn-danger btn-lg btncenter'>
          <FontAwesomeIcon icon={faEyeSlash} size='1x' />
        </Link>
      )
    } else {
      return (
        <Link onClick={() => ativarContrato(contrato.id)} to='#' className='btn-primary btn-lg btncenter'>
          <FontAwesomeIcon icon={faEye} size='1x' />
        </Link>
      )
    }
  }

  renderBotaoCadastro = () => (
    <Link to={URL.CONTRATO.NOVO()} className='btn btn-success btn-s ml-2'>
      Novo
    </Link>
  );

  renderEditar = (line) => (
    <Link to={URL.CONTRATO.EDITAR(line.id)} className='btn-primary btn-lg btncenter'>
      <FontAwesomeIcon icon={faPen} size='1x' />
    </Link>
  );

  renderNovoAnuncio = (line) => (
    <Link to={URL.ANUNCIO.NOVO(line.id)} className='btn-secondary btn-lg mobile'>
      Novo Anúncio
    </Link>
  );

  renderNovoAnuncioMobile = (line) => (
    <Link to={URL.ANUNCIO.NOVO(line.id)} className='btn-secondary btn-lg botao2 button2'>
      <FontAwesomeIcon icon={faBullhorn} size='1x' />
    </Link>
  );

  renderBodyRow (contrato) {
    const nome = DisplayStringLimit(contrato.nome, 15)

    return (
      <ListBodyRow key={contrato.id}>
        <ListBodyCol first format='text'>
          {nome}
        </ListBodyCol>
        <ListBodyCol last format='actionButtons'>
          <span>{this.renderStatus(contrato)}</span>
          <span>{this.renderEditar(contrato)}</span>
          <span>{contrato.ativo === true && this.renderNovoAnuncio(contrato)}</span>
          <span>{contrato.ativo === true && this.renderNovoAnuncioMobile(contrato)}</span>
        </ListBodyCol>
      </ListBodyRow>
    )
  }

  displayBotoesStatus = (rowNewStyle) => (
    <div className='row justify-content-end'>
      <div className='col-auto mt-3 mb-3' style={rowNewStyle}>
        <Link to={URL.CONTRATO.LISTAR('todos')} className='btn-secondary btn-lg mobile' onClick={() => this.setState({ tipo: '' })}>
              Todos
        </Link>&nbsp;
        <Link to={URL.CONTRATO.LISTAR('ativos')} className='btn-secondary btn-lg mobile' onClick={() => this.setState({ tipo: 'ativos' })}>
              Ativos
        </Link>&nbsp;
        <Link to={URL.CONTRATO.LISTAR('inativos')} className='btn-secondary btn-lg mobile' onClick={() => this.setState({ tipo: 'inativos' })}>
              Inativos
        </Link>
      </div>
    </div>
  )

  renderList (list) {
    const rowNewStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }

    return (
      <Screen back={{ to: '/', title: 'Menu' }}>
        <Container fluid>
          <div className='row justify-content-end'>
            <div className='col-auto mt-3 mb-3' style={rowNewStyle}>
              <p className='mt-2 mb-2 mr-1'>Cadastrar novo Contrato:</p>
              {this.renderBotaoCadastro()}
            </div>
          </div>
          {this.displayBotoesStatus(rowNewStyle)}
          <TableList>
            <ListHeaders>
              <ListHeaderTitle>Contrato</ListHeaderTitle>
            </ListHeaders>
            <ListBody>{list.map((item) => this.renderBodyRow(item))}</ListBody>
          </TableList>
        </Container>
      </Screen>
    )
  }

  render () {
    const { contratosAll, contratosAtivos, contratosInativos, isLoadingAll, connection, dispatch } = this.props
    const { tipo } = this.state

    if (connection) {
      return <Refresh error={connection} dispatch={dispatch} />
    }

    if (tipo === 'ativos') {
      if (contratosAtivos !== undefined && contratosAtivos.constructor === Array && contratosAtivos.length > 0) {
        return this.renderList(contratosAtivos)
      }
    } else if (tipo === 'inativos') {
      if (contratosInativos !== undefined && contratosInativos.constructor === Array && contratosInativos.length > 0) {
        return this.renderList(contratosInativos)
      }
    } else {
      if (isLoadingAll === true) {
        return <Loading />
      }
      if (contratosAll !== undefined && contratosAll.constructor === Array && contratosAll.length > 0) {
        return this.renderList(contratosAll)
      }
    }

    const rowNewStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
    return (
      <Screen back={{ to: '/', title: 'Menu' }}>
        <Container fluid>
          <div className='row justify-content-end'>
            <div className='col-auto mt-3 mb-3' style={rowNewStyle}>
              <p className='mt-2 mb-2 mr-1'>Cadastre uma nova recorrência: </p>
              {this.renderBotaoCadastro()}
            </div>
          </div>
          {this.displayBotoesStatus()}
        </Container>
      </Screen>
    )
  }
}

const mapStateToProps = (state) => ({
  contratosAll: state.doacaoContrato.contratosAll,
  contratosAtivos: state.doacaoContrato.contratosAtivos,
  contratosInativos: state.doacaoContrato.contratosInativos,
  isLoadingAll: state.doacaoContrato.isLoadingAll,
  connection: state.main.connection
})
const mapDispatchToProps = { DisplayStringLimit, ativarContrato, inativarContrato, loadContratoTodos }
export default connect(mapStateToProps, mapDispatchToProps)(DoacaoContratoListar)
