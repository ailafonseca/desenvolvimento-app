import React, { Component } from 'react';

class Especificacoes extends Component {
  render() {
    if (!this.props.titulo || !this.props.descricao) return null;
    const style = {
      color: "dimgrey",
      fontSize: `${1.2}em` 
    }
    return (
      <div>
        <span style={style}>
          <strong>{this.props.titulo}:</strong> {this.props.descricao}
        </span>
        <br />
      </div>
    );
  }
}

export default Especificacoes