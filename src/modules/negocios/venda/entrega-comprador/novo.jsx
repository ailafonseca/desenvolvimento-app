import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Alert } from 'react-bootstrap'

import { saveReserva } from './action'
import { loadReservaById } from './../reserva/action'
import { DisplayString, DateTimeFormatOrDash } from 'util/display'
import InputNumber from 'components/input/inputNumberConfirm'
import ObservationTextArea from 'components/observationTextArea'
import Loading from 'components/loading'
import Refresh from 'components/refresh'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons'
import './entrega.css'
import moment from 'moment'

import Select from 'react-select'
import { isNullOrEmpty, orderProductsAsc } from 'util/utils'
import formasPagamento from 'modules/pagamentos/pagamentos'

import Card from 'react-bootstrap/Card'

import BotaoCancelar from 'components/BotaoCancelar'
import BotaoSalvar from 'components/BotaoSalvar'
import { Screen } from 'components/style'
import { API_ARQUIVO } from './urls'

class EntregaCompradorEditar extends Component {
  /**
   * @deprecated
   * @see https://reactjs.org/docs/legacy-context.html
   */
  constructor (props) {
    super(props)

    this.state = {
      reservaProdutos: [],
      contrato: {},
      idReserva: '',
      loaded: false,
      naoLocalizado: false,
      responsavelEntrega: '',
      notafiscalEntrega: '',
      formasDePagamento: [],
      observacaoEntrega: '',
      isActive: true,
      ranking: '',
      idReservaInteracao: '',
      formaDePagamentoEntregaNome: '',
      formaDePagamentoEntregaId: '',
      reserva: {},
      isLoadingDetalheEntrega: true
    }
  }

  componentDidMount () {
    const {
      match: { params },
      dispatch,
      loadReservaById
    } = this.props

    const idReservaInteracao = params.id
    dispatch(loadReservaById(idReservaInteracao, { begin: 'a', success: 'b', failure: 'c' })).then((result) => {
      if (result.payload && result.payload.interacoes && result.payload.interacoes.length > 0) {
        this.handleLoadReservaResult(result)
      } else {
        console.log('não foi localizado a reserva para essa entrega')
        this.setState({ naoLocalizado: true, loaded: true })
      }
    })
  }

  handleLoadReservaResult (result) {
    const reservaProdutos = result.payload.ultimaInteracao.reservaProdutos
    const entregasRealizadas = result.payload.ultimaInteracao.entregas
    const newReservaProdutos = reservaProdutos.map((produto) => ({
      ...produto,
      quantidadeRetiradaComprador: produto.quantidade,
      precoUnitario: produto.quantidade > 0 ? parseFloat(produto.valor) / parseFloat(produto.quantidade) : 0
    }))
    const idFormaDePagamento = result.payload.ultimaInteracao.idFormaDePagamento
    const index = formasPagamento.findIndex((pagamento) => pagamento.id.toUpperCase() === idFormaDePagamento.toUpperCase())
    const formaDePagamentoEntrega = {
      nome: formasPagamento[index].nome,
      id: formasPagamento[index].id
    }
    this.setState({ entregasRealizadas }, () => this.loadEntregaDetails())
    this.setState({ formaDePagamentoEntregaNome: formaDePagamentoEntrega.nome })
    this.setState({ formaDePagamentoEntregaId: formaDePagamentoEntrega.id })
    this.setState({ idReservaInteracao: result.payload.interacoes[result.payload.interacoes.length - 1].id })
    this.setState({ reservaProdutos: newReservaProdutos })
    this.setState({ reserva: result.payload, isLoadingDetalheEntrega: false })
  }

  loadEntregaDetails () {
    const isEntregaDone = this.isEntregaRealizada()
    if (isEntregaDone === true) {
      const { entregasRealizadas } = this.state

      if (Array.isArray(entregasRealizadas) && entregasRealizadas.length > 0) {
        const entrega = entregasRealizadas[0]

        this.setState({
          observacaoEntrega: entrega.observacoes,
          notafiscalEntrega: entrega.numeroNotaFiscal,
          responsavelEntrega: entrega.quemBuscou,
          ranking: entrega.ranking
        })
      }
    }
  }

