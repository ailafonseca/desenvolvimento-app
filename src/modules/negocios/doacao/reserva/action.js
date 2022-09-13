import { toastr } from 'react-redux-toastr'
import { push } from 'connected-react-router'
import { requestApi } from 'util/utils'
import URLs from './urls'
import ACTIONS from './actionTypes'

export const loadReservas = () => {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.RESERVA.LOAD.ALL.BEGIN,
    })
    requestApi(dispatch, URLs.API.LOAD.ALL())
      .fetch()
      .then((result) => {
        if (result.data) {
          return dispatch({
            type: ACTIONS.RESERVA.LOAD.ALL.SUCCESS,
            payload: result.data.itens,
          })
        }
        return dispatch({
          type: ACTIONS.RESERVA.LOAD.ALL.FAILURE,
        })
      })
  }
}

export const loadReservaById = (idReservaInteracao) => {
  return (dispatch) => {
    return requestApi(dispatch, URLs.API.LOAD.BYID(idReservaInteracao))
      .fetch()
      .then((result) => {
        if (result && result.data) {
          return {
            type: ACTIONS.RESERVA.LOAD.BYID.SUCCESS,
            payload: result.data,
          }
        } else {
          return {
            type: ACTIONS.RESERVA.LOAD.BYID.FAILURE,
          }
        }
      })
  }
}

export const saveReserva = (obj) => {
  const statusError = [400, 404, 500, 503]

  return (dispatch) => {
    dispatch({
      type: ACTIONS.RESERVA.ADD.SUCCESS,
    })
    return requestApi(dispatch, URLs.API.POST(), 'POST', obj)
      .fetch()
      .then((result) => {
        console.warn(result)
        if (statusError.includes(result.status) || result.status === 400) {
          console.log('erro', result)
          return dispatch({ type: ACTIONS.RESERVA.ADD.FAILURE, payload: result.data })
        }
        if (result && result.data) {
          if (result.data.Erros) {
            toastr.error('Erro na atualização', 'Houve um erro ao efetuar a atualização')
            return dispatch({
              type: ACTIONS.RESERVA.ADD.FAILURE,
              payload: result.data.Erros,
            })
          }
          toastr.success('Gravação completa', 'A reserva foi salva')
          dispatch({
            type: ACTIONS.RESERVA.ADD.SUCCESS,
          })
          return dispatch(push(`/doacao/reserva/sucesso/${result.data.id}/editar`))
        }
      })
  }
}
export const editReserva = (obj) => {
  const statusError = [400, 404, 500, 503]

  return (dispatch) => {
    dispatch({
      type: ACTIONS.RESERVA.EDIT.SUCCESS,
    })
    return requestApi(dispatch, URLs.API.PUT(obj.id), 'PUT', obj)
      .fetch()
      .then((result) => {
        console.warn(result)
        if (statusError.includes(result.status) || result.status === 400) {
          console.log('erro', result)
          return dispatch({ type: ACTIONS.RESERVA.EDIT.FAILURE, payload: result.data })
        }
        if (result && result.data) {
          if (result.data.Erros) {
            toastr.error('Erro na atualização', 'Houve um erro ao efetuar a atualização')
            return dispatch({
              type: ACTIONS.RESERVA.EDIT.FAILURE,
              payload: result.data.Erros,
            })
          }
          toastr.success('Gravação completa', 'A reserva foi editada')
          dispatch({
            type: ACTIONS.RESERVA.EDIT.SUCCESS,
          })
          return dispatch(push(`/doacao/reserva/sucesso/${result.data.id}/editar`))
        }
      })
  }
}

export const iWontCollect = (obj) => {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.RESERVA.SEMRESERVA,
    })
    return requestApi(dispatch, URLs.API.SEMRESERVA(), 'POST')
      .fetch()
      .then((result) => {
        if (result && result.data) {
          return toastr.success('Dados salvos com sucesso!', 'A reserva foi salva')
        }
        return toastr.error('Erro na atualização', 'Houve um erro ao efetuar a atualização')
      })
  }
}

export const redirectToReservaDoDia = () => {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.RESERVA.DIA.BEGIN,
    })
    requestApi(dispatch, URLs.API.DAILY())
      .fetch()
      .then((result) => {
        if (result.data) {
          return dispatch(push(`/contrato/anuncio/reserva/editar/${result.data}`))
        }
        return dispatch({
          type: ACTIONS.RESERVA.DIA.FAILURE,
        })
      })
  }
}

export const verifyMyOwnReservas = () => {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.RESERVA.CLIENTE.BEGIN,
    })
    requestApi(dispatch, URLs.API.CLIENTE())
      .fetch()
      .then((result) => {
        if (result.status === 200 && result.data !== undefined) {
          return dispatch({
            type: ACTIONS.RESERVA.CLIENTE.SUCCESS,
            payload: result.data,
          })
        }
        return dispatch({
          type: ACTIONS.RESERVA.CLIENTE.FAILURE,
        })
      })
  }
}
