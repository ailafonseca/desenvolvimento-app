import React from 'react'
import HandleError from 'main/erro'
import { connect } from 'react-redux'

class erroAnuncio extends React.Component {
  render () {
    const { errors } = this.props
    return (<>{errors.map((messageError, index) => (<HandleError key={`errors-${index}`} mensagem={messageError.mensagem} segmento='venda' pagina='anuncio' />))}</>
    )
  }
}

const mapStateToProps = (state) => ({
  errors: state.vendaAnuncio.errors
})
const mapDispatchToProps = (dispatch) => ({
  dispatch
})
export default connect(mapStateToProps, mapDispatchToProps)(erroAnuncio)
