import React from 'react'
import { connect } from 'react-redux'
import { Container, Modal, Button, Row, Col, Alert, Card, Accordion } from 'react-bootstrap'
import { saveReserva, editReserva, iWontCollect, verifyMyOwnReservas, loadReservaById } from './action'
// import { useSearchParams } from 'react-router-dom'
import { loadAnuncioById } from '../anuncio/action'
import { DisplayString } from 'util/display'
import { toastr } from 'react-redux-toastr'
import MyCustomToggle from './MyCustomToggle'

import ObservationTextArea from 'components/observationTextArea'
import Loading from 'components/loading'
import Refresh from 'components/refresh'

import BotaoSalvar from 'components/BotaoSalvar'
import BoxProduto from './components/boxProduto'
import { Screen } from 'components/style'
import moment from 'moment'
class DoacaoReservaEditar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      reservaProdutos: [],
      anuncio: [],
      doacaoRecorrente: {},
      idDoacaoRecorrente: '',
      idDoacaoRecorrenteReserva: '',
      idDoacaoRecorrenteAnuncio: '',
      loaded: false,
      observacaoReserva: '',
      observacaoNegativa: '',
      showModal: false,
      isEdit: false,
    }
  }

  componentDidMount() {
    const {
      match: { params },
      dispatch,
    } = this.props
    const isEdit = this.props.location.search.includes('isEdit')
    this.setState({
      isEdit,
    })
    const idAnuncio = params.id
    if (isEdit) {
      this.loadReserva(idAnuncio)
    } else this.loadDetalhesReserva(idAnuncio)

    dispatch(verifyMyOwnReservas())
  }

  async loadReserva(idAnuncio) {
    const { dispatch, loadAnuncioById } = this.props
    const teste = loadReservaById(idAnuncio)
    const { payload } = await teste()
    this.setState({ reservaProdutos: payload.ultimaInteracao.reservaProdutos })
  }

  loadDetalhesReserva(idAnuncio) {
    const { dispatch, loadAnuncioById } = this.props

    dispatch(loadAnuncioById(idAnuncio)).then((result) => {
      const { anuncioProdutos } = result.payload
      this.setState({ reservaProdutos: anuncioProdutos })
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
        console.log(produto)
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
    const entity = this.props.doacaoReserva

    if (this.state.loaded === false && entity !== undefined) {
      const reservaProdutos = this.getProdutos(entity.reservaProdutos, entity.anuncio).filter((p) => p.quantidade > 0)

      const obj = {
        loaded: true,
        anuncio: entity.anuncio,
        doacaoRecorrente: entity.anuncio.doacaoRecorrente,
        reservaProdutos,
        idDoacaoRecorrente: entity.idDoacaoRecorrente,
        idDoacaoRecorrenteReserva: entity.idDoacaoRecorrenteReserva,
        idDoacaoRecorrenteAnuncio: entity.idDoacaoRecorrenteAnuncio,
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

  createObjectToApi() {
    const id = this.props.match.params.id
    const reserva = () => ({
      idReserva: null,
      id,
      reserva: {
        idAnuncio: this.state.isEdit ? id : this.props.anuncio.id,
      },
      status: 'confirmado',
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
    })

    return reserva()
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
            <tr key={item.idDoacaoRecorrenteAnuncio}>
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
    this.setState({ reservaProdutos })
  }

  onSubmit() {
    const {
      match: { params },
      dispatch,
      saveReserva,
    } = this.props
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
      idDoacaoRecorrenteAnuncio: anuncio.idDoacaoRecorrenteAnuncio,
      idDoacaoRecorrente: anuncio.idDoacaoRecorrente,
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

  render() {
    const { isLoading, connection, dispatch, isLoadingBtn, doacaoReserva, isLoadingDetalhesAnuncio, isLoadingContratoDoacao } = this.props
    const { anuncio } = this.props
    const { reservaProdutos } = this.state
    if (connection) {
      return <Refresh error={connection} dispatch={dispatch} />
    }

    if (isLoading || isLoadingBtn || isLoadingDetalhesAnuncio || isLoadingContratoDoacao) {
      return <Loading />
    }

    if (doacaoReserva && doacaoReserva.anuncio && doacaoReserva.anuncio.semDoacao) {
      return (
        <h1 className="container-success" style={{ textAlign: 'center', padding: '0 1rem' }}>
          Infelizmente não há itens disponíveis para doação hoje.
        </h1>
      )
    }
    function shareInfo() {
      const reserva = anuncio
      console.log(anuncio)
      console.log(reservaProdutos)

      let textoFinal = `Dados do Anuncio: \n\nReserva: ${reserva.contrato.nome} \n`
      const textoReserva = `Reserva inicia em: ${moment(reserva.dataInicioReserva).format('DD/MM/YY [as] H:mm')} e termina em ${moment(reserva.dataInicioReserva).format(
        'DD/MM/YY [as] H:mm'
      )} \n`
      const textoEntrega = `Entrega inicia em ${moment(reserva.dataInicioEntrega).format('DD/MM/YY [as] H:mm')} e termina em ${moment(reserva.dataInicioEntrega).format(
        'DD/MM/YY [as] H:mm'
      )} \n\n`
      textoFinal += textoReserva + textoEntrega + 'Produtos: \n'
      reservaProdutos.forEach((produto) => {
        let textoProduto = `${produto.quantidade}${produto.unidade} Sem valor`
        // else textoProduto = `R$${produto.precoUnitario.toFixed(2)}/${produto.unidade}`
        textoFinal += `${produto.nomeProduto} - ${textoProduto} \n`
      })
      const shareUrl = `${window.location.origin}/doacao/reserva/novo/${reserva.id} `
      textoFinal += `Para acessar, utilize o seguinte link: ${shareUrl}`
      navigator.clipboard.writeText(textoFinal)
      toastr.success('Texto copiado')
    }
    return (
      <Screen back={{ to: '/doacao/reserva/listar', title: 'Reservas' }}>
        {this.withoutCollect()}
        <Container fluid>
          <div className="mt-4 mb-4">
            {this.renderAlert()}
            {this.renderList(this.props.anuncio)}
            <div className="lastObservations">{this.state.anuncio.observacaoAnuncio && <div>{`Observação do anúncio: ${this.state.anuncio.observacaoAnuncio}`}</div>}</div>
            {this.renderTabelaProduto(this.state.reservaProdutos)}
            <br />
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
          <div className="row justify-content-end mb-2 mt-1">
            <div className="col-md-3">
              <Button variant="secondary" onClick={() => shareInfo()} className="w-100">
                Compartilhar
              </Button>
            </div>
            <div className="col-md-3">
              <BotaoSalvar onClick={() => this.onSubmit()} disabled={isLoadingBtn} />
            </div>
          </div>
        </Container>
      </Screen>
    )
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.doacaoReserva.isLoading,
  isLoadingBtn: state.doacaoReserva.isLoadingBtn,
  isLoadingDetalhesAnuncio: state.doacaoAnuncio.isLoading,
  doacaoReserva: state.doacaoReserva.detalhes,
  connection: state.main.connection,
  anuncio: state.doacaoAnuncio.anuncio,
  isErrorInApi: state.doacaoReserva.isErrorInApi,
})
const mapDispatchToProps = (dispatch) => ({
  dispatch,
  saveReserva,
  loadAnuncioById,
})

export default connect(mapStateToProps, mapDispatchToProps)(DoacaoReservaEditar)
