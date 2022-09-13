import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { addMovimentoEstoqueLote } from './actions'

import Loading from 'components/loading'
import { BtnSalvar, BtnSalvarVoltar } from 'components/Botao'
import { isArrayEmpty, isArrayNotEmpty } from 'util/utils'

import { Container, CardDeck } from 'react-bootstrap'

import SearchBar from 'components/search-bar'
// import { FiltroCategoriasBox } from './components'
import { getProdutosFiltrados } from './components/functions'
import BoxProduto from './components/boxProduto'

import { handleOnFileChangeEventAsync } from './components/importarProduto'

import './produto.css'

function mergeProdutos(produtos, objItem) {
  if (objItem && (objItem.idProduto || objItem.codigoInterno)) {
    var index = produtos.findIndex((produto) => produto.idProduto === objItem.idProduto || produto.codigoInterno === objItem.codigoInterno)

    if (index >= 0) {
      const produto = produtos[index]
      produtos[index] = {
        ...produto,
        ...objItem,
      }

      return produtos
    }
  }

  return produtos
}

function mergeProdutosLote(produtos, objList) {
  let produtoArray = produtos

  for (let i = 0; i < objList.length; i++) {
    const dado = objList[i]
    produtoArray = mergeProdutos(produtoArray, dado)
    console.log('atualizando', dado, produtoArray[0])
  }

  return produtoArray
}

const getProdutosComAlteracao = (produtos) => produtos.filter((p) => p.quantidade > 0)

const searchOptions = {
  shouldSort: true,
  minMatchCharLength: 2,
  threshold: 0.4,
  keys: [
    { name: 'nomeProduto', weight: 2 },
    { name: 'descricaoProduto', weight: 0.6 },
    { name: 'categoriaEntity.nomeCategoria', weight: 0.4 },
  ],
}

class TelaEstoque extends React.Component {
  static propTypes = {
    produtos: PropTypes.array.isRequired,
    categorias: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)
    const { produtos } = this.props

    this.elementoTopo = React.createRef()

    this.state = {
      produtosComEstoque: getProdutosFiltrados(produtos.filter((x) => x.estoque > 0)),
      produtosSemEstoque: getProdutosFiltrados(produtos.filter((x) => x.estoque <= 0)),
      produtosAlterados: {},
      categoria: {},
      hasSearch: false,
      subCategoria: {},
      inputFileFieldRef: Math.random().toString(36),
      estagio: 0,
    }

    this.displayProdutosList = this.displayProdutosList.bind(this)
    // this.handleUpdateProduto = this.handleUpdateProduto.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    const { produtos, isEstoqueLotePosting } = this.props
    const { estagio } = this.state

    // Quando Receber novos produtos, precisa atualizar os existentes
    if (produtos !== prevProps.produtos) {
      this.setProdutosFiltrados()
    }

    // const mudouParaEstagio1 = estagio === 1 && prevState.estagio === 0
    // if (mudouParaEstagio1) {
    //   this.syncProdutosAlterados(window.scrollTo({ top: 0, behavior: 'smooth' }))
    // }

