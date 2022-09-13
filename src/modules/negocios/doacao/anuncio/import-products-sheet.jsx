import React, { Component } from 'react'
import { Modal, Container, Button } from 'react-bootstrap'
import readXlsxFile from 'read-excel-file'
import { createProductsObjectsAnuncio } from 'modules/importar-produtos-lote/auxFunctions'
import ReactExport from 'react-export-excel'

class ModalImportProductSheet extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: true,
      produtosUsuario: [],
      importedProducts: []
    }
  }

  componentDidMount () {
    this.setState({ produtosUsuario: this.props.products })
  }

  componentDidUpdate () {
    const inputFile = document.getElementById('input')
    if (inputFile) {
      inputFile.removeEventListener('change', this.readExcelFile)
      inputFile.addEventListener('change', this.readExcelFile)
    }
  }

  readExcelFile = () => {
    const inputFile = document.getElementById('input')

    if (inputFile) {
      readXlsxFile(inputFile.files[0]).then((rows) => {
        this.setState({ importedProducts: createProductsObjectsAnuncio(rows) })
      })
    }
  }

  render () {
    const ExcelFile = ReactExport.ExcelFile
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn
    return (
      <Modal show={this.props.show} onHide={() => this.props.onHide()} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>Adicionar novo produto via planilha para anúncio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <div>
              <ExcelFile
                element={
                  <span>
                    Dúvidas? <button className='link'>Clique aqui</button> para baixar modelo de planilha com a lista de produtos disponíveis!
                  </span>
                }
                filename='Planilha_AtualizaçãoProdutos'
              >
                <ExcelSheet data={this.props.products} name='PlanilhaPadrão'>
                  <ExcelColumn label='Id Produto' value='idProduto' />
                  <ExcelColumn label='Nome do Produto' value='nomeProduto' />
                  <ExcelColumn label='Unidade' value='' />
                  <ExcelColumn label='Quantidade' value='' />
                  <ExcelColumn label='Preço Unitário' value='' />
                </ExcelSheet>
              </ExcelFile>
              <p align='center' className='margin'>
                Lembre que a planilha tem que ter a extensão .xlsx!
              </p>
            </div>
            <div>
              <input className='margin' type='file' id='input' />
            </div>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={() => this.props.onHide()}>
            Cancelar
          </Button>
          <button
            className='btn btn-primary'
            onClick={() => {
              this.props.handleAddingProducts(this.state.importedProducts)
              this.props.onHide()
            }}
          >
            Adicionar
          </button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default ModalImportProductSheet
