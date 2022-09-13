import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faUndo } from '@fortawesome/free-solid-svg-icons'
// import { faPlusSquare, faMinusSquare } from "@fortawesome/free-regular-svg-icons";
import Button from 'react-bootstrap/Button'
import InputNumberComConfirm from '../../../components/input/inputNumberConfirm'

class ProdutoItem extends React.PureComponent {
  constructor (props) {
    super(props)

    let unidade = 'CX'
    let quantidade = 0

    if (props.produto.unidade !== undefined) unidade = props.produto.unidade
    if (props.produto.quantidade !== undefined) quantidade = props.produto.quantidade

    this.state = {
      ...props.produto,
      unidade: unidade,
      quantidade: quantidade,
      infosOpened: true
  }

  onChangeNotify = () => {
    this.props.onChange(this.state)
  };

  setUnidade = (e) => this.setState({ unidade: e.value }, () => this.onChangeNotify())
  setQuantidade = (e) => this.setState({ quantidade: parseFloat(e.value, 10) }, () => this.updateTotal())

  openInfos = () => {
    const optionsUnidades = ['CX', 'KG', 'UN', 'SACO'].map((item) => {
      return { value: item, label: item }
    })

    return (
      <td className={`inside-table ${this.state.infosOpened ? 'table-opened' : 'table-closed'}`}>
        <table className='table table-sm'>
          <tbody>
            <tr>
              <td>Unidade</td>
              <td>Quantidade</td>
            </tr>
            <tr className='table-separator'>
              <td>
                <Select
                  isSearchable={false}
                  // menuPosition="auto"
                  id={`unidade_${this.state.idProduto}`}
                  name='unidade'
                  placeholder='Unidade'
                  options={optionsUnidades}
                  onChange={(e) => this.setUnidade(e)}
                  value={{ value: this.state.unidade, label: this.state.unidade }}
                  className='styled-select-unidade'
                  styles={{
                    // Fixes the overlapping problem of the component
                    menu: provided => ({ ...provided, zIndex: 9999 })
                  }}
                />
              </td>
              <td>
                <InputNumberComConfirm
                  id={`quantidade_${this.state.idProduto}`}
                  className='form-control py-1 w-100 nospin '
                  valor={parseFloat(this.state.quantidade, 10)}
                  min={0}
                  precision={3}
                  autoComplete='off'
                  onValueChange={(e) => this.setQuantidade(e)}
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
    )
  };

  handleOpenInfos = () => {
    this.setState({ infosOpened: true })
  };

  renderRemoved = () => (
    <Button variant='light' className='float-right' onClick={() => this.props.restore(this.state.idProduto)}>
      <FontAwesomeIcon icon={faUndo} color='#00FF00' size='sm' />
    </Button>
  )

  renderAdded = () => (
    <Button variant='light' className='float-right' onClick={() => this.props.remove(this.state.idProduto)}>
      <FontAwesomeIcon icon={faTimes} color='#FF0000' size='sm' />
    </Button>
  )

  render () {
    return (
      <>
        <tr onClick={() => this.handleOpenInfos()} className={` product-line-table ${this.state.infosOpened ? 'table-opened' : 'table-closed'}`}>
          <td colSpan='3'>
            <span className='float-left'>
              <strong className='d-inline-block'>{this.state.nomeProduto}</strong>
              <small className='compressed-value'>{` (${this.state.quantidade} ${this.state.unidade})`}</small>
            </span>
            {this.props.source !== 'productRemoved' ? this.renderAdded() : this.renderRemoved()}
          </td>
          {this.openInfos()}
        </tr>
      </>
    )
  }
}

ProdutoItem.propTypes = {
  produto: PropTypes.shape({
    nomeProduto: PropTypes.string.isRequired
  }).isRequired,
  onChange: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  method: state.doacaoAnuncio.method
})
const mapDispatchToProps = (dispatch) => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProps)(ProdutoItem)
