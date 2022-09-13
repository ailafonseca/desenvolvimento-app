import React, { Component } from 'react'
import { Container, Row, Col, Table, Button, Alert, ButtonGroup } from 'react-bootstrap'
import readXlsxFile from 'read-excel-file'
import HiddenInput from './components/HiddenInput'
import { connect } from 'react-redux'
import { loadProducts, sendProduct, deleteProduct, addProduct } from './actions'
import { createProductsObjects, addStatusAndOptions } from './auxFunctions'
import status from './statusConstants'

class ImportarProdutoEmLotes extends Component {
  renderizarTabela () {
    const { listaProdutos, dispatch, sendProduct } = this.props
    if (!listaProdutos) return
    if (listaProdutos.constructor !== Array) return
    if (listaProdutos.length === 0) return
    return (
      <Container>
        <Row>
          <Table className='table-hover' responsive>
            <thead>
              <tr>
                <th className='text-center'>Status</th>
                <th>Código</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th className='text-right'>Ações</th>
              </tr>
            </thead>
            <tbody>
              {listaProdutos.map((produto) => {
                const { descricaoStatus, paraEnvio, idInterno } = produto.controle
                const { codigoInterno, nomeProduto, descricaoProduto } = produto.detalhes
                const { naoEnviado, enviando, enviado, erro } = status
                if (idInterno !== 'produto-0') {
                  return (
                    <tr key={idInterno}>
                      <td className='p-0'>
                        <Alert
                          className='text-center m-0'
                          variant={
                            paraEnvio === false
                              ? 'warning'
                              : descricaoStatus === naoEnviado
                                ? 'secondary'
                                : descricaoStatus === enviando
                                  ? 'info'
                                  : descricaoStatus === enviado
                                    ? 'success'
                                    : 'danger'
                          }
                        >
                          {descricaoStatus}
                        </Alert>{' '}
                      </td>
                      <td>{codigoInterno}</td>
                      <td>{nomeProduto}</td>
                      <td>{descricaoProduto}</td>
                      <td className={`text-right px-0 ${paraEnvio ? '' : 'd-none'}`}>
                        <ButtonGroup size='lg'>
                          <Button
                            className='px-4'
                            codproduto={idInterno}
                            onClick={() => dispatch(sendProduct(idInterno, produto.detalhes))}
                            disabled={!(descricaoStatus === naoEnviado || descricaoStatus === erro)}
                          >
                            Enviar
                          </Button>
                          <Button
                            className='px-4'
                            codproduto={idInterno}
                            variant='danger'
                            onClick={() => dispatch(deleteProduct(idInterno))}
                            disabled={!(descricaoStatus === naoEnviado || descricaoStatus === erro)}
                          >
                            Cancelar
                          </Button>
                        </ButtonGroup>
                      </td>

                      <td className={`text-right px-0 ${!paraEnvio ? '' : 'd-none'}`}>
                        <ButtonGroup size='lg'>
                          <Button codproduto={idInterno} className='m-1' variant='warning' onClick={() => dispatch(addProduct(idInterno))}>
                            Adicionar para envio
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  )
                }
                return null
              })}
            </tbody>
          </Table>
        </Row>
      </Container>
    )
  }

  // Lifecycle methods
  componentDidMount () {
    const { dispatch, loadProducts } = this.props
    const input = document.getElementById('input')

    // Altera o state toda vez que houver mudanca no input
    input.addEventListener('change', () => {
      readXlsxFile(input.files[0])
        .then((rows) => {
          dispatch(loadProducts(addStatusAndOptions(createProductsObjects(rows))))
        })
        .catch((error) => {
          console.log(error)
        })
    })
  }

  render () {
    // const { dispatch } = this.props;
    return (
      <>
        <Container className='my-3'>
          <Row>
            <Col sm={12} md={8}>
              <h2>Importar Produtos</h2>
              <p className='mx-0 mb-2 p-0'>Clique no botão "Carregar planilha" para iniciar a importação de produtos.</p>
              <p className='m-0 p-0'>
                <a className='m-0 py-3' href='https://drive.google.com/uc?id=1lAmQokT3h9LwgtB113xcTCm0nLBIEqiM&export=download'>
                  Dúvidas? Clique para baixar modelo de planilha!
                </a>
              </p>
            </Col>
            <Col sm={12} md={4}>
              <HiddenInput />
            </Col>
          </Row>
        </Container>
        {this.renderizarTabela()}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  categorias: state.importarProdutos.categorias,
  listaProdutos: state.importarProdutos.produtos
})

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  loadProducts,
  sendProduct,
  deleteProduct,
  addProduct
})

export default connect(mapStateToProps, mapDispatchToProps)(ImportarProdutoEmLotes)
