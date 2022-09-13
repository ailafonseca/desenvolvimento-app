import React, { Component } from "react";

class NomeTecnicoProduto extends Component {
  render() {
    if (!this.props.nomeTecnico) return null;
    const style = { margin: 0, color: "gray", fontSize: `1.3em` };
    return <h2 style={style}>{this.props.nomeTecnico}</h2>;
  }
}

export default NomeTecnicoProduto;
