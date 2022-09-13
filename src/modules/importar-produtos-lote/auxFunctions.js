import { isNullOrEmpty } from 'util/utils'
import status from './statusConstants'

export const createProductsObjects = (rows) => {
  const codigoVariantes = ['Código do Produto', 'Código', 'CÓDIGO', 'CodProduto', 'CódigoProduto', 'Codigo']
  const nomeVariantes = ['Nome do Produto', 'Nome', 'Produto']
  const descricaoVariantes = ['Descrição do Produto', 'Descrição', 'DescProduto', 'Desc Produto', 'Desc', 'Descricao', 'Nome descritivo']
  const marcaVariantes = ['Marca', 'marca', 'Fabricante', 'fabricante']
  const nometecnicoVariantes = ['Nome Técnico', 'Técnico', 'nome tecnico', 'Nome tecnico', 'nome técnico']
  const aplicacaoVariantes = ['Aplicação', 'aplicação', 'aplicacao', 'Aplicacao']
  const precoVariantes = ['Preço', 'Preço Base', 'preco', 'preço base', 'preco base']

  const produtosIndex = {
    codigoInterno: null,
    nomeProduto: null,
    descricaoProduto: null,
    aplicacao: null,
    nomeTecnico: null,
    marca: null,
    precoBase: null,
    categoria: null
  }

  let produtos = []

  const linhaInicial = 0
  let i = 0
  while (produtosIndex.codigoInterno === null && i < codigoVariantes.length) {
    if (rows[linhaInicial].indexOf(codigoVariantes[i]) >= 0) {
      produtosIndex.codigoInterno = rows[linhaInicial].indexOf(codigoVariantes[i])
      i = 0
    } else i++
  }
  i = 0

  while (produtosIndex.nomeProduto === null && i < nomeVariantes.length) {
    if (rows[linhaInicial].indexOf(nomeVariantes[i]) >= 0) {
      produtosIndex.nomeProduto = rows[linhaInicial].indexOf(nomeVariantes[i])
      i = 0
    } else i++
  }
  i = 0

  while (produtosIndex.marca === null && i < marcaVariantes.length) {
    if (rows[linhaInicial].indexOf(marcaVariantes[i]) >= 0) {
      produtosIndex.marca = rows[linhaInicial].indexOf(marcaVariantes[i])
      i = 0
    } else i++
  }
  i = 0

  while (produtosIndex.descricaoProduto === null && i < descricaoVariantes.length) {
    if (rows[linhaInicial].indexOf(descricaoVariantes[i]) >= 0) {
      produtosIndex.descricaoProduto = rows[linhaInicial].indexOf(descricaoVariantes[i])
      i = 0
    } else i++
  }
  i = 0

  while (produtosIndex.nomeTecnico === null && i < nometecnicoVariantes.length) {
    if (rows[linhaInicial].indexOf(nometecnicoVariantes[i]) >= 0) {
      produtosIndex.nomeTecnico = rows[linhaInicial].indexOf(nometecnicoVariantes[i])
      i = 0
    } else i++
  }
  i = 0

  while (produtosIndex.aplicacao === null && i < aplicacaoVariantes.length) {
    if (rows[linhaInicial].indexOf(aplicacaoVariantes[i]) >= 0) {
      produtosIndex.aplicacao = rows[linhaInicial].indexOf(aplicacaoVariantes[i])
      i = 0
    } else i++
  }
  i = 0

  while (produtosIndex.precoBase === null && i < precoVariantes.length) {
    if (rows[linhaInicial].indexOf(precoVariantes[i]) >= 0) {
      produtosIndex.precoBase = rows[linhaInicial].indexOf(precoVariantes[i])
      i = 0
    } else i++
  }
  i = 0

  rows.map((row) => {
    const novoProduto = {
      detalhes: {
        codigoInterno: row[produtosIndex.codigoInterno] || null,
        nomeProduto: row[produtosIndex.nomeProduto] || null,
        descricaoProduto: row[produtosIndex.descricaoProduto] || null,
        aplicacao: row[produtosIndex.aplicacao] || null,
        nomeTecnico: row[produtosIndex.nomeTecnico] || null,
        marca: row[produtosIndex.marca] || null,
        precoBase: row[produtosIndex.precoBase] || null
      }
    }
    return (produtos = [...produtos, novoProduto])
  })
  return produtos
}

