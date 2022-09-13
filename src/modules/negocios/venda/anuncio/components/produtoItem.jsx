import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faUndo } from '@fortawesome/free-solid-svg-icons'
import { Button, Card, Row, Col, Container } from 'react-bootstrap'
import { Screen } from 'components/style'

import InputNumber from 'components/input/inputNumberConfirm'

class ProdutoItem extends React.PureComponent {
  static propTypes = {
    itemProduto: PropTypes.shape({
      idProduto: PropTypes.string.isRequired,
      unidade: PropTypes.string,
      // preco: PropTypes.number.isRequired,
      produto: PropTypes.shape({
        nomeProduto: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    isEstoqueProduto: PropTypes.bool.isRequired,
    isPrecoProduto: PropTypes.bool.isRequired,
    onChange: PropTypes.func,
    onRemove: PropTypes.func,
    onRestore: PropTypes.func,
    removido: PropTypes.bool,
  }

  constructor(props) {
    super(props)

    this.state = {
      isOpen: true,
    }
  }

  handleOnChange = (unidade, quantidade, precoUnitario) => {
    const { onChange } = this.props
    console.log(this.state)
    if (onChange) {
      onChange(this.props.itemProduto.idProduto, unidade, parseFloat(quantidade, 10), parseFloat(precoUnitario, 10))
    }
  }

  handleOnRemove = (idProduto) => this.props.onRemove && this.props.onRemove(idProduto)
  handleOnRestore = (idProduto) => this.props.onRestore && this.props.onRestore(idProduto)

  displayOpenItem = () => {
    const optionsUnidades = ['CX', 'KG', 'UN', 'SACO'].map((item) => {
      return { value: item, label: item }
    })

    const { isOpen } = this.state
    const {
      itemProduto: { unidade, quantidade, preco, idProduto },
      isEstoqueProduto,
      isPrecoProduto,
    } = this.props

    const qtd = parseFloat(quantidade !== undefined ? quantidade : 0)
    const precoTotal = preco * qtd
    const desabilitado = this.props.removido === true

    return (
      <Container className={`inside-table ${isOpen ? 'table-opened' : 'table-closed'}`} key={`tb_produto_item_${idProduto}`}>
        <Row>
          <Col>
            Unidade: <br />
            <Select
              isSearchable={false}
              id={`unidade_${idProduto}`}
              key={`unidade_${idProduto}`}
              name="unidade"
              placeholder="Unidade"
              options={optionsUnidades}
              onChange={(e) => this.handleOnChange(e.value, qtd, preco)}
              value={{ value: unidade || 'KG', label: unidade || 'KG' }}
              isDisabled={desabilitado}
              className="styled-select-unidade"
              styles={{
                // Fixes the overlapping problem of the component
                menu: (provided) => ({ ...provided, zIndex: 9999 }),
              }}
            />
          </Col>
          <Col>
            Quantidade: <br />
            <InputNumber
              type="number"
              id={`quantidade_${idProduto}`}
              className="form-control py-1 w-100 nospin "
              valor={isEstoqueProduto ? 0 : parseFloat(qtd, 10)}
              min={0}
              precision={3}
              autoComplete="off"
              readOnly={desabilitado}
              onChange={(e) => !isEstoqueProduto && this.handleOnChange(unidade, e, preco)}
              disabled={isEstoqueProduto}
            />
          </Col>
          <Col>
            Preço: <br />
            <InputNumber
              type="number"
              id={`preco_${idProduto}`}
              className="form-control py-1 w-100 nospin "
              valor={isPrecoProduto ? 0 : parseFloat(preco, 10)}
              min={0}
              mobile
              precision={2}
              readOnly={desabilitado}
              onChange={(e) => this.handleOnChange(unidade, qtd, e)}
              disabled={isPrecoProduto}
            />
          </Col>
          <Col>
            Preço total: <br />
            <InputNumber
              type="number"
              id={`precoTotal_${idProduto}`}
              valor={!isPrecoProduto && !isEstoqueProduto ? parseFloat(precoTotal, 10) : 0}
              className="form-control py-1 w-100 nospin precoTotal"
              min={0}
              noStyle
              readOnly
              precision={2}
            />
          </Col>
        </Row>
      </Container>
    )
  }

  swapOpen = () => this.setState((state) => ({ isOpen: !state.isOpen }))

  renderBotaoRemover = () => (
    <Button variant="light" className="float-right" onClick={() => this.handleOnRemove(this.props.itemProduto.idProduto)}>
      <FontAwesomeIcon icon={faTimes} color="#FF0000" size="sm" />
    </Button>
  )

  renderBotaoRestaurar = () => (
    <Button variant="light" className="float-right" onClick={() => this.handleOnRestore(this.props.itemProduto.idProduto)}>
      <FontAwesomeIcon icon={faUndo} color="#00FF00" size="sm" />
    </Button>
  )
  render() {
    const { isRegistered } = this.props
    const { unidade, quantidade, preco } = this.props.itemProduto
    const { nomeProduto } = this.props.itemProduto.produto
    let bg = !!isRegistered ? 'saveadd-primary-color' : 'bg-warning'
    console.log(isRegistered)
    bg = window.location.href.includes('edit') ? bg : 'saveadd-primary-color'
    const qtd = parseFloat(quantidade !== undefined ? quantidade : 0)

    return (
      <>
        <Card>
          <Card.Header style={{ justifyContent: 'space-between' }} className={'w-100 h-100 d-flex align-items-center ' + bg}>
            <strong>
              {nomeProduto} <small>{` (${qtd} ${unidade})`}</small>
            </strong>
            {this.props.removido ? this.renderBotaoRestaurar() : this.renderBotaoRemover()}
          </Card.Header>
          <Card.Body className="h-100" style={{ marginTop: '10px' }}>
            {this.displayOpenItem()}
          </Card.Body>
        </Card>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  method: state.vendaAnuncio.method,
})
const mapDispatchToProps = (dispatch) => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProps)(ProdutoItem)
