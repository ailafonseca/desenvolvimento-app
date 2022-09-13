import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { loadCategorias } from '../actions'

import { isNumberPositive } from 'util/utils'

class FiltroCategoriasBox extends React.Component {
  static propTypes = {
    categoria: PropTypes.object,
    subCategoria: PropTypes.object,
    onChange: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props)

    this.subCategoriaComponent = React.createRef()
    this.categoriaComponent = React.createRef()

    this.state = {
      categoriaAtual: (isNumberPositive(props.categoria.value)) ? props.categoria.value : null,
      subCategoriaAtual: (isNumberPositive(props.subCategoria.value)) ? props.subCategoria.value : null
    }
  }

  componentDidMount () {
    const { dispatch } = this.props

    dispatch(loadCategorias())
  }

  sortCategories = (categorias) => {
    categorias.sort((a, b) => a.nomeCategoria.toLowerCase().localeCompare(b.nomeCategoria.toLowerCase()))
    return categorias.map(c => ({ value: c.idCategoria, label: c.nomeCategoria }))
  }

   getListCategoriasSorted = () => [{ value: 0, label: 'Selecione uma Categoria' }, ...this.sortCategories(this.props.categorias)]

   getListSubCategoriasSorted = () => {
     const { categorias } = this.props
     const { categoriaAtual } = this.state

     if (categoriaAtual && categoriaAtual.value > 0) {
       const categoria = categorias.find(c => c.idCategoria === categoriaAtual.value)

       if (categoria !== null) {
         return [{ value: 0, label: 'Selecione uma SubCategoria' }, ...this.sortCategories(categoria.filhos)]
       }
     }

     return []
   }

  notifyOnChange = () => this.props.onChange && this.props.onChange(this.state.categoriaAtual, this.state.subCategoriaAtual)
  handleOnChangeCategoria = (e) => this.setState({ categoriaAtual: e, subCategoriaAtual: { value: 0, label: 'Selecione uma sub-categoria' } }, () => {
    this.notifyOnChange()
    // Garante que seja zerado a sub-categoria quando for trocada a categoria
    if (this.subCategoriaComponent && this.subCategoriaComponent.current) {
      this.subCategoriaComponent.current.select.setValue({ value: 0, label: 'Selecione uma sub-categoria' })
    }
  })

  handleOnChangeSubCategoria = (e) => this.setState({ subCategoriaAtual: e }, () => this.notifyOnChange())

  renderCategoria = () => (
    <Select
      ref={this.categoriaComponent}
      options={this.getListCategoriasSorted()}
      isSearchable
      isClearable
      defaultValue={this.state.categoriaAtual}
      onChange={this.handleOnChangeCategoria}
      placeholder='Selecione uma categoria'
      noOptionsMessage={() => 'Filtre por categoria aqui'}
      isLoading={this.props.isLoadingCategorias}
      styles={{
        // Fixes the overlapping problem of the component
        menu: provided => ({ ...provided, zIndex: 9999 })
      }}
    />)

    renderSubCategoria = () => (
      <Select
        ref={this.subCategoriaComponent}
        options={this.getListSubCategoriasSorted()}
        isSearchable
        isClearable
        defaultValue={this.state.subCategoriaAtual}
        onChange={this.handleOnChangeSubCategoria}
        placeholder='Selecione uma sub-categoria'
        noOptionsMessage={() => 'Filtre por sub-categoria aqui'}
        styles={{ menu: provided => ({ ...provided, zIndex: 9998 }) }}
      />
    )

    render () {
      const { categoriaAtual } = this.state

      return (
        <>
          <h6>Filtrar por categoria:</h6>
          {this.renderCategoria()}
          {categoriaAtual && categoriaAtual.value > 0 && this.renderSubCategoria()}
        </>
      )
    }
}

const mapStateToProps = (state) => ({
  categorias: state.produto.categorias,
  isLoadingCategorias: state.produto.isLoadingCategorias
})
const mapDispatchToProps = (dispatch) => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(FiltroCategoriasBox)
