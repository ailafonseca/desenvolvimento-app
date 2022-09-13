import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Container } from 'react-bootstrap'

import Loading from 'components/loading'
import Refresh from 'components/refresh'
import { TelaSucesso, Link, Mensagem } from 'components/telaSucesso'
import TelaDeErro from 'components/telaDeErro'
import ObservationTextArea from 'components/observationTextArea'
import BotaoSalvar from 'components/BotaoSalvar'
import { isArrayEmpty } from 'util/utils'
import { getDateTime, getNow, addMinutes } from 'util/date'

import { addAnuncio, clearError } from './action'
import { loadContratoById } from '../contrato/action'
import { loadProdutos } from 'modules/produto/actions'

import { EstoqueSwitchComPreco } from 'modules/produto/components'
import { Screen } from 'components/style'

import { URL_VENDA_ANUNCIO_LISTAR, URL_VENDA_ANUNCIO_EDITAR } from './urls'

import { AssinaturasBox, HorarioBox, GrupoBox, ProdutosList, FormasDePagamentoBox, ImportarPlanilha } from './components'

import {
  isFormValid,
  isReservaDataInicioValid as isReservaInicioValid,
  isEntregaDataInicioValid as isEntregaInicioValid,
  isReservaDataFimValid as isReservaFimValid,
  isEntregaDataFimValid as isEntregaFimValid,
} from './validacoes'

