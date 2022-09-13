import React from 'react'
import { connect } from 'react-redux'
import { Container, Button } from 'react-bootstrap'
import Select from 'react-select'

import { postContrato } from './action'
import { loadProdutos } from 'modules/produto/actions'
import { loadNonOngs, loadGrupos } from 'modules/empresa/actions'
import ModalHorario from './editHorario'
import DisplayHorario from './editDisplayHorarios'

import { RenderEtapa1, RenderEtapa2 } from './components'
import ListarProdutos from 'modules/produto/components/listProdutosDoacao'

import Refresh from 'components/refresh'
import Loading from 'components/loading'

import './contrato.css'
import SectionHandler from './sectionHandler'
import Modal from 'react-bootstrap/Modal'
import { Screen } from 'components/style'

class DoacaoContratoNovo extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      horarios: [],
      produtos: [],
      nome: '',
      descricao: '',
      checked: true,
      modalShow: false,
      assinaturas: [],
      grupos: [],
      showModalSemProd: false,
      isEstoqueProduto: false
    }
  }

  componentDidMount () {
    const { loadProdutos, loadGrupos, dispatch, loadNonOngs } = this.props
    dispatch(loadNonOngs())
    dispatch(loadProdutos())
    dispatch(loadGrupos())
  }

  handleChangeName = (event) => this.setState({ nome: event.target.value });
  handleChangeDescricao = (event) => this.setState({ descricao: event.target.value });
  handleChangeCheckbox = () => this.setState({ checked: !this.state.checked });
  handleChangeUnidade = (idProduto, unidade) => {
    const { produtos } = this.state
    const index = produtos.findIndex((p) => p.idProduto === idProduto)

    if (index >= 0) produtos[index].unidade = unidade

    this.setState({ produtos }, console.log(this.state.produtos))
  };

  handleProductAdd = (event) => {
    const produtosList = this.props.produtos
    const idProduto = event.value

    if (Array.isArray(produtosList)) {
      const produto = produtosList.find((p) => p.idProduto === idProduto)
      const produtos = [...this.state.produtos, produto]

      this.setState({ produtos })
    }
  };

  handleAddAssinatura = (event) => {
    const { assinantes } = this.props
    const assinaturasList = Object.values(assinantes)
    const idEmpresa = event.value

    if (Array.isArray(assinaturasList)) {
      const assinatura = assinaturasList.find((a) => a.idEmpresa === idEmpresa)
      const assinaturas = [...this.state.assinaturas, assinatura]

      this.setState({ assinaturas })
    }
  };

  handleRemoveAssinatura = (idEmpresa) => {
    if (Array.isArray(this.state.assinaturas)) {
      const assinaturas = this.state.assinaturas.filter((a) => a.idEmpresa !== idEmpresa)
      this.setState({ assinaturas })
    }
  };

  handleAddGrupo = (event) => {
    const gruposList = this.props.grupos
    const id = event.value

    if (Array.isArray(gruposList)) {
      const grupo = gruposList.find((g) => g.id === id)
      const grupos = [...this.state.grupos, grupo]

      this.setState({ grupos })
    }
  };

  handleRemoveGrupo = (id) => {
    if (Array.isArray(this.state.grupos)) {
      const grupos = this.state.grupos.filter((g) => g.id !== id)

      this.setState({ grupos })
    }
  };

  handleChangeHorario = (data) => {
    const horarios = [...this.state.horarios, data]
    this.setState({ horarios })
  };

  handleOnRemoveHorario = (index) => {
    const horarios = [...this.state.horarios] // make a separate copy of the array
    var value = horarios.indexOf(index)

    horarios.splice(value, 1)
    this.setState({ horarios })
  };

  renderSelectProduto = () => {
    const { produtos } = this.props
    const produtosJaSelecionados = this.state.produtos

    if (produtos !== undefined && produtos.constructor === Array && produtos.length > 0) {
      const filteredProdutos =
        produtosJaSelecionados !== undefined && produtosJaSelecionados.constructor === Array && produtosJaSelecionados.length > 0
          ? produtos.filter((produto) => !produtosJaSelecionados.includes(produto))
          : produtos

      if (filteredProdutos !== undefined && filteredProdutos.constructor === Array && filteredProdutos.length > 0) {
        const optionsProdutos = filteredProdutos.map((item) => {
          return { value: item.idProduto, label: item.nomeProduto }
        })

        return (
          <Select
            id='produto'
            value='0'
            name='produto'
            placeholder='Selecione o produto...'
            options={optionsProdutos}
            searchable
            onChange={this.handleProductAdd}
            noOptionsMessage={() => 'Produto não existe'}
            styles={{
              // Fixes the overlapping problem of the component
              menu: provided => ({ ...provided, zIndex: 9999 })
            }}
          />
        )
      }
    }

    return (
      <Select
        id='produto'
        value='0'
        name='produto'
        placeholder='Selecione o produto...'
        options={[{ value: '0', label: '-' }]}
        searchable
        isDisabled
        styles={{
          // Fixes the overlapping problem of the component
          menu: provided => ({ ...provided, zIndex: 9999 })
        }}
      />
    )
  };

  renderModalSemProd () {
    const { dispatch } = this.props
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
            <Button variant='primary' onClick={() => dispatch(postContrato(valores))}>
            Salvar mesmo assim
            </Button>
          </Modal.Footer>
        </Modal>
      )
    }
  }

  submitForm = () => {
    const { dispatch } = this.props
    const valores = { ...this.state }
    valores.ativo = valores.checked
    console.log(JSON.stringify(valores))
    if (valores.produtos.length <= 0) {
      this.setState({ showModalSemProd: true })
    } else dispatch(postContrato(valores))
  };

  handleEtapa1 = () => {
    const { nome, descricao, checked } = this.state
    return (
      <RenderEtapa1
        nome={nome} setNome={(value) => this.setState({ nome: value })}
        descricao={descricao} setDescricao={(value) => this.setState({ descricao: value })}
        ativo={checked} setAtivo={(value) => this.setState({ checked: value })}
      />
    )
  };

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

  handleEtapa4 = () => {
    const { modalShow, horarios } = this.state
    return (
      <form className='form' onSubmit={() => this.submitForm.bind(this)}>
        <div className='card container'>
          <div className='card-body'>
            <h3>Contrato de Doação</h3>
            <h4>4. Horário</h4>

            <div className='mt-3 mb-3'>
              <Button variant='primary' onClick={() => this.setState({ modalShow: true })}>
                Adicionar Dia/Horário
              </Button>
              <ModalHorario show={modalShow} onHide={() => this.setState({ modalShow: false })} onSave={this.handleChangeHorario} />
              <div className='margin'>
                <DisplayHorario horarios={horarios} onRemove={this.handleOnRemoveHorario} />
              </div>
            </div>
            {this.renderModalSemProd()}
          </div>
        </div>
      </form>
    )
  };

  hasError1 = () => {
    return this.state.nome === '' || this.state.nome === undefined
  };

  hasError2 = () => {
    return this.state.grupos.length === 0 && this.state.assinaturas.length === 0
  };

  hasError3 = () => {
    return false
  };

  hasError4 = () => {
    return false
  };

  render () {
    const { connection, isLoading, dispatch, isLoadingBtn } = this.props

    if (connection) {
      return <Refresh error={connection} dispatch={dispatch} />
    }

    if (isLoading === true || isLoadingBtn === true) {
      return <Loading />
    }

    return (
      <Screen back={{ to: '/doacao/contrato/listar/todos', title: 'Contrato' }}>
        <SectionHandler
          etapas={[
            {
              etapa: 1,
              callback: this.handleEtapa1,
              ativa: true,
              hasErrorCallback: this.hasError1
            },
            {
              etapa: 2,
              callback: this.handleEtapa2Assinantes,
              ativa: false,
              hasErrorCallback: this.hasError2
            },
            {
              etapa: 3,
              callback: this.handleEtapa3Produtos,
              ativa: false,
              hasErrorCallback: this.hasError3
            },
            {
              etapa: 4,
              callback: this.handleEtapa4,
              ativa: false,
              hasErrorCallback: this.hasError4
            }
          ]}
          etapaInicial={1}
          finalizar={this.submitForm}
        />
      </Screen>
    )
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.doacaoContrato.isLoading,
  produtosCadastrados: state.produto.produtos,
  connection: state.main.connection,
  nongs: state.empresa.nongs,
  grupos: state.empresa.grupos,
  assinantes: state.empresa.nongs
})
const mapDispatchToProps = (dispatch) => ({
  dispatch,
  handleSubmitNew: postContrato,
  loadProdutos,
  loadGrupos,
  loadNonOngs
})
export default connect(mapStateToProps, mapDispatchToProps)(DoacaoContratoNovo)
