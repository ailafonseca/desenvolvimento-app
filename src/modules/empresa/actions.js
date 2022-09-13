import { requestApi } from '../../util/utils'
import ACTIONS from './actionTypes'
import {
  API_LOAD_BYID,
  API_LOAD_ONGS,
  API_LOAD_NONGS,
  API_LOAD_GRUPOS
} from './urls'

export const loadEmpresaById = (idEmpresa, configuration = {}) => {
  const { actionBegin, actionSuccess, actionFailure } = configuration

  return (dispatch) => {
    dispatch({
      type: actionBegin !== undefined ? actionBegin : ACTIONS.EMPRESA.LOAD.BEGIN
    })

    return requestApi(dispatch, API_LOAD_BYID(idEmpresa))
      .fetch()
      .then((result) => {
        if (result && result.data) {
          return dispatch({
            type: actionSuccess !== undefined ? actionSuccess : ACTIONS.EMPRESA.LOAD.SUCCESS,
            payload: result.data
          })
        } else {
          return dispatch({
            type: actionFailure !== undefined ? actionFailure : ACTIONS.EMPRESA.LOAD.FAILURE
          })
        }
      })
  }
}

export const loadOngs = (configuration = {}) => {
  const { actionBegin, actionSuccess, actionFailure } = configuration

  return (dispatch) => {
    dispatch({
      type: actionBegin !== undefined ? actionBegin : ACTIONS.EMPRESA.ONGS.LOAD.BEGIN
    })

    return requestApi(dispatch, API_LOAD_ONGS)
      .fetch()
      .then((result) => {
        if (result && result.data) {
          return dispatch({
            type: actionSuccess !== undefined ? actionSuccess : ACTIONS.EMPRESA.ONGS.LOAD.SUCCESS,
            payload: result.data
          })
        } else {
          return dispatch({
            type: actionFailure !== undefined ? actionFailure : ACTIONS.EMPRESA.ONGS.LOAD.FAILURE
          })
        }
      })
  }
}

export const loadNonOngs = (configuration = {}) => {
  const { actionBegin, actionSuccess, actionFailure } = configuration

  return (dispatch) => {
    dispatch({
      type: actionBegin !== undefined ? actionBegin : ACTIONS.EMPRESA.NONGS.LOAD.BEGIN
    })

    return requestApi(dispatch, API_LOAD_NONGS)
      .fetch()
      .then((result) => {
        if (result && result.data) {
          return dispatch({
            type: actionSuccess !== undefined ? actionSuccess : ACTIONS.EMPRESA.NONGS.LOAD.SUCCESS,
            payload: result.data
          })
        } else {
          return dispatch({
            type: actionFailure !== undefined ? actionFailure : ACTIONS.EMPRESA.NONGS.LOAD.FAILURE
          })
        }
      })
  }
}

export const loadGrupos = (configuration = {}) => {
  const { actionBegin, actionSuccess, actionFailure } = configuration

  return (dispatch) => {
    dispatch({
      type: actionBegin !== undefined ? actionBegin : ACTIONS.GRUPOS.LOAD.BEGIN
    })

    return requestApi(dispatch, API_LOAD_GRUPOS)
      .fetch()
      .then((result) => {
        if (result && result.data) {
          return dispatch({
            type: actionSuccess !== undefined ? actionSuccess : ACTIONS.GRUPOS.LOAD.SUCCESS,
            payload: result.data.itens
          })
        } else {
          return dispatch({
            type: actionFailure !== undefined ? actionFailure : ACTIONS.GRUPOS.LOAD.FAILURE
          })
        }
      })
  }
}
