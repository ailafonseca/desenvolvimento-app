import React from 'react'
import { connect } from 'react-redux'

import { redirectToReservaDoDia } from './action'

class VendaRecorrenteReservaNovo extends React.Component {
  componentDidMount () {
    const { dispatch, redirectToReservaDoDia } = this.props
    dispatch(redirectToReservaDoDia())
  }

  render () {
    const { diaFailure, dispatch, redirectToReservaDoDia } = this.props

    if (diaFailure) {
      return (
        <div className='container-success'>
          <div className='row justify-content-center'>
            <div className='col-auto'>
              <h1 className='mt-4 mb-4 text-center'>Reserva não localizada.</h1>
              <p className='text-center'>Pode não ter sido cadastrado um anuncio para esse dia ainda.</p>
              <p className='text-center'>Verifique novamente mais tarde.</p>
              <center>
                <button className='btn btn-primary saveadd-primary-color' onClick={() => dispatch(redirectToReservaDoDia())}>
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
            <h1 className='mt-4 mb-4'>Localizando reserva...</h1>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  diaFailure: state.vendaVitrine.diaFailure,
})
const mapDispatchToProps = (dispatch) => ({ redirectToReservaDoDia, dispatch })
export default connect(mapStateToProps, mapDispatchToProps)(VendaRecorrenteReservaNovo)
