import { requestApi } from 'util/utils'
import { push } from 'connected-react-router'
import { toastr } from 'react-redux-toastr'

import ACTIONS from './reducerTypes'
import {
  URL_CATEGORIA_LOAD,
  URL_CATEGORIA_POST,
  URL_PRODUTO_LOAD,
  URL_PRODUTO_POST,
  URL_PRODUTO_LOAD_BY_ID_CATEGORIA,
  URL_PRODUTO_LOAD_BY_ID,
  URL_PRODUTO_IMAGEM_ADD,
  URL_PRODUTO_IMAGEM_DELETE,
  URL_ESTOQUE_LOTE_POST
} from './urls'

export const loadCategorias = () => {
  return (dispatch) => {
    dispatch({ type: ACTIONS.CATEGORIA.LOAD.BEGIN })
    requestApi(dispatch, URL_CATEGORIA_LOAD)
      .fetch()
      .then(result => {
        if (result.data) {
          return dispatch({
            type: ACTIONS.CATEGORIA.LOAD.SUCCESS,
            payload: result.data
          })
        }
        return dispatch({ type: ACTIONS.CATEGORIA.LOAD.FAILURE })
      })
  }
}

export const loadProdutos = () => {
  return (dispatch) => {
    dispatch({ type: ACTIONS.PRODUTO.LOAD.BEGIN })
    return requestApi(dispatch, URL_PRODUTO_LOAD)
      .fetch()
      .then(result => {
        if (result && result.data) {
          return dispatch({
            type: ACTIONS.PRODUTO.LOAD.SUCCESS,
            payload: result.data
          })
        }
        return dispatch({ type: ACTIONS.PRODUTO.LOAD.FAILURE })
      })
  }
}

export const loadProdutosByIdCategoria = idCategoria => {
  return (dispatch) => {
    dispatch({ type: ACTIONS.PRODUTO.BYIDCATEGORIA.BEGIN })
    return requestApi(dispatch, URL_PRODUTO_LOAD_BY_ID_CATEGORIA(idCategoria))
      .fetch()
      .then(result => {
        if (result && result.data) {
          return dispatch({
            type: ACTIONS.PRODUTO.BYIDCATEGORIA.SUCCESS,
            payload: result.data
          })
        }
        return dispatch({ type: ACTIONS.PRODUTO.BYIDCATEGORIA.FAILURE })
      })
  }
}

export const loadProdutoById = id => {
  return (dispatch) => {
    dispatch({ type: ACTIONS.PRODUTO.BYID.BEGIN })
    return requestApi(dispatch, URL_PRODUTO_LOAD_BY_ID(id))
      .fetch()
      .then(result => {
        if (result && result.data) {
          return dispatch({
            type: ACTIONS.PRODUTO.BYID.SUCCESS,
            payload: result.data
          })
        }
        return dispatch({ type: ACTIONS.PRODUTO.BYID.FAILURE })
      })
  }
}

export const postProduto = data => {
  return (dispatch) => {
    dispatch({ type: ACTIONS.PRODUTO.POST.BEGIN })
    return requestApi(dispatch, URL_PRODUTO_POST, 'POST', data)
      .fetch()
      .then(result => {
        if (result && result.data) {
          dispatch({ type: ACTIONS.PRODUTO.POST.SUCCESS, payload: result.data })
          return dispatch(push(`/produto/sucesso/${result && result.data && result.data.idProduto}/editar`))
        }
        return dispatch({ type: ACTIONS.PRODUTO.POST.FAILURE })
      })
  }
}

export const postCategoria = data => {
  data = {
    idProduto: data.id,
    categoria: data.category
  }

  return (dispatch) => {
    dispatch({ type: ACTIONS.CATEGORIA.POST.BEGIN })
    return requestApi(dispatch, URL_CATEGORIA_POST, 'POST', data)
      .fetch()
      .then(result => {
        if (result && result.data) {
          dispatch({ type: ACTIONS.CATEGORIA.POST.SUCCESS, payload: result.data })
          return dispatch(push(`/produto/sucesso/${result && result.data && result.data.idProduto}/editar`))
        }
        return dispatch({ type: ACTIONS.CATEGORIA.POST.FAILURE })
      })
  }
}

export const addImagemDoProduto = (id, imagem) => {
  const formData = new FormData()
  formData.append('idProduto', id)
  formData.append('arquivo', imagem)
  formData.append('ordem', 0)
  formData.append('descricao', '')

  return (dispatch) => {
    dispatch({ type: ACTIONS.PRODUTO.IMAGENS.POST.BEGIN })
    return requestApi(dispatch, URL_PRODUTO_IMAGEM_ADD, 'POST', formData, {
      'Content-type': 'multipart/form-data'
    })
      .fetch()
      .then(result => {
        if (result && result.data) {
          dispatch({ type: ACTIONS.PRODUTO.IMAGENS.POST.SUCCESS, payload: result.data })
          return dispatch(push(`/produto/sucesso/${result && result.data && result.data.idProduto}/editar`))
        }
        return dispatch({ type: ACTIONS.PRODUTO.IMAGENS.POST.FAILURE })
      })
      .catch(err => {
        if (err && err.response && err.response.status === 400) {
          err.response.data.map(erro => toastr.error('Erro', erro.mensagem))
        }
        return dispatch({ type: ACTIONS.PRODUTO.IMAGENS.POST.FAILURE })
      })
  }
}

export const deleteImagemDoProduto = idImagem => {
  return (dispatch) => {
    dispatch({ type: ACTIONS.PRODUTO.IMAGENS.DELETE.BEGIN })
    return requestApi(dispatch, URL_PRODUTO_IMAGEM_DELETE(idImagem), 'DELETE')
      .fetch()
      .then(result => {
        if (result && result.status === 200) {
          return dispatch({ type: ACTIONS.PRODUTO.IMAGENS.DELETE.SUCCESS })
        }
        return dispatch({ type: ACTIONS.PRODUTO.IMAGENS.DELETE.FAILURE })
      })
  }
}

export const addMovimentoEstoqueLote = (produtos, motivo) => {
  const movimentoEstoqueLote = {
    motivo: motivo,
    movimentacoes: produtos.map(produto => ({ ...produto }))
  }

  return (dispatch) => {
    dispatch({ type: ACTIONS.ESTOQUE.LOTE.POST.BEGIN })
    return requestApi(dispatch, URL_ESTOQUE_LOTE_POST, 'POST', movimentoEstoqueLote)
      .fetch()
      .then(result => {
        dispatch(loadProdutos())
        if (result && result.data) {
          return dispatch({ type: ACTIONS.ESTOQUE.LOTE.POST.SUCCESS, payload: result.data })
        }
        return dispatch({ type: ACTIONS.ESTOQUE.LOTE.POST.FAILURE })
      })
  }
}
