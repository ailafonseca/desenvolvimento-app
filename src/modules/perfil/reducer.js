import ACTIONS from './reducerTypes'

const PERFIL_KEY = '_saveadd_perfil'
const DEFAULT = JSON.parse(global.localStorage.getItem(PERFIL_KEY)) || {
  venda: {
    vendedor: false,
    comprador: false
  },
  doacao: {
    doador: false,
    donatario: false
  }
}

export default function (state = DEFAULT, action) {
  if (typeof state === 'undefined') {
    return state
  }

  const perfil = DEFAULT

  switch (action.type) {
    case ACTIONS.PERFIL.SELECIONAR.DOACAO.DOADOR:
      console.log('doador')
      perfil.doacao.doador = true
      global.localStorage.setItem(PERFIL_KEY, JSON.stringify(perfil))
      return { ...state, ...perfil }
    case ACTIONS.PERFIL.SELECIONAR.DOACAO.DONATARIO:
      perfil.doacao.donatario = true
      global.localStorage.setItem(PERFIL_KEY, JSON.stringify(perfil))
      return { ...state, ...perfil }
    case ACTIONS.PERFIL.SELECIONAR.VENDA.VENDEDOR:
      perfil.venda.vendedor = true
      global.localStorage.setItem(PERFIL_KEY, JSON.stringify(perfil))
      return { ...state, ...perfil }
    case ACTIONS.PERFIL.SELECIONAR.VENDA.COMPRADOR:
      perfil.venda.comprador = true
      global.localStorage.setItem(PERFIL_KEY, JSON.stringify(perfil))
      return { ...state, ...perfil }
    case ACTIONS.PERFIL.SELECIONAR.LIMPAR:
      perfil.doacao.doador = false
      perfil.doacao.donatario = false
      perfil.venda.vendedor = false
      perfil.venda.comprador = false
      global.localStorage.setItem(PERFIL_KEY, JSON.stringify(perfil))
      return { ...state, ...DEFAULT }

    case 'LOGIN_LOGOUT':
      global.localStorage.removeItem(PERFIL_KEY)
      return state
    default:
      return state
  }
}
