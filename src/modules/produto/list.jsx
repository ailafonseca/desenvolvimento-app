import React from 'react'
import { connect } from 'react-redux'
import Loading from 'components/loading'
import { loadProdutos } from './actions'
import './produto.css'
import TabHandler from './tabHandler'
import TelaEstoque from './estoque'
import TelaCatalogo from './catalogo'
import { Screen } from 'components/style'

class ListProdutos extends React.Component {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(loadProdutos())
  }

  renderProduto = () => <TelaCatalogo />

  renderEstoque = () => {
    const { produtos, categorias } = this.props

    return (
      <TelaEstoque
        produtos={produtos}
        categorias={categorias}
      />)
  }

  render () {
    const { isLoadingProdutos } = this.props

    if (isLoadingProdutos) {
      return <Loading />
    }

    const tabs = [
      {
        display: 'Catálogo',
        callback: this.renderProduto
      },
      {
        display: 'Estoque',
        callback: this.renderEstoque
      }
    ]

    return (
      <Screen back={{ to: '/', title: 'Menu' }}>
        <TabHandler tabs={tabs} />
      </Screen>
    )
  }
}

const mapStateToProps = (state) => ({
  categorias: state.produto.categorias,
  produtos: state.produto.produtos,
  produto: state.produto.item,
  isLoadingProdutos: state.produto.isLoadingProdutos
})
const mapDispatchToProps = (dispatch) => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(ListProdutos)
