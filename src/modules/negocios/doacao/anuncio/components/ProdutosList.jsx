import React from 'react'
import PropTypes from 'prop-types'

import ProdutoItem from './produtoItem'
import ProdutoNovo from './produtoNovo'
import { isArrayEmpty } from 'util/utils'

export default class ProdutosCadastradosList extends React.Component {
  static propTypes = {
    anuncioProdutos: PropTypes.array.isRequired,
    isEstoqueProduto: PropTypes.bool.isRequired,
    produtos: PropTypes.array,
    removido: PropTypes.bool,
    onRemove: PropTypes.func,
    onChange: PropTypes.func,
    onRestore: PropTypes.func,
    onAdd: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      onAddMode: false,
    }
  }

  handleOnAdd = (id, nome, produto) => {
    const { onAdd } = this.props

    this.setState({ onAddMode: false }, onAdd(id, nome, produto))
  }

  renderProdutoInserido = (produto) => {
      return (
      <ProdutoItem
        key={`itemListProduto_${produto.idProduto}`}
        itemProduto={produto}
        removido={this.props.removido}
        onChange={this.props.onChange}
        onRemove={this.props.onRemove}
        onRestore={this.props.onRestore}
        isEstoqueProduto={this.props.isEstoqueProduto}
        isRegistered={produto.registered}
      />
    )
  }

  renderAddNew = () => {
    const { onAddMode } = this.state
    const { produtos } = this.props

    if (onAddMode) {
      return <ProdutoNovo produtos={produtos} onCancel={() => this.setState({ onAddMode: false })} onAdd={this.handleOnAdd} />
    }

    return this.renderAddNewButton()
  }

  renderAddNewButton = () => (
    <div className="text-right">
      <button className="btn btn-sm btn-primary" onClick={() => this.setState({ onAddMode: true })}>
        Adicionar novo produto manualmente
      </button>
    </div>
  )

  render() {
    const { anuncioProdutos, removido } = this.props
    if (isArrayEmpty(anuncioProdutos)) {
      return !removido && this.renderAddNew()
    }
    return (
      <>
        {anuncioProdutos.map((produto) => this.renderProdutoInserido(produto))}
        {!removido && this.renderAddNew()}
      </>
    )
  }
}
