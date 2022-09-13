import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Alert, Card, Container, Accordion, Modal, Button } from 'react-bootstrap'
import Select from 'react-select'
import moment from 'moment'
import { loadReservaById } from './action'
import { TelaSucesso, Link, Mensagem } from 'components/telaSucesso'
import TelaDeErro from 'components/telaDeErro'
import ObservationTextArea from 'components/observationTextArea'
import Loading from 'components/loading'
import Refresh from 'components/refresh'
import BotaoSalvar from 'components/BotaoSalvar'
import formasPagamento from 'modules/pagamentos/pagamentos'
import { Screen } from 'components/style'
import { isNotNullOrEmpty, isNullOrEmpty, orderProductsAsc } from 'util/utils'
import { DisplayString } from 'util/display'
import { toastr } from 'react-redux-toastr'
import { loadDetalhes, saveReserva, editReserva, iWontCollect, verifyMyOwnReservas, saveFile, clearError } from './action'
import { loadAnuncioById } from '../anuncio/action'
import { URL_VENDA_RESERVA_LISTAR } from './urls'
import MyCustomToggle from './MyCustomToggle'
import BoxProduto from './components/boxProduto'
import './vendaReserva.css'
import Dropzone from './components/Dropzone'

class VendaReservaEditar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      reservaProdutos: [],
      anuncio: [],
      vendaRecorrente: {},
      idVendaRecorrente: '',
      idVendaRecorrenteReserva: '',
      idVendaRecorrenteAnuncio: '',
      loaded: false,
      formasDePagamentoContrato: [],
      observacaoReserva: '',
      observacaoNegativa: '',
      showModal: false,
      arquivoCarregado: {},
      isEdit: false,
    }
  }

  async componentDidMount() {
    const {
      match: { params },
      dispatch,
    } = this.props
    const idAnuncio = params.id
    const isEdit = this.props.location.search.includes('isEdit')
    this.setState({
      isEdit,
    })
    if (isEdit) this.loadReserva(idAnuncio)
    else {
      await this.loadDetalhesReserva(params.id)
      await dispatch(verifyMyOwnReservas())
    }
  }
  async loadReserva(idAnuncio) {
    const { dispatch, loadAnuncioById } = this.props

    const teste = loadReservaById(idAnuncio)
    const { payload } = await teste()
    this.setState({ reservaProdutos: payload.ultimaInteracao.reservaProdutos })
    dispatch(loadAnuncioById(payload.idAnuncio)).then((result) => {
      const { contrato } = result.payload
      const formasDePagamentoReserva = contrato.formasDePagamento.map((pagamento) => {
        const index = formasPagamento.findIndex((pagamentoContant) => pagamentoContant.id.toUpperCase() === pagamento.idFormaPagamento.toUpperCase())

        return {
          ...pagamento,
          nome: formasPagamento[index].nome,
        }
      })

      this.setState({ formasDePagamentoContrato: formasDePagamentoReserva })
    })
    setTimeout(() => {
      this.handleSelectedPayment(payload.ultimaInteracao.idFormaDePagamento)
    }, 500)
  }
  loadDetalhesReserva(idAnuncioVenda) {
    const { dispatch, loadAnuncioById } = this.props

    dispatch(loadAnuncioById(idAnuncioVenda)).then((result) => {
      const { contrato, anuncioProdutos } = result.payload

      const formasDePagamentoReserva = contrato.formasDePagamento.map((pagamento) => {
        const index = formasPagamento.findIndex((pagamentoContant) => pagamentoContant.id.toUpperCase() === pagamento.idFormaPagamento.toUpperCase())

        return {
          ...pagamento,
          nome: formasPagamento[index].nome,
        }
      })

      this.setState({ reservaProdutos: anuncioProdutos, formasDePagamentoContrato: formasDePagamentoReserva })
    })
  }

  getProdutos = (produtos, anuncio) => {
    const prods = []

    for (let i = 0; i < anuncio.anuncioProdutos.length; i++) {
      const item = anuncio.anuncioProdutos[i]
      const entity = produtos.find((p) => p.idProduto === item.idProduto)

      if (entity === undefined) {
        prods.push({
          idProduto: item.idProduto,
          nomeProduto: item.nomeProduto,
          quantidade: item.quantidadeDevolucao + item.quantidadePerda,
          quantidadeReservada: item.quantidadeDevolucao + item.quantidadePerda,
          unidade: item.unidade,
          produto: item.produto,
          idAnuncioProduto: item.idAnuncioProduto,
        })
      }
    }

    return produtos
      .map((produto) => {
        const item = anuncio.anuncioProdutos.find((x) => x.idProduto === produto.idProduto)
        if (item !== undefined) {
          return {
            quantidadeReservada: 0,
            ...produto,
            quantidade: item.quantidadeDevolucao + item.quantidadePerda,
            unidade: item.unidade,
            idAnuncioProduto: item.idAnuncioProduto,
            nomeProduto: item.nomeProduto,
          }
        }

        return {
          quantidadeReservada: 0,
          ...produto,
          quantidade: 0,
          unidade: '',
        }
      })
      .concat(prods)
  }

  componentDidUpdate() {
    const entity = this.props.vendaReserva

    if (this.state.loaded === false && entity !== undefined) {
      const reservaProdutos = this.getProdutos(entity.reservaProdutos, entity.anuncio).filter((p) => p.quantidade > 0)

      const obj = {
        loaded: true,
        anuncio: entity.anuncio,
        vendaRecorrente: entity.anuncio.vendaRecorrente,
        reservaProdutos,
        idVendaRecorrente: entity.idVendaRecorrente,
        idVendaRecorrenteReserva: entity.idVendaRecorrenteReserva,
        idVendaRecorrenteAnuncio: entity.idVendaRecorrenteAnuncio,
        observacaoReserva: entity.observacaoReserva || '',
      }
      this.setState(obj)
    }
  }

  displayHorario = (inicio, fim) => (inicio !== undefined && inicio !== null && fim !== undefined && fim !== null ? `${inicio.substring(0, 5)}-${fim.substring(0, 5)}` : '-')

  formatDate() {
    const {
      anuncio: { dataInicioReserva, dataFimReserva },
    } = this.props
    const DIR = dataInicioReserva.toString().split(/[T:-]/g)
    const DFR = dataFimReserva.toString().split(/[T:-]/g)
    const newDataInicioReserva = `${DIR[2]}/${DIR[1]}/${DIR[0]} - ${DIR[3]}h${DIR[4]}`
    const newDataFimReserva = `${DFR[2]}/${DFR[1]}/${DFR[0]} - ${DFR[3]}h${DFR[4]}`
    return { dataInicioReserva: newDataInicioReserva, dataFimReserva: newDataFimReserva }
  }

  valorTotal() {
    let total = 0

    this.state.reservaProdutos
      .filter((p) => p.quantidade > 0)
      .forEach((p) => {
        total += p.quantidade * p.valor
      })

    return total
  }

  createObjectToApi() {
    const id = this.props.match.params.id

    const reserva = {
      idReserva: null,
      id,
      reserva: {
        idAnuncio: this.state.isEdit ? id : this.props.anuncio.id,
      },
      status: 'confirmado',
      idFormaDePagamento: this.state.formasDePagamento.idFormaPagamento,
      observacao: this.state.observacaoReserva,
      reservaProdutos: this.state.reservaProdutos
        .map((produto) => ({
          idAnuncioProduto: produto.id,
          idProduto: produto.idProduto,
          nomeProduto: produto.nomeProduto,
          quantidade: produto.quantidade,
          valor: produto.valor,
          unidade: produto.unidade,
        }))
        .filter((produto) => produto.quantidade > 0),
    }

    return reserva
  }

  renderList(item) {
    if (item === undefined) return null
    let nome = ''

    if (item.contrato !== undefined && item.contrato !== null) nome = DisplayString(item.contrato.nome)

    return (
      <div className="table-responsive">
        <table className="table table-striped table-hover table-sm mb-3">
          <thead>
            <tr>
              <th scope="col">Empresa</th>
              <th scope="col">Inicio Reserva</th>
              <th scope="col">Fim Reserva</th>
            </tr>
          </thead>
          <tbody>
            <tr key={item.idVendaRecorrenteAnuncio}>
              <td>
                <span>{`${item.empresa.nomeEmpresa}`}</span>
              </td>
              <td>{this.formatDate().dataInicioReserva}</td>
              <td>{this.formatDate().dataFimReserva}</td>
            </tr>
          </tbody>
        </table>
        <Accordion defaultActiveKey="0">
          <Card style={{ width: '100%' }}>
            <MyCustomToggle as={Card.Header} eventKey="0">
              Contrato: {nome}
            </MyCustomToggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Container>
                  <Row>
                    <Col xs={12} sm={12} md={8}>
                      <span>
                        <b>Descrição do contrato: </b>- {`${item.contrato.descricao}`}
                      </span>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    )
  }

  handleOnChangeQuantidade = (idProduto, quantidade, precoTotal, precoUnitario) => {
    const index = this.state.reservaProdutos.findIndex((produto) => produto.idProduto === idProduto)
    const reservaProdutos = this.state.reservaProdutos

    reservaProdutos[index].quantidade = quantidade
    reservaProdutos[index].valor = precoTotal
    reservaProdutos[index].precoUnitario = precoUnitario
    console.log(reservaProdutos)
    this.setState({ reservaProdutos })
  }

  checkIfPaymentIsAlreadySelected(idFormaPagamento) {
    const pagamentosJaSelecionados = this.state.formasDePagamento
    let isSelected = false
    for (let i = 0; i < pagamentosJaSelecionados.length && isSelected === false; i++) {
      pagamentosJaSelecionados[i].idFormaPagamento === idFormaPagamento ? (isSelected = true) : (isSelected = false)
    }
    return isSelected
  }

  renderSelectPayments = () => {
    // const { pagamentos } = this.props;
    const pagamentos = this.state.formasDePagamentoContrato
    const pagamentosJaSelecionados = this.state.formasDePagamento
    console.log(pagamentos)
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
            id="pagamento"
            value="0"
            name="pagamento"
            placeholder="Selecione o pagamento..."
            options={optionsPagamentos}
            searchable
            onChange={(e) => this.handleSelectedPayment(e.value)}
            noOptionsMessage={() => 'Pagamento não existe'}
            styles={{
              // Fixes the overlapping problem of the component
              menu: (provided) => ({ ...provided, zIndex: 9999 }),
            }}
          />
        )
      }
    }

    return <Select id="pagamento" value="0" name="pagamento" placeholder="Selecione o pagamento..." options={[{ value: '0', label: '-' }]} searchable isDisabled />
  }

  handleSelectedPayment(idPagamento) {
    const pagamentosReserva = this.state.formasDePagamentoContrato
    const index = pagamentosReserva.findIndex((pagamento) => pagamento.idFormaPagamento === idPagamento)
    this.setState({ formasDePagamento: pagamentosReserva[index] })
    console.log(this.state.formasDePagamento)
  }

  renderCurrentPagamentos = () => {
    const { formasDePagamento } = this.state

    // const formasDePagamento = {
    //   idFormaPagamento: '2AF5FC90-50CE-4319-87B5-3C4FD92A9E43',
    //   dados: JSON.stringify({ tipoDeChave: 'e-mail', chave: 'klkljkljjklsjkldfjklsjkldfkljsdfsdf' })
    // }

    // const formasDePagamento = {
    //   idFormaPagamento: 'A1E8DA6B-659D-4069-811A-12B4AD644D3A',
    //   dados: JSON.stringify({ banco: 'Itaú', codigoBanco: 341, agencia: '05532', conta: '0023423-1' })
    // }

    if (formasDePagamento !== undefined && formasDePagamento !== []) {
      const dados = <></>

      if (formasDePagamento.idFormaPagamento.toUpperCase() === '2AF5FC90-50CE-4319-87B5-3C4FD92A9E43' && isNotNullOrEmpty(formasDePagamento.dados)) {
        const temp = JSON.parse(formasDePagamento.dados)
        return (
          <div>
            <h3>PIX</h3>
            tipo chave: {temp.tipoDeChave}
            <br />
            chave: {temp.chave}
          </div>
        )
      }

      if (formasDePagamento.idFormaPagamento.toUpperCase() === 'A1E8DA6B-659D-4069-811A-12B4AD644D3A' && isNotNullOrEmpty(formasDePagamento.dados)) {
        const temp = JSON.parse(formasDePagamento.dados)
        return (
          <div>
            <h3>Transfência Bancária</h3>
            Banco: {temp.banco || ''} ({temp.codigoBanco || ''})<br />
            Agencia: {temp.agencia || ''}
            <br />
            Conta: {temp.conta || ''}
          </div>
        )
      }

      return (
        <div className="form-group">
          <label>Pagamento selecionado:</label>
          <br />
          {formasDePagamento.nome}
          {dados}
        </div>
      )
    }
    return <div className="form-control border-0">Não há forma de pagamento selecionada.</div>
  }

  onSubmit() {
    const { dispatch, saveReserva } = this.props
    console.log(this.state.isEdit)
    if (this.state.isEdit) dispatch(editReserva(this.createObjectToApi()))
    else dispatch(saveReserva(this.createObjectToApi()))
  }

  onChangeTextArea = (value) => this.setState({ observacaoReserva: value })

  onChangeTextAreaNegativa = (value) => this.setState({ observacaoNegativa: value })

  renderTabelaProduto = (produtos) => produtos.map((produto) => <BoxProduto key={produto.id} produto={produto} onChange={this.handleOnChangeQuantidade} />)

  handleCloseModal() {
    this.setState({ showModal: false })
  }

  saveWithoutCollect() {
    const { dispatch } = this.props
    const { anuncio } = this.state

    const obj = {
      idVendaRecorrenteAnuncio: anuncio.idVendaRecorrenteAnuncio,
      idVendaRecorrente: anuncio.idVendaRecorrente,
      observacaoReserva: this.state.observacaoNegativa,
    }
    dispatch(iWontCollect(obj))
  }

  renderAlert() {
    const { isErrorInApi } = this.props
    if (isErrorInApi === true) return <Alert>Houve um erro ao salvar! Verifique todos os campos e tente novamente.</Alert>
  }

  withoutCollect() {
    return (
      <Modal show={this.state.showModal} onHide={this.handleCloseModal.bind(this)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Não irá entregar?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <form>
              <Row className="show-grid">
                <Col xs={12}>
                  <ObservationTextArea
                    onChange={(e) => this.onChangeTextAreaNegativa(e.target.value)}
                    ref={this.textAreaRef}
                    maxchars={500}
                    labeltextarea="Informe-nos o motivo."
                    textarearows="3"
                    value={this.state.observacaoNegativa}
                  />
                </Col>
              </Row>
            </form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => this.setState({ showModal: false })}>
            Cancelar
          </Button>
          <button
            className="btn btn-primary"
            onClick={() => {
              this.saveWithoutCollect()
              this.setState({ showModal: false })
            }}
          >
            Adicionar
          </button>
        </Modal.Footer>
      </Modal>
    )
  }

  etapa1() {
    const { isLoadingBtn, anuncio } = this.props
    const { reservaProdutos } = this.state
    function shareInfo() {
      const reserva = anuncio
      let textoFinal = `Dados do Anuncio: \n\nReserva: ${reserva.contrato.nome} \n`
      const textoReserva = `Reserva inicia em: ${moment(reserva.dataInicioReserva).format('DD/MM/YY')} e termina em ${moment(reserva.dataInicioReserva).format(
        'DD/MM/YY [as] H:mm'
      )} \n`
      const textoEntrega = `Entrega inicia em ${moment(reserva.dataInicioEntrega).format('DD/MM/YY')} e termina em ${moment(reserva.dataInicioEntrega).format(
        'DD/MM/YY [as] H:mm'
      )} \n\n`
      textoFinal += textoReserva + textoEntrega + 'Produtos: \n'
      reservaProdutos.forEach((produto) => {
        let textoProduto
        if (produto.quantidade) textoProduto = `${produto.quantidade}${produto.unidade} R$${produto.valor.toFixed(2)}`
        else textoProduto = `R$${produto.precoUnitario.toFixed(2)}/${produto.unidade}`
        textoFinal += `${produto.nomeProduto} - ${textoProduto} \n`
      })
      const shareUrl = `${window.location.origin}/doacao/reserva/novo/${reserva.id} `
      textoFinal += `Para acessar, utilize o seguinte link: ${shareUrl}`
      navigator.clipboard.writeText(textoFinal)
      toastr.success('Texto copiado')
    }
    return (
      <>
        {this.withoutCollect()}
        <div className="container">
          <div className="mt-4 mb-4">
            {this.renderAlert()}
            {this.renderList(this.props.anuncio)}
            <div className="lastObservations">{this.state.anuncio.observacaoAnuncio && <div>{`Observação do anúncio: ${this.state.anuncio.observacaoAnuncio}`}</div>}</div>
            {this.renderTabelaProduto(reservaProdutos)}
            <br />
            <div>
              <div className="form-group">
                <label htmlFor="produto">Adicionar Pagamento: *</label>
                {this.renderSelectPayments()}
              </div>
              {this.renderCurrentPagamentos()}
            </div>
            <ObservationTextArea
              onChange={(e) => this.onChangeTextArea(e.target.value)}
              ref={this.textAreaRef}
              maxchars={500}
              labeltextarea="Observações:"
              textarearows="3"
              value={this.state.observacaoReserva}
            />
          </div>
          <label>* Itens obrigatórios</label>
          <div className="row justify-content-end my-2">
            <div className="col-md-3">
              <Button variant="secondary" onClick={() => shareInfo()} className="w-100">
                Compartilhar
              </Button>
            </div>
            <div className="col-md-3  ">
              <BotaoSalvar onClick={() => this.onSubmit()} disabled={isLoadingBtn || this.state.formasDePagamento === undefined} />
            </div>
          </div>
        </div>
      </>
    )
  }

  etapa2() {
    const {
      arquivoCarregado: { nome, type, content },
    } = this.state
    const { dispatch, detalhes } = this.props

    return (
      <>
        <div className="container">
          <div className="mt-4 mb-4">
            <h3 style={{ textAlign: 'center' }}>Ao finalizar, compartilha conosco o comprovante para agilizarmos o processo de liberação</h3>
            <br />
            <Card>
              <Card.Body>
                <Card.Text style={{ background: '#00a99d', padding: '8px', color: '#FFF', fontSize: '1.5em' }}>
                  Total<span className="float-right">R$ {new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(this.valorTotal())}</span>
                </Card.Text>
              </Card.Body>
            </Card>
            {this.renderCurrentPagamentos()}
            <br />
            <br />
            <Dropzone
              callback={(nome, type, content) => {
                console.log('arquivoCarregado', nome, type, content)
                this.setState({ arquivoCarregado: { nome, type, content } })
              }}
            />
            <BotaoSalvar
              text="Enviar reserva"
              disabled={isNullOrEmpty(nome)}
              onClick={() => {
                dispatch(
                  saveFile({
                    FileName: detalhes.id + nome.match(/\.[0-9a-z]+$/i)[0],
                    ContentType: type,
                    Data64: content,
                  })
                )
              }}
            />
          </div>
        </div>
      </>
    )
  }

  etapa3() {
    return (
      <TelaSucesso>
        <Mensagem>Reserva salva com sucesso!</Mensagem>
        <Link to={URL_VENDA_RESERVA_LISTAR()}>Voltar para lista de reservas</Link>
        <br />
        <Link to="/">Tela Principal</Link>
      </TelaSucesso>
    )
  }

  render() {
    const { isLoading, connection, dispatch, isLoadingBtn, vendaReserva, isLoadingDetalhesAnuncio, isLoadingContratoVenda, etapa, hasError, error } = this.props

    if (connection) {
      return <Refresh error={connection} dispatch={dispatch} />
    }

    if (isLoading || isLoadingBtn || isLoadingDetalhesAnuncio || isLoadingContratoVenda) {
      return <Loading />
    }

    if (hasError) {
      console.log('chegou erro', error)
      return <TelaDeErro error={error} callbackReturn={clearError} message="Erro ao tentar cadastrar reserva" />
    }

    if (vendaReserva && vendaReserva.anuncio && vendaReserva.anuncio.semVenda) {
      return (
        <h1 className="container-success" style={{ textAlign: 'center', padding: '0 1rem' }}>
          Infelizmente não há itens disponíveis para doação hoje.
        </h1>
      )
    }

    if (etapa === 3) {
      return <Screen back={{ to: URL_VENDA_RESERVA_LISTAR(), title: 'Reservas' }}>{this.etapa3()}</Screen>
    }

    if (etapa === 2) {
      return <Screen back={{ to: URL_VENDA_RESERVA_LISTAR(), title: 'Reservas' }}>{this.etapa2()}</Screen>
    }

    return <Screen back={{ to: URL_VENDA_RESERVA_LISTAR(), title: 'Reservas' }}>{this.etapa1()}</Screen>
  }
}

const mapStateToProps = (state) => ({
  connection: state.main.connection,
  anuncio: state.vendaAnuncio.anuncio,
  isLoadingDetalhesAnuncio: state.vendaAnuncio.isLoading,
  ...state.vendaVitrine,
})
const mapDispatchToProps = (dispatch) => ({
  dispatch,
  loadDetalhes,
  saveReserva,
  loadAnuncioById,
})

export default connect(mapStateToProps, mapDispatchToProps)(VendaReservaEditar)
