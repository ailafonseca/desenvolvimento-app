import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import Button from 'react-bootstrap/Button'

import { isArrayEmpty, isNullOrEmpty } from 'util/utils'

class NovoProdutoItem extends React.Component {
  static propTypes = {
    produtos: PropTypes.array.isRequired,
    onAdd: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props)

    this.state = {
      idProduto: undefined,
      nomeProduto: undefined,
      produto: undefined
    }
  }

  handleOnChange = (unidade, quantidade) => {
    this.setState({
      unidade: unidade,
      quantidade: quantidade
    })
  }

  handleOnChangeProduto = (option) => {
    const { produtos } = this.props
    const produtoFiltrado = produtos.filter(p => p.idProduto === option.value)
    const produto = isArrayEmpty(produtoFiltrado) ? undefined : produtoFiltrado[0]

    this.setState({
      idProduto: option.value,
      nomeProduto: option.label,
      produto: produto
    })
  }

  produtoToOption (produto) {
    return {
      label: produto.nomeProduto,
      value: produto.idProduto
    }
  }

  filterProduto = (inputValue) => {
    return this.props.produtos.filter(produto => produto.nomeProduto.toLowerCase().includes((inputValue || '').toLowerCase())).map(this.produtoToOption)
  }

  loadOptions = (inputValue, callback) => {
    setTimeout(() => callback(this.filterProduto(inputValue)), 100)
  }

  handleAdd = () => {
    const { idProduto, nomeProduto, produto } = this.state
    const { onAdd } = this.props

    if (!isNullOrEmpty(nomeProduto)) {
      onAdd(idProduto, nomeProduto, produto)
    }
  }

  displayAdicionar = () => {
    const { nomeProduto } = this.state

    if (!isNullOrEmpty(nomeProduto)) {
      return (
        <Button className='float-right btn btn-sm btn-primary' onClick={this.handleAdd()}>
          Adicionar
        </Button>
      )
    }

    return <></>
  }

  displayOpenItem = () => {
    const { onCancel } = this.props

    return (
      <table className='mt-4 mb-4 table table-sm table-borderless table-striped product-table'>
        <tbody>
          <tr className='product-line-table table-opened'>
            <td>
              <table className='table table-sm'>
                <tbody>
                  <tr>
                    <td>
                      <strong>Produto a ser adicionado</strong>
                    </td>
                    <td className='text-right'>
                      {this.displayAdicionar()}
                      <Button className='float-right btn btn-sm btn-danger' onClick={() => onCancel()}>
                        Cancelar
                      </Button>
                    </td>
                  </tr>
                  <tr className='table-separator'>
                    <td colSpan={2}>
                      <Select
                        autoFocus
                        options={this.filterProduto()}
                        isSearchable
                        defaultMenuIsOpen
                        onChange={(e) => this.handleOnChangeProduto(e)}
                        styles={{
                          // Fixes the overlapping problem of the component
                          menu: provided => ({ ...provided, zIndex: 9999 })
                        }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    )
  };

  render () {
    return this.displayOpenItem()
  }
}

export default NovoProdutoItem