    const estagio1Concluido = prevProps.isEstoqueLotePosting && !isEstoqueLotePosting
    if (estagio1Concluido) {
      this.setState({
        estagio: 0,
        produtosComEstoque: [],
        produtosSemEstoque: [],
        produtosAlterados: {},
      })
    }
  }

  displayProdutosList(produtos, onChange) {
    if (isArrayNotEmpty(produtos)) {
      return produtos.map((produto, i) => {
        const hasChange = this.state.produtosAlterados[produto.idProduto]
        if (hasChange) produto = { ...hasChange, ...produto }
        return <BoxProduto key={produto.idProduto} produto={produto} i={i} onChange={onChange} />
      })
    }

    return <>Não existem produtos na categoria selecionada</>
  }

  importarPlanilhaCallBack = (rowsPlanilha) => {
    if (isArrayEmpty(rowsPlanilha)) return false

    const alteracoesComEstoque = rowsPlanilha.filter((row) => this.state.produtosComEstoque.some((produto) => produto.codigoInterno === row.codigoInterno))
    const alteracoesSemEstoque = rowsPlanilha.filter((row) => this.state.produtosSemEstoque.some((produto) => produto.codigoInterno === row.codigoInterno))

    const produtosComEstoque = isArrayNotEmpty(alteracoesComEstoque) ? mergeProdutosLote(this.state.produtosComEstoque, alteracoesComEstoque) : this.state.produtosComEstoque
    const produtosSemEstoque = isArrayNotEmpty(alteracoesSemEstoque) ? mergeProdutosLote(this.state.produtosSemEstoque, alteracoesSemEstoque) : this.state.produtosSemEstoque

    this.setState(
      {
        produtosComEstoque: [...produtosComEstoque],
        produtosSemEstoque: [...produtosSemEstoque],
        estagio: 1,
      },
      this.syncProdutosAlterados()
    )
  }

  syncProdutosAlterados = (callback) => {
    const currentProdutosAlterados = this.state.produtosAlterados
    const produtosAlterados = [...getProdutosComAlteracao(this.state.produtosComEstoque), ...getProdutosComAlteracao(this.state.produtosSemEstoque)].reduce((total, current) => {
      total[current.idProduto] = current
      return total
    }, {})
    this.setState(
      {
        produtosAlterados: { ...currentProdutosAlterados, ...produtosAlterados },
      },
      callback
    )
  }

  getProdutosAlterados = () => Object.keys(this.state.produtosAlterados).map((el) => this.state.produtosAlterados[el])

  getProdutosFiltrados = (produtos) => getProdutosFiltrados(produtos, this.props.categorias, this.state.categoria, this.state.subCategoria)
  setProdutosFiltrados = () =>
    this.setState({
      produtosComEstoque: this.getProdutosFiltrados(this.props.produtos.filter((x) => x.estoque > 0)),
      produtosSemEstoque: this.getProdutosFiltrados(this.props.produtos.filter((x) => x.estoque <= 0)),
    })

  handleUpdateProduto = (dados, callback) => {
    const { produtos } = this.props
    const currentProdutosAlterados = this.state.produtosAlterados
    // debugger
    const produtoAlterado = produtos.filter((el) => el.idProduto === dados.idProduto || (el.codigoInterno && el.codigoInterno === dados.codigoInterno))[0]
    if (produtoAlterado) {
      currentProdutosAlterados[produtoAlterado.idProduto] = { ...produtoAlterado, ...dados }
      this.setState(
        {
          produtosAlterados: { ...currentProdutosAlterados },
        },
        callback
      )
    }
  }

  handleUpdateProdutoComEstoque = (dados) => this.setState({ produtosComEstoque: mergeProdutos(this.state.produtosComEstoque, dados) }, this.syncProdutosAlterados())
  handleUpdateProdutoSemEstoque = (dados) => this.setState({ produtosSemEstoque: mergeProdutos(this.state.produtosSemEstoque, dados) }, this.syncProdutosAlterados())

  handleUpdateCategorias = (categoria, subCategoria) =>
    this.setState({ categoria, subCategoria }, () => {
      this.setProdutosFiltrados()
    })

  hasInvalidItens = () =>
    !Object.keys(this.state.produtosAlterados).length || Object.keys(this.state.produtosAlterados).some((x) => this.state.produtosAlterados[x].invalid === true)
  botaoSalvar = () => <BtnSalvar onSalvar={() => this.setState({ estagio: 1 })} disabled={this.hasInvalidItens()} />

  estagioAdicionarAlteracoes = () => {
    const { produtosComEstoque, produtosSemEstoque } = this.state
    const changeItems = ({ result: items, query }) => {
      this.setState({
        hasSearch: !!query,
        produtosComEstoque: this.getProdutosFiltrados(items.filter((x) => x.estoque > 0)),
        produtosSemEstoque: this.getProdutosFiltrados(items.filter((x) => x.estoque <= 0)),
      })
    }

    return (
      <>
        <Container>
          <label htmlFor="file-upload" className="custom-file-upload float-right">
            <i className="fa fa-cloud-upload" /> Enviar Planilha
          </label>
          <input
            type="file"
            id="file-upload"
            name="file-upload"
            ref={this.state.inputFileFieldRef}
            onChange={async (event) => {
              event.persist()
              await handleOnFileChangeEventAsync(event, this.importarPlanilhaCallBack)
              event.target.value = null
            }}
          />
          <br />
          {/* <FiltroCategoriasBox categoria={categoria} subCategoria={subCategoria} onChange={this.handleUpdateCategorias} /> */}
          <SearchBar hasSearch={this.state.hasSearch} items={this.props.produtos} options={searchOptions} placeholder="Procurar em estoque" onSearchItems={changeItems.bind()} />
          <hr />
          <h6>Produtos com Estoque:</h6>
          <CardDeck style={{ justifyContent: 'center' }}>{this.displayProdutosList(produtosComEstoque, this.handleUpdateProduto)}</CardDeck>
          {this.botaoSalvar()}
          <hr />
          <h6>Produtos sem Estoque:</h6>
          <CardDeck style={{ justifyContent: 'center' }}>{this.displayProdutosList(produtosSemEstoque, this.handleUpdateProduto)}</CardDeck>
          {this.botaoSalvar()}
        </Container>
      </>
    )
  }

  estagioValidarAlteracoes = () => {
    // const { produtosAlterados } = this.state
    const { dispatch } = this.props

    const produtosAlterados = this.getProdutosAlterados()
    // console.log('PRODUTOS', produtosAlterados)

    return (
      <>
        <Container>
          <h5>Produtos Alterados</h5>
          <h6>Verifique se as alterações estão corretas antes de salvar</h6>
          <hr />
          <CardDeck style={{ justifyContent: 'center' }}>{this.displayProdutosList(produtosAlterados, this.handleUpdateProduto)}</CardDeck>
          <BtnSalvarVoltar
            onVoltar={() => this.setState({ estagio: 0 })}
            onSalvar={() => dispatch(addMovimentoEstoqueLote(produtosAlterados, 'teste'))}
            disabled={this.hasInvalidItens()}
          />
        </Container>
      </>
    )
  }

  render() {
    const { isEstoqueLotePosting } = this.props

    if (isEstoqueLotePosting) {
      return <Loading />
    }

    return (
      <div ref={this.elementoTopo}>
        {this.state.estagio === 0 ? this.estagioAdicionarAlteracoes() : null}
        {this.state.estagio === 1 ? this.estagioValidarAlteracoes() : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isEstoqueLotePosting: state.produto.isEstoqueLotePosting,
})
const mapDispatchToProps = (dispatch) => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(TelaEstoque)
