import { isArrayEmpty } from 'util/utils'

const codigoInterno = (linha) => String(linha[0])
const quantidade = (linha) => linha[2]
const precoUnitario = (linha) => linha[3]
const unidade = (linha) => 'KG'

function atualizarAnunciosExistentes (anuncioProdutos, planilha, produtos) {
  const anuncioProdutosAtualizado = anuncioProdutos.map(ap => {
    const produto = produtos.find(p => p.idProduto === ap.idProduto)

    if (produto) {
      const vCodigoInterno = produto.codigoInterno
      const linha = planilha.find(linha => codigoInterno(linha) === vCodigoInterno)

      if (linha) {
        const vPrecoUnitario = precoUnitario(linha)
        const vQuantidade = quantidade(linha)

        return {
          ...ap,
          unidade: unidade(linha),
          quantidade: vQuantidade,
          preco: vPrecoUnitario,
          valor: (vQuantidade * vPrecoUnitario).toFixed(2)
        }
      }
    }

    return ap
  })

  return anuncioProdutosAtualizado
}

function getAnunciosProdutoFromPlanilha (anuncioProdutos, planilha, produtos) {
  const resultadoPlanilha = planilha.map(linha => {
    const produto = produtos.find(p => String(p.codigoInterno) === codigoInterno(linha))

    if (produto) {
      const itemAnuncioProduto = anuncioProdutos.find(ap => ap.idProduto.toUpperCase() === produto.idProduto.toUpperCase())

      if (!itemAnuncioProduto) {
        const vPrecoUnitario = precoUnitario(linha)
        const vQuantidade = quantidade(linha)
        const obj = {
          idProduto: produto.idProduto,
          produto: produto,
          unidade: unidade(linha),
          quantidade: vQuantidade,
          preco: vPrecoUnitario,
          valor: (vQuantidade * vPrecoUnitario).toFixed(2)
        }

        return obj
      }
    }

    return null
  }).filter(x => x !== null)

  return resultadoPlanilha
}

export default function importarNaturalDaTerra (anuncioProdutos, planilha, produtos) {
  if (isArrayEmpty(planilha)) {
    console.log('planilha vazia')
    return anuncioProdutos
  }

  console.log('Parsing da planilha')
  return [
    ...atualizarAnunciosExistentes(anuncioProdutos, planilha, produtos),
    ...getAnunciosProdutoFromPlanilha(anuncioProdutos, planilha, produtos)
  ]
}