export const createProductsObjectsAnuncio = (rows) => {
  const idVariantes = ['Id do Produto', 'id', 'ID', 'id produto', 'id do produto']
  const nomeVariantes = ['Nome do Produto', 'Nome', 'Produto', 'nome']
  const unidadeVariantes = ['Unidade', 'unidade', 'Und', 'und']
  const quantidadeVariantes = ['Quantidade', 'quantidade', 'Qtd', 'qtd']
  const precoVariantes = ['Preço', 'preço', 'preco', 'Preco', 'preço unitário', 'preco unitario', 'Preço Unitário', 'Preco Unitario']

  const produtosIndex = {
    prodNewId: null,
    prodNewName: null,
    prodNewUnd: null,
    totalQtde: null,
    prodNewPrice: null
  }

  let produtos = []

  const linhaInicial = 0
  let i = 0
  while (produtosIndex.prodNewId === null && i < idVariantes.length) {
    if (rows[linhaInicial].indexOf(idVariantes[i]) >= 0) {
      produtosIndex.prodNewId = rows[linhaInicial].indexOf(idVariantes[i])
      i = 0
    } else i++
  }

  i = 0
  while (produtosIndex.prodNewName === null && i < nomeVariantes.length) {
    if (rows[linhaInicial].indexOf(nomeVariantes[i]) >= 0) {
      produtosIndex.prodNewName = rows[linhaInicial].indexOf(nomeVariantes[i])
      i = 0
    } else i++
  }

  i = 0
  while (produtosIndex.prodNewUnd === null && i < unidadeVariantes.length) {
    if (rows[linhaInicial].indexOf(unidadeVariantes[i]) >= 0) {
      produtosIndex.prodNewUnd = rows[linhaInicial].indexOf(unidadeVariantes[i])
      i = 0
    } else i++
  }

  i = 0
  while (produtosIndex.totalQtde === null && i < quantidadeVariantes.length) {
    if (rows[linhaInicial].indexOf(quantidadeVariantes[i]) >= 0) {
      produtosIndex.totalQtde = rows[linhaInicial].indexOf(quantidadeVariantes[i])
      i = 0
    } else i++
  }

  i = 0
  while (produtosIndex.prodNewPrice === null && i < precoVariantes.length) {
    if (rows[linhaInicial].indexOf(precoVariantes[i]) >= 0) {
      produtosIndex.prodNewPrice = rows[linhaInicial].indexOf(precoVariantes[i])
      i = 0
    } else i++
  }

  i = 0
  produtos = rows.filter((row) => {
    const novoProduto = {
      prodNewId: row[produtosIndex.prodNewId] || null,
      prodNewName: row[produtosIndex.prodNewName] || null,
      prodNewUnd: row[produtosIndex.prodNewUnd] || null,
      totalQtde: row[produtosIndex.totalQtde] || null,
      prodNewPrice: row[produtosIndex.prodNewPrice] || isNullOrEmpty,
      notRegistered: true
    }
    return (produtos = [...produtos, novoProduto])
  })
  return produtos
}

export const addStatusAndOptions = (produtos) => {
  let novosProdutos = []
  let i = 0

  produtos.map((produto, index) => {
    if (index === 0) {
      const novo = {
        ...produto,
        controle: {
          descricaoStatus: 'Status',
          paraEnvio: false,
          idInterno: `produto-${i}`
        }
      }
      i++
      return (novosProdutos = [...novosProdutos, novo])
    }
    const novo = {
      ...produto,
      controle: {
        descricaoStatus: status.naoEnviado,
        paraEnvio: true,
        idInterno: `produto-${i}`
      }
    }
    i++
    return (novosProdutos = [...novosProdutos, novo])
  })
  return novosProdutos
}
