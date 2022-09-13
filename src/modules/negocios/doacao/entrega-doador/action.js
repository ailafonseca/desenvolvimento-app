import { push } from 'connected-react-router'
import { isNullOrEmpty, requestApi } from 'util/utils'
import {
  API_LOAD_PENDENTES,
  API_POST_ENTREGA
} from './urls'
import ACTIONS from './actionTypes'

/// TODO: Abstrair em utils
export const loadEntregasDoador = () => {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.ENTREGA.DOADOR.LOAD.ALL.BEGIN
    })
    return requestApi(dispatch, API_LOAD_PENDENTES)
      .fetch()
      .then((result) => {
        if (result && result.data) {
          return dispatch({
            type: ACTIONS.ENTREGA.DOADOR.LOAD.ALL.SUCCESS,
            payload: result.data.itens
          })
        }
        return dispatch({
          type: ACTIONS.ENTREGA.DOADOR.LOAD.ALL.FAILURE
        })
      })
  }
}

/// TODO: Abstrair em utils
export const saveReserva = (obj) => {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.ENTREGA.DOADOR.POST.BEGIN
    })
    return requestApi(dispatch, API_POST_ENTREGA, 'POST', obj)
      .fetch()
      .then((result) => {
        if (result.status !== undefined && result.status === 400 && isNullOrEmpty(result.data)) {
          return dispatch({ type: ACTIONS.ENTREGA.DOADOR.POST.FAILURE })
        }
        if (result.status >= 400) {
          return dispatch({
            type: ACTIONS.ENTREGA.DOADOR.POST.FAILURE,
            payload: result.data
          })
        }
        dispatch({
          type: ACTIONS.ENTREGA.DOADOR.POST.SUCCESS
        })
        return dispatch(push(`/doacao/entrega-doador/sucesso/${result.data.id}/editar`))
      })
  }
}

export const clearError = () => (dispatch) => dispatch({ type: ACTIONS.ENTREGA.DOADOR.CLEARERROR })
