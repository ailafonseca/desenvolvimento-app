const defineIndexOfObject = (rowOfTitles) => {
  const codigoVariantes = ['Código do Produto', 'Código', 'CodProduto', 'CódigoProduto', 'Codigo']
  const nomeVariantes = ['Nome do Produto', 'Nome', 'Produto']
  const descricaoVariantes = ['Descrição do Produto', 'Descrição', 'DescProduto', 'Desc Produto', 'Desc', 'Descricao']
  const fabricanteVariantes = ['Fabricante', 'fabricante']
  const marcaVariantes = ['Marca', 'marca']
  const nometecnicoVariantes = ['Nome Técnico', 'Técnico', 'nome tecnico', 'Nome tecnico', 'nome técnico']
  const aplicacaoVariantes = ['Aplicação', 'aplicação', 'aplicacao', 'Aplicacao']
  const precoVariantes = ['Preço', 'Preço Base', 'preco', 'preço base', 'preco base']
  const imagemVariantes = ['URL', 'URL Imagem', 'Imagem', 'Url', 'url']

  let i = 0

  const produto = {
    status: {
      idStatus: null,
      textStatus: null
    },
    detalhes: {
      categoria: null,
      codigoInterno: null,
      idProduto: null,
      nomeProduto: null,
      descricaoProduto: null,
      marca: null,
      nomeTecnico: null,
      precobase: null,
      pesoBruto: null
    },
    adicionais: {
      fabricante: null,
      aplicacao: null,
      imagem: null
    }
  }

  // Codigo
  while (produto.codigo === null && i < codigoVariantes.length) {
    if (rowOfTitles.indexOf(codigoVariantes[i]) >= 0) {
      produto.codigo = rowOfTitles.indexOf(codigoVariantes[i])
      i = 0
    } else i++
  }

  // Nome
  while (produto.nome === null && i < nomeVariantes.length) {
    if (rowOfTitles.indexOf(nomeVariantes[i]) >= 0) {
      produto.nome = rowOfTitles.indexOf(nomeVariantes[i])
      i = 0
    } else i++
  }

  // Descricao
  while (produto.descricao === null && i < descricaoVariantes.length) {
    if (rowOfTitles.indexOf(descricaoVariantes[i]) >= 0) {
      produto.descricao = rowOfTitles.indexOf(descricaoVariantes[i])
      i = 0
    } else i++
  }

  // Fabricante
  while (produto.fabricante === null && i < fabricanteVariantes.length) {
    if (rowOfTitles.indexOf(fabricanteVariantes[i]) >= 0) {
      produto.fabricante = rowOfTitles.indexOf(fabricanteVariantes[i])
      i = 0
    } else i++
  }

  // Marca
  while (produto.marca === null && i < marcaVariantes.length) {
    if (rowOfTitles.indexOf(marcaVariantes[i]) >= 0) {
      produto.marca = rowOfTitles.indexOf(marcaVariantes[i])
      i = 0
    } else i++
  }

  // Nome Tecnico
  while (produto.nometecnico === null && i < nometecnicoVariantes.length) {
    if (rowOfTitles.indexOf(nometecnicoVariantes[i]) >= 0) {
      produto.nometecnico = rowOfTitles.indexOf(nometecnicoVariantes[i])
      i = 0
    } else i++
  }

  // Aplicacao
  while (produto.aplicacao === null && i < aplicacaoVariantes.length) {
    if (rowOfTitles.indexOf(aplicacaoVariantes[i]) >= 0) {
      produto.aplicacao = rowOfTitles.indexOf(aplicacaoVariantes[i])
      i = 0
    } else i++
  }

  // Preco
  while (produto.precobase === null && i < precoVariantes.length) {
    if (rowOfTitles.indexOf(precoVariantes[i]) >= 0) {
      produto.precobase = rowOfTitles.indexOf(precoVariantes[i])
      i = 0
    } else i++
  }

  // Imagem
  while (produto.imagem === null && i < imagemVariantes.length) {
    if (rowOfTitles.indexOf(imagemVariantes[i]) >= 0) {
      produto.imagem = rowOfTitles.indexOf(imagemVariantes[i])
      i = 0
    } else i++
  }

  return produto
};

export default defineIndexOfObject
