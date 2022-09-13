import { toastr } from 'react-redux-toastr'
import { push } from 'connected-react-router'
import { requestApi } from 'util/utils'
import { toJsonString } from 'util/date'

import {
  API_LOAD_BYID,
  API_LOAD_ALL,
  API_POST,
  API_PUT,
  URL_DOACAO_ANUNCIO_DAILY,
  URL_DOACAO_ANUNCIO_SEMANUNCIO
} from './urls'
import ACTIONS from './actionTypes'

const DETALHES_RESET = 'vrAnuncio_DETALHES_RESET'

export const loadAnuncios = () => {
  return (dispatch) => {
    dispatch({ type: ACTIONS.ANUNCIO.LOAD.ALL.BEGIN })
    requestApi(dispatch, API_LOAD_ALL)
      .fetch()
      .then((result) => {
        if (result.data) return dispatch({ type: ACTIONS.ANUNCIO.LOAD.ALL.SUCCESS, payload: result.data.itens })
        return dispatch({ type: ACTIONS.ANUNCIO.LOAD.ALL.FAILURE })
      })
  }
}

export const addAnuncio = (anuncio) => {
  const statusError = [400, 404, 500, 503]
  return (dispatch) => {
    dispatch({ type: ACTIONS.ANUNCIO.ADD.BEGIN })

    const anuncioTratado = {
      ...anuncio,
      dataInicioReserva: toJsonString(anuncio.dataInicioReserva),
      dataFimReserva: toJsonString(anuncio.dataFimReserva),
      dataInicioEntrega: toJsonString(anuncio.dataInicioEntrega),
      dataFimEntrega: toJsonString(anuncio.dataFimEntrega),
      anuncioProdutos: anuncio.anuncioProdutos.filter(ap => ap.quantidade > 0 || anuncio.isEstoqueProduto)
    }

    console.log('addAnuncio', anuncioTratado, anuncio)

    return requestApi(dispatch, API_POST, 'POST', anuncioTratado)
      .fetch()
      .then((result) => {
        if (statusError.includes(result.status)) {
          return dispatch({ type: ACTIONS.ANUNCIO.ADD.FAILURE, payload: result.data })
        }
        if (result && result.data && result.data.id) {
          return dispatch({ type: ACTIONS.ANUNCIO.ADD.SUCCESS, payload: result.data })
        }
        return dispatch({ type: ACTIONS.ANUNCIO.ADD.FAILURE, payload: result })
      })
  }
}

export const updateAnuncio = (anuncio) => {
  const statusError = [400, 404, 500, 503]
  return (dispatch) => {
    dispatch({ type: ACTIONS.ANUNCIO.UPDATE.BEGIN })

    const anuncioTratado = {
      ...anuncio,
      dataInicioReserva: toJsonString(anuncio.dataInicioReserva),
      dataFimReserva: toJsonString(anuncio.dataFimReserva),
      dataInicioEntrega: toJsonString(anuncio.dataInicioEntrega),
      dataFimEntrega: toJsonString(anuncio.dataFimEntrega),
      anuncioProdutos: anuncio.anuncioProdutos.filter(ap => ap.quantidade > 0 || anuncio.isEstoqueProduto)
    }

    return requestApi(dispatch, API_PUT, 'PUT', anuncioTratado)
      .fetch()
      .then((result) => {
        if (statusError.includes(result.status)) {
          return dispatch({ type: ACTIONS.ANUNCIO.UPDATE.FAILURE, payload: result.data })
        }
        if (result && result.data) {
          return dispatch({ type: ACTIONS.ANUNCIO.UPDATE.SUCCESS, payload: result.data })
        }
        return dispatch({ type: ACTIONS.ANUNCIO.UPDATE.FAILURE, payload: result })
      })
  }
}

export const resetDetalhes = () => {
  return (dispatch) => dispatch({ type: DETALHES_RESET })
}

export const loadAnuncioById = (id) => {
  return (dispatch) => {
    dispatch({ type: ACTIONS.ANUNCIO.BYID.BEGIN })
    return requestApi(dispatch, API_LOAD_BYID(id))
      .fetch()
      .then((result) => {
        if (result === undefined || result.status === undefined) {
          console.log('server not found 1')
          return dispatch({ type: ACTIONS.ANUNCIO.BYID.FAILURE, payload: result })
        }
        if (result.status === 200) {
          return dispatch({ type: ACTIONS.ANUNCIO.BYID.SUCCESS, payload: result.data })
        }
        console.log('server not found 2')
        return dispatch({ type: ACTIONS.ANUNCIO.BYID.FAILURE, payload: result })
      })
  }
}

export const redirectToContratoDoDia = () => {
  return (dispatch) => {
    dispatch({ type: ACTIONS.ANUNCIO.DIA.BEGIN })
    return requestApi(dispatch, URL_DOACAO_ANUNCIO_DAILY)
      .fetch()
      .then((result) => {
        if (result.data) {
          dispatch({ type: ACTIONS.ANUNCIO.DIA.SUCCESS, payload: result.data })
          return dispatch(push('/doacao/anuncio/dia'))
          // return dispatch(push(`/contrato/anuncio/${result.data}`));
        }
        return dispatch({ type: ACTIONS.ANUNCIO.DIA.FAILURE })
      })
  }
}

export const withoutAdvertisement = (id) => {
  return (dispatch) => {
    dispatch({ type: 'WONT_ADVERTISEMENT_BEGIN' })
    const urlWithoutAdvertisement = `${URL_DOACAO_ANUNCIO_SEMANUNCIO}/${id}`
    return requestApi(dispatch, urlWithoutAdvertisement, 'POST', {})
      .fetch()
      .then((res) => {
        if (res && res.data) {
          dispatch({ type: 'WONT_ADVERTISEMENT_SUCCESS' })
        }
      })
      .catch((err) => {
        dispatch({ type: 'WONT_ADVERTISEMENT_FAILURE' })
        console.log(err)
        toastr.error('Erro!', 'Houve um erro!')
      })
  }
}

export const clearError = () => {
  console.log('clearError')
  return (dispatch) => dispatch({ type: ACTIONS.ANUNCIO.CLEARERROR })
}