  renderList (reserva) {
    const { idReservaInteracao } = this.state

    let nome = ''
    const anuncio = reserva.anuncio

    if (anuncio.contrato !== undefined && anuncio.contrato !== null) {
      nome = DisplayString(anuncio.contrato.nome)
    }

    return (
      <div className='table-responsive'>
        <table className='table table-striped table-hover table-sm mb-3'>
          <thead>
            <tr>
              <th scope='col'>Empresa</th>
              <th scope='col'>Inicio Entrega</th>
              <th scope='col'>Fim Entrega</th>
            </tr>
          </thead>
          <tbody>
            <tr key={anuncio.id}>
              <td>
                <span>{`${anuncio.contrato.empresa.nomeEmpresa}`}</span>
              </td>
              <td>{DateTimeFormatOrDash(anuncio.dataInicioEntrega)}</td>
              <td>{DateTimeFormatOrDash(anuncio.dataFimEntrega)}</td>
            </tr>
          </tbody>
        </table>
        <Card style={{ width: '100%' }}>
          <Card.Header>{nome}</Card.Header>
          <Card.Body>
            <Container>
              <Row>
                <Col xs={12} sm={12} md={8}>
                  <span>
                    <b>Descrição do contrato: </b>
                    {`${anuncio.contrato.descricao}`}
                  </span>
                  <div className='lastObservations'>
                    {typeof anuncio === 'object' && Object.keys(anuncio).length > 0 && anuncio.observacaoAnuncio !== '' ? (
                      <p>
                        <b>Observação do anúncio: </b>
                        {`${anuncio.observacaoAnuncio || '-'}`}
                      </p>
                    ) : (
                      'Sem observações de anúncio'
                    )}
                    {typeof reserva === 'object' && Object.keys(reserva).length > 0 && reserva.interacoes[0].observacao !== undefined ? (
                      <p>
                        <b>Observação da reserva: </b>
                        {`${reserva.interacoes[0].observacao}`}
                      </p>
                    ) : (
                      'Sem observações de reserva'
                    )}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <b>Comprovante de pagamento: </b>
                  <a href={API_ARQUIVO(idReservaInteracao)} target='_blank' rel='noopener noreferrer'>
                    abrir
                  </a>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </div>
    )
  }

  handlePaymentRemove = (idPagamento) => {
    if (Array.isArray(this.state.formasDePagamento)) {
      const pagamentos = this.state.formasDePagamento.filter((pagamento) => pagamento.idFormaPagamento !== idPagamento)

      this.setState({ formasDePagamento: pagamentos })
    }
  }

  checkIfPaymentIsAlreadySelected (idFormaPagamento) {
    const pagamentosJaSelecionados = this.state.formasDePagamento
    let isSelected = false
    for (let i = 0; i < pagamentosJaSelecionados.length && isSelected === false; i++) {
      pagamentosJaSelecionados[i].idFormaPagamento === idFormaPagamento ? (isSelected = true) : (isSelected = false)
    }
    return isSelected
  }

  renderSelectPayments = () => {
    // const { pagamentos } = this.props;
    const pagamentos = formasPagamento
    const pagamentosJaSelecionados = this.state.formasDePagamento

    if (pagamentos !== undefined && pagamentos.constructor === Array && pagamentos.length > 0) {
      const filteredPagamentos =
        pagamentosJaSelecionados !== undefined && pagamentosJaSelecionados.constructor === Array && pagamentosJaSelecionados.length > 0
          ? pagamentos.filter((pagamento) => !this.checkIfPaymentIsAlreadySelected(pagamento.idFormaPagamento))
          : pagamentos

      if (filteredPagamentos !== undefined && filteredPagamentos.constructor === Array && filteredPagamentos.length > 0) {
        const optionsPagamentos = orderProductsAsc(filteredPagamentos).map((item) => {
          return { value: item.idFormaPagamento, label: item.nome }
        })

        return (
          <Select
            id='pagamento'
            value='0'
            name='pagamento'
            placeholder='Selecione o pagamento...'
            options={optionsPagamentos}
            searchable
            onChange={this.handlePaymentAdd}
            noOptionsMessage={() => 'Pagamento não existe'}
            styles={{
              // Fixes the overlapping problem of the component
              menu: (provided) => ({ ...provided, zIndex: 9999 })
            }}
          />
        )
      }
    }

    return <Select id='pagamento' value='0' name='pagamento' placeholder='Selecione o pagamento...' options={[{ value: '0', label: '-' }]} searchable isDisabled />
  }

