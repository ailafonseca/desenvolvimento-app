import _ from 'lodash'
import { isArrayEmpty, isArrayNotEmpty, isObjectReady } from 'util/utils'

export const getProdutosFiltrados = (produtos, categorias, categoria, subCategoria) => {
  let lista = produtos

  if (subCategoria && subCategoria.value > 0 && categoria) {
    lista = produtos.filter(produto => produto.categoria === subCategoria.value || produto.categoria === categoria.value)
  } else if (categoria && categoria.value > 0) {
    const categoriaSelecionada = categorias.find(x => x.idCategoria === categoria.value)

    if (categoriaSelecionada && isArrayNotEmpty(categoriaSelecionada.filhos)) {
      lista = produtos.filter(produto => produto.categoria === categoria.value || categoriaSelecionada.filhos.some(x => x.idCategoria === produto.categoria))
    } else {
      lista = produtos.filter(produto => produto.categoria === categoria.value)
    }
  }

  return lista
}

export const orderBy = (produtos) => _.orderBy(produtos, ['nomeProduto', 'produto.nomeProduto'], ['asc', 'asc'])

export const opcoesUnidadeProduto = () => ['CX', 'KG', 'UN', 'SACO']

export const opcoesUnidadeProdutoSelect = () => opcoesUnidadeProduto().map(item => ({ value: item, label: item }))

export const produtosToSelect = (produtos) => produtos.map(p => ({ value: p.idProduto, label: p.nomeProduto }))

export const preencherObjComProdutoInterno = (produtos) => {
  if (isArrayEmpty(produtos)) {
    return []
  }

  const produtosFiltrados = produtos.filter(p => isObjectReady(p.produto) && p.produto.nomeProduto)
  console.log('produtosFiltrados', produtosFiltrados)
  if (isArrayNotEmpty(produtosFiltrados)) {
    produtosFiltrados.forEach(element => {
      element.nomeProduto = element.produto.nomeProduto
    })
  }

  return produtos
}
