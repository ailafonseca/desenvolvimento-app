import { requestApi } from 'util/utils'
import { toastr } from 'react-redux-toastr'
import { push } from 'connected-react-router'
import {
  URL_VENDA_CONTRATO_BASE
} from 'modules/urlsConstants'
import ACTIONS from './actionTypes'
import {
  API_LOAD_ALL,
  API_LOAD_BYID,
  API_ATIVAR,
  API_DESATIVAR,
  URL_CONTRATO_POST_SUCCESS,
  URL_CONTRATO_PUT_SUCCESS
} from './url'

export const loadContratoTodos = () => {
  return (dispatch) => {
    dispatch({ type: ACTIONS.CONTRATO.LOAD.ALL.BEGIN })
    return requestApi(dispatch, API_LOAD_ALL)
      .fetch()
      .then((result) => {
        if (result && result.data && result.data.itens) {
          return dispatch({ type: ACTIONS.CONTRATO.LOAD.ALL.SUCCESS, payload: result.data.itens })
        }
        return dispatch({ type: ACTIONS.CONTRATO.LOAD.ALL.FAILURE, payload: result })
      })
      .catch(ex => dispatch({ type: ACTIONS.CONTRATO.LOAD.ALL.FAILURE, payload: ex }))
  }
}

export const ativarContrato = (id) => {
  return (dispatch) => {
    dispatch({ type: ACTIONS.CONTRATO.ATIVAR.BEGIN, payload: id })
    return requestApi(dispatch, API_ATIVAR(id))
      .fetch()
      .then(() => {
        return dispatch({ type: ACTIONS.CONTRATO.ATIVAR.SUCCESS, payload: id })
      })
      .catch(ex => dispatch({ type: ACTIONS.CONTRATO.ATIVAR.FAILURE, payload: ex }))
  }
}

export const inativarContrato = (id) => {
  return (dispatch) => {
    dispatch({ type: ACTIONS.CONTRATO.DESATIVAR.BEGIN, payload: id })
    return requestApi(dispatch, API_DESATIVAR(id))
      .fetch()
      .then(() => {
        return dispatch({ type: ACTIONS.CONTRATO.DESATIVAR.SUCCESS, payload: id })
      })
      .catch(ex => dispatch({ type: ACTIONS.CONTRATO.DESATIVAR.FAILURE, payload: ex }))
  }
}

export const postContrato = (form) => {
  const body = {
    nome: form.nome,
    descricao: form.descricao,
    ativo: form.checked,
    produtos: form.produtos,
    horarios: form.horarios,
    assinaturas: form.assinaturas,
    tipoContrato: form.tipoContrato,
    isEstoqueProduto: form.isEstoqueProduto,
    isPrecoProduto: form.isPrecoProduto,
    formasDePagamento: form.formasDePagamento.map((fp) => ({ idFormaPagamento: fp.id, dados: JSON.stringify(fp.dados) })),
    grupos: form.grupos.map((grupo) => ({ idGrupo: grupo.id }))
  }
  return (dispatch) => {
    dispatch({ type: ACTIONS.CONTRATO.POST.BEGIN, payload: form })
    return requestApi(dispatch, URL_VENDA_CONTRATO_BASE, 'POST', body)
      .fetch()
      .then((result) => {
        if (result && result.data) {
          dispatch({ type: ACTIONS.CONTRATO.POST.SUCCESS, payload: result.data })
          toastr.success('Cadastro realizado', 'Cadastro realizado com sucesso')
          return dispatch(push(URL_CONTRATO_POST_SUCCESS(result.data.id)))
        }
        toastr.error('Falha', 'Houve um erro ao efetuar o cadastro')
        return dispatch({ type: ACTIONS.CONTRATO.POST.FAILURE })
      })
  }
}

export const putContrato = (form) => {
  const body = {
    nome: form.nome,
    descricao: form.descricao,
    ativo: form.checked,
    produtos: form.produtos,
    horarios: form.horarios,
    id: form.id,
    tipoContrato: form.tipoContrato,
    assinaturas: form.assinaturas,
    isEstoqueProduto: form.isEstoqueProduto,
    isPrecoProduto: form.isPrecoProduto,
    formasDePagamento: form.formasDePagamento.map((fp) => ({ idFormaPagamento: fp.idFormaPagamento, dados: JSON.stringify(fp.dados) })),
    grupos: form.grupos.map((grupo) => ({ idGrupo: grupo.id || grupo.idGrupo }))
  }

  return (dispatch) => {
    dispatch({ type: ACTIONS.CONTRATO.PUT.BEGIN, payload: form })
    return requestApi(dispatch, URL_VENDA_CONTRATO_BASE, 'PATCH', body)
      .fetch()
      .then((result) => {
        if (result && result.data) {
          dispatch({ type: ACTIONS.CONTRATO.PUT.SUCCESS, payload: result.data })
          return dispatch(push(URL_CONTRATO_PUT_SUCCESS(result.data.id)))
        }
        toastr.error('Falha', 'Houve um erro ao atualizar o cadastro')
        return dispatch({ type: ACTIONS.CONTRATO.PUT.FAILURE })
      })
      .catch((err) => {
        if (err && err.response.status === 400) {
          err.response.data.map((error) => toastr.error(error.campo, error.mensagem))
          return dispatch({ type: ACTIONS.CONTRATO.PUT.FAILURE })
        }
      })
  }
}

export const loadContratoById = (id) => {
  return (dispatch) => {
    dispatch({ type: ACTIONS.CONTRATO.BYID.BEGIN })
    return requestApi(dispatch, API_LOAD_BYID(id))
      .fetch()
      .then((result) => {
        if (result && result.data) {
          return dispatch({ type: ACTIONS.CONTRATO.BYID.SUCCESS, payload: result.data })
        }
        return dispatch({ type: ACTIONS.CONTRATO.BYID.FAILURE, payload: result })
      })
      .catch(ex => dispatch({ type: ACTIONS.CONTRATO.BYID.FAILURE, payload: ex }))
  }
}
