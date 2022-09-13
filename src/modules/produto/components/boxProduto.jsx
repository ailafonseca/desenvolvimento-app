import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col, ToggleButtonGroup, ToggleButton, Card, Container } from 'react-bootstrap'
import Select from 'react-select'

import InputNumber from 'components/input/inputNumberConfirm'
import InputDate from 'components/input/date'
import InputDefault from 'components/input'

import { isNotNullOrEmpty, isNullOrEmpty } from 'util/utils'

function getNomeProduto(dados) {
  if (dados) {
    let nome = dados.nomeProduto

    if (!dados.nomeProduto && dados.produto) {
      nome = dados.produto.nomeProduto
    }

    if (dados.unidade || dados.unidadeBase) {
      nome += ` (${dados.unidade || dados.unidadeBase})`
    } else {
      nome += ' (??)'
    }

    return nome
  }
  return ''
}

function produtoPropsToState(produto) {
  return {
    idProduto: produto.idProduto,
    nomeProduto: produto.nomeProduto,
    unidade: isNotNullOrEmpty(produto.unidade) ? produto.unidade : produto.unidadeBase,
    unidadeBase: produto.unidadeBase,
    quantidade: produto.quantidade,
    estoque: produto.estoque || 0,
    numero: produto.numero,
    tipo: produto.tipo,
    preco: produto.preco || produto.precoBase,
    lote: produto.lote,
    vencimento: produto.vencimento,
    invalid: false,
  }
}

