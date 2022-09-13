import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'

import Loading from 'components/loading'
import Refresh from 'components/refresh'
import { TelaSucesso, Link, Mensagem } from 'components/telaSucesso'
import TelaDeErro from 'components/telaDeErro'
import ObservationTextArea from 'components/observationTextArea'
import BotaoSalvar from 'components/BotaoSalvar'
import { isArrayEmpty, isArrayNotEmpty } from 'util/utils'
import { getDateTime, getDate, getNow, addMinutes, joinDateTime } from 'util/date'

import { addAnuncio, clearError } from './action'
import { loadContratoById } from '../contrato/action'
import { loadProdutos } from 'modules/produto/actions'

import { EstoqueSwitch } from 'modules/produto/components'

import { URL_DOACAO_ANUNCIO_LISTAR, URL_DOACAO_ANUNCIO_EDITAR } from './urls'
import { Screen } from 'components/style'

import {
  AssinaturasBox,
  GrupoBox,
  HorarioBox,
  ProdutosList,
  ImportarPlanilha
} from './components'

import {
  isFormValid,
  isReservaDataInicioValid as isReservaInicioValid,
  isEntregaDataInicioValid as isEntregaInicioValid,
  isReservaDataFimValid as isReservaFimValid,
  isEntregaDataFimValid as isEntregaFimValid
} from './validacoes'

