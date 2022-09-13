import React from 'react'
import { connect } from 'react-redux'
import { Container, Button } from 'react-bootstrap'

import { RenderEtapa1, RenderEtapa2 } from './components'
import ListarProdutos from 'modules/produto/components/listProdutosDoacao'

import URL from '../urls-browser'
import { putContrato, loadContratoById } from './action'
import { loadProdutos } from 'modules/produto/actions'
import { loadNonOngs, loadGrupos } from 'modules/empresa/actions'
import ModalHorario from './editHorario'
import DisplayHorario from './editDisplayHorarios'
import { isArrayNotEmpty } from 'util/utils'
import Refresh from 'components/refresh'
import Loading from 'components/loading'
import './contrato.css'
import SectionHandler from './sectionHandler'
import Modal from 'react-bootstrap/Modal'
import { Screen } from 'components/style'

class DoacaoContratoEditar extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      horarios: [],
      produtos: [],
      nome: '',
      descricao: '',
      checked: false,
      modalShow: false,
      isEstoqueProduto: false,
      assinaturas: [],
      grupos: []
    }
    this.inputContractDonation = React.createRef()
    this.inputContractSales = React.createRef()
    this.selectEmpresa = React.createRef()
  }

  componentDidMount () {
    const {
      dispatch,
      loadContratoById,
      match: { params },
      edit
    } = this.props
    const id = params.id

    dispatch(loadContratoById(id, edit))
    dispatch(loadProdutos())
    dispatch(loadNonOngs())
    dispatch(loadGrupos())
  }

  componentDidUpdate (prevProps) {
    const { doacaoRecorrente } = this.props

    if (prevProps.doacaoRecorrente !== doacaoRecorrente) {
      this.setState({
        nome: doacaoRecorrente.nome,
        checked: doacaoRecorrente.ativo,
        descricao: doacaoRecorrente.descricao,
        produtos: doacaoRecorrente.produtos,
        horarios: doacaoRecorrente.horarios,
        id: doacaoRecorrente.id,
        inputContractType: doacaoRecorrente.tipoContrato,
        assinaturas: doacaoRecorrente.assinaturas,
        grupos: doacaoRecorrente.grupos,
        isEstoqueProduto: doacaoRecorrente.isEstoqueProduto || false
      })
    }
  }

  handleChangeName = (event) => this.setState({ nome: event.target.value });
  handleChangeDescricao = (event) => this.setState({ descricao: event.target.value });
  handleChangeCheckbox = () => this.setState({ checked: !this.state.checked });
  handleChangeUnidade = (idProduto, unidade) => {
    const { produtos } = this.state
    const index = produtos.findIndex((produto) => produto.idProduto === idProduto)

    if (index >= 0) {
      produtos[index].unidade = unidade
    }

    this.setState({ produtos })
  };

  handleAddGrupo = (event) => {
    const { grupos } = this.state
    const gruposList = Object.values(this.props.grupos)
    const id = event.value

    if (isArrayNotEmpty(gruposList) && id) {
      const grupo = gruposList.find(g => g.id === id)
      if (grupo) {
        this.setState({ grupos: [...grupos, { idGrupo: grupo.id, grupo: grupo }] })
      } else {
        console.log('grupo não localizado', id)
      }
    }
  };

  handleRemoveGrupo = (id) => {
    if (isArrayNotEmpty(this.state.grupos)) {
      const grupos = this.state.grupos.filter((g) => g.id !== id) && this.state.grupos.filter((g) => g.idGrupo !== id)

      this.setState({ grupos })
    }
  };

  handleProductAdd = (event) => {
    const produtosList = this.props.produtosCadastrados
    const idProduto = event.value

    if (isArrayNotEmpty(produtosList)) {
      const produto = produtosList.find((produto) => produto.idProduto === idProduto)
      const produtos = [...this.state.produtos, produto]

      this.setState({ produtos })
    }
  };

  handleAddAssinatura = (event) => {
    if (Array.isArray(this.props.assinantes)) {
      this.setState({
        assinaturas: [
          ...this.state.assinaturas,
          Object.values(this.props.assinantes).find((a) => a.idEmpresa === event.value)
        ]
      })
    }
  };

  handleRemoveAssinatura = (idEmpresa) => {
    if (Array.isArray(this.state.assinaturas)) {
      this.setState({
        assinaturas: this.state.assinaturas.filter((a) => a.idEmpresa !== idEmpresa)
      })
    }
  };

  handleProductRemove = (idProduto) => {
    if (Array.isArray(this.state.produtos)) {
      const produtos = this.state.produtos.filter((produto) => produto.idProduto !== idProduto)

      this.setState({ produtos })
    }
  };

  handleChangeHorario = (data) => {
    data.diaDaSemana = parseInt(data.diaDaSemana)
    const horarios = [...this.state.horarios, data]
    this.setState({ horarios })
  };

  handleOnChangeRemoveHorario = (index) => {
    const horarios = [...this.state.horarios] // make a separate copy of the array
    const value = horarios.indexOf(horarios[index])

    horarios.splice(value, 1)
    this.setState({ horarios })
  };

  hasError1DadosBasicos = () => (this.state.nome === '' || this.state.nome === undefined)
  hasError2Assinantes = () => (this.state.assinaturas.length === 0 && this.state.grupos.length === 0)
  hasError3Produtos = () => (false)
  hasError5Horarios = () => (false)

  renderActionsBtn = (id) => {
    const { history } = this.props

    return (
      <div>
        <div className='mt-3 mb-3'>
          <Button variant='primary' onClick={() => history.push(URL.ANUNCIO.EDITAR(id))}>
            Novo Anúncio
          </Button>
        </div>
      </div>
    )
  };

  renderModalSemProd () {
    const { dispatch, method } = this.props
    const valores = { ...this.state }
    if (this.state.produtos.length <= 0) {
      return (
        <Modal
          show={this.state.showModalSemProd}
          onHide={() => this.setState({ showModalSemProd: false })}
          size='lg'
          centered
          aria-labelledby='contained-modal-title-vcenter'
        >
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-vcenter'>
              Seu contrato está sem produtos.
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Tem certeza que deseja continuar?
          </Modal.Body>
          <Modal.Footer>
            <Button variant='danger' onClick={() => this.setState({ showModalSemProd: false })}>
              Não
            </Button>
            <Button variant='primary' onClick={() => dispatch(putContrato(valores, method))}>
              Salvar mesmo assim
            </Button>
          </Modal.Footer>
        </Modal>
      )
    }
  }

  submitForm = () => {
    const { dispatch, method } = this.props
    const valores = { ...this.state }
    valores.ativo = valores.checked

    if (valores.produtos.length <= 0) {
      this.setState({ showModalSemProd: true })
    } else dispatch(putContrato(valores, method))
  };

  handleEtapa1DadosBasicos = () => {
    const { nome, descricao, checked } = this.state
    console.log('ativo', checked)
    return (
      <RenderEtapa1
        nome={nome} setNome={(value) => this.setState({ nome: value })}
        descricao={descricao} setDescricao={(value) => this.setState({ descricao: value })}
        ativo={checked} setAtivo={() => this.setState({ checked: !checked })}
      />
    )
  }

  handleEtapa2Assinantes = () => (
    <RenderEtapa2
      assinados={{ assinaturas: this.state.assinaturas, grupos: this.state.grupos }}
      todos={{ assinaturas: this.props.assinantes, grupos: this.props.grupos }}
      onAddAssinatura={this.handleAddAssinatura}
      onRemoveAssinatura={this.handleRemoveAssinatura}
      onAddGrupo={this.handleAddGrupo}
      onRemoveGrupo={this.handleRemoveGrupo}
    />
  )

  handleEtapa3Produtos = () => {
    const { produtos, isEstoqueProduto } = this.state
    const { produtosCadastrados } = this.props

    return (
      <Container>
        <h3>Contrato de Doação</h3>
        <h4>3. Produtos</h4>
        <br />
        <ListarProdutos
          cadastrados={produtosCadastrados}
          selecionados={produtos}
          onAdd={(idProduto) => this.setState({ produtos: [...produtos, produtosCadastrados.find(x => x.idProduto === idProduto)] })}
          onRemove={(idProduto) => this.setState({ produtos: [...produtos.filter(p => p.idProduto !== idProduto)] })}
          onChange={(dados) => {
            const produto = { ...produtos.find(x => x.idProduto === dados.idProduto), unidade: dados.unidade }
            this.setState({ produtos: [...produtos.filter(p => p.idProduto !== dados.idProduto), produto] })
          }}
          isEstoque={isEstoqueProduto}
          onChangeEstoque={(isEstoque) => this.setState({ isEstoqueProduto: isEstoque })}
        />
      </Container>
    )
  };

  handleEtapa4Horarios = () => {
    const { modalShow, horarios } = this.state
    const {
      match: { params }
    } = this.props
    const id = params.id

    return (
      <form className='form' onSubmit={() => this.submitForm.bind(this)}>
        <div className='card container'>
          <div className='card-body'>
            <h3>Contrato de Doação</h3>
            <h4>4. Horário</h4>

            <div className='mt-3 mb-3'>
              <Button variant='primary' onClick={() => this.setState({ modalShow: true })}>
                Adicionar Dia/Horario
              </Button>
              <ModalHorario show={modalShow} onHide={() => this.setState({ modalShow: false })} onSave={this.handleChangeHorario} />
              <div className='margin'>
                <DisplayHorario horarios={horarios} onRemove={this.handleOnChangeRemoveHorario} />
              </div>
            </div>
            {this.renderModalSemProd()}
            {this.renderActionsBtn(id)}
          </div>
        </div>
      </form>
    )
  };

  render () {
    const { isLoading, isLoadingProduto, isLoadingBtn, isPutting, connection, dispatch } = this.props

    if (connection) {
      return <Refresh error={connection} dispatch={dispatch} />
    }

    if (isLoading || isLoadingProduto || isLoadingBtn || isPutting) {
      return <Loading />
    }

    return (
      <Screen back={{ to: '/doacao/contrato/listar/todos', title: 'Contrato' }}>
        <SectionHandler
          etapas={[
            {
              etapa: 1,
              callback: this.handleEtapa1DadosBasicos,
              hasErrorCallback: this.hasError1DadosBasicos
            },
            {
              etapa: 2,
              callback: this.handleEtapa2Assinantes,
              hasErrorCallback: this.hasError2Assinantes
            },
            {
              etapa: 3,
              callback: this.handleEtapa3Produtos,
              hasErrorCallback: this.hasError3Produtos
            },
            {
              etapa: 4,
              callback: this.handleEtapa4Horarios,
              hasErrorCallback: this.hasError5Horarios
            }
          ]}
          etapaInicial={1}
          finalizar={(id) => this.submitForm(id)}
        />
      </Screen>
    )
  }
}

const mapStateToProps = (state) => ({
  doacaoRecorrente: state.doacaoContrato.contrato,
  isLoading: state.doacaoContrato.isLoadingById,
  isLoadingProduto: state.doacaoContrato.isLoadingProduto,
  isPutting: state.doacaoContrato.isPutting,
  connection: state.main.connection,
  produtosCadastrados: state.produto.produtos,
  isLoadingBtn: state.doacaoContrato.isLoadingBtn,
  method: state.doacaoContrato.method,
  nongs: state.empresa.nongs,
  grupos: state.empresa.grupos,
  assinantes: state.empresa.nongs
})

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  loadContratoById,
  handleSubmitEdit: putContrato,
  loadProdutos,
  loadGrupos,
  loadNonOngs
})

export default connect(mapStateToProps, mapDispatchToProps)(DoacaoContratoEditar)
