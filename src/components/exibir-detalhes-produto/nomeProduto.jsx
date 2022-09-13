import React, { Component } from 'react'

class NomeProduto extends Component {
  render () {
    if (!this.props.nomeProduto) return null
    const style = { margin: 0, marginBottom: 8, fontSize: `${2}em` }
    return <h1 style={style}>{this.props.nomeProduto}</h1>
  }
}

export default NomeProduto
