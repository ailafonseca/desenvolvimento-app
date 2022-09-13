import { toastr } from 'react-redux-toastr'
import { push } from 'connected-react-router'
import { requestApi } from 'util/utils'
import CONSTS from 'modules/reducersConstants'
import {
  API_LOAD_PENDENTES,
  API_POST_ENTREGA
} from './urls'

/// TODO: Abstrair em utils
export const loadEntregasAnunciante = () => {
  return (dispatch) => {
    dispatch({
      type: CONSTS.VENDA.ENTREGA.ANUNCIANTE.LOAD.BEGIN
    })
    return requestApi(dispatch, API_LOAD_PENDENTES)
      .fetch()
      .then((result) => {
        if (result && result.data) {
          return dispatch({
            type: CONSTS.VENDA.ENTREGA.ANUNCIANTE.LOAD.SUCCESS,
            payload: result.data.itens
          })
        }
        return dispatch({
          type: CONSTS.VENDA.ENTREGA.ANUNCIANTE.LOAD.FAILURE
        })
      })
  }
}

/// TODO: Abstrair em utils
export const saveReserva = (obj) => {
  return (dispatch) => {
    dispatch({
      type: CONSTS.VENDA.ENTREGA.ANUNCIANTE.POST.BEGIN
    })
    return requestApi(dispatch, API_POST_ENTREGA, 'POST', obj)
      .fetch()
      .then((result) => {
        if (result.status !== undefined && result.status === 400) return dispatch({ type: CONSTS.VENDA.ENTREGA.ANUNCIANTE.POST.FAILURE })
        if (result.status >= 400) {
          toastr.error('Erro na atualização', 'Houve um erro ao efetuar a atualização')
          return dispatch({
            type: CONSTS.VENDA.ENTREGA.ANUNCIANTE.POST.FAILURE,
            payload: result.data.erros
          })
        }
        toastr.success('Gravação completa', 'A reserva foi salva')
        dispatch({
          type: CONSTS.VENDA.ENTREGA.ANUNCIANTE.POST.SUCCESS
        })
        return dispatch(push(`/venda/entrega/sucesso/${result.data.id}/editar`))
      })
  }
}
