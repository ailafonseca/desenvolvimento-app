import ACTIONS from './reducerTypes'

export function selecionarDoador () {
  return (dispatch) => {
    dispatch({ type: ACTIONS.PERFIL.SELECIONAR.DOACAO.DOADOR })
  }
}

export function selecionarDonatario () {
  return (dispatch) => {
    dispatch({ type: ACTIONS.PERFIL.SELECIONAR.DOACAO.DONATARIO })
  }
}

export function selecionarVendedor () {
  return (dispatch) => {
    dispatch({ type: ACTIONS.PERFIL.SELECIONAR.VENDA.VENDEDOR })
  }
}

export function selecionarComprador () {
  return (dispatch) => {
    dispatch({ type: ACTIONS.PERFIL.SELECIONAR.VENDA.COMPRADOR })
  }
}

export function limparSelecao () {
  return (dispatch) => {
    dispatch({ type: ACTIONS.PERFIL.SELECIONAR.LIMPAR })
  }
}
