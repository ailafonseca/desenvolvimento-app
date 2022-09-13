// import ReactExport from 'react-export-excel'
import readXlsxFile from 'read-excel-file'

import { isArrayEmpty, isArrayNotEmpty, isNullOrEmpty } from 'util/utils'

const idVariantes = ['Id do Produto', 'id', 'ID', 'Id', 'id produto', 'id do produto', 'Código Interno', 'Cod Interno', 'cod interno', 'COD', 'cod']
// const nomeVariantes = ['Nome do Produto', 'Nome', 'Produto', 'nome']
const unidadeVariantes = ['Unidade', 'unidade', 'Und', 'und']
const quantidadeVariantes = ['Quantidade', 'quantidade', 'Qtd', 'qtd']
const precoVariantes = ['Preço', 'preço', 'preco', 'Preco', 'preço unitário', 'preco unitario', 'Preço Unitário', 'Preco Unitario']
const tipoVariantes = ['Tipo', 'tipo']

function getRowIndex (row, nameMatchArray) {
  for (let i = 0; i < nameMatchArray.length; i++) {
    if (row.indexOf(nameMatchArray[i]) >= 0) return row.indexOf(nameMatchArray[i])
  }
  return undefined
}

function importarProduto (rows) {
  if (isArrayEmpty(rows)) return []

  const colIndexes = {
    cod: getRowIndex(rows[0], idVariantes),
    und: getRowIndex(rows[0], unidadeVariantes),
    qtd: getRowIndex(rows[0], quantidadeVariantes),
    pre: getRowIndex(rows[0], precoVariantes),
    tvr: getRowIndex(rows[0], tipoVariantes)
  }

  const processedRows = rows.map((row, i) => {
    if (i === 0) return {}
    return {
      codigoInterno: row[colIndexes.cod].toString(),
      unidade: row[colIndexes.und],
      quantidade: row[colIndexes.qtd],
      preco: row[colIndexes.pre],
      tipo: 1
    }
  })

  return processedRows.filter((row) => !isNullOrEmpty(row.codigoInterno) && (row.quantidade > 0 || row.tipo === 1))
}

export async function handleOnFileChangeEventAsync (e, callback) {
  const fileExists = !isNullOrEmpty(e.target) && e.target.files !== undefined && e.target.files.length > 0

  if (fileExists && callback) {
    try {
      const rows = await readXlsxFile(e.target.files[0])
      if (isArrayNotEmpty(rows)) callback(importarProduto(rows))
    } catch (erro) {
      console.log('erro ao carregar a planilha', erro)
    }
  }
}
