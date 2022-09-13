import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faUndo } from '@fortawesome/free-solid-svg-icons'
// import { faPlusSquare, faMinusSquare } from "@fortawesome/free-regular-svg-icons";
import Button from 'react-bootstrap/Button'
import InputNumber from '../../../components/input/inputNumberConfirm'

class ProdutoRemovido extends React.PureComponent {
  constructor (props) {
    super(props)

    let unidade = 'CX'
    let quantidade = '0'
    let preco = '0'

    if (props.produto.unidade !== undefined) unidade = props.produto.unidade
    if (props.produto.quantidade !== undefined) quantidade = props.produto.quantidade
    if (props.produto.preco !== undefined) preco = props.produto.preco

    this.state = {
      ...props.produto,
      unidade: unidade,
      quantidade: quantidade,
      preco: preco,
      infosOpened: true,
      precoTotal: preco * quantidade
    }
  }

  onChangeUnidade = (e) => {
    this.setState({ unidade: e.value }, () => this.onChangeAll())
  };

  onChangeAll = () => {
    const newState = { ...this.state }
    this.setState(newState)
    this.props.onChange(newState)
  };

  setNewTotal = (type, e) => {
    const preco = this.state.preco
    const quantidade = this.state.quantidade
    if (type === 'quantidade') {
      this.setState({ quantidade: e }, () => {
        this.setState({ quantidade: parseFloat(this.state.quantidade, 10) }, () => {
          this.onChangeAll()
        })
      })
      this.setState({ precoTotal: e * preco }, () => {
        this.setState({ precoTotal: parseFloat(this.state.precoTotal, 10) }, () => {
          this.onChangeAll()
        })
      })
    }
    if (type === 'preco') {
      this.setState({ preco: e }, () => {
        this.setState({ preco: parseFloat(this.state.preco, 10) + parseFloat(this.state.preco, 10) }, () => {
          this.onChangeAll()
        })
      })
      this.setState({ precoTotal: e * quantidade }, () => {
        this.setState({ precoTotal: parseFloat(this.state.precoTotal, 10) }, () => {
          this.onChangeAll()
        })
      })
    }
    if (type === 'precoTotal') {
      this.setState({ precoTotal: e }, () => {
        this.setState({ precoTotal: parseFloat(this.state.precoTotal, 10) }, () => {
          this.onChangeAll()
        })
      })
    }
  };

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
                  id='unidade'
                  name='unidade'
                  placeholder='Unidade'
                  options={optionsUnidades}
                  onChange={(e) => this.onChangeUnidade(e)}
                  isDisabled
                  value={{ value: this.state.unidade, label: this.state.unidade }}
                  className='styled-select-unidade'
                  styles={{
                    // Fixes the overlapping problem of the component
                    menu: provided => ({ ...provided, zIndex: 9999 })
                  }}
                />
              </td>
              <td>
                <InputNumber
                  type='number'
                  id={`quantidade_${this.state.idProduto}`}
                  className='form-control py-1 w-100 nospin '
                  valor={parseFloat(this.state.quantidade, 10)}
                  autoComplete='off'
                  min={0}
                  readOnly
                  precision={3}
                  onChange={(e) => this.setNewTotal('quantidade', e)}
                />
              </td>
            </tr>

            <tr>
              <td className='hidden-sm-up'>Preço Unitário</td>
              <td className='hiddenn-sm-up'>
                <b>Preço Total</b>
              </td>
            </tr>

            <tr className='table-separator'>
              <td>
                <InputNumber
                  type='number'
                  id={`preco_${this.state.idProduto}`}
                  className='form-control py-1 w-100 nospin'
                  valor={parseFloat(this.state.preco, 10)}
                  min={0}
                  mobile
                  readOnly
                  precision={2}
                  onChange={(e) => this.setNewTotal('preco', e)}
                />
              </td>
              <td>
                <InputNumber
                  type='number'
                  id={`precoTotal_${this.state.idProduto}`}
                  value={this.state.precoTotal}
                  className='form-control precoTotal'
                  min={0}
                  noStyle
                  readOnly
                  precision={2}
                  onChange={(e) => this.setNewTotal('precoTotal', e)}
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

  render () {
    const { remove, restore } = this.props
    return (
      <>
        <tr onClick={() => this.handleOpenInfos()} className={` product-line-table ${this.state.infosOpened ? 'table-opened' : 'table-closed'}`}>
          <td colSpan='3'>
            <span className='float-left'>
              <strong className='d-inline-block'>{this.state.nomeProduto}</strong>
              <small className='compressed-value'>{` (${this.state.quantidade} ${this.state.unidade})`}</small>
            </span>
            {/* <small className="float-right item-sign">{this.state.infosOpened ? <FontAwesomeIcon
              icon={faMinusSquare}
              size="1x"
            /> : <FontAwesomeIcon
                icon={faPlusSquare}
                size="1x"
              />}</small> */}
            {this.props.source !== 'productRemoved' ? (
              <Button variant='light' className='float-right' onClick={() => remove(this.state.idProduto)}>
                <FontAwesomeIcon icon={faTimes} color='#FF0000' size='sm' />
              </Button>
            ) : (
              <Button variant='light' className='float-right' onClick={() => restore(this.state.idProduto)}>
                <FontAwesomeIcon icon={faUndo} color='#00FF00' size='sm' />
              </Button>
            )}
          </td>
          {this.openInfos()}
        </tr>
      </>
    )
  }
}

ProdutoRemovido.propTypes = {
  produto: PropTypes.shape({
    nomeProduto: PropTypes.string.isRequired
  }).isRequired,
  onChange: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProps)(ProdutoRemovido)
