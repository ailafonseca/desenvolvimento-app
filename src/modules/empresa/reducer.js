import ACTIONS from './actionTypes'

const DEFAULT = {
  empresa: null,
  empresaIsLoading: false,

  ongs: [],
  ongsIsLoading: false,
  nongs: [],
  nongsIsLoading: false,

  grupos: [],
  gruposIsLoading: false
}

export default function (state = DEFAULT, action) {
  if (typeof state === 'undefined') {
    return state
  }

  switch (action.type) {
    case ACTIONS.EMPRESA.LOAD.BEGIN: return { ...state, empresaIsLoading: true }
    case ACTIONS.EMPRESA.LOAD.SUCCESS: return { ...state, empresaIsLoading: false, empresa: action.payload }
    case ACTIONS.EMPRESA.LOAD.FAILURE: return { ...state, empresaIsLoading: false }

    case ACTIONS.EMPRESA.ONGS.LOAD.BEGIN: return { ...state, ongsIsLoading: true }
    case ACTIONS.EMPRESA.ONGS.LOAD.SUCCESS: return { ...state, ongsIsLoading: false, ongs: action.payload }
    case ACTIONS.EMPRESA.ONGS.LOAD.FAILURE: return { ...state, ongsIsLoading: false }

    case ACTIONS.EMPRESA.NONGS.LOAD.BEGIN: return { ...state, nongsIsLoading: true }
    case ACTIONS.EMPRESA.NONGS.LOAD.SUCCESS: return { ...state, nongsIsLoading: false, nongs: action.payload }
    case ACTIONS.EMPRESA.NONGS.LOAD.FAILURE: return { ...state, nongsIsLoading: false }

    case ACTIONS.GRUPOS.LOAD.BEGIN: return { ...state, gruposIsLoading: true }
    case ACTIONS.GRUPOS.LOAD.SUCCESS: return { ...state, gruposIsLoading: false, grupos: action.payload }
    case ACTIONS.GRUPOS.LOAD.FAILURE: return { ...state, gruposIsLoading: false }

    default: return state
  }
}