  handlePaymentAdd = (event) => {
    // const produtosList = this.props.produtos;
    const pagamentosList = formasPagamento
    const idPagamento = event.value

    if (Array.isArray(pagamentosList)) {
      const pagamento = pagamentosList.find((p) => p.idFormaPagamento === idPagamento)
      const pagamentos = [...this.state.formasDePagamento, pagamento]

      this.setState({ formasDePagamento: pagamentos })
    }
  }

  renderCurrentPagamentos = () => {
    const { formasDePagamento } = this.state

    if (formasDePagamento !== undefined && formasDePagamento.constructor === Array && formasDePagamento.length > 0) {
      return (
        <table className='table table-hover table-sm'>
          <tbody>
            {formasDePagamento.map((pagamento, index) => {
              const nome = pagamento.nome === undefined || pagamento.nome === '' ? pagamento.formaDePagamento.nome : pagamento.nome
              const idFormaPagamento = pagamento.idFormaPagamento === undefined || pagamento.id === '' ? pagamento.formaDePagamento.idFormaPagamento : pagamento.idFormaPagamento
              return (
                <tr key={index}>
                  <td className='align-middle'>{nome}</td>
                  <td className='align-middle text-right'>
                    <button type='button' className='btn btn-link btn-sm' onClick={() => this.handlePaymentRemove(idFormaPagamento)}>
                      <FontAwesomeIcon icon={faTimes} color='#FF0000' size='sm' />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )
    }
    return <div className='form-control border-0'>Não há pagamentos atribuídos</div>
  }

  onChangeQuantidade (qtd, idProduto) {
    const { reservaProdutos } = this.state
    const index = reservaProdutos.findIndex((produto) => produto.idProduto === idProduto)
    const qtdReservada = parseFloat(qtd)

    reservaProdutos[index].quantidadeRetiradaComprador = qtdReservada >= 0.0 ? qtdReservada : parseFloat(0)
    reservaProdutos[index].valor = qtdReservada >= 0.0 ? reservaProdutos[index].precoUnitario * qtdReservada : 0

    this.setState({ reservaProdutos })
  }

  createObjectToApi () {
    const entregaObject = {
      entregaProdutos: this.state.reservaProdutos.map((produto) => ({
        id: null,
        idReservaProduto: produto.id,
        idProduto: produto.idProduto,
        // unidade: null,
        nomeProduto: produto.nomeProduto,
        quantidade: produto.quantidadeRetiradaComprador
        // observacoes: "string",
      })),
      realizada: moment()
        .local()
        .format(),
      quemBuscou: this.state.responsavelEntrega,
      numeroNotaFiscal: this.state.notafiscalEntrega,
      motivoDivergencia: this.state.observacaoEntrega,
      ranking: this.state.ranking,
      formasDePagamento: this.state.formasDePagamento,
      observacoes: this.state.observacaoEntrega,
      idReservaInteracao: this.state.idReservaInteracao
    }

    return entregaObject
  }

  onSubmit () {
    const { dispatch, saveReserva } = this.props
    console.log(
      moment()
        .local()
        .format()
    )
    dispatch(saveReserva(this.createObjectToApi()))
  }

  renderLinhaProduto (item) {
    return (
      <tr key={item.idProduto}>
        <td>
          {item.nomeProduto} ({item.unidade})
        </td>
        <td className='text-center'>{item.quantidade}</td>
        <td>
          <InputNumber
            id={item.idProduto}
            valor={item.quantidadeRetiradaComprador}
            min={0}
            precision={2}
            confirmacao={false}
            onChange={(e) => this.onChangeQuantidade(e, item.idProduto)}
          />
        </td>
        <td className='text-center'>R$ {parseFloat(item.precoUnitario).toFixed(2)}</td>
        <td className='text-center'>R$ {parseFloat(item.valor).toFixed(2)}</td>
      </tr>
    )
  }

  calculateTotalPrice () {
    const { reservaProdutos } = this.state
    let precoTotal = 0
    for (let i = 0; i < reservaProdutos.length; i++) {
      precoTotal = precoTotal + reservaProdutos[i].quantidadeRetiradaComprador * reservaProdutos[i].precoUnitario
    }
    return `R$ ${parseFloat(precoTotal).toFixed(2)}`.replace('.', ',')
  }

  renderTabelaProduto (produtos) {
    return (
      <div className='table-responsive my-3'>
        <table className='table table-striped table-hover table-sm'>
          <thead>
            <tr>
              <th className='text-center' scope='col'>
                Nome Produto (UN)
              </th>
              <th className='text-center' scope='col'>
                Quantidade reservada
              </th>
              <th className='text-center' scope='col'>
                Quantidade entregue/retirada
              </th>
              <th className='text-center' scope='col'>
                Preço unitário
              </th>
              <th className='text-center' scope='col'>
                Preço total
              </th>
            </tr>
          </thead>
          <tbody>{produtos.filter((x) => x.quantidade > 0).map((produto) => this.renderLinhaProduto(produto))}</tbody>
        </table>
        <p>
          <strong>Preço total entregue/retirada: {this.calculateTotalPrice()}</strong>
        </p>
      </div>
    )
  }

  handleHide = () => {
    this.setState({
      isActive: false
    })
  }

  renderFailAlert () {
    const { isFailedToSaveEntrega } = this.props
    const { reservaProdutos } = this.state
    for (let i = 0; i < reservaProdutos.length; i++) {
      if (isFailedToSaveEntrega === true && reservaProdutos[i].qtdReservada !== reservaProdutos[i].quantidadeRetiradaComprador) {
        return <Alert variant='danger'>Indique nas observações o motivo da divergência na quantidade do produto reservado e entregue.</Alert>
      }
    }
  }

  isEntregaRealizada () {
    const { entregasRealizadas } = this.state
    return Array.isArray(entregasRealizadas) && entregasRealizadas.length > 0
  }

  renderActionButtons () {
    const { pristine, submitting, invalid, isLoadingBtn } = this.props

    if (this.isEntregaRealizada()) {
      return (
        <>
          <hr className='my-3' />
          <Alert variant='info'>
            <strong>Entrega já registrada. </strong>As informações apresentadas são apenas para fins de visualização.
          </Alert>
        </>
      )
    } else {
      return (
        <div className='row justify-content-end'>
          <div className='col-md-4 my-2'>
            <BotaoCancelar onClick={this.handleHide} label='Não vou retirar' />
          </div>
          <div className='col-md-3 my-2'>
            <BotaoSalvar onClick={() => this.onSubmit()} disabled={pristine || submitting || invalid || isLoadingBtn || isNullOrEmpty(this.state.responsavelEntrega)} />
          </div>
        </div>
      )
    }
  }

  onChangeTextArea = (value) => this.setState({ observacaoEntrega: value })
  onChangeResponsavel = (value) => this.setState({ responsavelEntrega: value })
  onChangeNotaFiscal = (value) => this.setState({ notafiscalEntrega: value })

  render () {
    const { connection, dispatch, isLoadingBtn, isLoadingReserva } = this.props
    const { reserva, isLoadingDetalheEntrega } = this.state

    if (connection) {
      return <Refresh error={connection} dispatch={dispatch} />
    }

    if (isLoadingDetalheEntrega || isLoadingBtn || isLoadingReserva) {
      return <Loading />
    }

    if (reserva === undefined || reserva === null || reserva.id === undefined) {
      return <>Não foi localizado</>
    }

    return this.state.isActive ? (
      <Screen back={{ to: '/venda/entrega-comprador/listar', title: 'Entrega' }}>
        <div className='container'>
          <div className='mt-4 mb-4 caixa'>
            {this.renderFailAlert()}
            {this.renderList(reserva)}
            {this.renderTabelaProduto(this.state.reservaProdutos)}
            <div className='form-group'>
              <label htmlFor='nome'>Responsável pela entrega/retirada: *</label>
              <textarea onChange={(e) => this.onChangeResponsavel(e.target.value)} rows={1} className='form-control' value={this.state.responsavelEntrega} required />
            </div>
            <div className='form-group'>
              <label htmlFor='nome'>Número da Nota Fiscal:</label>
              <textarea onChange={(e) => this.onChangeNotaFiscal(e.target.value)} rows={1} className='form-control' value={this.state.notafiscalEntrega} />
            </div>
            <div>
              <p>
                <strong>Forma de pagamento: {this.state.formaDePagamentoEntregaNome}</strong>
              </p>
            </div>
            <ObservationTextArea
              onChange={(e) => this.onChangeTextArea(e.target.value)}
              ref={this.textAreaRef}
              maxchars={500}
              labeltextarea='Observações: '
              textarearows='3'
              value={this.state.observacaoEntrega}
            />
            <div className='form-group'>
              <div>Como você classificaria a entrega?</div>
              <div className='rate' onChange={(e) => this.setState({ ranking: e.target.value })}>
                <input type='radio' id='star5' name='rate' value='5' />
                <label htmlFor='star5' title='5 estrelas'>
                  5 estrelas
                </label>
                <input type='radio' id='star4' name='rate' value='4' />
                <label htmlFor='star4' title='4 estrelas'>
                  4 estrelas
                </label>
                <input type='radio' id='star3' name='rate' value='3' />
                <label htmlFor='star3' title='3 estrelas'>
                  3 estrelas
                </label>
                <input type='radio' id='star2' name='rate' value='2' />
                <label htmlFor='star2' title='2 estrelas'>
                  2 estrelas
                </label>
                <input type='radio' id='star1' name='rate' value='1' />
                <label htmlFor='star1' title='1 estrela'>
                  1 estrela
                </label>
              </div>
            </div>
          </div>
          <label>* Itens obrigatórios</label>
          {this.renderActionButtons()}
        </div>
      </Screen>
    ) : (
      <Screen back={{ to: '/venda/entrega-comprador/listar', title: 'Entrega' }}>
        <div className='container margin'>
          <h4 className='margin'> Não vai retirar? Diga-nos o porquê: *</h4>
          <ObservationTextArea
            className='margin'
            onChange={(e) => this.onChangeTextArea(e.target.value)}
            ref={this.textAreaRef}
            maxchars={500}
            required
            textarearows='3'
            value={this.state.observacaoEntrega}
          />
          <label>* Item obrigatório</label>
          <div className={`row justify-content-end container-actions ${this.props.isInViewport ? 'container-actions-absolute' : 'container-actions-absolute'}`}>
            {/* <div className="col-md-3 col-sm-2 my-2">
              <button className=" btn btn-danger btn-block" onClick={this.handleHide}>
                Não vou entregar
              </button>
            </div> */}
            <div className='col-md-3 col-sm-2 my-2'>
              <button
                className='btn btn-success btn-block'
                onClick={() => this.onSubmit()}
                disabled={isLoadingBtn || this.state.observacaoEntrega === '' || this.state.observacaoEntrega === undefined}
              >
                {isLoadingBtn ? <FontAwesomeIcon spin icon={faSpinner} /> : 'Salvar'}
              </button>
            </div>
          </div>
        </div>
      </Screen>
    )
  }
}

const mapStateToProps = (state) => ({
  isLoadingEntrega: state.vendaEntregaComprador.isLoadingEntrega,
  isLoadingBtn: state.vendaEntregaComprador.isLoadingBtn,
  isLoadingReserva: state.vendaVitrine.isLoading,
  connection: state.main.connection,
  isFailedToSaveEntrega: state.vendaEntregaComprador.isFailedToSaveEntrega
})

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  loadReservaById,
  saveReserva
})

export default connect(mapStateToProps, mapDispatchToProps)(EntregaCompradorEditar)
