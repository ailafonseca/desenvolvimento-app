import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert, Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

import TelaDeErro from 'components/telaDeErro'
import InputNumber from 'components/input/inputNumberConfirm'
import ObservationTextArea from 'components/observationTextArea'
import Loading from 'components/loading'
import Refresh from 'components/refresh'

import { saveReserva, clearError } from './action'
import { loadReservaById } from './../reserva/action'

import BotaoSalvar from 'components/BotaoSalvar'

import RenderInformacoes from 'modules/negocios/components/renderInformacaoEmpresa'

import './entrega.css'
import { isNullOrEmpty } from 'util/utils'
import { Screen } from 'components/style'

import SectionHandler from '../contrato/sectionHandler'

class EntregaDoadorEditar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      reservaProdutos: [],
      contrato: {},
      idReserva: '',
      naoLocalizado: false,
      responsavelEntrega: '',
      notafiscalEntrega: '',
      observacaoEntrega: '',
      isActive: true,
      ranking: '',
      idReservaInteracao: '',
      reserva: {},
      isLoadingDetalheEntrega: true,
      checked: false,
    }
  }

  componentDidMount() {
    const {
      match: { params },
      dispatch,
      loadReservaById,
    } = this.props

    const idReservaInteracao = params.id
    dispatch(loadReservaById(idReservaInteracao, { begin: 'a', success: 'b', failure: 'c' })).then((result) => {
      if (result && result.payload && result.payload.interacoes && result.payload.interacoes.length > 0) {
        this.handleLoadReservaResult(result)
      } else {
        console.log('não foi localizado a reserva para essa entrega')
        this.setState({ naoLocalizado: true, isLoadingDetalheEntrega: false })
      }
    })
  }

  handleLoadReservaResult(result) {
    const reservaProdutos = result.payload.ultimaInteracao.reservaProdutos
    const entregasRealizadas = result.payload.ultimaInteracao.entregas
    const newReservaProdutos = reservaProdutos.map((produto) => ({
      ...produto,
      quantidadeRetiradaAnunciante: produto.quantidade,
    }))
    this.setState({ entregasRealizadas }, () => this.loadEntregaDetails())
    this.setState({ idReservaInteracao: result.payload.interacoes[result.payload.interacoes.length - 1].id })
    this.setState({ reservaProdutos: newReservaProdutos })
    this.setState({ reserva: result.payload, isLoadingDetalheEntrega: false })
  }

  loadEntregaDetails() {
    const isEntregaDone = this.isEntregaRealizada()
    if (isEntregaDone === true) {
      const { entregasRealizadas } = this.state

      if (Array.isArray(entregasRealizadas) && entregasRealizadas.length > 0) {
        const entrega = entregasRealizadas[0]

        this.setState({
          observacaoEntrega: entrega.observacoes,
          notafiscalEntrega: entrega.numeroNotaFiscal,
          responsavelEntrega: entrega.quemBuscou,
          ranking: entrega.ranking,
        })
      }
    }
  }

  renderObservacoesAnuncio = (anuncio) => {
    if (anuncio.observacaoAnuncio !== '') {
      return (
        <p>
          <b>Observação do anúncio: </b>
          {`${anuncio.observacaoAnuncio}`}
        </p>
      )
    } else {
      return (
        <>
          Sem observações de anúncio
          <br />
        </>
      )
    }
  }

  renderObservacoesReserva = (anuncio) => {
    if (anuncio.interacoes && anuncio.interacoes.length > 0 && anuncio.interacoes[0].observacao !== undefined) {
      return (
        <p>
          <b>Observação da reserva: </b>
          {`${anuncio.interacoes[0].observacao}`}
        </p>
      )
    } else {
      return <>Sem observações de reserva</>
    }
  }

  onChangeQuantidade(qtd, idProduto) {
    const { reservaProdutos } = this.state
    const index = reservaProdutos.findIndex((produto) => produto.idProduto === idProduto)
    const qtdReservada = parseFloat(qtd)

    reservaProdutos[index].quantidadeRetiradaAnunciante = qtdReservada >= 0.0 ? qtdReservada : parseFloat(0)

    this.setState({ reservaProdutos })
  }

  createObjectToApi() {
    const entregaObject = {
      entregaProdutos: this.state.reservaProdutos.map((produto) => ({
        id: null,
        idReservaProduto: produto.id,
        idProduto: produto.idProduto,
        // unidade: null,
        nomeProduto: produto.nomeProduto,
        quantidade: produto.quantidadeRetiradaAnunciante,
        // observacoes: "string",
      })),
      realizada: moment().local().format(),
      quemBuscou: this.state.responsavelEntrega,
      numeroNotaFiscal: this.state.notafiscalEntrega,
      motivoDivergencia: this.state.observacaoEntrega,
      ranking: this.state.ranking,
      observacoes: this.state.observacaoEntrega,
      idReservaInteracao: this.state.idReservaInteracao,
    }

    return entregaObject
  }

  onSubmit() {
    const { dispatch, saveReserva } = this.props
    console.log(moment().local().format())
    dispatch(saveReserva(this.createObjectToApi()))
  }

  renderLinhaProduto(item) {
    return (
      <tr key={item.idProduto}>
        <td>
          {item.nomeProduto} ({item.unidade})
        </td>
        <td className="text-center">{item.quantidade}</td>
        <td>
          <InputNumber
            id={item.idProduto}
            valor={item.quantidadeRetiradaAnunciante}
            min={0}
            precision={2}
            confirmacao={false}
            onChange={(e) => this.onChangeQuantidade(e, item.idProduto)}
          />
        </td>
        <button className="btn btn-primary" size="md" onClick={() => this.selectAllItems()}>
          Selecionar Todos os Itens
        </button>
      </tr>
    )
  }

  renderTabelaProduto(produtos) {
    return (
      <div className="table-responsive my-3">
        <table className="table table-striped table-hover table-sm">
          <thead>
            <tr>
              <th className="text-center" scope="col">
                Nome Produto (UN)
              </th>
              <th className="text-center" scope="col">
                Quantidade reservada
              </th>
              <th className="text-center" scope="col">
                Quantidade entregue/retirada
              </th>
            </tr>
          </thead>
          <tbody>{produtos.filter((x) => x.quantidade > 0).map((produto) => this.renderLinhaProduto(produto))} </tbody>
        </table>
        <button className="btn btn-danger" size="md" onClick={() => this.selectAllProducts()}>
          Selecionar Todos os Produtos
        </button>
      </div>
    )
  }

  handleHide = () => {
    this.setState({
      isActive: false,
    })
  }

  renderFailAlert() {
    const { isFailedToSaveEntrega } = this.props
    const { reservaProdutos } = this.state
    for (let i = 0; i < reservaProdutos.length; i++) {
      if (isFailedToSaveEntrega === true && reservaProdutos[i].qtdReservada !== reservaProdutos[i].quantidadeRetiradaAnunciante) {
        return <Alert variant="danger">Indique nas observações o motivo da divergência na quantidade do produto reservado e entregue.</Alert>
      }
    }
  }

  isEntregaRealizada() {
    const { entregasRealizadas } = this.state
    return Array.isArray(entregasRealizadas) && entregasRealizadas.length > 0
  }

  renderActionButtons() {
    const { pristine, submitting, invalid, isLoadingBtn } = this.props

    if (this.isEntregaRealizada()) {
      return (
        <>
          <hr className="my-3" />
          <Alert variant="info">
            <strong>Entrega já registrada. </strong>As informações apresentadas são apenas para fins de visualização.
          </Alert>
        </>
      )
    } else {
      return (
        <div className="row justify-content-end">
          {/* <div className='col-md-4 my-2'>
            <BotaoCancelar onClick={this.handleHide} label='Não vou retirar' />
          </div> */}
          <div className="col-md-3 my-2">
            <BotaoSalvar onClick={() => this.onSubmit()} disabled={pristine || submitting || invalid || isLoadingBtn || isNullOrEmpty(this.state.responsavelEntrega)} />
          </div>
        </div>
      )
    }
  }

  selectAllItems = () => {} // o Input Number deve ser 0 e <=item.quantidade. return item.quantidade no INPUT (?).
  selectAllProducts = () => {} // soma de todas as reservas de produto ou item.quantidade (?).

  onChangeCheckBox = (value) => this.setState({ checked: value })
  onChangeTextArea = (value) => this.setState({ observacaoEntrega: value })
  onChangeResponsavel = (value) => this.setState({ responsavelEntrega: value })
  onChangeNotaFiscal = (value) => this.setState({ notafiscalEntrega: value })

  handleEtapa1Dados = () => {
    return (
      <>
        <h5>Preencha os dados da entrega:</h5>
        {this.renderTabelaProduto(this.state.reservaProdutos)}{' '}
        <div className="form-group">
          <label htmlFor="nome">Responsável pela entrega/retirada: *</label>
          <textarea onChange={(e) => this.onChangeResponsavel(e.target.value)} rows={1} className="form-control" value={this.state.responsavelEntrega} required />
        </div>
      </>
    )
  }

  handleEtapa2Vazia = () => {
    return <h1> Vazio</h1>
  }

  handleEtapa3NotaFiscal = () => {
    return (
      <>
        <div className="form-group">
          <label htmlFor="nome">Número da Nota Fiscal:</label>
          <textarea
            onChange={(e) => this.onChangeNotaFiscal(e.target.value)}
            rows={1}
            className="form-control"
            value={this.state.notafiscalEntrega}
            disabled={this.state.checked}
          />
        </div>
        <Checkbox onChange={(e) => this.onChangeCheckbox(e.target.value)} value={this.state.checked}></Checkbox>
        <label htmlFor="nome">Sem Nota Fiscal</label>
        <ObservationTextArea
          onChange={(e) => this.onChangeTextArea(e.target.value)}
          ref={this.textAreaRef}
          maxchars={500}
          labeltextarea="Observações: "
          textarearows="3"
          value={this.state.observacaoEntrega}
        />
        <div className="form-group">
          <div>Como você classificaria a entrega?</div>
          <div className="rate" onChange={(e) => this.setState({ ranking: e.target.value })}>
            <input type="radio" id="star5" name="rate" value="5" />
            <label htmlFor="star5" title="5 estrelas">
              5 estrelas
            </label>
            <input type="radio" id="star4" name="rate" value="4" />
            <label htmlFor="star4" title="4 estrelas">
              4 estrelas
            </label>
            <input type="radio" id="star3" name="rate" value="3" />
            <label htmlFor="star3" title="3 estrelas">
              3 estrelas
            </label>
            <input type="radio" id="star2" name="rate" value="2" />
            <label htmlFor="star2" title="2 estrelas">
              2 estrelas
            </label>
            <input type="radio" id="star1" name="rate" value="1" />
            <label htmlFor="star1" title="1 estrela">
              1 estrela
            </label>
          </div>
        </div>
      </>
    )
  }

  render() {
    const { connection, dispatch, isLoadingBtn, isPosting, isLoadingReserva, hasError, errors } = this.props
    const { reserva, isLoadingDetalheEntrega } = this.state

    if (connection) {
      return <Refresh error={connection} dispatch={dispatch} />
    }

    if (isLoadingDetalheEntrega || isLoadingBtn || isLoadingReserva) {
      return <Loading />
    }

    if (reserva === undefined || reserva === null || reserva.id === undefined) {
      return <>Não foi possível localizar o id informado</>
    }

    if (hasError) {
      return <TelaDeErro error={errors} callbackReturn={() => dispatch(clearError())} message="Erro ao tentar cadastrar anuncio" />
    }

    return this.state.isActive ? (
      <Screen back={{ to: '/doacao/entrega-doador/listar', title: 'Entregas' }}>
        <Container>
          <div className="mt-4 mb-4 caixa">
            {this.renderFailAlert()}
            <RenderInformacoes reserva={reserva} />
            <SectionHandler
              etapas={[
                {
                  etapa: 1,
                  callback: this.handleEtapa1Dados,
                  ativa: true,
                },
                {
                  etapa: 2,
                  callback: this.handleEtapa2Vazia,
                  ativa: false,
                },
                {
                  etapa: 3,
                  callback: this.handleEtapa3NotaFiscal,
                  ativa: false,
                },
              ]}
              etapaInicial={1}
              finalizar={this.submitForm}
            />
          </div>
          <label>* Itens obrigatórios</label>
          {this.renderActionButtons()}
        </Container>
      </Screen>
    ) : (
      <Screen back={{ to: '/doacao/entrega-doador/listar', title: 'Entregas' }}>
        <div className="container margin">
          <h4 className="margin"> Não vai retirar? Diga-nos o porquê: *</h4>
          <ObservationTextArea
            className="margin"
            onChange={(e) => this.onChangeTextArea(e.target.value)}
            ref={this.textAreaRef}
            maxchars={500}
            required
            textarearows="3"
            value={this.state.observacaoEntrega}
          />
          <label>* Item obrigatório</label>
          <div className={`row justify-content-end container-actions ${this.props.isInViewport ? 'container-actions-absolute' : 'container-actions-absolute'}`}>
            <div className="col-md-3 col-sm-2 my-2">
              <button
                className="btn btn-success btn-block"
                onClick={() => this.onSubmit()}
                disabled={isPosting || this.state.observacaoEntrega === '' || this.state.observacaoEntrega === undefined}
              >
                {isPosting ? <FontAwesomeIcon spin icon={faSpinner} /> : 'Salvar'}
              </button>
            </div>
          </div>
        </div>
      </Screen>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.doacaoEntregaDoador,
  isLoadingReserva: state.doacaoReserva.isLoading,
  connection: state.main.connection,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  loadReservaById,
  saveReserva,
})

export default connect(mapStateToProps, mapDispatchToProps)(EntregaDoadorEditar)
