import React, { Component } from 'react'

class preco extends Component {
  render () {
    if (!this.props.preco) return null
    const style = { margin: 0, marginTop: 10, color: 'green' }
    return <h2 style={style}>R$ {this.props.preco}</h2>
  }
}

export default preco
