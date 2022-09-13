const sendProductRequest = (index) => {
  let produtoEnviado = {
    codigoInterno: this.state.produtos[index][this.state.detailsIndex.codigo + 1] || null,
    nomeProduto: this.state.produtos[index][this.state.detailsIndex.nome + 1 || null],
    descricaoProduto: this.state.produtos[index][this.state.detailsIndex.descricao + 1 || null],
    marca: this.state.produtos[index][this.state.detailsIndex.marca + 1 || null],
    nomeTecnico: this.state.produtos[index][this.state.detailsIndex.nometecnico + 1 || null],
    aplicacao: this.state.produtos[index][this.state.detailsIndex.aplicacao + 1 || null],
    precobase: this.state.produtos[index][this.state.detailsIndex.precobase + 1 || null],
  };
  return produtoEnviado;
};
export default sendProductRequest;
