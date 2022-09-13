import { push } from 'connected-react-router'
import { requestApi } from 'util/utils'
import { API_LOAD_BYID, API_DAILY_ID } from './urls'
import ACTIONS from 'modules/reducersConstants'
import { URL_VR_RESERVA_CANCEL, URL_VENDA_RESERVA_LIST, URL_VENDA_RESERVA_CLIENTE_BASE, URL_VENDA_ANUNCIO_BASE, URL_FILE_SAVE, URL_EDIT_RESERVA } from 'modules/urlsConstants'
import TYPES from './actionTypes'
import { toastr } from 'react-redux-toastr'

export const loadVitrine = () => {
  return (dispatch) => {
    dispatch({
      type: TYPES.RESERVA.LOAD.ALL.BEGIN,
    })
    requestApi(dispatch, URL_VENDA_RESERVA_LIST)
      .fetch()
      .then((result) => {
        if (result.data) {
          return dispatch({
            type: TYPES.RESERVA.LOAD.ALL.SUCCESS,
            payload: result.data.itens,
          })
        }
        return dispatch({
          type: TYPES.RESERVA.LOAD.ALL.FAILURE,
        })
      })
  }
}

export const loadReservaById = (idReservaInteracao) => {
  return () => {
    return requestApi(null, API_LOAD_BYID(idReservaInteracao))
      .fetch()
      .then((result) => {
        if (result && result.data) {
          return {
            type: 'success',
            payload: result.data,
          }
        }
      })
  }
}
export const editReserva = (obj) => {
  const statusError = [400, 404, 500, 503]

  return (dispatch) => {
    dispatch({
      type: ACTIONS.VENDA.RESERVA.EDIT.SUCCESS,
    })
    return requestApi(dispatch, URL_EDIT_RESERVA(obj.id), 'PATCH', obj)
      .fetch()
      .then((result) => {
        console.warn(result)
        if (statusError.includes(result.status) || result.status === 400) {
          console.log('erro', result)
          return dispatch({ type: ACTIONS.VENDA.RESERVA.EDIT.FAILURE, payload: result.data })
        }
        if (result && result.data) {
          if (result.data.Erros) {
            toastr.error('Erro na atualização', 'Houve um erro ao efetuar a atualização')
            return dispatch({
              type: ACTIONS.VENDA.RESERVA.EDIT.FAILURE,
              payload: result.data.Erros,
            })
          }
          toastr.success('Gravação completa', 'A reserva foi editada')
          dispatch({
            type: ACTIONS.VENDA.RESERVA.EDIT.SUCCESS,
          })
          return dispatch(push(`/doacao/reserva/sucesso/${result.data.id}/editar`))
        }
      })
  }
}

export const loadDetalhes = (idAnuncio) => {
  return (dispatch) => {
    dispatch({
      type: TYPES.RESERVA.LOAD.DETAILS.BEGIN,
    })
    requestApi(dispatch, `${URL_VENDA_ANUNCIO_BASE}/${idAnuncio}`)
      .fetch()
      .then((result) => {
        if (result.status === 200) {
          return dispatch({
            type: TYPES.RESERVA.LOAD.DETAILS.SUCCESS,
            payload: result.data,
          })
        } else if (result.status === 204 || result.status === 404) {
          return false
        }
        return dispatch({
          type: TYPES.RESERVA.LOAD.DETAILS.FAILURE,
        })
      })
  }
}
// TODO: Ao invés de dar mensagem de erro, não dá nada e salva no servidor mesmo assim!!!
export const saveReserva = (obj) => {
  const statusError = [400, 404, 500, 503]

  return (dispatch) => {
    dispatch({
      type: TYPES.RESERVA.SAVE.RESERVA.BEGIN,
    })
    return requestApi(dispatch, URL_VENDA_RESERVA_CLIENTE_BASE, 'POST', obj)
      .fetch()
      .then((result) => {
        if (statusError.includes(result.status) || result.status === 400) {
          return dispatch({
            type: TYPES.RESERVA.SAVE.RESERVA.FAILURE,
            payload: result.data ? result.data : [['Erro ao gravar reserva', 'Erro não identificado']],
          })
        } else if (result && result.data) {
          return dispatch({
            type: TYPES.RESERVA.SAVE.RESERVA.SUCCESS,
            payload: result.data,
          })
        }
      })
  }
}

export const saveFile = (obj) => {
  return (dispatch) => {
    dispatch({
      type: TYPES.RESERVA.SAVE.COMPROVANTE.BEGIN,
    })
    console.log('sending imagem to s3')
    return requestApi(dispatch, URL_FILE_SAVE, 'POST', obj)
      .fetch()
      .then((result) => {
        console.log('result', result)
        if (result && result.status === 200) {
          return dispatch({
            type: TYPES.RESERVA.SAVE.COMPROVANTE.SUCCESS,
            payload: result.data,
          })
        }

        if (result && result.data) {
          if (result.data.Erros) {
            return dispatch({
              type: TYPES.RESERVA.SAVE.COMPROVANTE.FAILURE,
              payload: result.data.Erros,
            })
          }

          return dispatch({
            type: TYPES.RESERVA.SAVE.COMPROVANTE.SUCCESS,
            payload: result.data,
          })
        }
      })
  }
}

export const iWontCollect = (obj) => {
  return (dispatch) => {
    dispatch({
      type: TYPES.RESERVA.DESISTIU.BEGIN,
    })
    return requestApi(dispatch, URL_VR_RESERVA_CANCEL, 'POST')
      .fetch()
      .then((result) => {
        if (result && result.data) {
          return dispatch({
            type: TYPES.RESERVA.DESISTIU.SUCCESS,
          })
        }
        return dispatch({
          type: TYPES.RESERVA.DESISTIU.FAILURE,
        })
      })
  }
}

export const redirectToReservaDoDia = () => {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.VENDA.RESERVA.DIA.BEGIN,
    })
    requestApi(dispatch, API_DAILY_ID)
      .fetch()
      .then((result) => {
        if (result.data) {
          return dispatch(push(`/contrato/anuncio/reserva/editar/${result.data}`))
        }
        return dispatch({
          type: ACTIONS.VENDA.RESERVA.DIA.FAILURE,
        })
      })
  }
}

export const verifyMyOwnReservas = () => {
  return (dispatch) => {
    dispatch({
      type: 'VENDA_LOAD_RESERVAS_CLIENTE_BEGIN',
    })
    requestApi(dispatch, URL_VENDA_RESERVA_CLIENTE_BASE)
      .fetch()
      .then((result) => {
        if (result.status === 200 && result.data !== undefined) {
          return dispatch({
            type: 'VENDA_LOAD_RESERVAS_CLIENTE_END',
            payload: result.data,
          })
        }
        return dispatch({
          type: 'VENDA_LOAD_RESERVAS_CLIENTE_FAIL',
        })
      })
  }
}

export const clearError = () => (dispatch) => dispatch({ type: TYPES.RESERVA.CLEARERROR })
