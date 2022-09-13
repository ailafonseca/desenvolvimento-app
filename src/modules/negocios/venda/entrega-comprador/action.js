import { toastr } from 'react-redux-toastr'
import { push } from 'connected-react-router'
import { requestApi } from 'util/utils'
import CONSTS from 'modules/reducersConstants'
import {
  API_LOAD_PENDENTES,
  API_POST_ENTREGA
} from './urls'

/// TODO: Abstrair em utils
export const loadEntregasComprador = () => {
  return (dispatch) => {
    dispatch({
      type: CONSTS.VENDA.ENTREGA.COMPRADOR.LOAD.BEGIN
    })
    return requestApi(dispatch, API_LOAD_PENDENTES)
      .fetch()
      .then((result) => {
        if (result && result.data) {
          return dispatch({
            type: CONSTS.VENDA.ENTREGA.COMPRADOR.LOAD.SUCCESS,
            payload: result.data.itens
          })
        }
        return dispatch({
          type: CONSTS.VENDA.ENTREGA.COMPRADOR.LOAD.FAILURE
        })
      })
  }
}

/// TODO: Abstrair em utils
export const saveReserva = (obj) => {
  return (dispatch) => {
    dispatch({
      type: CONSTS.VENDA.ENTREGA.COMPRADOR.POST.BEGIN
    })
    return requestApi(dispatch, API_POST_ENTREGA, 'POST', obj)
      .fetch()
      .then((result) => {
        if (result.status !== undefined && result.status === 400) return dispatch({ type: CONSTS.VENDA.ENTREGA.COMPRADOR.POST.FAILURE })
        if (result.status >= 400) {
          toastr.error('Erro na atualização', 'Houve um erro ao efetuar a atualização')
          return dispatch({
            type: CONSTS.VENDA.ENTREGA.COMPRADOR.POST.FAILURE,
            payload: result.data.erros
          })
        }
        toastr.success('Gravação completa', 'A reserva foi salva')
        dispatch({
          type: CONSTS.VENDA.ENTREGA.COMPRADOR.POST.SUCCESS
        })
        return dispatch(push(`/venda/entrega-comprador/sucesso/${result.data.id}/editar`))
      })
  }
}
/*
export const redirectToEntregaDoDia = () => {
  return (dispatch) => {
    dispatch({
      type: CONSTS.VENDA.ENTREGA.DIA.BEGIN
    })
    requestApi(dispatch, API_DAILY_ID)
      .fetch()
      .then((result) => {
        if (result.data) return dispatch(push(`/venda/entrega-comprador/ver/${result.data}`))
        return dispatch({
          type: CONSTS.VENDA.ENTREGA.DIA.FAILURE
        })
      })
  }
} */
