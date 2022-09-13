import React, { Component } from "react";

class DetalhesProdutoImagem extends Component {
  render() {
    const imageStyle = {
      marginBottom: 15,
      padding: !this.props.img ? 20 : 0,
      minHeight: !this.props.img ? 200 : 0,
      minWidth: !this.props.img ? `${100}%` : 0,
      width: `${100}%`,
      backgroundColor: "grey",
      borderRadius: 6,
      boxShadow: `${5}px ${5}px ${5}px grey`,
      color: "white"
    };
    if(!this.props.img) return <div style={imageStyle}>Imagem não disponível</div>
    return <img style={imageStyle} src={this.props.img} alt="" />;
  }
}

export default DetalhesProdutoImagem;
