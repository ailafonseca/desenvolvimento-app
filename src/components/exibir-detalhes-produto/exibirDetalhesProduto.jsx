import React, { Component } from "react";
import DetalhesProdutoImagem from "./detalhesProdutoImagem";

import Especificacoes from "./especificacoes";
import NomeProduto from "./nomeProduto";
import NomeTecnicoProduto from "./nomeTecnicoProduto";
import preco from "./preco";

// Este componente deve OBRIGATORIAMENTE receber um objeto dentro de uma propriedade chamada produto
// Exemplo de uso
// <ExibirDetalhesProduto produto={objetoProduto} />

class ExibirDetalhesProduto extends Component {
  render() {
    return (
      <div className="container">
        <DetalhesProdutoImagem img={!this.props.produto ? null : this.props.produto.imagens[0].idImagem} />
        <NomeProduto nomeProduto={!this.props.produto ? null : this.props.produto.nomeProduto} />
        <NomeTecnicoProduto nomeTecnico={!this.props.produto ? null : this.props.produto.nomeTecnico} />
        <preco preco={!this.props.produto ? null : this.props.produto.precoBase} />
        <br />
        <h4>Detalhes</h4>
        <Especificacoes titulo="Marca" descricao={!this.props.produto ? null : this.props.produto.marca} />
        <Especificacoes titulo="Fabricante" descricao={!this.props.produto ? null : this.props.produto.marca} />
        <Especificacoes titulo="Aplicação" descricao={!this.props.produto ? null : this.props.produto.aplicacao} />
        <Especificacoes titulo="Descrição" descricao={!this.props.produto ? null : this.props.produto.descricaoProduto} />
      </div>
    );
  }
}

export default ExibirDetalhesProduto;