class AnuncioNovo extends React.Component {
  constructor(props) {
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
        isPrecoProduto: false,
        ativo: true,
        anuncioProdutosRemovidos: [],
      },
    }
  }

  componentDidMount() {
    const {
      dispatch,
      loadContratoById,
      loadProdutos,
      match: { params },
    } = this.props
    const { anuncio } = this.state

    const idContrato = params.id
    this.setState({ anuncio: { ...anuncio, idContrato: params.id } })
    dispatch(loadContratoById(idContrato))
    dispatch(loadProdutos())
  }

  componentDidUpdate(prevProps) {
    const { contrato } = this.props
    if (prevProps.contrato !== contrato) {
      const { anuncio } = this.state
      this.setState({
        anuncio: {
          ...anuncio,
          anuncioProdutos: contrato.produtos,
          isEstoqueProduto: contrato.isEstoqueProduto || false,
          isPrecoProduto: contrato.isPrecoProduto || false,
        },
      })
    }
  }

  handleOnChangeInicioReserva = (inicioReserva) => this.setState({ anuncio: { ...this.state.anuncio, dataInicioReserva: inicioReserva } })
  handleOnChangeFimReserva = (fimReserva) => this.setState({ anuncio: { ...this.state.anuncio, dataFimReserva: fimReserva } })
  handleOnChangeInicioEntrega = (inicioEntrega) => this.setState({ anuncio: { ...this.state.anuncio, dataInicioEntrega: inicioEntrega } })
  handleOnChangeFimEntrega = (fimEntrega) => this.setState({ anuncio: { ...this.state.anuncio, dataFimEntrega: fimEntrega } })

  renderAssinaturas = () => !isArrayEmpty(this.props.contrato.assinaturas) && <AssinaturasBox assinaturas={this.props.contrato.assinaturas} />
  renderGrupos = () => !isArrayEmpty(this.props.contrato.grupos) && <GrupoBox grupos={this.props.contrato.grupos} />

  handleOnImportarPlanilha = (anunciosProdutos) => {
    const { anuncio } = this.state

    if (!isArrayEmpty(anunciosProdutos)) {
      this.setState({ anuncio: { ...anuncio, anuncioProdutos: [...anunciosProdutos] } })
    }
  }

  alterarAnuncioProduto = (ap, unidade, quantidade, precoUnitario) => ({
    ...ap,
    unidade,
    quantidade,
    preco: precoUnitario,
    valor: precoUnitario * quantidade,
  })

  handleOnChangeProduto = (idProduto, unidade, quantidade, precoUnitario) => {
    const { anuncio } = this.state
    const anuncioProdutos = anuncio.anuncioProdutos.map((ap) => (ap.idProduto === idProduto ? this.alterarAnuncioProduto(ap, unidade, quantidade, precoUnitario) : { ...ap }))
    this.setState({ anuncio: { ...anuncio, anuncioProdutos: [...anuncioProdutos] } })
  }

  handleOnRemoveProduto = (idProduto) => {
    const { anuncio } = this.state

    this.setState({
      anuncio: {
        ...anuncio,
        anuncioProdutosRemovidos: [...anuncio.anuncioProdutosRemovidos, ...anuncio.anuncioProdutos.filter((ap) => ap.idProduto === idProduto)],
        anuncioProdutos: [...anuncio.anuncioProdutos.filter((ap) => ap.idProduto !== idProduto)],
      },
    })
  }

  handleOnRestoreProduto = (idProduto) => {
    const { anuncio } = this.state

    this.setState({
      anuncio: {
        ...anuncio,
        anuncioProdutosRemovidos: [...anuncio.anuncioProdutosRemovidos.filter((ap) => ap.idProduto !== idProduto)],
        anuncioProdutos: [...anuncio.anuncioProdutos, ...anuncio.anuncioProdutosRemovidos.filter((ap) => ap.idProduto === idProduto)],
      },
    })
  }

  handleOnAddProdutoManual = (id, nome, produto) => {
    const { anuncio } = this.state

    const novoProduto = {
      idProduto: id,
      nomeProduto: nome,
      produto: produto,
      preco: 0,
      quantidade: 0,
      unidade: 'KG',
    }

    this.setState({
      anuncio: {
        ...anuncio,
        anuncioProdutos: [...anuncio.anuncioProdutos, novoProduto],
      },
    })
  }

  renderAnuncioForm = () => {
    const { anuncio } = this.state
    const {
      contrato,
      produtos,
      anuncio: { isPosting },
      dispatch,
    } = this.props

    return (
      <Screen back={{ to: '/venda/contrato/listar/todos', title: 'Contrato' }}>
        <Container>
          <Row xs={12}>
            {this.renderAssinaturas()}
            {this.renderGrupos()}
          </Row>
          <hr />
          <Row xs={12}>
            <Col xs={12}>
              <HorarioBox
                titulo="Reserva"
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
                titulo="Entrega"
                disabled={false}
                inicio={anuncio.dataInicioEntrega}
                fim={anuncio.dataFimEntrega}
                onChangeInicio={this.handleOnChangeInicioEntrega}
                onChangeFim={this.handleOnChangeFimEntrega}
                invalidInicio={!isEntregaInicioValid(anuncio)}
                invalidFim={!isEntregaFimValid(anuncio)}
              />
            </Col>
            <EstoqueSwitchComPreco
              isEstoque={anuncio.isEstoqueProduto}
              onChangeEstoque={(isEstoque) => this.setState({ anuncio: { ...anuncio, isEstoqueProduto: isEstoque } })}
              isPreco={anuncio.isPrecoProduto}
              onChangePreco={(isPreco) => this.setState({ anuncio: { ...anuncio, isPrecoProduto: isPreco } })}
            />
            <Col xs={12}>
              <ProdutosList
                anuncioProdutos={anuncio.anuncioProdutos}
                produtos={produtos.filter((p) => !anuncio.anuncioProdutos.some((ap) => ap.idProduto === p.idProduto))}
                onChange={this.handleOnChangeProduto}
                onRemove={this.handleOnRemoveProduto}
                onAdd={this.handleOnAddProdutoManual}
                isEstoqueProduto={anuncio.isEstoqueProduto}
                isPrecoProduto={anuncio.isPrecoProduto}
              />
            </Col>
            <Col xs={12}>
              <ImportarPlanilha anuncioProdutos={anuncio.anuncioProdutos} produtos={produtos} onImportar={this.handleOnImportarPlanilha} />
            </Col>
            <Col xs={12}>
              <ObservationTextArea
                onChange={(e) => this.setState({ anuncio: { ...anuncio, observacaoAnuncio: e.target.value } })}
                maxchars={500}
                labeltextarea="Observações:"
                textarearows="3"
                value={this.state.anuncio.observacaoAnuncio || ''}
              />
            </Col>
            <Col xs={12}>
              <FormasDePagamentoBox formasDePagamento={contrato.formasDePagamento} />
            </Col>
            <Col xs={12}>
              <ProdutosList
                anuncioProdutos={anuncio.anuncioProdutosRemovidos}
                onRestore={this.handleOnRestoreProduto}
                isEstoqueProduto={anuncio.isEstoqueProduto}
                isPrecoProduto={anuncio.isPrecoProduto}
                removido
              />
            </Col>
            <Col xs={12}>
              <BotaoSalvar onClick={() => dispatch(addAnuncio(anuncio))} disabled={isPosting || !isFormValid(anuncio)} />
            </Col>
          </Row>
        </Container>
      </Screen>
    )
  }

  renderError = () => {
    const {
      anuncio: { anuncio },
    } = this.props

    return (
      <TelaSucesso>
        <Mensagem>Anúncio registrado com sucesso!</Mensagem>
        <Link to={URL_VENDA_ANUNCIO_EDITAR(anuncio.id)}>Editar esse anuncio</Link>
        <br />
        <Link to={URL_VENDA_ANUNCIO_LISTAR()}>Listar anuncios</Link>
        <Link to="/">Tela Principal</Link>
      </TelaSucesso>
    )
  }

  render() {
    const {
      connection,
      dispatch,
      isLoading,
      contrato,
      anuncio: { anuncio, isPosting, hasError, hasSuccess, error },
      clearError,
    } = this.props

    if (connection) {
      return <Refresh error={connection} dispatch={dispatch} />
    }

    if (isLoading || isPosting) {
      return <Loading />
    }

    if (hasError) {
      return <TelaDeErro error={error} callbackReturn={() => dispatch(clearError())} message="Erro ao tentar cadastrar anuncio" />
    }

    if (anuncio && hasSuccess) {
      return this.renderError()
    }

    if (contrato !== null) {
      return this.renderAnuncioForm()
    }

    return <Loading />
  }
}

const mapStateToProps = (state) => ({
  connection: state.main.connection,
  contrato: state.vendaContrato.contrato,
  isLoading: state.vendaContrato.idLoadingById,
  produtos: state.produto.produtos,
  anuncio: state.vendaAnuncio,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  clearError,
  addAnuncio,
  loadProdutos,
  loadContratoById,
})

export default connect(mapStateToProps, mapDispatchToProps)(AnuncioNovo)