class BoxProduto extends React.Component {
  constructor(props) {
    super(props)
    const { produto } = props

    this.state = {
      dados: produtoPropsToState(produto),
      options: ['CX', 'KG', 'UN', 'SACO'].map((item) => {
        return { value: item, label: item }
      }),
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const dados = JSON.stringify(this.state.dados)
    const stateDiferente = JSON.stringify(nextState.dados) !== dados
    const propsDiferente = JSON.stringify(produtoPropsToState(nextProps.produto)) !== dados

    if (nextProps.idProduto === 'f659299d-c8aa-4595-be94-8e8ca01d1f8d') console.log('com diff ', nextProps, nextState)

    return stateDiferente || propsDiferente
  }

  static getDerivedStateFromProps(props, state) {
    const { produto } = props
    const { dados } = state

    const diff = {
      quantidade: produto.quantidade !== dados.quantidade,
      unidade: produto.unidade !== dados.unidade,
      tipo: produto.tipo !== dados.tipo,
    }

    if (diff.quantidade || diff.unidade || diff.tipo) {
      return {
        dados: produtoPropsToState(produto),
      }
    }

    return null
  }

  getValue(e) {
    if (!e) return ''
    return e.target.value
  }

  internalOnChange = (data) => {
    const { onChange } = this.props

    const qtdPreenchido = data.quantidade > 0
    const precoPreenchido = data.preco > 0
    const tipoInvalido = !(data.tipo >= 0) && qtdPreenchido
    const unidadeInvalida = isNullOrEmpty(data.unidade) && (qtdPreenchido || precoPreenchido)
    const invalid = tipoInvalido || unidadeInvalida
    const dados = { ...data, invalid, tipoInvalido, unidadeInvalida }
    onChange(dados)
    // console.log('internal on change', dados)
    // this.setState({ dados }, onChange(dados))
  }

  renderNovoEstoque = (dados) => {
    const tipoValido = dados.tipo >= 0
    const quantidadeValida = dados.quantidade >= 0

    if (!tipoValido || !quantidadeValida) {
      return null
    }

    let valor = 0
    if (dados.tipo === 0) {
      valor = dados.estoque + dados.quantidade
    } else if (dados.tipo === 1) {
      valor = dados.quantidade
    } else if (dados.tipo === 2) {
      valor = dados.estoque - dados.quantidade
    } else {
      console.log('tipo inválido 2', dados.tipo)
      return null
    }

    return (
      <Row key={`novoValorEstoqueRow_${dados.idProduto}`}>
        <Col>Novo Estoque</Col>
        <Col>
          <InputNumber
            id={`novoValor-${dados.idProduto}`}
            type="number"
            className="form-control py-1 w-100"
            valor={valor}
            min={0}
            precision={3}
            confirmacao={false}
            autoComplete="off"
            disabled
          />
        </Col>
      </Row>
    )
  }

  renderRowUnidade = (dados, options, isVisible) => (
    <Row>
      <Col>
        {isVisible ? (
          <Select
            id={`unidade-${dados.idProduto}`}
            placeholder="Unidade"
            options={options}
            className={'py-1 w-100 ' + (dados.invalid && dados.unidadeInvalida ? 'invalid' : '')}
            styles={{ menu: (provided) => ({ ...provided, zIndex: 9999 }), zIndex: 9999 }}
            dropdownIndicator
            isSearchable
            menuPosition="auto"
            isDisabled={isNotNullOrEmpty(dados.unidadeBase)}
            value={(dados.unidade && dados.unidade.length > 0 && options.find((o) => o.value === dados.unidade)) || null}
            onChange={(e) => this.internalOnChange({ ...dados, unidade: e.value })}
          />
        ) : (
          <span>&nbsp;</span>
        )}
      </Col>
    </Row>
  )

  renderCard = (dados, i, options, isVisible) => {
    return (
      <Card
        bg={i % 2 === 0 ? 'primary' : 'secondary'}
        key={`card-produto-${dados.idProduto}`}
        className="p-1"
        style={{
          width: '100%',
          maxWidth: '355px',
          minWidth: '285px',
          padding: '0px',
          margin: '0px',
        }}
      >
        <Card.Header as="h6">{getNomeProduto(dados)}</Card.Header>
        <Card.Body>
          <Container>
            <Row>
              <Col className="text-right">
                {isVisible ? (
                  <ToggleButtonGroup
                    type="radio"
                    name={`opcoes-${dados.idProduto}`}
                    value={dados.tipo}
                    onChange={(value) => this.internalOnChange({ ...dados, tipo: value })}
                    size="sm"
                    className={dados.invalid && dados.tipoInvalido ? 'invalid' : ''}
                  >
                    <ToggleButton name={`opcoes-${dados.idProduto}`} value={0}>
                      Acrescentar
                    </ToggleButton>
                    <ToggleButton name={`opcoes-${dados.idProduto}`} value={1}>
                      Substituir
                    </ToggleButton>
                    <ToggleButton name={`opcoes-${dados.idProduto}`} value={2}>
                      Reduzir
                    </ToggleButton>
                  </ToggleButtonGroup>
                ) : (
                  <span>&nbsp;</span>
                )}
              </Col>
            </Row>
            {this.renderRowUnidade(dados, options, isVisible)}
            <Row>
              <Col>Preço Unitário</Col>
              <Col>
                {isVisible ? (
                  <InputNumber
                    id={`preco-${dados.idProduto}`}
                    type="number"
                    className="form-control py-1 w-100"
                    valor={dados.preco}
                    min={0}
                    precision={3}
                    confirmacao={false}
                    autoComplete="off"
                    max={0}
                    onChange={(value) => this.internalOnChange({ ...dados, preco: parseFloat(value) })}
                  />
                ) : (
                  <span>&nbsp;</span>
                )}
              </Col>
            </Row>
            <Row>
              <Col>Estoque Atual</Col>
              <Col>
                {isVisible ? (
                  <InputNumber
                    id={`estoque-atual-${dados.idProduto}`}
                    type="number"
                    className="form-control py-1 w-100"
                    valor={dados.estoque}
                    precision={3}
                    confirmacao={false}
                    autoComplete="off"
                    disabled
                  />
                ) : (
                  <span>&nbsp;</span>
                )}
              </Col>
            </Row>
            <Row>
              <Col>Quantidade</Col>
              <Col>
                {isVisible ? (
                  <InputNumber
                    id={`estoque-${dados.idProduto}`}
                    type="number"
                    className="form-control py-1 w-100"
                    valor={dados.quantidade}
                    min={0}
                    precision={3}
                    confirmacao={false}
                    autoComplete="off"
                    onChange={(value) => this.internalOnChange({ ...dados, quantidade: parseFloat(value) })}
                  />
                ) : (
                  <span>&nbsp;</span>
                )}
              </Col>
            </Row>
            <Row>
              <Col>Vencimento</Col>
              <Col>
                {isVisible ? (
                  <InputDate
                    id={`vencimento-${dados.idProduto}`}
                    type="number"
                    className="form-control py-1 w-100"
                    valor={dados.vencimento}
                    min={0}
                    precision={3}
                    confirmacao={false}
                    autoComplete="off"
                    onChange={(value) => this.internalOnChange({ ...dados, vencimento: value })}
                  />
                ) : (
                  <span>&nbsp;</span>
                )}
              </Col>
            </Row>
            <Row>
              <Col>Lote</Col>
              <Col>
                {isVisible ? (
                  <InputDefault
                    id={`lote-${dados.idProduto}`}
                    type="text"
                    containerClass="input-group input-group-sm"
                    className="form-control py-1 w-100"
                    valor={dados.lote}
                    autoComplete="off"
                    onChange={(e) => this.internalOnChange({ ...dados, lote: this.getValue(e) })}
                  />
                ) : (
                  <span>&nbsp;</span>
                )}
              </Col>
            </Row>
            {this.renderNovoEstoque(dados)}
          </Container>
        </Card.Body>
      </Card>
    )
  }

  render() {
    const { i, options } = this.state
    const dados = produtoPropsToState(this.props.produto)

    return this.renderCard(dados, i, options, true)
  }
}

BoxProduto.propTypes = {
  produto: PropTypes.object.isRequired,
  i: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default BoxProduto
