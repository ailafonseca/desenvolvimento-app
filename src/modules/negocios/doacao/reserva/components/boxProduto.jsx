import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'

import InputNumber from 'components/input/inputNumberConfirm'

export default class BoxProduto extends React.PureComponent {
  static propTypes = {
    /**
     * AnuncioProduto que será exibido
     */
    produto: PropTypes.object.isRequired,

    /**
     * Função onChange quando alterar o valor reservado
     */
    onChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    const { produto, isEdit } = props
    console.log(isEdit)
    const reservadoOutrasFontes = produto.reservado || 0
    const quantidadeDisponivel = isEdit ? produto.quantidade : parseFloat(produto.quantidade - reservadoOutrasFontes)
    console.log(quantidadeDisponivel)
    const p = {
      ...produto,
      quantidadeDisponivel: quantidadeDisponivel,
      quantidade: quantidadeDisponivel,
      nomeProduto: this.getNomeProduto(produto),
    }
    this.state = {
      produto: p,
    }

    this.remoteOnChange(p)
  }

  handleOnChange = (e) => {
    const quantidade = parseFloat(e)

    const produto = {
      ...this.state.produto,
      quantidade: quantidade,
    }

    this.setState(
      {
        produto: produto,
      },
      this.remoteOnChange(produto)
    )
  }

  remoteOnChange = (produto) => this.props.onChange(produto.idProduto, produto.quantidade)

  getNomeProduto = (produto) => {
    if (produto) {
      if (!produto.nomeProduto && produto.produto) {
        return produto.produto.nomeProduto
      }

      return produto.nomeProduto
    }
    return ''
  }

  showMessage = (Card) => {
    if (this.Card === null) {
      return 'Não há produtos disponíveis'
    }
  }

  render() {
    const { produto } = this.state
    const quantidadeDisponivel = produto.quantidadeDisponivel
    if (quantidadeDisponivel >= 1) {
      return (
        <div key={`produtoDetalhes-${produto.idProduto}`}>
          <Card style={{ width: '100%' }}>
            <Card.Header>
              {produto.nomeProduto} ({produto.unidade})
            </Card.Header>
            <Card.Body>
              <Container>
                <Row>
                  <Col>
                    <b>Quantidade Reservada:</b>
                  </Col>
                  <Col>
                    <InputNumber
                      id={`qtdReservado-${produto.idProduto}`}
                      type="number"
                      className="form-control py-1 w-100"
                      valor={produto.quantidade}
                      min={0}
                      precision={3}
                      confirmacao={false}
                      autoComplete="off"
                      max={produto.quantidadeDisponivel}
                      onChange={(e) => this.handleOnChange(e)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <b>Quantidade Disponível:</b>
                  </Col>
                  <Col className="inputSemControles text-center">{produto.quantidadeDisponivel.toFixed(3)}</Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
          <h2> {this.showMessage()}</h2>
        </div>
      )
    } else {
      return null
    }
  }
}
