import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { TableList, ListHeaders, ListHeaderTitle, ListBody, ListBodyRow, ListBodyCol } from 'components/style/tableList'
import { isArrayEmpty, isArrayNotEmpty } from 'util/utils'

import SearchBar from 'components/search-bar'
// import { FiltroCategoriasBox } from './components'
import { getProdutosFiltrados } from './components/functions'

import './produto.css'

const searchOptions = {
  shouldSort: true,
  minMatchCharLength: 2,
  threshold: 0.2,
  keys: [
    { name: 'nomeProduto', weight: 2 },
    { name: 'descricaoProduto', weight: 0.6 },
    { name: 'categoriaEntity.nomeCategoria', weight: 0.4 },
    { name: 'categoriaEntity.nomeCategoria.filhos.nomeCategoria', weight: 0.2 },
  ],
}

class TelaCatalogo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hasSearch: false,
      categoria: {},
      subCategoria: {},
      produtosFiltrados: getProdutosFiltrados(this.props.produtos, this.props.categorias),
    }
  }

  displayProdutoItem = (produto) => (
    <ListBodyRow key={produto.idProduto}>
      <ListBodyCol first format="text">
        {produto.nomeProduto}
      </ListBodyCol>
    </ListBodyRow>
  )

  displayProdutosList = (produtos) => (
    <TableList>
      <ListHeaders>
        <ListHeaderTitle>Produto</ListHeaderTitle>
      </ListHeaders>
      <ListBody>
        {isArrayNotEmpty(produtos) && produtos.map((produto) => this.displayProdutoItem(produto))}
        {isArrayEmpty(produtos) && (
          <ListBodyRow>
            <ListBodyCol first format="text">
              Não existem produtos na categoria selecionada
            </ListBodyCol>
          </ListBodyRow>
        )}
      </ListBody>
    </TableList>
  )

  render() {
    const changeItems = ({ result: items, query }) => {
      this.setState({
        hasSearch: !!query,
        produtosFiltrados: items,
      })
    }

    return (
      <>
        <div className="container-fluid">
          <div className="row justify-content-end">
            <div className="col-auto mt-3 mb-3 lista-produto">
              <NavLink className="btn btn-success btn-s ml-2" to="/produtos/importar">
                Importar planilha
              </NavLink>
            </div>
          </div>
          <div className="row">
            <aside className="col-sm-12">
              {/* <FiltroCategoriasBox
                categoria={categoria}
                subCategoria={subCategoria}
                onChange={(categoria, subCategoria) => this.setState({ categoria, subCategoria })}
              /> */}
              <SearchBar hasSearch={this.state.hasSearch} items={this.props.produtos} options={searchOptions} placeholder="Procurar no catalogo" onSearchItems={changeItems.bind()} />
            </aside>
          </div>
          <div className="margin">{this.displayProdutosList(this.state.produtosFiltrados)}</div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  categorias: state.produto.categorias,
  produtos: state.produto.produtos,
})
const mapDispatchToProps = (dispatch) => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(TelaCatalogo)
