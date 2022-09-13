import React from 'react'
import { connect } from 'react-redux'

class Refresh extends React.Component {
  componentWillUnmount () {
    const { dispatch } = this.props
    dispatch({ type: 'RESETCONNECTION' })
  }

  render () {
    const { error, dispatch } = this.props
    if (error === 'ERRNOTEXIST') {
      return (
        <div className='container-success'>
          <div>
            <p>Não encontramos os dados que você tentou acessar.</p>
          </div>
        </div>
      )
    }
    if (error === 'ERRFORBIDDEN') {
      return (
        <div className='container-success'>
          <div>
            <h1>Sem permissão</h1>
            <p>Você não tem permissão para acessar esses dados.</p>
            <p>Caso isso seja um erro, contate o suporte técnico.</p>
          </div>
        </div>
      )
    }
    console.log('achou erro no refresh')
    return (
      <div className='container-success'>
        <div>
          <h1>O Servidor demorou muito a responder.</h1>
          <p>A demora em acessar o servidor poder ser algo momentâneio, por isso, tente novamente.</p>
          <p>Caso o erro persista, entre em contato com o suporte.</p>
          <button className='btn btn-primary saveadd-primary-color' onClick={() => dispatch({ type: 'RESETCONNECTION' })}>
              Tentar novamente
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({
  dispatch
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Refresh)
