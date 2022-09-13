import React from 'react'
import { connect } from 'react-redux'

const redirectToEntregaDoDia = () => null

class VendaRecorrenteEntregaComprador extends React.Component {
  componentDidMount () {
    const { dispatch, redirectToEntregaDoDia } = this.props
    dispatch(redirectToEntregaDoDia())
    console.log('componentDidMount')
  }

  render () {
    const { diaFailure, dispatch, redirectToEntregaDoDia } = this.props

    if (diaFailure) {
      return (
        <div className='container-success'>
          <div className='row justify-content-center'>
            <div className='col-auto'>
              <h1 className='mt-4 mb-4 text-center'>Entrega não localizada.</h1>
              <p className='text-center'>Pode não ter sido cadastrado um anuncio para esse dia ainda.</p>
              <p className='text-center'>Verifique novamente mais tarde.</p>
              <center>
                <button className='btn btn-primary saveadd-primary-color' onClick={() => dispatch(redirectToEntregaDoDia())}>
                  Tentar novamente agora
                </button>
              </center>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className='container-success'>
        <div className='row justify-content-center'>
          <div className='col-auto'>
            <h1 className='mt-4 mb-4'>Localizando entrega...</h1>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  diaFailure: state.vendaReserva.diaFailure
})
const mapDispatchToProps = (dispatch) => ({ redirectToEntregaDoDia, dispatch })
export default connect(mapStateToProps, mapDispatchToProps)(VendaRecorrenteEntregaComprador)
