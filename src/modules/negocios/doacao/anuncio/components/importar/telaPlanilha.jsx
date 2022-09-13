import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

import ReactExport from 'react-export-excel'
import readXlsxFile from 'read-excel-file'

import importarNaturalDaTerra from './naturalDaTerra'
import { createProductsObjectsAnuncio } from 'modules/importar-produtos-lote/auxFunctions'
import { isNullOrEmpty } from 'util/utils'

export default class ImportarPlanilhaTela extends React.Component {
  static propTypes = {
    anuncioProdutos: PropTypes.array.isRequired,
    produtos: PropTypes.array.isRequired,
    onImportar: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      onModeImportar: false,
      onModeSuccess: false,
      isLoading: false,
    }
  }

  goToImportar = () => this.setState({ onModeImportar: true, onModeSuccess: false })
  goBackFromImportar = () => this.setState({ onModeImportar: false })

  handleOnFileChangeEvent = (e) => {
    const { anuncioProdutos, produtos, onImportar } = this.props

    if (!isNullOrEmpty(e.target) && e.target.files !== undefined && e.target.files.length > 0) {
      readXlsxFile(e.target.files[0])
        .then((rows) => {
          const dadosPlanilha = createProductsObjectsAnuncio(rows)
          const resultado = importarNaturalDaTerra(anuncioProdutos, dadosPlanilha, produtos)

          if (onImportar !== undefined) {
            onImportar(resultado)
          }

          this.setState({
            onModeImportar: false,
            onModeSuccess: true,
          })
        })
        .catch((erro) => {
          console.log('erro ao carregar a planilha', erro)
        })
    }
  }

  renderNormalMode = () => {
    return (
      <div className="text-right">
        <Button variant="primary" size="sm" onClick={() => this.goToImportar()}>
          Importar produtos por planilha
        </Button>
      </div>
    )
  }

  renderSuccess = () => {
    return (
      <>
        Planilha importada com sucesso.
        <Button variant="primary" size="sm" onClick={() => this.goToImportar()}>
          Importar outra planilha
        </Button>
      </>
    )
  }

  renderImportarMode = () => {
    const ExcelFile = ReactExport.ExcelFile
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn
    const baseTableFields = [
      {
        idProduto: '9998881676654',
        nomeProduto: 'Abacate',
        preco: '3',
        quantidade: '2',
        unidade: 'KG',
      },
    ]
    return (
      <>
        <div>
          <ExcelFile
            element={
              <p align="center" className="margin">
                Baixe <button className="link">aqui</button> o modelo de planilha.
              </p>
            }
            filename="Planilha_AtualizaçãoProdutos"
          >
            <ExcelSheet data={baseTableFields} name="PlanilhaPadrão">
              <ExcelColumn label="Id Produto" value="idProduto" />
              <ExcelColumn label="Nome do Produto" value="nomeProduto" />
              <ExcelColumn label="Quantidade" value="quantidade" />
              <ExcelColumn label="Preço" value="preco" />
              <ExcelColumn label="Unidade" value="unidade" />
            </ExcelSheet>
          </ExcelFile>
        </div>

        <div>
          <div className="d-flex justify-content-center">
            <label className="btn btn-primary" for="input">
              Enviar planilha
              <input type="file" id="input" onChange={this.handleOnFileChangeEvent} />
            </label>
          </div>
        </div>
      </>
    )
  }

  render() {
    const { onModeImportar, onModeSuccess } = this.state

    if (onModeSuccess) {
      return this.renderSuccess()
    }

    if (onModeImportar) {
      return this.renderImportarMode()
    }

    return this.renderNormalMode()
  }
}
