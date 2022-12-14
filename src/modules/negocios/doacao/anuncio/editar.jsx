import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'

import Loading from 'components/loading'
import Refresh from 'components/refresh'
import { TelaSucesso, Link, Mensagem } from 'components/telaSucesso'
import TelaDeErro from 'components/telaDeErro'
import BotaoSalvar from 'components/BotaoSalvar'
import ObservationTextArea from 'components/observationTextArea'
import { isArrayEmpty, isArrayNotEmpty, isObjectReady } from 'util/utils'

import { updateAnuncio, loadAnuncioById, clearError } from './action'
import { loadContratoById } from '../contrato/action'
import { loadProdutos } from 'modules/produto/actions'

import { URL_DOACAO_ANUNCIO_LISTAR, URL_DOACAO_ANUNCIO_EDITAR } from './urls'

import { EstoqueSwitch } from 'modules/produto/components'
import { Screen } from 'components/style'

import ACTIONS from './actionTypes'

import { AssinaturasBox, GrupoBox, HorarioBox, ProdutosList, ImportarPlanilha } from './components'

import { isFormValid, isReservaDataInicioValid, isEntregaDataInicioValid, isReservaDataFimValid, isEntregaDataFimValid } from './validacoes'

class AnuncioEditar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      anuncio: {
        idContrato: null,
        dataInicioReserva: null,
        dataFimReserva: null,
        dataInicioEntrega: null,
        dataFimEntrega: null,
        anuncioProdutos: [],
        observacaoAnuncio: null,
        isEstoqueProduto: false,
        ativo: true,
        anuncioProdutosRemovidos: [],
      },
      original: {},
    }
  }

  componentDidMount() {
    this.loadInicial()
  }

  loadInicial = async () => {
    const {
      dispatch,
      loadProdutos,
      match: { params },
    } = this.props

    const idAnuncio = params.id
    await dispatch(loadAnuncioById(idAnuncio))
    await dispatch(loadProdutos())
    const anuncio = Object.assign({}, this.state.anuncio)
    anuncio.anuncioProdutos = anuncio.anuncioProdutos.map((ap) => ({ ...ap, registered: true }))
    this.setState({ anuncio })
  }

  componentDidUpdate(prevProps) {
    const {
      anuncio: { anuncio },
      contrato,
      dispatch,
      loadContratoById,
    } = this.props

    if (isObjectReady(anuncio) && prevProps.anuncio.anuncio !== anuncio) {
      dispatch(loadContratoById(anuncio.idContrato))

      const anuncioTratado = {
        ...anuncio,
        dataInicioReserva: new Date(anuncio.dataInicioReserva),
        dataFimReserva: new Date(anuncio.dataFimReserva),
        dataInicioEntrega: new Date(anuncio.dataInicioEntrega),
        dataFimEntrega: new Date(anuncio.dataFimEntrega),
        anuncioProdutos: anuncio.anuncioProdutos,
      }

      this.setState({ anuncio: anuncioTratado, original: { ...anuncioTratado, anuncioProdutosRemovidos: null } })
    }

    if (isObjectReady(contrato) && prevProps.contrato !== contrato) {
      this.setState({
        anuncio: {
          ...this.state.anuncio,
          anuncioProdutosRemovidos: contrato.produtos.filter((p) => !this.state.anuncio.anuncioProdutos.some((ap) => ap.idProduto === p.idProduto)),
        },
      })
    }
  }

  handleOnChangeInicioReserva = (inicioReserva) => this.setState({ anuncio: { ...this.state.anuncio, dataInicioReserva: inicioReserva } })
  handleOnChangeFimReserva = (fimReserva) => this.setState({ anuncio: { ...this.state.anuncio, dataFimReserva: fimReserva } })
  handleOnChangeInicioEntrega = (inicioEntrega) => this.setState({ anuncio: { ...this.state.anuncio, dataInicioEntrega: inicioEntrega } })
  handleOnChangeFimEntrega = (fimEntrega) => this.setState({ anuncio: { ...this.state.anuncio, dataFimEntrega: fimEntrega } })

  renderAssinaturas = () =>
    !isArrayEmpty(this.props.contrato.assinaturas) && (
      <Col xs={12}>
        <AssinaturasBox assinaturas={this.props.contrato.assinaturas} />
      </Col>
    )
  renderGrupos = () =>
    !isArrayEmpty(this.props.contrato.grupos) && (
      <Col xs={12}>
        <GrupoBox grupos={this.props.contrato.grupos} />
      </Col>
    )

  handleOnImportarPlanilha = (anunciosProdutos) => {
    const { anuncio } = this.state

    if (!isArrayEmpty(anunciosProdutos)) {
      this.setState({ anuncio: { ...anuncio, anuncioProdutos: [...anunciosProdutos] } })
    }
  }

  alterarAnuncioProduto = (ap, unidade, quantidade) => ({
    ...ap,
    unidade,
    quantidade,
  })

  handleOnChangeProduto = (idProduto, unidade, quantidade) => {
    const { anuncio } = this.state
    const anuncioProdutos = anuncio.anuncioProdutos.map((ap) => (ap.idProduto === idProduto ? this.alterarAnuncioProduto(ap, unidade, quantidade) : { ...ap }))
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
    const { produtos } = this.props

    return (
      <Container>
        <Row xs={12}>
          {this.renderAssinaturas()}
          {this.renderGrupos()}
        </Row>
        <Row>
          <Col xs={12}>
            <HorarioBox
              titulo="Reserva"
              disabled={false}
              inicio={anuncio.dataInicioReserva}
              fim={anuncio.dataFimReserva}
              onChangeInicio={this.handleOnChangeInicioReserva}
              onChangeFim={this.handleOnChangeFimReserva}
              invalidInicioData={!isReservaDataInicioValid(anuncio)}
              invalidFimData={!isReservaDataFimValid(anuncio)}
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
              invalidInicioData={!isEntregaDataInicioValid(anuncio)}
              invalidFimData={!isEntregaDataFimValid(anuncio)}
            />
          </Col>
          <Col xs={12}>
            <ProdutosList
              anuncioProdutos={anuncio.anuncioProdutos || []}
              produtos={produtos.filter((p) => !anuncio.anuncioProdutos.some((ap) => ap.idProduto === p.idProduto))}
              onChange={this.handleOnChangeProduto}
              onRemove={this.handleOnRemoveProduto}
              onAdd={this.handleOnAddProdutoManual}
              isEstoqueProduto={anuncio.isEstoqueProduto}
            />
          </Col>
          <EstoqueSwitch isEstoque={anuncio.isEstoqueProduto} onChangeEstoque={(isEstoque) => this.setState({ anuncio: { ...anuncio, isEstoqueProduto: isEstoque } })} />
          <Col xs={12}>
            <ImportarPlanilha anuncioProdutos={anuncio.anuncioProdutos} produtos={produtos} onImportar={this.handleOnImportarPlanilha} />
          </Col>
          <Col xs={12}>
            <ObservationTextArea
              onChange={(e) => this.setState({ anuncio: { ...anuncio, observacaoAnuncio: e.target.value } })}
              ref={this.textAreaRef}
              maxchars={500}
              labeltextarea="Observa????es:"
              textarearows="3"
              value={this.state.anuncio.observacaoAnuncio || ''}
            />
          </Col>
          {this.renderSalvar()}
          <Col xs={12}>
            <ProdutosList anuncioProdutos={anuncio.anuncioProdutosRemovidos || []} onRestore={this.handleOnRestoreProduto} removido isEstoqueProduto={anuncio.isEstoqueProduto} />
          </Col>
          {isArrayNotEmpty(anuncio.anuncioProdutosRemovidos) && this.renderSalvar()}
        </Row>
      </Container>
    )
  }
  renderSalvar = () => {
    const { anuncio, original } = this.state
    const {
      anuncio: { isUpdating },
      dispatch,
    } = this.props

    return (
      <Col xs={12}>
        <BotaoSalvar onClick={() => dispatch(updateAnuncio(anuncio))} disabled={isUpdating} />
      </Col>
    )
  }

  renderSucesso = () => (
    <TelaSucesso>
      <Mensagem>An??ncio atualizado com sucesso!</Mensagem>
      <Link to={URL_DOACAO_ANUNCIO_EDITAR(this.props.anuncio.anuncio.id)} dispatch={() => this.callbackSucesso()}>
        Editar esse anuncio
      </Link>
      <br />
      <Link to={URL_DOACAO_ANUNCIO_LISTAR()} dispatch={() => this.callbackSucesso()}>
        Listar anuncios
      </Link>
      <Link to="/" dispatch={() => this.callbackSucesso()}>
        Tela Principal
      </Link>
    </TelaSucesso>
  )

  callbackSucesso = () => {
    const { dispatch } = this.props

    this.loadInicial()
    dispatch({ type: ACTIONS.ANUNCIO.CLEARSUCCESS })
  }

  render() {
    const {
      connection,
      dispatch,
      isLoading,
      contrato,
      anuncio: { anuncio, isUpdating, hasError, error, hasSuccess },
    } = this.props

    if (hasError || isArrayNotEmpty(error) || error.length > 0) {
      console.log('erro', hasError, error)
      return <TelaDeErro error={error} callbackReturn={() => dispatch(clearError())} callbackReset={() => this.loadInicial()} message="Erro ao tentar cadastrar anuncio" />
    }

    if (connection) {
      return <Refresh error={connection} dispatch={dispatch} />
    }

    if (isLoading || isUpdating) {
      return <Loading />
    }

    if (anuncio && hasSuccess) {
      return this.renderSucesso()
    }

    if (isObjectReady(contrato) && isObjectReady(anuncio)) {
      return <Screen back={{ to: '/doacao/anuncio/listar', title: 'Anuncios' }}>{this.renderAnuncioForm()}</Screen>
    }

    return <Loading />
  }
}

const mapStateToProps = (state) => ({
  connection: state.main.connection,
  contrato: state.doacaoContrato.contrato,
  isLoading: state.doacaoContrato.idLoadingById || state.doacaoAnuncio.idLoadingById,
  produtos: state.produto.produtos,
  anuncio: state.doacaoAnuncio,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  updateAnuncio,
  loadProdutos,
  loadContratoById,
})

export default connect(mapStateToProps, mapDispatchToProps)(AnuncioEditar)
