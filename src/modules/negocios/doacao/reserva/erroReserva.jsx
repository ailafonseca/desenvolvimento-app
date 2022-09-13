import React from 'react'
import HandleError from 'main/erro'
import { connect } from 'react-redux'

class erroReserva extends React.Component {
  render () {
    const { errorWithMessage } = this.props
    return (<>{errorWithMessage.map((messageError, index) => (<HandleError key={`erroReserva-${index}`} mensagem={messageError.mensagem} segmento='doacao' pagina='reserva' />))}</>
    )
  }
}

const mapStateToProps = (state) => ({
  errorWithMessage: state.doacaoReserva.errorWithMessage
})
const mapDispatchToProps = (dispatch) => ({
  dispatch
})
export default connect(mapStateToProps, mapDispatchToProps)(erroReserva)
