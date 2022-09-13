import { requestApi } from '../../util/utils'
import {
  IMPORTAR_PRODUTOS_LOTE,
  ADICIONAR_NOVO_PRODUTO,
  IMPORTAR_TODOS_PRODUTOS,
  LOAD_CATEGORIAS_BEGIN,
  CLEAR_ALL_PRODUCTS,
  ENVIAR_PRODUTO_BEGIN,
  ENVIAR_PRODUTO_SUCCESS,
  ENVIAR_PRODUTO_FAIL,
  DELETE_PRODUTO,
  ADD_PRODUTO
} from './actionTypes'
import { URL_PRODUTO_BASE } from '../urlsConstants'

export const loadProducts = (products) => {
  return { type: IMPORTAR_PRODUTOS_LOTE, payload: products }
}

export const clearProducts = () => {
  return { type: CLEAR_ALL_PRODUCTS }
}

export const sendProduct = (idInterno, produto) => {
  const body = produto
  return (dispatch) => {
    dispatch({ type: ENVIAR_PRODUTO_BEGIN, idInterno })
    return requestApi(dispatch, URL_PRODUTO_BASE, 'POST', body)
      .fetch()
      .then((result) => {
        if (result === undefined) return dispatch({ type: ENVIAR_PRODUTO_FAIL, idInterno })
        if (result.type === 'SERVERNOTFOUND') return dispatch({ type: ENVIAR_PRODUTO_FAIL, idInterno })
        return dispatch({ type: ENVIAR_PRODUTO_SUCCESS, idInterno })
      })
      .catch(_err => dispatch({ type: ENVIAR_PRODUTO_FAIL, idInterno }))
  }
}

export const deleteProduct = (idInterno) => {
  return { type: DELETE_PRODUTO, idInterno }
}

export const addProduct = (idInterno) => {
  return { type: ADD_PRODUTO, idInterno }
}

export const loadCategorias = (categorias) => {
  return { type: LOAD_CATEGORIAS_BEGIN, payload: categorias }
}

export const addNewProduct = () => {
  return { type: ADICIONAR_NOVO_PRODUTO }
}

export const importarTodosProdutos = () => {
  return { type: IMPORTAR_TODOS_PRODUTOS }
}