class AnuncioNovo extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      anuncio: {
        idContrato: null,
        dataInicioReserva: getDateTime(addMinutes(getNow(), 2)),
        dataFimReserva: getDateTime(addMinutes(getNow(), 122)),
        dataInicioEntrega: getDateTime(addMinutes(getNow(), 5)),
        dataFimEntrega: getDateTime(addMinutes(getNow(), 125)),
        anuncioProdutos: [],
        observacaoAnuncio: undefined,
        isEstoqueProduto: false,
        ativo: true,
        anuncioProdutosRemovidos: []
      }
    }
  }

  componentDidMount () {
    const { dispatch, loadContratoById, loadProdutos, match: { params } } = this.props
    const { anuncio } = this.state

    const idContrato = params.id
    this.setState({ anuncio: { ...anuncio, idContrato: params.id } })
    dispatch(loadContratoById(idContrato))
    dispatch(loadProdutos())
  }

  componentDidUpdate (prevProps) {
    const { contrato } = this.props
    if (prevProps.contrato !== contrato) {
      const { anuncio } = this.state
      this.setState({
        anuncio: {
          ...anuncio,
          anuncioProdutos: contrato.produtos,
          isEstoqueProduto: contrato.isEstoqueProduto || false
        }
      }, () => {
        const horarios = contrato.horarios ? contrato.horarios.filter(x => x.diaDaSemana === getNow().getDay()) : null
        if (isArrayNotEmpty(horarios)) {
          const horario = horarios[0]
          const hoje = getDate()
          this.setState({
            anuncio: {
              ...anuncio,
              dataInicioReserva: joinDateTime(hoje, horario.inicioReserva),
              dataFimReserva: joinDateTime(hoje, horario.fimReserva),
              dataInicioEntrega: joinDateTime(hoje, horario.inicioEntrega),
              dataFimEntrega: joinDateTime(hoje, horario.fimEntrega)
            }
          })
        }
      }
      )
    }
  }

  handleOnChangeInicioReserva = (inicioReserva) => this.setState({ anuncio: { ...this.state.anuncio, dataInicioReserva: inicioReserva } })
  handleOnChangeFimReserva = (fimReserva) => this.setState({ anuncio: { ...this.state.anuncio, dataFimReserva: fimReserva } })
  handleOnChangeInicioEntrega = (inicioEntrega) => this.setState({ anuncio: { ...this.state.anuncio, dataInicioEntrega: inicioEntrega } })
  handleOnChangeFimEntrega = (fimEntrega) => this.setState({ anuncio: { ...this.state.anuncio, dataFimEntrega: fimEntrega } })

  renderAssinaturas = () => (!isArrayEmpty(this.props.contrato.assinaturas) && <AssinaturasBox assinaturas={this.props.contrato.assinaturas} />)
  renderGrupos = () => (!isArrayEmpty(this.props.contrato.grupos) && <GrupoBox grupos={this.props.contrato.grupos} />)

  handleOnImportarPlanilha = (anunciosProdutos) => {
    const { anuncio } = this.state

    if (!isArrayEmpty(anunciosProdutos)) {
      this.setState({ anuncio: { ...anuncio, anuncioProdutos: [...anunciosProdutos] } })
    }
  }

  alterarAnuncioProduto = (ap, unidade, quantidade) => ({
    ...ap,
    unidade,
    quantidade
  })

  handleOnChangeProduto = (idProduto, unidade, quantidade) => {
    const { anuncio } = this.state
    const anuncioProdutos = anuncio.anuncioProdutos.map((ap) => ap.idProduto === idProduto ? this.alterarAnuncioProduto(ap, unidade, quantidade) : { ...ap })
    this.setState({ anuncio: { ...anuncio, anuncioProdutos: [...anuncioProdutos] } })
  }

  handleOnRemoveProduto = (idProduto) => {
    const { anuncio } = this.state

    this.setState(
      {
        anuncio: {
          ...anuncio,
          anuncioProdutosRemovidos: [...anuncio.anuncioProdutosRemovidos, ...anuncio.anuncioProdutos.filter(ap => ap.idProduto === idProduto)],
          anuncioProdutos: [...anuncio.anuncioProdutos.filter(ap => ap.idProduto !== idProduto)]
        }
      })
  }

  handleOnRestoreProduto = (idProduto) => {
    const { anuncio } = this.state

    this.setState(
      {
        anuncio: {
          ...anuncio,
          anuncioProdutosRemovidos: [...anuncio.anuncioProdutosRemovidos.filter(ap => ap.idProduto !== idProduto)],
          anuncioProdutos: [...anuncio.anuncioProdutos, ...anuncio.anuncioProdutosRemovidos.filter(ap => ap.idProduto === idProduto)]
        }
      })
  }

  handleOnAddProdutoManual = (id, nome, produto) => {
    const { anuncio } = this.statec
    console.log(produto)
    const novoProduto = {
      idProduto: id,
      nomeProduto: nome,
      produto: produto,
      quantidade: 0,
      unidade: 'KG',
      manual: produto.manual
    }

    this.setState({
      anuncio: {
        ...anuncio,
        anuncioProdutos: [
          ...anuncio.anuncioProdutos,
          novoProduto
        ]
      }
    })
  }

  renderAnuncioForm = () => {
    const { anuncio } = this.state
    const { produtos, anuncio: { isPosting }, dispatch } = this.props

    return (
      <Container>
        <Row xs={12}>
          {this.renderAssinaturas()}
          {this.renderGrupos()}
        </Row>
        <hr />
        <Row xs={12}>
          <Col xs={12}>
            <HorarioBox
              titulo='Reserva'
              disabled={false}
              inicio={anuncio.dataInicioReserva}
              fim={anuncio.dataFimReserva}
              onChangeInicio={this.handleOnChangeInicioReserva}
              onChangeFim={this.handleOnChangeFimReserva}
              invalidInicio={!isReservaInicioValid(anuncio)}
              invalidFim={!isReservaFimValid(anuncio)}
            />
          </Col>
          <Col xs={12}>
            <HorarioBox
              titulo='Entrega'
              disabled={false}
              inicio={anuncio.dataInicioEntrega}
              fim={anuncio.dataFimEntrega}
              onChangeInicio={this.handleOnChangeInicioEntrega}
              onChangeFim={this.handleOnChangeFimEntrega}
              invalidInicio={!isEntregaInicioValid(anuncio)}
              invalidFim={!isEntregaFimValid(anuncio)}
            />
          </Col>
          <Col xs={12}>
            <EstoqueSwitch
              isEstoque={anuncio.isEstoqueProduto}
              onChangeEstoque={(isEstoque) => this.setState({ anuncio: { ...anuncio, isEstoqueProduto: isEstoque } })}
            />
          </Col>
          <Col xs={12}>
            <ProdutosList
              anuncioProdutos={anuncio.anuncioProdutos}
              produtos={produtos.filter(p => !anuncio.anuncioProdutos.some(ap => ap.idProduto === p.idProduto))}
              onChange={this.handleOnChangeProduto}
              onRemove={this.handleOnRemoveProduto}
              onAdd={this.handleOnAddProdutoManual}
              isEstoqueProduto={anuncio.isEstoqueProduto}
            />
          </Col>
          <Col xs={12}>
            <ImportarPlanilha
              anuncioProdutos={anuncio.anuncioProdutos}
              produtos={produtos}
              onImportar={this.handleOnImportarPlanilha}
            />
          </Col>
          <Col xs={12}>
            <ObservationTextArea
              onChange={(e) => this.setState({ anuncio: { ...anuncio, observacaoAnuncio: e.target.value } })}
              maxchars={500}
              labeltextarea='Observações:'
              textarearows='3'
              value={this.state.anuncio.observacaoAnuncio || ''}
            />
          </Col>
          <Col xs={12}>
            <ProdutosList
              anuncioProdutos={anuncio.anuncioProdutosRemovidos}
              onRestore={this.handleOnRestoreProduto}
              isEstoqueProduto={anuncio.isEstoqueProduto}
              removido
            />
          </Col>
          <Col xs={12}>
            <BotaoSalvar onClick={() => dispatch(addAnuncio(anuncio))} disabled={isPosting || !isFormValid(anuncio)} />
          </Col>
        </Row>
      </Container>
    )
  }

  renderError = () => {
    const { anuncio: { anuncio } } = this.props

    return (
      <TelaSucesso>
        <Mensagem>Anúncio registrado com sucesso!</Mensagem>
        <Link to={URL_DOACAO_ANUNCIO_EDITAR(anuncio.id)}>Editar esse anuncio</Link>
        <br />
        <Link to={URL_DOACAO_ANUNCIO_LISTAR()}>Listar anuncios</Link>
        <Link to='/'>Tela Principal</Link>
      </TelaSucesso>
    )
  }

  render () {
    const { connection, dispatch, isLoading, contrato, anuncio: { anuncio, isPosting, hasError, hasSuccess, error }, clearError } = this.props

    if (connection) {
      return <Refresh error={connection} dispatch={dispatch} />
    }

    if (isLoading || isPosting) {
      return <Loading />
    }

    if (hasError) {
      return <TelaDeErro error={error} callbackReturn={() => dispatch(clearError())} message='Erro ao tentar cadastrar anuncio' />
    }

    if (anuncio && hasSuccess) {
      return this.renderError()
    }

    if (contrato !== null) {
      return (
        <Screen back={{ to: '/doacao/contrato/listar/todos', title: 'Contrato' }}>
          {this.renderAnuncioForm()}
        </Screen>
      )
    }

    return <Loading />
  }
}

const mapStateToProps = (state) => ({
  connection: state.main.connection,
  contrato: state.doacaoContrato.contrato,
  isLoading: state.doacaoContrato.idLoadingById,
  produtos: state.produto.produtos,
  anuncio: state.doacaoAnuncio
})

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  clearError,
  addAnuncio,
  loadProdutos,
  loadContratoById
})

export default connect(mapStateToProps, mapDispatchToProps)(AnuncioNovo)
