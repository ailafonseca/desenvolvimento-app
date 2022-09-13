import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default class HandleError extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      mensagem: props.mensagem,
      segmento: props.segmento,
      pagina: props.pagina,
      id: props.id
    }
  }

  displayMensagem () {
    const mensagem = this.state.mensagem

    return (
      <div>
        <h1 className='text-center d-block'>Houve um erro! </h1>
        <h1 className='text-center d-block'>{mensagem}</h1>
      </div>
    )
  }

  displayEditar () {
    const segmento = this.state.segmento
    const pagina = this.state.pagina
    const id = this.props.id

    return (
      <Link className='text-center d-block' to={`/${segmento}/${pagina}/editar/${id}`}>
        Editar {pagina.indexOf('/') > -1 ? pagina.split('/')[1] : pagina}
      </Link>
    )
  }

  displayVoltarLista () {
    const segmento = this.state.segmento
    const pagina = this.state.pagina

    return (
      <Link className='text-center d-block' to={`/${segmento}/${pagina}/listar`}>
        Voltar para lista de {pagina.indexOf('/') > -1 ? pagina.split('/')[1] : pagina}
      </Link>
    )
  }

  render () {
    const mensagem = this.state.mensagem
    const segmento = this.state.segmento
    const pagina = this.state.pagina
    const id = this.props.id

    return (
      <div>
        <div className='container-success'>
          {mensagem && this.displayMensagem()}
          {segmento && pagina && id && this.displayEditar()}
          {segmento && pagina && this.displayVoltarLista()}
        </div>
      </div>
    )
  }
}

HandleError.propTypes = {
  mensagem: PropTypes.string.isRequired,
  segmento: PropTypes.string.isRequired,
  pagina: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
}
