import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faUndo } from '@fortawesome/free-solid-svg-icons'
import { Button, Card, Row, Col, Container } from 'react-bootstrap'
import InputNumber from 'components/input/inputNumberConfirm'

class ProdutoItem extends React.PureComponent {
  static propTypes = {
    itemProduto: PropTypes.shape({
      idProduto: PropTypes.string.isRequired,
      unidade: PropTypes.string,
      produto: PropTypes.shape({
        nomeProduto: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    isEstoqueProduto: PropTypes.bool.isRequired,
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

  handleOnChange = (unidade, quantidade) => {
    const { onChange } = this.props

    if (onChange) {
      onChange(this.props.itemProduto.idProduto, unidade, parseFloat(quantidade, 10))
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
      itemProduto: { unidade, quantidade, idProduto },
      isEstoqueProduto,
    } = this.props

    const qtd = parseFloat(quantidade !== undefined ? quantidade : 0)
    const desabilitado = this.props.removido === true

    return (
      <Container>
        <Row className={`${isOpen ? 'table-opened' : 'table-closed'}`} key={`tb_produto_item_${idProduto}`}>
          <Col>
            Unidade: <br />
            <Select
              isSearchable={false}
              id={`unidade_${idProduto}`}
              key={`unidade_${idProduto}`}
              name="unidade"
              placeholder="Unidade"
              options={optionsUnidades}
              onChange={(e) => this.handleOnChange(e.value, qtd)}
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
            Quantidade
            <br />
            <InputNumber
              type="number"
              id={`quantidade_${idProduto}`}
              className="form-control py-1 w-100 nospin "
              valor={isEstoqueProduto ? 0 : parseFloat(qtd, 10)}
              min={0}
              precision={3}
              autoComplete="off"
              readOnly={desabilitado}
              onChange={(e) => !isEstoqueProduto && this.handleOnChange(unidade, e)}
              disabled={isEstoqueProduto}
            />
          </Col>
        </Row>
      </Container>
    )
  }

  swapOpen = () => this.setState((state) => ({ isOpen: !state.isOpen }))

  renderBotaoRemover = () => (
    <Button variant="light" onClick={() => this.handleOnRemove(this.props.itemProduto.idProduto)}>
      <FontAwesomeIcon icon={faTimes} color="#FF0000" size="sm" />
    </Button>
  )

  renderBotaoRestaurar = () => (
    <Button variant="light" onClick={() => this.handleOnRestore(this.props.itemProduto.idProduto)}>
      <FontAwesomeIcon icon={faUndo} color="#00FF00" size="sm" />
    </Button>
  )

  render() {
    const { unidade, quantidade } = this.props.itemProduto
    const { isRegistered } = this.props
    const { nomeProduto } = this.props.itemProduto.produto
    const qtd = parseFloat(quantidade !== undefined ? quantidade : 0)
    const bg = !!isRegistered ? 'saveadd-primary-color' : 'bg-warning'
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
  method: state.doacaoAnuncio.method,
})
const mapDispatchToProps = (dispatch) => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProps)(ProdutoItem)
